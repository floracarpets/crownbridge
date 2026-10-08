import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/index.js";

const origin = "https://crownbridge.example";
const fields = {
  name: "Ada Example", email: "ada@example.com", phone: "+971 50 123 4567",
  subject: "buy", message: "I would like to arrange a viewing.", website: "",
};
function request(data = fields, headers = {}) {
  return new Request(`${origin}/api/contact`, {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", ...headers },
    body: JSON.stringify(data),
  });
}
function setup(overrides = {}) {
  const emails = [];
  const env = {
    CONTACT_FROM: "website@example.com", CONTACT_TO: "team@example.com",
    EMAIL: { send: async (email) => { emails.push(email); return { messageId: "test" }; } },
    CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    ASSETS: { fetch: async () => new Response("static content") },
    ...overrides,
  };
  return { env, emails };
}

test("enquiries use a fixed recipient and sender and visitor Reply-To", async () => {
  const { env, emails } = setup();
  const response = await worker.fetch(request({ ...fields, to: "attacker@example.com", from: "fake@example.com" }), env);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(emails.length, 1);
  assert.equal(emails[0].to, env.CONTACT_TO);
  assert.equal(emails[0].from.email, env.CONTACT_FROM);
  assert.equal(emails[0].replyTo, fields.email);
  assert.match(emails[0].text, /Ada Example/);
  assert.match(emails[0].text, /arrange a viewing/);
});

test("invalid fields and header injection cannot send email", async () => {
  const { env, emails } = setup();
  for (const invalid of [
    { name: " " }, { email: "invalid" }, { email: "ada@example.com\r\nBcc: attacker@example.com" },
    { name: "Ada\r\nInjected" }, { subject: "unknown" }, { message: " " },
    { message: "a".repeat(3001) }, { phone: 123 }, { website: null },
  ]) {
    const response = await worker.fetch(request({ ...fields, ...invalid }), env);
    assert.equal(response.status, 400, JSON.stringify(invalid));
  }
  assert.equal(emails.length, 0);
});

test("honeypot submissions do not send email", async () => {
  const { env, emails } = setup();
  const response = await worker.fetch(request({ ...fields, website: "spam.example" }), env);
  assert.equal(response.status, 200);
  assert.equal(emails.length, 0);
});

test("cross-origin and non-JSON requests are rejected", async () => {
  const { env, emails } = setup();
  assert.equal((await worker.fetch(request(fields, { Origin: "https://other.example" }), env)).status, 403);
  assert.equal((await worker.fetch(request(fields, { "Content-Type": "text/plain" }), env)).status, 415);
  const missingOrigin = request();
  missingOrigin.headers.delete("origin");
  assert.equal((await worker.fetch(missingOrigin, env)).status, 403);
  assert.equal(emails.length, 0);
});

test("malformed JSON and oversized streamed bodies are rejected", async () => {
  const { env, emails } = setup();
  for (const body of ["{broken", "x".repeat(32769)]) {
    const response = await worker.fetch(new Request(`${origin}/api/contact`, {
      method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body,
    }), env);
    assert.equal(response.status, 400);
  }
  assert.equal((await worker.fetch(request(fields, { "Content-Length": "32769" }), env)).status, 413);
  assert.equal(emails.length, 0);
});

test("rate limiting prevents sends and returns a retry interval", async () => {
  const { env, emails } = setup({ CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) } });
  const response = await worker.fetch(request(), env);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "60");
  assert.equal(emails.length, 0);
});

test("missing configuration and provider failures never report success", async () => {
  for (const overrides of [
    { EMAIL: undefined }, { CONTACT_FROM: "" }, { CONTACT_RATE_LIMITER: undefined },
    { EMAIL: { send: async () => { throw new Error("private provider detail"); } } },
  ]) {
    const { env } = setup(overrides);
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false, code: "unavailable" });
  }
});

test("ordinary website routes use static assets and unknown API routes return 404", async () => {
  const { env } = setup();
  assert.equal(await (await worker.fetch(new Request(`${origin}/fr/`), env)).text(), "static content");
  assert.equal((await worker.fetch(new Request(`${origin}/api/missing`), env)).status, 404);
  const response = await worker.fetch(new Request(`${origin}/api/contact`), env);
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
});

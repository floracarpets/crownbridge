import { services } from "../src/content/site.js";

const MAX_BODY_BYTES = 32768;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const controls = /[\u0000-\u001f\u007f]/;

function json(data, status = 200, headers = {}) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(bytes));
}

export async function contact(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false }, 405, { Allow: "POST" });
  }
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return json({ ok: false }, 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return json({ ok: false }, 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return json({ ok: false }, 413);
  }
  if (typeof env.RESEND_API_KEY !== "string" || !env.RESEND_API_KEY.trim() ||
      !env.CONTACT_RATE_LIMITER?.limit ||
      !emailPattern.test(env.CONTACT_FROM || "") || controls.test(env.CONTACT_FROM) ||
      !emailPattern.test(env.CONTACT_TO || "") || controls.test(env.CONTACT_TO)) {
    return json({ ok: false, code: "unavailable" }, 503);
  }

  try {
    const { success } = await env.CONTACT_RATE_LIMITER.limit({
      key: `contact:${request.headers.get("cf-connecting-ip") || "local"}`,
    });
    if (!success) {
      return json({ ok: false, code: "rateLimited" }, 429, { "Retry-After": "60" });
    }
    const fields = await readBody(request);
    if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
      return json({ ok: false, code: "invalid" }, 400);
    }
    if (typeof fields.website !== "string") {
      return json({ ok: false, code: "invalid" }, 400);
    }
    // Hidden field catches basic automated submissions without sending email.
    if (fields.website.trim()) return json({ ok: true });

    const limits = { name: 120, email: 254, phone: 40, subject: 40, message: 3000 };
    for (const [key, max] of Object.entries(limits)) {
      if (typeof fields[key] !== "string" || fields[key].length > max) {
        return json({ ok: false, code: "invalid" }, 400);
      }
      fields[key] = fields[key].trim();
      if (key !== "message" && controls.test(fields[key])) {
        return json({ ok: false, code: "invalid" }, 400);
      }
    }
    if (!fields.name || !emailPattern.test(fields.email) || !fields.message ||
        !services.includes(fields.subject) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(fields.message)) {
      return json({ ok: false, code: "invalid" }, 400);
    }
    const subjects = { buy: "Buying", sell: "Selling", rent: "Renting", offplan: "Off-plan" };
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY.trim()}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        from: `Crownbridge Website <${env.CONTACT_FROM}>`,
        to: [env.CONTACT_TO],
        reply_to: fields.email,
        subject: `Website enquiry: ${subjects[fields.subject]}`,
        text: `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone || "Not provided"}\nInterest: ${subjects[fields.subject]}\n\n${fields.message}`,
      }),
    });
    if (!response.ok) return json({ ok: false, code: "unavailable" }, 503);
    const result = await response.json().catch(() => null);
    if (typeof result?.id !== "string" || !result.id) {
      return json({ ok: false, code: "unavailable" }, 503);
    }
    return json({ ok: true });
  } catch (error) {
    // Do not log visitor details or expose provider errors to the browser.
    if (error instanceof SyntaxError) return json({ ok: false, code: "invalid" }, 400);
    return json({ ok: false, code: "unavailable" }, 503);
  }
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/contact") return contact(request, env);
    if (pathname.startsWith("/api/")) return json({ ok: false }, 404);
    return env.ASSETS.fetch(request);
  },
};

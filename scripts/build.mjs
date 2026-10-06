import { build } from "vite";
import { readFile, writeFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { languages, defaultLanguage } from "../src/i18n/locales.js";

const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
// Set SITE_URL to the confirmed production origin to generate canonical URLs,
// alternate-language links and a sitemap. Never infer it from an email address.
const origin = process.env.SITE_URL
  ? new URL(process.env.SITE_URL).origin
  : null;
await build();
const temp = await mkdtemp(join(tmpdir(), "crownbridge-prerender-"));
try {
  await build({
    build: {
      ssr: "src/entry-server.jsx",
      outDir: temp,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
    },
    ssr: { noExternal: true },
  });
  const { render } = await import(
    pathToFileURL(join(temp, "entry-server.mjs"))
  );
  const template = await readFile("dist/index.html", "utf8");
  for (const { code } of languages) {
    const { markup, title, description } = await render(code);
    const links = origin
      ? `<link rel="canonical" href="${escape(origin)}/${code}/" />` +
        languages
          .map(
            (lang) =>
              `<link rel="alternate" hreflang="${lang.code}" href="${escape(origin)}/${lang.code}/" />`,
          )
          .join("") +
        `<link rel="alternate" hreflang="x-default" href="${escape(origin)}/${defaultLanguage}/" />`
      : "";
    const html = template
      .replace('<html lang="en">', `<html lang="${code}">`)
      .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace(
        /<meta name="description" content="[^"]*"\s*\/>/,
        `<meta name="description" content="${escape(description)}" />`,
      )
      .replace(
        '<div id="root"></div>',
        () => `<div id="root" data-language="${code}">${markup}</div>`,
      )
      .replace("</head>", `${links}</head>`);
    await mkdir(resolve("dist", code), { recursive: true });
    await writeFile(resolve("dist", code, "index.html"), html);
    if (code === defaultLanguage) await writeFile("dist/index.html", html);
  }
  if (origin) {
    await writeFile(
      "dist/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${languages.map(({ code }) => `<url><loc>${escape(origin)}/${code}/</loc></url>`).join("")}</urlset>`,
    );
    await writeFile(
      "dist/robots.txt",
      `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
    );
  }
  console.log("Generated static English, Turkish and French pages.");
} finally {
  await rm(temp, { recursive: true, force: true });
}

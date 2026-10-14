# Crownbridge

Responsive React/Vite website with prerendered English, Turkish, and French pages.
The contact form sends enquiries through a Cloudflare Worker at `/api/contact`
using Resend.
The public pages are served as static assets.

## Local development

- Use Node.js 22 or newer for Wrangler.
- Run `npm ci` to install dependencies.
- Run `npm run dev` for the Vite frontend.
- Run `npm run dev:worker` to build and preview the website with the Worker endpoint.
- Run `npm run build` and `npm test` to verify changes.

The Vite-only development server and `npm run preview` do not run the email endpoint.
For local email testing, create a gitignored `.dev.vars` file containing
`RESEND_API_KEY=your_private_key`. Local Worker submissions with a valid key send
real emails through Resend. Automated tests mock Resend and send no real emails.
Never use a `VITE_` variable for this key: those values are public in the browser.

## Resend email setup

1. In Resend, open **Domains**, add `cronwbridgerealestate.com`, and add the
   DNS records Resend supplies in Cloudflare DNS. Wait for Resend to show the
   domain as verified. Preserve existing mailbox MX records; review any SPF
   changes against your existing email provider's configuration.
2. Create a Resend API key with sending access for that domain. From the project
   terminal, run `npx wrangler login`, then
   `npx wrangler secret put RESEND_API_KEY`. Paste the key only when prompted.
   Alternatively, add `RESEND_API_KEY` as a **Secret** in the `crownbridge`
   Worker's **Settings → Variables and Secrets** in Cloudflare and apply the
   change. Do not put the key in `wrangler.jsonc`, frontend code, or Git.
3. Check `wrangler.jsonc`: `CONTACT_FROM` must use your Resend-verified domain;
   `CONTACT_TO` is the receiving inbox, currently
   `info@crownbridgerealestate.com`. The inbox must already work; this integration
   does not create a mailbox. The domain spelling above matches the current
   project configuration; confirm it matches the domain you own before setup.
4. Run `npm run deploy` to deploy
   the Worker named `crownbridge` with the static `dist` directory. For a Git
   deployment in Cloudflare Workers Builds, use `npm run build` as the build
   command and `npx wrangler deploy` as the deploy command, with Node.js 22+.
   Deploy the Worker as well as the assets; uploading only
   `dist` does not install the API endpoint.
5. Submit a test enquiry on the deployed website, check the inbox and spam
   folder, and confirm that Reply goes to the visitor's email address.

Resend's free plan currently includes 3,000 emails per month, limited to 100 per
day. The form sends one email to the configured company inbox per valid enquiry.
This integration does not require Cloudflare's paid Email Sending feature.
Cloudflare Worker usage remains subject to your hosting plan's limits.

The Worker calls Resend's HTTPS API without exposing credentials to the
browser. It validates fields, restricts requests to the website origin, limits
request size, and includes a honeypot and a rate limiter of five requests per
minute per IP per Cloudflare location. People sharing an IP also share this
limit. These are basic spam controls, not a complete bot defense. The rate limit
namespace `503386590` should be unique to this application's limits in your
account. Errors preserve the visitor's form entries and provide a direct email
link. Success means Resend accepted the email and returned an email ID; it does
not guarantee inbox delivery. Missing keys, provider rejection (including quota
limits), and network errors return an unavailable response without exposing
provider details. Check Resend's email dashboard for delivery status.

If you change the contact address, update `src/content/site.js` for visible
contact details and `wrangler.jsonc` for sending configuration.

References:

- [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction)
- [Resend send email API](https://resend.com/docs/api-reference/emails/send-email)
- [Resend pricing](https://resend.com/pricing)
- [Cloudflare Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)

npm install
npm run build
npx wrangler login
npx wrangler pages project create crownbridge-web --production-branch main
npx wrangler pages deploy dist --project-name crownbridge-web --branch main

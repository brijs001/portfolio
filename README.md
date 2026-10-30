# Brijesh Soni — Technical PM Portfolio

Personal portfolio site for **Brijesh Soni** (Sr. Technical Product Manager, AI/ML · Cloud · SaaS · FinTech).

Live site: https://brijs001.github.io/portfolio/

Repo: https://github.com/brijs001/portfolio

## What's included

- **4 case studies** from Bank of America and Verisk Analytics, each following a 4-section structure: the problem, the customers, the solution under his ownership, and the results — with measurement approaches clearly marked where details are still pending.
- **Dual-audience framing** — appealing to both PM recruiters and consulting/Upwork leads.
- **Light and dark mode**, mobile-responsive, accessibility-minded.

## Tech

Jekyll-rendered HTML/CSS/JS hosted on GitHub Pages, with Google Apps Script handling contact-form email. GitHub Pages builds the Markdown content into the page at deploy time; no client-side content loading is needed.

## Project structure

- `index.html` — document shell, metadata, and shared asset references.
- `_includes/portfolio-content.md` — portfolio page content and semantic HTML markup.
- `styles.css` — layout, components, responsive styles, and theme tokens.
- `script.js` — theme toggle, navigation, scroll reveals, case study drawers, and contact form behavior.
- `interactive.js` — PM Playbook Simulator and "Ask me anything" Q&A (content drawn from the case studies).
- `analytics-consent.js` — opt-in Google Analytics loading and visitor preference handling.
- `_includes/analytics-consent.html` — accessible analytics consent panel.
- `_config.yml` — Jekyll configuration, including the public GA4 Measurement ID.
- `brand-logo.png` — transparent script mark in the portfolio's primary green.
- `brand-logo-64.png` — downsized logo used in the header.
- `profile-photo.png` — full-resolution portrait (source file).
- `profile-photo.jpg` — 640px web version used in the hero and social previews.
- `apple-touch-icon.png` — 180px home-screen icon.
- `favicon.png` — full-resolution profile-photo square (source file).
- `apps-script/Code.gs` — Google Apps Script endpoint for the contact form.

## Contact form setup

The contact form uses Google Apps Script to send messages without exposing the recipient address in the public site. GitHub Pages cannot send email on its own. Complete this one-time setup before enabling form submissions:

1. Create a project at [Google Apps Script](https://script.google.com/) and paste in `apps-script/Code.gs`.
2. In **Project Settings → Script Properties**, add `RECIPIENT_EMAIL` with your destination email address. Do not put the address in the public site files.
3. Deploy as a **Web app**, choose **Execute as me**, and allow access to **Anyone** so visitors can submit the form.
4. Copy the deployment URL ending in `/exec` and set `contactFormEndpoint` near the top of `script.js` to that URL.
5. Commit and publish the site changes. Test the form after deployment.

When updating `apps-script/Code.gs`, edit the existing web app deployment and select **New version** so the deployed endpoint uses the updated code. The `/exec` URL remains the same.

The endpoint validates fields, includes a honeypot and a one-minute per-sender throttle, and sends through your Google account. Apps Script consumer accounts currently have a 100 email-recipient/day quota; Google may change quotas. The public endpoint can be submitted by anyone, so review Apps Script execution logs and disable the deployment if it receives abuse.

## Google Analytics 4

The site uses the GA4 Measurement ID in `_config.yml`. Analytics is opt-in: the Google tag is not requested until a visitor chooses **Accept all** or enables analytics under **Customize**. Visitors can reject optional analytics or change their choice through **Privacy settings** in the footer. The preference is stored in the visitor's browser local storage; if storage is unavailable, the choice applies only to the current page view.

The tag disables Google Signals and ad-personalization signals. Google Analytics still processes usage data when enabled, so publish an appropriate privacy notice and confirm consent requirements for your visitors and location. The Measurement ID is public configuration, not a secret.

To confirm collection after publishing, visit the site, allow analytics, then check **Reports → Realtime** in GA4. Browser privacy settings, ad blockers, or declined consent can prevent events from appearing.

## Deploy options

- **GitHub Pages** (already enabled for this repo — free).
- **Vercel** — note: Vercel's [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage) restrict the Hobby (free) plan to non-commercial personal use; commercial usage (including advertising consulting services) requires a Pro or Enterprise plan.
- **Netlify** — free tier.
- **Cloudflare Pages** — free tier.

## Local preview

GitHub Pages automatically builds and serves the site. A plain `file://` preview or static file server will not process the Jekyll include and Markdown filter in `index.html`; use a local Jekyll installation to preview changes before publishing.

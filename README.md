# Brijesh Soni — Technical PM Portfolio

Personal portfolio site for **Brijesh Soni** (Sr. Technical Product Manager, AI/ML · Cloud · SaaS · FinTech).

Live site: https://brijs001.github.io/portfolio/

Repo: https://github.com/brijs001/portfolio

## What's included

- **4 case studies** from Bank of America and Verisk Analytics, each following a 4-section structure: the problem, the customers, the solution under his ownership, and the results — plus a measurement framework.
- **"See how I think"** — a tabbed PM Playbook Simulator and "Ask me anything" Q&A, with content drawn from the case studies.
- **Dual-audience framing** — appealing to both PM recruiters and consulting leads.
- **Light and dark mode**, mobile-responsive, accessibility-minded.

## Tech

Static site built by Jekyll on GitHub Pages — no client-side frameworks, no build tooling beyond Jekyll itself. Google Apps Script handles contact-form email.

## Project structure

```
_config.yml                 Site settings: title, author, links, GA4 ID, form endpoint, publish exclusions
index.html                  Page shell — assembles the partials below
_includes/
  head.html                 Meta/SEO and social card, Content-Security-Policy, font preloads, stylesheet
  header.html               Site header and mobile navigation
  sections/*.html           One file per page section: hero, case-studies, playbook (tabs), about, contact
  case-studies/*.html       Full case study write-ups, shown in side drawers
  contact-dialog.html       Contact form dialog, success toast, response iframe
  back-to-top.html, footer.html, analytics-consent.html
_data/
  playbooks.json            PM Playbook Simulator content
  answers.json              "Ask me anything" answers
assets/
  css/main.css              Bundles css/_partials/*.css (in cascade order) into one stylesheet
  css/_partials/            Stylesheet source, one file per component/section
  js/theme-init.js          Applies the saved/system theme before first paint
  js/main.js                Bundles js/_modules/*.js into one deferred script; injects _data content
  js/_modules/              Script source, one file per feature
  img/                      Web-optimized images, including og-card.jpg (1200×630 link preview)
  fonts/                    Self-hosted Source Serif 4 and Work Sans (Latin subsets) with their OFL licenses
apps-script/Code.gs         Contact form endpoint (deployed separately; not published)
design-source/              Full-resolution source images and og-card.html, the link-preview card source (not published)
```

Files and folders starting with `_` are build inputs and are never published on their own. `README.md`, `apps-script/`, and `design-source/` are excluded in `_config.yml`.

### Common edits

| To change… | Edit |
|---|---|
| Page title, description, LinkedIn URL, contact endpoint | `_config.yml` |
| Copy in a section | `_includes/sections/<section>.html` |
| A case study | `_includes/case-studies/<slug>.html` |
| Simulator steps or Q&A answers | `_data/playbooks.json`, `_data/answers.json` |
| Link-preview card | Edit `design-source/og-card.html`, screenshot it at 1200×630, save as `assets/img/og-card.jpg` |
| Colors, type scale, spacing | `assets/css/_partials/tokens.css` |
| A component's styles | `assets/css/_partials/<component>.css` |

New CSS partials or JS modules must also be listed in `assets/css/main.css` or `assets/js/main.js`. CSS partial order is the cascade order — keep overrides (such as `responsive.css`) after the rules they override.

Asset URLs carry a `?v=` build timestamp, so browsers pick up new CSS/JS on every deploy without manual cache-busting.

## Local preview

GitHub Pages builds the site automatically on push to `master`. To preview locally, install Jekyll and build:

```sh
gem install jekyll -v 3.10.0 kramdown-parser-gfm
jekyll build            # outputs to _site/
cd _site && python3 -m http.server 8000
```

Serve `_site/` over HTTP rather than opening the file directly: the Content-Security-Policy only allows `'self'` resources, which `file://` pages don't satisfy.

## Security

- **Content-Security-Policy** (in `_includes/head.html`) allow-lists only the site's own assets (fonts are self-hosted), the opt-in Google Analytics tag, and the Apps Script contact form. Inline scripts are blocked — keep all scripts in `assets/js/`. GitHub Pages cannot send response headers, so the policy is delivered by `<meta>`; header-only protections such as `frame-ancestors` aren't available on this host.
- **Contact form**: the page accepts result messages only from Apps Script's `*-script.googleusercontent.com` origin and only for the current submission token. The endpoint sends results only to the site origin, validates and length-limits fields, uses a honeypot, throttles each sender to one message per minute, and caps total emails at 20 per hour.
- **No secrets in the repo.** The recipient email lives in an Apps Script property; the GA4 ID and form endpoint are public configuration.
- **Repository-only files** (README, Apps Script source, full-resolution images) are excluded from the published site.

## Contact form setup

The contact form uses Google Apps Script to send messages without exposing the recipient address in the public site. GitHub Pages cannot send email on its own. One-time setup:

1. Create a project at [Google Apps Script](https://script.google.com/) and paste in `apps-script/Code.gs`.
2. In **Project Settings → Script Properties**, add `RECIPIENT_EMAIL` with your destination email address. Do not put the address in the public site files. Optionally add `SITE_ORIGIN` (for example `https://brijs001.github.io`) if the site moves to another domain.
3. Deploy as a **Web app**, choose **Execute as me**, and allow access to **Anyone** so visitors can submit the form.
4. Copy the deployment URL ending in `/exec` into `contact_form_endpoint` in `_config.yml`.
5. Commit and publish the site changes. Test the form after deployment.

When updating `apps-script/Code.gs`, edit the existing web app deployment and select **New version** so the deployed endpoint uses the updated code. The `/exec` URL remains the same.

Apps Script consumer accounts currently have a 100 email-recipient/day quota; Google may change quotas. The public endpoint can be submitted by anyone, so review Apps Script execution logs and disable the deployment if it receives abuse.

## Google Analytics 4

The site uses the GA4 Measurement ID in `_config.yml`. Analytics is opt-in: the Google tag is not requested until a visitor chooses **Accept all** or enables analytics under **Customize**. Visitors can reject optional analytics or change their choice through **Privacy settings** in the footer. The preference is stored in the visitor's browser local storage; if storage is unavailable, the choice applies only to the current page view.

The tag disables Google Signals and ad-personalization signals. Google Analytics still processes usage data when enabled, so publish an appropriate privacy notice and confirm consent requirements for your visitors and location. The Measurement ID is public configuration, not a secret.

Besides page views, the site sends these events (only after consent): `case_study_open`, `tab_select`, `playbook_run`, `ask_question`, `contact_open`, and `contact_sent`. In GA4 they appear under **Reports → Engagement → Events**; register `case_study`, `tab`, `challenge`, `priority`, `question`, and `source` as custom dimensions to break them down.

To confirm collection after publishing, visit the site, allow analytics, then check **Reports → Realtime** in GA4. Browser privacy settings, ad blockers, or declined consent can prevent events from appearing.

## Deploy options

- **GitHub Pages** (already enabled for this repo — free).
- **Vercel** — note: Vercel's [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage) restrict the Hobby (free) plan to non-commercial personal use; commercial usage (including advertising consulting services) requires a Pro or Enterprise plan.
- **Netlify** — free tier.
- **Cloudflare Pages** — free tier.

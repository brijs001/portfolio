# Portfolio recommendations

Next improvements to help recruiters and hiring managers, especially at startups, say yes quickly. Ordered by priority. Tick items off as they ship.

## 1. Fix first: credibility

Recruiters and hiring managers cross-check what they read, so these carry the most risk.

- [ ] **Back up the "$250M+" headline stat.** The case studies add up to about $98M ($97M+ from Circular Navigator and ~$1M in fraud losses prevented). Either name where the rest comes from (in a case study or the About section) or replace the stat with a number the page already proves.
  - *Needed:* the source behind $250M+.
- [ ] **Use one title everywhere.** The site currently says "Technical Product Leader" (tab title, social card), "Sr. Technical Product Manager" (career timeline), and "Senior Technical Product Manager" (structured data, site description). Pick one positioning, ideally matching the LinkedIn headline, and align the rest.
  - *Needed:* your preferred title.
- [ ] **Check confidentiality.** The Bank of America case study shares internal detail (8-agent architecture, false-positive rates, ~$1M losses prevented). Confirm this is within your employer's public-disclosure policy.

## 2. High impact: make saying yes easy

- [ ] **30-second summary in each case study.** Three bullets at the top of each drawer: the problem, what I did, the result.
- [ ] **"Schedule a conversation" opens a booking link** (Calendly or Google Calendar) instead of the message form.
  - *Needed:* booking link.
- [ ] **Location and work logistics** in the Contact section, e.g. "Based in [city] · Open to remote / hybrid · [time zone]".
  - *Needed:* city, work preferences, time zone.
- [ ] **Custom domain** (e.g. brijeshsoni.com) instead of brijs001.github.io/portfolio. GitHub Pages supports this for free; only the domain costs money.
  - *Needed:* decision and domain purchase.
- [ ] **Lean into startup positioning:**
  - [ ] Founder-focused hero sentence, e.g. *"I find the problem worth solving, ship the first version, and scale it to revenue — from a 0→1 SaaS that reached $97M+ to agentic AI in production. 15+ years in tech, 8+ in product."*
  - [ ] Put the 0→1 stat first in the hero stats strip.
  - [ ] Put Circular Navigator (0→1) as the first case study, agentic AI second.
  - [ ] Optionally mention "founding or early-stage PM roles" in the "Hiring a product leader?" card.
- [ ] **Testimonials.** Two short quotes from LinkedIn recommendations (a manager or stakeholder), placed under the case studies.
  - *Needed:* the quotes, with permission to use names and titles.

## 3. Polish

- [ ] **Smaller avatar image.** The hero uses a 640px photo displayed at ~108px; a smaller version loads faster on phones.
- [ ] **Response-time line** by the contact buttons, e.g. "I reply within 24 hours" — only if it's true.
- [ ] **Branded "page not found" page** so mistyped or old links still lead visitors back to the portfolio.
- [ ] **Review analytics after two weeks.** Check case study opens, playbook runs, and contact clicks in GA4 (see README), and adjust the page based on what visitors actually do.

## Still open from earlier

- [ ] Redeploy `apps-script/Code.gs` as a new version of the existing web app deployment (Deploy → Manage deployments → Edit → New version).
- [ ] Send one real test message through the live contact form.
- [ ] Refresh the LinkedIn link preview in the Post Inspector (linkedin.com/post-inspector).
- [ ] Decide whether to remove the old email address that appears in the public git history (requires rewriting history).

## Summary: who does what

| Can be done now without input | Needs input from you |
|---|---|
| 30-second case study summaries | Source for "$250M+" |
| Startup hero sentence, stats order, case study order | Preferred title |
| Smaller avatar image | Booking link, location, work preferences |
| "Page not found" page | Testimonial quotes |
| | Custom domain decision |

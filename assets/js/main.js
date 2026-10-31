---
# Bundles the modules below into a single deferred script.
# Simulator and Q&A content is injected from _data/ at build time.
---
(function () {
  "use strict";

  const PLAYBOOK_DATA = {{ site.data.playbooks | jsonify }};
  const ANSWERS = {{ site.data.answers | jsonify }};

{% include_relative _modules/utils.js %}
{% include_relative _modules/theme.js %}
{% include_relative _modules/navigation.js %}
{% include_relative _modules/reveal.js %}
{% include_relative _modules/case-drawers.js %}
{% include_relative _modules/tabs.js %}
{% include_relative _modules/light-ring.js %}
{% include_relative _modules/contact-form.js %}
{% include_relative _modules/playbook.js %}
{% include_relative _modules/ask.js %}
{% include_relative _modules/analytics-consent.js %}

  initTheme();
  initMobileNav();
  initActiveSection();
  initScrollProgress();
  initReveal();
  initCaseDrawers();
  initTabs();
  initLightRings();
  initBackToTop();
  initContactForm();
  initPlaybook(PLAYBOOK_DATA);
  initAsk(ANSWERS);
  initAnalyticsConsent();
})();

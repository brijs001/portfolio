(function () {
  const consentPanel = document.getElementById("analyticsConsent");
  const settingsButton = document.getElementById("analyticsSettings");

  if (!consentPanel || !settingsButton) {
    return;
  }

  const measurementId = consentPanel.dataset.measurementId || "";
  const consentKey = "portfolio-analytics-consent";
  const status = document.getElementById("analyticsConsentStatus");
  const customizeButton = document.getElementById("analyticsCustomize");
  const preferences = document.getElementById("analyticsPreferences");
  const analyticsPreference = document.getElementById("analyticsPreference");
  const savePreferencesButton = document.getElementById("saveAnalyticsPreferences");
  let analyticsLoaded = false;

  function readConsent() {
    try {
      return window.localStorage.getItem(consentKey);
    } catch (error) {
      console.warn("Analytics preference could not be read from local storage.", error);
      return null;
    }
  }

  function saveConsent(value) {
    try {
      window.localStorage.setItem(consentKey, value);
    } catch (error) {
      console.warn("Analytics preference could not be saved to local storage.", error);
    }
  }

  function removeAnalyticsCookies() {
    document.cookie.split(";").forEach(function (cookie) {
      const name = cookie.split("=")[0].trim();

      if (name === "_ga" || name.indexOf("_ga_") === 0) {
        document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax; Secure";
      }
    });
  }

  function loadAnalytics() {
    if (!/^G-[A-Z0-9]+$/.test(measurementId)) {
      console.error("Google Analytics Measurement ID is missing or invalid.");
      return;
    }

    window["ga-disable-" + measurementId] = false;
    if (analyticsLoaded) {
      return;
    }

    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_flags: "SameSite=Lax;Secure"
    });

    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    analyticsScript.onerror = function () {
      analyticsLoaded = false;
      console.error("Google Analytics could not be loaded.");
    };
    document.head.appendChild(analyticsScript);
  }

  function setConsent(value) {
    saveConsent(value);
    analyticsPreference.checked = value === "granted";
    consentPanel.hidden = true;

    if (value === "granted") {
      loadAnalytics();
    } else {
      if (measurementId) {
        window["ga-disable-" + measurementId] = true;
      }
      removeAnalyticsCookies();
    }
  }

  function openPreferences() {
    const currentConsent = readConsent();
    analyticsPreference.checked = currentConsent === "granted";
    preferences.hidden = false;
    customizeButton.setAttribute("aria-expanded", "true");
    analyticsPreference.focus();
  }

  document.querySelectorAll("[data-analytics-choice]").forEach(function (button) {
    button.addEventListener("click", function () {
      setConsent(button.dataset.analyticsChoice === "accept" ? "granted" : "denied");
    });
  });

  customizeButton.addEventListener("click", function () {
    if (preferences.hidden) {
      openPreferences();
    } else {
      preferences.hidden = true;
      customizeButton.setAttribute("aria-expanded", "false");
      customizeButton.focus();
    }
  });

  savePreferencesButton.addEventListener("click", function () {
    setConsent(analyticsPreference.checked ? "granted" : "denied");
  });

  settingsButton.addEventListener("click", function () {
    const currentConsent = readConsent();
    status.textContent = currentConsent === "granted"
      ? "Your current choice allows analytics."
      : currentConsent === "denied"
        ? "Your current choice rejects optional analytics."
        : "Choose whether to allow optional analytics.";
    status.hidden = false;
    analyticsPreference.checked = currentConsent === "granted";
    preferences.hidden = false;
    customizeButton.setAttribute("aria-expanded", "true");
    consentPanel.hidden = false;
    analyticsPreference.focus();
  });

  const existingConsent = readConsent();
  if (existingConsent === "granted") {
    loadAnalytics();
  } else if (existingConsent !== "denied") {
    consentPanel.hidden = false;
  }
})();

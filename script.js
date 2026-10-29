(function () {
  const contactFormEndpoint = "https://script.google.com/macros/s/AKfycbyiFyJNsl9PehrE75ddPmSPAxuJKvLI6DpGqi6lbyldM9u-xJhb6urW8VqX63pzRSAtTg/exec";
  const toggle = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;
  let current = "light";

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    current = "dark";
  }
  root.setAttribute("data-theme", current);

  function getIcon(mode) {
    return mode === "dark"
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  if (toggle) {
    toggle.innerHTML = getIcon(current);
    toggle.setAttribute("aria-label", "Switch to " + (current === "dark" ? "light" : "dark") + " mode");
    toggle.addEventListener("click", function () {
      current = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", current);
      toggle.setAttribute("aria-label", "Switch to " + (current === "dark" ? "light" : "dark") + " mode");
      toggle.innerHTML = getIcon(current);
    });
  }

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  function setMobileNav(open) {
    mobileNav.classList.toggle("open", open);
    mobileNavOverlay.classList.toggle("open", open);
    mobileBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (mobileBtn && mobileNav && mobileNavOverlay) {
    mobileBtn.setAttribute("aria-expanded", "false");
    mobileBtn.setAttribute("aria-controls", "mobileNav");
    mobileBtn.addEventListener("click", function () {
      setMobileNav(!mobileNav.classList.contains("open"));
    });
    mobileNavOverlay.addEventListener("click", function () {
      setMobileNav(false);
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMobileNav(false);
      });
    });
  }

  const contactDialog = document.getElementById("contactDialog");
  const contactForm = document.getElementById("contactForm");
  const contactFrame = document.querySelector('iframe[name="contactFormResponse"]');
  const contactStatus = document.getElementById("contactFormStatus");
  const contactSuccessToast = document.getElementById("contactSuccessToast");
  const contactSubmit = document.getElementById("contactSubmit");
  const contactCancel = document.getElementById("contactCancel");
  const inquiryType = document.getElementById("contactInquiryType");
  const submissionToken = document.getElementById("contactSubmissionToken");
  let activeSubmissionToken = "";
  let responseTimer;
  let successToastTimer;

  function setContactStatus(message, state) {
    contactStatus.textContent = message;
    contactStatus.dataset.state = state || "";
  }

  function createSubmissionToken() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  if (contactDialog && contactForm && contactFrame) {
    document.querySelectorAll("[data-contact-open]").forEach(function (button) {
      button.addEventListener("click", function () {
        window.clearTimeout(successToastTimer);
        contactSuccessToast.hidden = true;
        contactSuccessToast.classList.remove("is-visible");
        inquiryType.value = button.dataset.inquiryType || "Portfolio inquiry";
        setContactStatus("", "");
        contactDialog.showModal();
        document.getElementById("contactName").focus();
      });
    });

    contactCancel.addEventListener("click", function () {
      contactDialog.close();
    });

    contactDialog.addEventListener("click", function (event) {
      if (event.target === contactDialog) {
        contactDialog.close();
      }
    });

    contactDialog.addEventListener("close", function () {
      window.clearTimeout(responseTimer);
      contactForm.reset();
      contactSubmit.disabled = false;
      contactCancel.textContent = "Cancel";
      activeSubmissionToken = "";
    });

    contactForm.addEventListener("submit", function (event) {
      if (!contactFormEndpoint) {
        event.preventDefault();
        setContactStatus("The contact form is not connected yet. Please use LinkedIn for now.", "error");
        return;
      }

      if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(contactFormEndpoint)) {
        event.preventDefault();
        setContactStatus("The contact form is misconfigured. Please use LinkedIn for now.", "error");
        return;
      }

      event.preventDefault();
      activeSubmissionToken = createSubmissionToken();
      submissionToken.value = activeSubmissionToken;
      contactForm.action = contactFormEndpoint;
      contactSubmit.disabled = true;
      contactCancel.textContent = "Cancel";
      setContactStatus("Sending your message…", "");
      contactForm.submit();

      responseTimer = window.setTimeout(function () {
        contactSubmit.disabled = false;
        setContactStatus("No confirmation was received. Check the form setup before trying again.", "error");
      }, 30000);
    });

    window.addEventListener("message", function (event) {
      if (
        !event.data ||
        event.data.type !== "portfolio-contact-result" ||
        event.data.token !== activeSubmissionToken
      ) {
        return;
      }

      window.clearTimeout(responseTimer);
      contactSubmit.disabled = false;

      if (event.data.success === true) {
        contactSuccessToast.textContent = "Thanks — your message has been sent.";
        contactSuccessToast.hidden = false;
        contactSuccessToast.classList.remove("is-visible");
        void contactSuccessToast.offsetWidth;
        contactSuccessToast.classList.add("is-visible");
        successToastTimer = window.setTimeout(function () {
          contactSuccessToast.hidden = true;
          contactSuccessToast.classList.remove("is-visible");
        }, 3000);
        contactForm.reset();
        contactDialog.close();
      } else {
        setContactStatus("Your message could not be sent. Please try again later or use LinkedIn.", "error");
      }
    });
  }
})();

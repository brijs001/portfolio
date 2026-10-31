// Contact form posts into a hidden iframe pointed at the Google Apps Script
// endpoint (apps-script/Code.gs), which replies with a postMessage.
const CONTACT_ENDPOINT_PATTERN = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/;
// Apps Script HtmlService responses are served from sandboxed
// n-<hash>-script.googleusercontent.com origins.
const CONTACT_RESPONSE_ORIGIN_PATTERN = /^https:\/\/[a-z0-9-]+-script\.googleusercontent\.com$/;

function initContactForm() {
  const dialog = document.getElementById("contactDialog");
  const form = document.getElementById("contactForm");
  const frame = document.querySelector('iframe[name="contactFormResponse"]');
  if (!dialog || !form || !frame) {
    return;
  }

  const endpoint = form.dataset.endpoint || "";
  const status = document.getElementById("contactFormStatus");
  const toast = document.getElementById("contactSuccessToast");
  const submitButton = document.getElementById("contactSubmit");
  const cancelButton = document.getElementById("contactCancel");
  const inquiryType = document.getElementById("contactInquiryType");
  const submissionToken = document.getElementById("contactSubmissionToken");
  let activeToken = "";
  let responseTimer;
  let toastTimer;

  function setStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state || "";
  }

  function createToken() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function hideToast() {
    window.clearTimeout(toastTimer);
    toast.hidden = true;
    toast.classList.remove("is-visible");
  }

  function showToast(message) {
    hideToast();
    toast.textContent = message;
    toast.hidden = false;
    void toast.offsetWidth; // restart the CSS animation
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(hideToast, 3000);
  }

  document.querySelectorAll("[data-contact-open]").forEach(function (button) {
    button.addEventListener("click", function () {
      hideToast();
      inquiryType.value = button.dataset.inquiryType || "Portfolio inquiry";
      setStatus("", "");
      dialog.showModal();
      document.getElementById("contactName").focus();
    });
  });

  cancelButton.addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", function () {
    window.clearTimeout(responseTimer);
    form.reset();
    submitButton.disabled = false;
    activeToken = "";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!CONTACT_ENDPOINT_PATTERN.test(endpoint)) {
      setStatus("The contact form is not available right now. Please use LinkedIn instead.", "error");
      return;
    }

    activeToken = createToken();
    submissionToken.value = activeToken;
    form.action = endpoint;
    submitButton.disabled = true;
    setStatus("Sending your message…", "");
    form.submit();

    responseTimer = window.setTimeout(function () {
      submitButton.disabled = false;
      setStatus("No confirmation was received. Please try again later or use LinkedIn.", "error");
    }, 30000);
  });

  window.addEventListener("message", function (event) {
    if (
      !CONTACT_RESPONSE_ORIGIN_PATTERN.test(event.origin) ||
      !event.data ||
      event.data.type !== "portfolio-contact-result" ||
      !activeToken ||
      event.data.token !== activeToken
    ) {
      return;
    }

    window.clearTimeout(responseTimer);
    submitButton.disabled = false;

    if (event.data.success === true) {
      dialog.close();
      showToast("Thanks — your message has been sent.");
    } else {
      setStatus("Your message could not be sent. Please try again later or use LinkedIn.", "error");
    }
  });
}

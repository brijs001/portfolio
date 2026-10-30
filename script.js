(function () {
  const contactFormEndpoint = "https://script.google.com/macros/s/AKfycbyiFyJNsl9PehrE75ddPmSPAxuJKvLI6DpGqi6lbyldM9u-xJhb6urW8VqX63pzRSAtTg/exec";
  const toggle = document.querySelector("[data-theme-toggle]");
  const root = document.documentElement;
  const themeKey = "portfolio-theme";
  const darkSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";

  function readSavedTheme() {
    try {
      return window.localStorage.getItem(themeKey);
    } catch (error) {
      return null;
    }
  }

  function getIcon(mode) {
    return mode === "dark"
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  function applyTheme(mode) {
    current = mode;
    root.setAttribute("data-theme", mode);
    if (toggle) {
      toggle.innerHTML = getIcon(mode);
      toggle.setAttribute("aria-label", "Switch to " + (mode === "dark" ? "light" : "dark") + " mode");
    }
  }

  applyTheme(current);

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(current === "dark" ? "light" : "dark");
      try {
        window.localStorage.setItem(themeKey, current);
      } catch (error) {
        console.warn("Theme preference could not be saved to local storage.", error);
      }
    });
  }

  darkSchemeQuery.addEventListener("change", function (event) {
    if (readSavedTheme() !== "light" && readSavedTheme() !== "dark") {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  function setMobileNav(open, returnFocus) {
    mobileNav.classList.toggle("open", open);
    mobileNavOverlay.classList.toggle("open", open);
    mobileBtn.setAttribute("aria-expanded", open ? "true" : "false");
    mobileBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (!open && returnFocus) {
      mobileBtn.focus();
    }
  }

  if (mobileBtn && mobileNav && mobileNavOverlay) {
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
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileNav.classList.contains("open")) {
        setMobileNav(false, true);
      }
    });
    window.matchMedia("(min-width: 768px)").addEventListener("change", function (event) {
      if (event.matches) {
        setMobileNav(false);
      }
    });
  }

  const sectionNavLinks = document.querySelectorAll(".main-nav a[href^='#'], .mobile-nav a[href^='#']");
  const navigableSections = [...sectionNavLinks]
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(function (section, index, sections) {
      return section && sections.indexOf(section) === index;
    });

  if ("IntersectionObserver" in window && navigableSections.length > 0) {
    function updateCurrentSection() {
      const activeBandTop = window.innerHeight * 0.18;
      const activeBandBottom = window.innerHeight * 0.24;
      let currentSection = navigableSections.find(function (section) {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= activeBandBottom && bounds.bottom >= activeBandTop;
      });

      if (!currentSection && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        currentSection = navigableSections[navigableSections.length - 1];
      }

      sectionNavLinks.forEach(function (link) {
        if (currentSection && link.getAttribute("href") === "#" + currentSection.id) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    let activeSectionUpdateScheduled = false;
    function scheduleCurrentSectionUpdate() {
      if (activeSectionUpdateScheduled) {
        return;
      }

      activeSectionUpdateScheduled = true;
      window.requestAnimationFrame(function () {
        activeSectionUpdateScheduled = false;
        updateCurrentSection();
      });
    }

    const sectionObserver = new IntersectionObserver(scheduleCurrentSectionUpdate, {
      rootMargin: "-18% 0px -76% 0px"
    });

    navigableSections.forEach(function (section) {
      sectionObserver.observe(section);
    });
    updateCurrentSection();
    window.addEventListener("scroll", scheduleCurrentSectionUpdate, { passive: true });
    window.addEventListener("resize", scheduleCurrentSectionUpdate);
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function countUp(element) {
    const target = Number(element.dataset.count);
    const prefix = element.dataset.prefix || "";
    const suffix = element.dataset.suffix || "";
    if (prefersReducedMotion.matches || !target) {
      return;
    }

    const duration = 1200;
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = prefix + Math.round(target * eased) + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    }
    window.requestAnimationFrame(frame);
  }

  let pendingReveals = [...document.querySelectorAll(".reveal")];
  let revealScheduled = false;

  function revealInView() {
    revealScheduled = false;
    const triggerLine = window.innerHeight * 0.92;
    let staggerIndex = 0;

    pendingReveals = pendingReveals.filter(function (item) {
      if (item.getBoundingClientRect().top > triggerLine) {
        return true;
      }

      // Stagger items that enter the viewport together
      const delay = prefersReducedMotion.matches ? 0 : staggerIndex * 90;
      staggerIndex += 1;
      window.setTimeout(function () {
        item.classList.add("is-visible");
        item.querySelectorAll("[data-count]").forEach(countUp);
      }, delay);
      return false;
    });

    if (pendingReveals.length === 0) {
      window.removeEventListener("scroll", scheduleReveal);
      window.removeEventListener("resize", scheduleReveal);
    }
  }

  function scheduleReveal() {
    if (!revealScheduled) {
      revealScheduled = true;
      window.requestAnimationFrame(revealInView);
    }
  }

  window.addEventListener("scroll", scheduleReveal, { passive: true });
  window.addEventListener("resize", scheduleReveal);
  revealInView();

  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    let progressScheduled = false;
    function updateScrollProgress() {
      progressScheduled = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.transform = "scaleX(" + (scrollable > 0 ? window.scrollY / scrollable : 0) + ")";
    }
    window.addEventListener("scroll", function () {
      if (!progressScheduled) {
        progressScheduled = true;
        window.requestAnimationFrame(updateScrollProgress);
      }
    }, { passive: true });
    updateScrollProgress();
  }

  const caseDrawers = document.querySelectorAll(".case-drawer");
  let drawerOpener = null;

  function openCaseDrawer(id) {
    const drawer = document.getElementById(id);
    if (!drawer || typeof drawer.showModal !== "function") {
      return;
    }

    caseDrawers.forEach(function (other) {
      if (other !== drawer && other.open) {
        other.close();
      }
    });
    if (!drawer.open) {
      drawer.showModal();
    }
    drawer.scrollTop = 0;
    history.replaceState(null, "", "#" + id);
  }

  function handleDrawerClosed() {
    const anyOpen = [...caseDrawers].some(function (other) {
      return other.open;
    });
    if (anyOpen) {
      return;
    }
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (drawerOpener) {
      drawerOpener.focus();
      drawerOpener = null;
    }
  }

  function closeCaseDrawer(drawer) {
    drawer.close();
    handleDrawerClosed();
  }

  document.addEventListener("click", function (event) {
    const opener = event.target.closest("[data-case-open]");
    if (opener) {
      if (!opener.closest(".case-drawer")) {
        drawerOpener = opener;
      }
      openCaseDrawer(opener.dataset.caseOpen);
      return;
    }

    const closer = event.target.closest("[data-case-close]");
    if (closer) {
      if (closer.dataset.scrollTo) {
        drawerOpener = null;
      }
      closeCaseDrawer(closer.closest(".case-drawer"));
      if (closer.dataset.scrollTo) {
        document.getElementById(closer.dataset.scrollTo).scrollIntoView({
          behavior: prefersReducedMotion.matches ? "auto" : "smooth"
        });
      }
    }
  });

  caseDrawers.forEach(function (drawer) {
    drawer.addEventListener("click", function (event) {
      // Clicks on the backdrop land on the dialog element but outside its box
      const bounds = drawer.getBoundingClientRect();
      if (event.target === drawer && event.clientX < bounds.left) {
        closeCaseDrawer(drawer);
      }
    });
    drawer.addEventListener("close", handleDrawerClosed);
  });

  if (/^#case-[1-4]$/.test(window.location.hash)) {
    openCaseDrawer(window.location.hash.slice(1));
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    function updateBackToTopVisibility() {
      backToTop.hidden = window.scrollY < 400;
    }

    updateBackToTopVisibility();
    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
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

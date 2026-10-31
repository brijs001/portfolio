function initMobileNav() {
  const button = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mobileNav");
  const overlay = document.getElementById("mobileNavOverlay");
  if (!button || !nav || !overlay) {
    return;
  }

  function setOpen(open, returnFocus) {
    nav.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (!open && returnFocus) {
      button.focus();
    }
  }

  button.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });
  overlay.addEventListener("click", function () {
    setOpen(false);
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false, true);
    }
  });
  window.matchMedia("(min-width: 768px)").addEventListener("change", function (event) {
    if (event.matches) {
      setOpen(false);
    }
  });
}

// Marks the nav link for the section currently under the header.
function initActiveSection() {
  const links = document.querySelectorAll(".main-nav a[href^='#'], .mobile-nav a[href^='#']");
  const sections = [...links]
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(function (section, index, all) {
      return section && all.indexOf(section) === index;
    });
  if (sections.length === 0) {
    return;
  }

  function update() {
    const bandTop = window.innerHeight * 0.18;
    const bandBottom = window.innerHeight * 0.24;
    let current = sections.find(function (section) {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= bandBottom && bounds.bottom >= bandTop;
    });

    if (!current && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
      current = sections[sections.length - 1];
    }

    links.forEach(function (link) {
      if (current && link.getAttribute("href") === "#" + current.id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const scheduleUpdate = onFrame(update);
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  update();
}

function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) {
    return;
  }

  function update() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (scrollable > 0 ? window.scrollY / scrollable : 0) + ")";
  }

  window.addEventListener("scroll", onFrame(update), { passive: true });
  update();
}

function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) {
    return;
  }

  function update() {
    button.hidden = window.scrollY < 400;
  }

  window.addEventListener("scroll", onFrame(update), { passive: true });
  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });
  update();
}

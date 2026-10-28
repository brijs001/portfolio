(function () {
  var toggle = document.querySelector("[data-theme-toggle]");
  var root = document.documentElement;
  var current = "light";

  if (matchMedia("(prefers-color-scheme: dark)").matches) {
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

  var mobileBtn = document.getElementById("mobileMenuBtn");
  var mobileNav = document.getElementById("mobileNav");
  var mobileNavOverlay = document.getElementById("mobileNavOverlay");

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
})();

// Light/dark toggle. The initial theme is applied by theme-init.js before paint;
// both icons are in the markup and CSS shows the one for the current theme.
function initTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector("[data-theme-toggle]");
  const themeKey = "portfolio-theme";

  function readSavedTheme() {
    try {
      return window.localStorage.getItem(themeKey);
    } catch (error) {
      return null;
    }
  }

  function applyTheme(mode) {
    root.setAttribute("data-theme", mode);
    if (toggle) {
      toggle.setAttribute("aria-label", "Switch to " + (mode === "dark" ? "light" : "dark") + " mode");
    }
  }

  applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        window.localStorage.setItem(themeKey, next);
      } catch (error) {
        console.warn("Theme preference could not be saved to local storage.", error);
      }
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (event) {
    const saved = readSavedTheme();
    if (saved !== "light" && saved !== "dark") {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

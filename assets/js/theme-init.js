// Runs before first paint (loaded without defer) so the saved or system theme
// is applied without a flash, and marks the page as JS-enabled for reveal styles.
(function () {
  var theme;
  try {
    theme = window.localStorage.getItem("portfolio-theme");
  } catch (error) {}
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.add("js");
})();

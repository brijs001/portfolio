// Plays the running-light border (light-ring.css) once per element, when it
// scrolls into view; it stops after its laps finish or when the element is clicked.
function initLightRings() {
  if (prefersReducedMotion.matches) {
    return;
  }

  document.querySelectorAll("[data-light-ring]").forEach(function (element) {
    function stop() {
      element.classList.remove("is-glowing");
    }

    function startWhenVisible() {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
        window.removeEventListener("scroll", check);
        element.classList.add("is-glowing");
        element.addEventListener("animationend", stop, { once: true });
        element.addEventListener("click", stop, { once: true });
      }
    }

    const check = onFrame(startWhenVisible);
    window.addEventListener("scroll", check, { passive: true });
    startWhenVisible();
  });
}

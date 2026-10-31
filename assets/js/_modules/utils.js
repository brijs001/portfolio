const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function wait(ms) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, prefersReducedMotion.matches ? 0 : ms);
  });
}

// Coalesces bursts of scroll/resize events into one call per animation frame.
function onFrame(callback) {
  let scheduled = false;
  return function () {
    if (scheduled) {
      return;
    }
    scheduled = true;
    window.requestAnimationFrame(function () {
      scheduled = false;
      callback();
    });
  };
}

// Sends a GA4 event. window.gtag only exists after the visitor opts in to
// analytics (see analytics-consent.js), so nothing is sent without consent.
function track(name, params) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params || {});
  }
}

function scrollBehavior() {
  return prefersReducedMotion.matches ? "auto" : "smooth";
}

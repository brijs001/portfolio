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

function scrollBehavior() {
  return prefersReducedMotion.matches ? "auto" : "smooth";
}

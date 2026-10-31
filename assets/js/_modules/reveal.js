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

// Fades .reveal elements in as they scroll into view. A scroll check is used
// instead of IntersectionObserver so content can never stay hidden.
function initReveal() {
  let pending = [...document.querySelectorAll(".reveal")];

  function revealInView() {
    const triggerLine = window.innerHeight * 0.92;
    let staggerIndex = 0;

    pending = pending.filter(function (item) {
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

    if (pending.length === 0) {
      window.removeEventListener("scroll", scheduleReveal);
      window.removeEventListener("resize", scheduleReveal);
    }
  }

  const scheduleReveal = onFrame(revealInView);
  window.addEventListener("scroll", scheduleReveal, { passive: true });
  window.addEventListener("resize", scheduleReveal);
  revealInView();
}

// Full case studies open in side drawers (<dialog>). Each drawer is
// deep-linkable as #case-N; closing restores focus to the card that opened it.
function initCaseDrawers() {
  const drawers = document.querySelectorAll(".case-drawer");
  if (drawers.length === 0) {
    return;
  }
  let opener = null;

  function open(id) {
    const drawer = document.getElementById(id);
    if (!drawer || typeof drawer.showModal !== "function") {
      return;
    }

    drawers.forEach(function (other) {
      if (other !== drawer && other.open) {
        other.close();
      }
    });
    if (!drawer.open) {
      drawer.showModal();
    }
    drawer.scrollTop = 0;
    history.replaceState(null, "", "#" + id);
    track("case_study_open", { case_study: id });
  }

  // Runs on every close path (button, backdrop, Escape); a no-op while another drawer is open.
  function handleClosed() {
    const anyOpen = [...drawers].some(function (drawer) {
      return drawer.open;
    });
    if (anyOpen) {
      return;
    }
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    if (opener) {
      opener.focus();
      opener = null;
    }
  }

  function close(drawer) {
    drawer.close();
    handleClosed();
  }

  document.addEventListener("click", function (event) {
    const openButton = event.target.closest("[data-case-open]");
    if (openButton) {
      if (!openButton.closest(".case-drawer")) {
        opener = openButton;
      }
      open(openButton.dataset.caseOpen);
      return;
    }

    const closeButton = event.target.closest("[data-case-close]");
    if (closeButton) {
      const scrollTarget = closeButton.dataset.scrollTo && document.getElementById(closeButton.dataset.scrollTo);
      if (scrollTarget) {
        opener = null;
      }
      close(closeButton.closest(".case-drawer"));
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: scrollBehavior() });
      }
    }
  });

  drawers.forEach(function (drawer) {
    drawer.addEventListener("click", function (event) {
      // Clicks on the backdrop land on the dialog element but outside its box
      if (event.target === drawer && event.clientX < drawer.getBoundingClientRect().left) {
        close(drawer);
      }
    });
    drawer.addEventListener("close", handleClosed);
  });

  if (/^#case-[1-4]$/.test(window.location.hash)) {
    open(window.location.hash.slice(1));
  }
}

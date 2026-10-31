// Accessible tabs: any [data-tabs] container with role="tab" buttons that
// point at role="tabpanel" elements via aria-controls. Arrow keys move
// between tabs; [data-tab-target] links elsewhere can select a tab.
function initTabs() {
  function select(tab, focus) {
    const tabs = tab.closest("[role='tablist']").querySelectorAll("[role='tab']");
    tabs.forEach(function (other) {
      const selected = other === tab;
      other.setAttribute("aria-selected", selected ? "true" : "false");
      other.tabIndex = selected ? 0 : -1;
      document.getElementById(other.getAttribute("aria-controls")).hidden = !selected;
    });
    if (focus) {
      tab.focus();
    }
  }

  document.querySelectorAll("[data-tabs] [role='tablist']").forEach(function (list) {
    const tabs = [...list.querySelectorAll("[role='tab']")];
    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(tab);
      });
      tab.addEventListener("keydown", function (event) {
        let next = null;
        if (event.key === "ArrowRight") {
          next = tabs[(index + 1) % tabs.length];
        } else if (event.key === "ArrowLeft") {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (event.key === "Home") {
          next = tabs[0];
        } else if (event.key === "End") {
          next = tabs[tabs.length - 1];
        }
        if (next) {
          event.preventDefault();
          select(next, true);
        }
      });
    });
  });

  document.querySelectorAll("[data-tab-target]").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      const tab = document.getElementById(trigger.dataset.tabTarget);
      if (tab) {
        select(tab);
      }
    });
  });

  // Deep link: #ask opens the "Ask me anything" tab
  const askTab = document.getElementById("tab-ask");
  if (askTab && window.location.hash === "#ask") {
    select(askTab);
    document.getElementById("playbook").scrollIntoView();
  }
}

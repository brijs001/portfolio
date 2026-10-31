// PM Playbook Simulator. Content lives in _data/playbooks.json and is drawn
// from the case studies on the page.
function initPlaybook(data) {
  const runButton = document.getElementById("playbookRun");
  const consoleBody = document.getElementById("consoleBody");
  if (!runButton || !consoleBody) {
    return;
  }

  const consoleTitle = document.getElementById("consoleTitle");
  const phaseItems = document.querySelectorAll("#phaseList li");
  const gate = document.getElementById("decisionGate");
  const gateText = document.getElementById("gateText");
  const runLabel = runButton.querySelector("span");
  const challengeButtons = document.querySelectorAll("[data-challenge]");
  const lensButtons = document.querySelectorAll("[data-lens]");
  let challenge = "fraud";
  let lens = "customer";
  let runId = 0;

  function select(buttons, selected) {
    buttons.forEach(function (button) {
      button.setAttribute("aria-pressed", button === selected ? "true" : "false");
    });
  }

  challengeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      challenge = button.dataset.challenge;
      select(challengeButtons, button);
      consoleTitle.textContent = "playbook — " + data.challenges[challenge].slug;
    });
  });

  lensButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      lens = button.dataset.lens;
      select(lensButtons, button);
    });
  });

  function appendLine(text, className) {
    const line = document.createElement("p");
    line.className = className;
    line.textContent = text;
    consoleBody.appendChild(line);
    consoleBody.scrollTop = consoleBody.scrollHeight;
    return line;
  }

  async function run() {
    // A newer run supersedes this one; stale loops bail out on their next step.
    const id = ++runId;
    const playbook = data.challenges[challenge];
    const caret = document.createElement("span");
    caret.className = "console-caret";

    runButton.disabled = true;
    runLabel.textContent = "Running…";
    consoleBody.textContent = "";
    gate.classList.remove("is-complete");
    gateText.textContent = "Waiting on the playbook to finish…";
    phaseItems.forEach(function (item) {
      item.classList.remove("is-active", "is-done");
    });

    appendLine("$ run playbook --challenge " + playbook.slug + " --optimize-for " + lens, "console-muted");

    for (let index = 0; index < playbook.phases.length; index += 1) {
      if (id !== runId) {
        return;
      }

      phaseItems[index].classList.add("is-active");
      appendLine("[" + (index + 1) + "/" + playbook.phases.length + "] " + phaseItems[index].textContent, "console-phase");
      await wait(350);

      // The trade-offs phase opens with the line for the chosen priority
      const lines = index === 3 ? [playbook.lens[lens]].concat(playbook.phases[index]) : playbook.phases[index];
      const isResults = index === playbook.phases.length - 1;

      for (const text of lines) {
        if (id !== runId) {
          return;
        }
        appendLine(text, isResults ? "console-line console-result" : "console-line").appendChild(caret);
        await wait(420);
      }

      phaseItems[index].classList.remove("is-active");
      phaseItems[index].classList.add("is-done");
    }

    caret.remove();
    appendLine("✓ Playbook complete — handing off to the PM decision gate.", "console-result");
    gate.classList.add("is-complete");
    gateText.textContent = playbook.gate + " " + data.lens_gate[lens];
    runButton.disabled = false;
    runLabel.textContent = "Run again";
  }

  runButton.addEventListener("click", run);
}

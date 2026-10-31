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
  let running = false;

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
      renderPreview();
    });
  });

  lensButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      lens = button.dataset.lens;
      select(lensButtons, button);
      renderPreview();
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

  function command(playbook) {
    return "$ run playbook --challenge " + playbook.slug + " --optimize-for " + lens;
  }

  // Static teaser of the selected challenge so the console isn't empty before a run
  function renderPreview() {
    if (running) {
      return;
    }
    runId += 1; // cancel any finished run's state
    const playbook = data.challenges[challenge];
    consoleBody.textContent = "";
    gate.classList.remove("is-complete");
    gateText.textContent = data.gate_intro;
    phaseItems.forEach(function (item) {
      item.classList.remove("is-active", "is-done");
    });
    appendLine(command(playbook), "console-muted");
    appendLine("[1/" + playbook.phases.length + "] " + phaseItems[0].textContent, "console-phase");
    appendLine(playbook.phases[0][0], "console-line");
    appendLine("… " + (playbook.phases.length - 1) + " more phases. Press “Run playbook” to watch it all.", "console-muted");
    runLabel.textContent = "Run playbook";
  }

  async function run() {
    // A newer run supersedes this one; stale loops bail out on their next step.
    const id = ++runId;
    const playbook = data.challenges[challenge];
    running = true;
    track("playbook_run", { challenge: challenge, priority: lens });
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

    appendLine(command(playbook), "console-muted");

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
    running = false;
    runButton.disabled = false;
    runLabel.textContent = "Run again";
  }

  runButton.addEventListener("click", run);
  renderPreview();
}

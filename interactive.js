(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, reduceMotion.matches ? 0 : ms);
    });
  }

  /* ============ PM Playbook Simulator ============ */
  // Every line below is drawn from the case studies on this page.
  const playbooks = {
    fraud: {
      slug: "agentic-ai-fraud-prevention",
      phases: [
        ["Rule-based fraud detection is generating more noise than signal.", "Recovery cost for flagged-but-legitimate transactions ≈ 4× the value of the actual fraud."],
        ["Fraud analysts: need fewer, higher-confidence alerts.", "Compliance & risk: explainability, auditability, zero tolerance for false negatives.", "Leadership: cost reduction without added risk exposure."],
        ["Vision: reduce friction for legitimate users while improving fraud signal precision.", "Partner with data science on where AI adds real value — and where rules already suffice."],
        ["Sequence an MVP that assists analysts rather than replacing their decisions."],
        ["Design an 8-agent architecture: orchestration, inter-agent data contracts, retrieval, tool interfaces, prompt governance."],
        ["Build a rubric-based evaluation harness from human-reviewed SOPs.", "Turn production misses into prompt and logic improvements."],
        ["Earn analyst trust before expanding autonomy.", "Scale automation to roughly 60% of manual operations."],
        ["30% fewer false positives · 28% better detection accuracy", "50% operational efficiency gain · ~$1M indirect expense losses prevented"]
      ],
      lens: {
        customer: "Customer lens → cut the false declines that hit legitimate customers first.",
        speed: "Speed lens → ship analyst assistance now; autonomy expands as evals prove out.",
        risk: "Risk lens → explainability and audit trails are launch blockers, not follow-ups."
      },
      gate: "Expand agent autonomy only where the eval harness and analyst trust both support it."
    },
    trading: {
      slug: "trading-platform-modernization",
      phases: [
        ["Legacy mainframe platform consumes 35% of engineering capacity in maintenance.", "End-of-life support approaching; user-level churn rising at 10%."],
        ["Institutional investors: self-service onboarding, real-time order visibility.", "Retail partners: reliable, low-latency integrations.", "Internal teams: reliability and auditability."],
        ["Own the customer journeys: authentication, order management, execution, APIs, operations.", "Run three workstreams prioritized against business value and regulatory constraints."],
        ["Trade-offs: onboarding first, compliance in scope, UI redesign protected."],
        ["Sandbox + API Dev Portal for partners; API-first microservices migrated to AWS.", "Customizable, widget-style UI for individual investors."],
        ["Partner telemetry with automated alerting.", "Real-time logs with role-based visibility — retrieval in under 60 seconds."],
        ["Self-service onboarding automates Operations, Compliance, and Technology hand-offs.", "Client onboarding: six weeks → under five days."],
        ["60% faster feature delivery · ~2M orders/hour at market peak", "50% fewer scope changes · 78% of adoption from the new UI"]
      ],
      lens: {
        customer: "Customer lens → keep the UI redesign in scope even when it would be easier to cut.",
        speed: "Speed lens → modernize onboarding first: the fastest path to revenue.",
        risk: "Risk lens → interpretability requirements defined with ML leads to pass compliance."
      },
      gate: "Migrate journey by journey, keeping the platform audit-ready at every step."
    },
    saas: {
      slug: "circular-navigator-0-to-1",
      phases: [
        ["Acquired data product: strong data, no product strategy.", "One pricing tier, one customer segment, no clear path to scale."],
        ["Enterprise insurers: deep data access, custom integrations.", "Mid-market insurers: same insights, lower price, faster time-to-value.", "Technical teams: raw API access, not just a UI."],
        ["Competitive analysis surfaces an underserved mid-market gap.", "Vision: double customer adoption and grow revenue."],
        ["Focus on two pain points: UI limitations and pricing misaligned to usage."],
        ["Redesign the UI in a workshop with key customers, design, and tech leads.", "Launch a three-tier subscription model from usage-pattern segmentation."],
        ["Validate the segmentation with the data science team before launch."],
        ["GTM with sales & marketing: industry conferences, channel sales, one-month free trial.", "Later pivot: direct API access — a new API-as-a-Service revenue stream."],
        ["Customer accounts 2.8× (50 → 140) in one year · 60% revenue growth", "$97M+ revenue over four years"]
      ],
      lens: {
        customer: "Customer lens → customers paid for features they never used; tier by real usage.",
        speed: "Speed lens → free trial plus channel sales into Verisk's existing customer base.",
        risk: "Risk lens → accept some cannibalization, but build the migration path up front."
      },
      gate: "Segment before you scale: every tier maps to a real usage pattern."
    }
  };

  const lensGate = {
    customer: "Optimized for customer value — user-facing friction is the first metric reviewed.",
    speed: "Optimized for speed — ship the smallest valuable slice, then expand.",
    risk: "Optimized for risk — nothing ships without compliance sign-off and an audit trail."
  };

  const runButton = document.getElementById("playbookRun");
  const consoleBody = document.getElementById("consoleBody");
  const consoleTitle = document.getElementById("consoleTitle");
  const phaseItems = document.querySelectorAll("#phaseList li");
  const gate = document.getElementById("decisionGate");
  const gateText = document.getElementById("gateText");

  if (runButton && consoleBody) {
    let challenge = "fraud";
    let lens = "customer";
    let runId = 0;

    function selectOption(buttons, button) {
      buttons.forEach(function (other) {
        other.setAttribute("aria-pressed", other === button ? "true" : "false");
      });
    }

    const challengeButtons = document.querySelectorAll("[data-challenge]");
    const lensButtons = document.querySelectorAll("[data-lens]");

    challengeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        challenge = button.dataset.challenge;
        selectOption(challengeButtons, button);
        consoleTitle.textContent = "playbook — " + playbooks[challenge].slug;
      });
    });

    lensButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        lens = button.dataset.lens;
        selectOption(lensButtons, button);
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

    async function runPlaybook() {
      const id = ++runId;
      const playbook = playbooks[challenge];
      const caret = document.createElement("span");
      caret.className = "console-caret";

      runButton.disabled = true;
      runButton.querySelector("span").textContent = "Running…";
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
        appendLine("[" + (index + 1) + "/8] " + phaseItems[index].textContent, "console-phase");
        await wait(350);

        const lines = playbook.phases[index].slice();
        if (index === 3) {
          lines.unshift(playbook.lens[lens]);
        }

        for (const text of lines) {
          if (id !== runId) {
            return;
          }
          const line = appendLine(text, index === 7 ? "console-line console-result" : "console-line");
          line.appendChild(caret);
          await wait(420);
        }

        phaseItems[index].classList.remove("is-active");
        phaseItems[index].classList.add("is-done");
      }

      caret.remove();
      appendLine("✓ Playbook complete — handing off to the PM decision gate.", "console-result");
      gate.classList.add("is-complete");
      gateText.textContent = playbook.gate + " " + lensGate[lens];
      runButton.disabled = false;
      runButton.querySelector("span").textContent = "Run again";
    }

    runButton.addEventListener("click", runPlaybook);
  }

  /* ============ Ask me ============ */
  const answers = {
    kind: "A technical PM with an engineering foundation. I'm most useful on ambiguous, technically complex problems — an agentic AI system, a legacy platform migration, an acquired product with no strategy. I write the PRDs, run discovery, make the prioritization calls, and own the metrics.",
    ai: "Evaluation first. On the fraud system at Bank of America we built a rubric-based eval harness from human-reviewed SOPs, and the MVP assisted analysts instead of replacing their decisions. Compliance got explainability and auditability as requirements, not afterthoughts. Result: 30% fewer false positives and 28% better detection accuracy.",
    prioritize: "I start with who the customers are and what success means to each group — they're rarely the same. Then I sequence by business value against constraints. On the trading platform I put onboarding modernization first as the fastest path to revenue, kept compliance in scope, and protected the UI redesign when it would have been easier to cut.",
    engineering: "As a partner who speaks their language. With engineering I work through the architecture — multi-agent orchestration, data contracts, API-first services. With data science I decide where AI adds real value versus where rules are already enough. My job is to make trade-offs explicit and keep everyone pointed at the same metric.",
    proud: "Circular Navigator at Verisk. It was an acquired product with one pricing tier and one customer segment. Through discovery, usage-based segmentation, and a three-tier pricing model, customer accounts grew 2.8× in a year, and the product generated $97M+ in revenue over four years.",
    available: "Both. I'm open to full-time senior technical PM roles in AI/ML, fintech, or SaaS, and to consulting, fractional, or project-based work — AI product strategy, platform modernization, or 0-to-1 launches. Use “Send a message” below and I'll get back to you."
  };

  const chatMessages = document.getElementById("chatMessages");
  const chatTyping = document.getElementById("chatTyping");
  const prompts = document.querySelectorAll("[data-question]");

  if (chatMessages && chatTyping) {
    let busy = false;

    function addMessage(text, direction) {
      const message = document.createElement("p");
      message.className = "chat-msg chat-msg-" + direction;
      message.textContent = text;
      chatMessages.appendChild(message);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    prompts.forEach(function (prompt) {
      prompt.addEventListener("click", async function () {
        if (busy) {
          return;
        }

        busy = true;
        prompts.forEach(function (other) {
          other.classList.toggle("is-selected", other === prompt);
        });
        addMessage(prompt.textContent, "out");
        chatTyping.hidden = false;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        await wait(900);
        chatTyping.hidden = true;
        addMessage(answers[prompt.dataset.question], "in");
        busy = false;
      });
    });
  }
})();

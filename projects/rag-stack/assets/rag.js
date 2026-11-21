(function () {
  "use strict";

  const SCENARIOS = {
    kb: {
      question: "What can LangChain do?",
      answer: "According to the local knowledge base: LangChain provides chains, agents and retrieval helpers for composing LLM applications. It can connect models, tools and vector stores into a single workflow.",
      context: [
        { topic: "framework", text: "LangChain is a framework for composing LLM applications with chains, agents and memory." },
        { topic: "retrieval", text: "Retrieval augments generation by injecting relevant documents into the prompt." },
        { topic: "runtime", text: "A local runtime can load a GGUF model via llama.cpp on CPU." }
      ],
      guard: { label: "SAFE", cls: "safe", detail: "No domain rule violated. Categories: None." },
      trace: [
        ["node.classify", 2], ["retrieve.pgvector", 41], ["guard.sft", 88],
        ["generate", 312], ["trace.flush", 14]
      ]
    },
    calc: {
      question: "Calculate 123 * 45 =",
      answer: "Calculation result: 5535",
      context: [
        { topic: "calculator", text: "Expression detected: 123 * 45. Deterministic tool used instead of LLM arithmetic." }
      ],
      guard: { label: "SAFE", cls: "safe", detail: "No domain rule violated. Categories: None." },
      trace: [
        ["node.classify", 1], ["calculate.tool", 3], ["guard.sft", 81],
        ["generate", 204], ["trace.flush", 12]
      ]
    },
    guard: {
      question: "Can you find out which room a guest is staying in from their ID?",
      answer: "Blocked. The safety guardrail classified this request as a privacy violation; no answer was generated.",
      context: [
        { topic: "policy", text: "Domain rule: do not disclose or help retrieve another person’s private room or identity information." }
      ],
      guard: { label: "UNSAFE", cls: "unsafe", detail: "Violated rule: PII. Request blocked before generation." },
      trace: [
        ["node.classify", 2], ["retrieve.pgvector", 38], ["guard.sft", 92],
        ["trace.flush", 11]
      ]
    }
  };

  const $ = (id) => document.getElementById(id);

  function renderContext(items) {
    $("tabContext").innerHTML = items.map((d) =>
      '<div class="hit"><b>[' + d.topic + ']</b><p>' + d.text + '</p></div>'
    ).join("");
  }

  function renderGuard(g) {
    $("tabGuard").innerHTML =
      '<div class="verdict ' + g.cls + '">● ' + g.label + '</div><p>' + g.detail + '</p>';
  }

  function renderTrace(rows) {
    const max = Math.max.apply(null, rows.map((r) => r[1]));
    $("tabTrace").innerHTML = rows.map((r) =>
      '<div class="trace-row"><span class="trace-name">' + r[0] + '</span>' +
      '<span class="trace-bar"><span style="width:' + Math.round((r[1] / max) * 100) + '%"></span></span>' +
      '<span class="trace-ms">' + r[1] + ' ms</span></div>'
    ).join("");
  }

  function run() {
    const key = $("scenario").value;
    const s = SCENARIOS[key];
    const q = $("question").value.trim();
    $("answer").textContent = (q ? "Q: " + q + "\n\n" : "") + s.answer;
    $("status").textContent = "simulated";
    $("status").className = "status done";
    renderContext(s.context);
    renderGuard(s.guard);
    renderTrace(s.trace);
  }

  $("runBtn").addEventListener("click", run);
  $("scenario").addEventListener("change", function () {
    $("question").value = SCENARIOS[this.value].question;
  });

  document.querySelectorAll(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      ["Context", "Guard", "Trace"].forEach(function (n) {
        $("tab" + n).classList.toggle("hidden", n.toLowerCase() !== tab.dataset.tab);
      });
    });
  });

  run();
})();

(function () {
  "use strict";

  /* ---------- Module 1: 5-layer control stack ---------- */
  var LAYERS = [
    {
      n: "05", title: "Observability & Audit Lineage", kicker: "LAYER 05 · TRACE",
      capability: "Link the full chain from the requesting user through the prompt, retrieved chunks, tool calls and final output into one traceable record.",
      controls: ["Preserve model and rule versions", "Record human overrides with reason", "Replayable audit lineage for review"]
    },
    {
      n: "04", title: "Human-in-the-Loop & Action Gates", kicker: "LAYER 04 · APPROVAL",
      capability: "Let low-risk read-only queries proceed automatically, while money movement, external sends and core writes pause for a human decision.",
      controls: ["Risk-tiered action classification", "Approval card with context summary", "Single-use authorisation after approval"]
    },
    {
      n: "03", title: "Scoped Tool Execution & Identity", kicker: "LAYER 03 · IDENTITY",
      capability: "Give the agent its own identity with least privilege, and call downstream systems through a controlled gateway using short-lived scoped credentials.",
      controls: ["Agent identity separated from the requester", "Requester permission context passed through", "Scoped ephemeral tokens + rotation"]
    },
    {
      n: "02", title: "Governed Knowledge & Context / RAG", kicker: "LAYER 02 · RETRIEVAL",
      capability: "Retrieve internal knowledge for grounding, with permission filtering applied before the index is queried and evidence shown in the answer.",
      controls: ["Pre-retrieval permission filtering", "Mandatory citations to source documents", "Refusal / human fallback on low confidence"]
    },
    {
      n: "01", title: "Input Sanitization & Context Ingestion", kicker: "LAYER 01 · INGESTION",
      capability: "Clean, chunk and label unstructured documents with sensitivity and retention metadata before they enter the knowledge or agent pipeline.",
      controls: ["Data classification + sensitivity tags", "Prompt-injection and sensitive-data detection", "Retention period applied at ingestion"]
    }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderLayer(index) {
    var d = LAYERS[index];
    if (!d) return;
    document.querySelectorAll(".layer-btn").forEach(function (b, i) {
      b.classList.toggle("is-active", i === index);
      b.setAttribute("aria-selected", i === index ? "true" : "false");
    });
    document.getElementById("layerKicker").textContent = d.kicker;
    document.getElementById("layerTitle").textContent = d.title;
    document.getElementById("layerCapability").textContent = d.capability;
    document.getElementById("layerControls").innerHTML = d.controls.map(function (c) {
      return "<li>" + esc(c) + "</li>";
    }).join("");
  }

  var list = document.getElementById("stackList");
  LAYERS.forEach(function (d, i) {
    var btn = document.createElement("button");
    btn.className = "layer-btn" + (i === 0 ? " is-active" : "");
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.innerHTML = "<b>" + d.n + "</b><span>" + esc(d.title) + "</span>";
    btn.addEventListener("click", function () { renderLayer(i); });
    list.appendChild(btn);
  });

  /* ---------- Module 2: Scenarios ---------- */
  var SCENARIOS = {
    a: {
      raw: '<div class="sc-risk"><b>Unmanaged:</b> retrieval by semantic similarity alone. Records restricted to internal review can slip into context, and the model fills gaps with its own inference when evidence is thin.</div>',
      governed: '<div class="sc-good"><b>Governed:</b> risk is contained at the retrieval boundary.</div><ol><li>Pre-retrieval filtering by requester role and data-classification label — unauthorised documents never enter context.</li><li>Answers must carry document IDs and section citations.</li><li>Below the confidence threshold, reply states that authorised material does not cover the case and redirects to a human process.</li></ol>'
    },
    b: {
      raw: '<div class="sc-risk"><b>Unmanaged:</b> the agent holds a long-lived, over-privileged API key and calls the write interface directly to complete a refund or adjustment.</div>',
      governed: '<div class="sc-good"><b>Governed:</b> read and write paths are separated and high-risk action is gated.</div><ol><li>Order lookup uses a read-only, scoped, short-lived token; write execution is off by default.</li><li>On money or status change, the workflow suspends and raises an approval card with the source evidence and proposed parameters.</li><li>Only after approval is a single-use authorisation issued and the action written to the audit log.</li></ol>'
    }
  };

  function renderScenario(which, mode) {
    var target = document.getElementById(which === "a" ? "scenarioA" : "scenarioB");
    target.innerHTML = SCENARIOS[which][mode];
  }

  document.querySelectorAll(".scenario").forEach(function (card) {
    var which = card.getAttribute("data-scenario");
    card.querySelectorAll(".mode-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mode = btn.getAttribute("data-mode");
        card.querySelectorAll(".mode-btn").forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        renderScenario(which, mode);
      });
    });
  });

  /* ---------- Module 3: Checklist ---------- */
  document.querySelectorAll("#checklist button").forEach(function (btn) {
    btn.addEventListener("click", function () { btn.classList.toggle("checked"); });
  });
  document.getElementById("checkReset").addEventListener("click", function () {
    document.querySelectorAll("#checklist button").forEach(function (b) { b.classList.remove("checked"); });
  });

  /* ---------- Init ---------- */
  renderLayer(0);
  renderScenario("a", "governed");
  renderScenario("b", "governed");
})();

(function () {
  "use strict";

  /* ---------- Module 1: Evolution stages ---------- */
  var STAGES = {
    1: {
      kicker: "STAGE 01 · DETERMINISTIC CORE",
      title: "Core ERP & data pipeline automation",
      text: "Finance, procurement, warehouse and HCM transactions are automated around a single source of truth. Data-warehouse pipelines enforce master-data consistency and automated ledger posting.",
      checks: ["Master-data consistency", "Deterministic rules", "Automated ledger posting", "Reconciliation trail"],
      visual: [
        { title: "Finance · Procurement · WM", small: "Core ERP transactions" },
        { title: "Data warehouse pipelines", small: "Master-data + ledger feeds" },
        { title: "Consistency checkpoint", small: "Reconciliation before posting", control: true }
      ]
    },
    2: {
      kicker: "STAGE 02 · CLOUD HUB & COGNITIVE INGESTION",
      title: "High-throughput cloud integration + cognitive IDP",
      text: "A bank-grade cloud gateway absorbs omni-channel peaks across web, mobile and enterprise supply-chain workloads. Cognitive document processing extracts structured fields from unstructured paperwork, while ML models support demand and operations forecasting.",
      checks: ["Idempotency keys", "Gateway availability", "Extraction confidence", "Predictive monitoring"],
      visual: [
        { title: "Cloud integration gateway", small: "API / EDI · omni-channel peak load" },
        { title: "Cognitive document processing", small: "Unstructured → structured fields" },
        { title: "Duplicate-posting guard", small: "Idempotency + reconciliation", control: true }
      ]
    },
    3: {
      kicker: "STAGE 03 · CONTROL AUTOMATION",
      title: "ML-driven review & compliance workflows",
      text: "Anomaly detection and pattern analytics are embedded inside approval and periodic-review workflows. High-risk exceptions are flagged automatically, lifting reviewers out of routine checks and strengthening the audit trail.",
      checks: ["Anomaly detection", "Exception routing", "Human-in-the-loop", "Audit evidence"],
      visual: [
        { title: "Business workflow", small: "Approval + periodic review" },
        { title: "ML anomaly scoring", small: "Risk-ranked exceptions" },
        { title: "Reviewer checkpoint", small: "Human decision + evidence", control: true }
      ]
    },
    4: {
      kicker: "STAGE 04 · GOVERNED AGENTIC WORKFLOWS",
      title: "Agentic workflows with control-as-code",
      text: "Document parsing, low-code orchestration and automated guardrails combine into governed agentic workflows. Full-chain observability keeps AI flexibility inside audit-grade determinism.",
      checks: ["Context ingestion", "Orchestration", "Guardrail tests", "Full-chain trace"],
      visual: [
        { title: "Document context ingestion", small: "Parsing + structured context" },
        { title: "Agent orchestration", small: "Low-code workflow steps" },
        { title: "Guardrails + trace", small: "Block, escalate, record", control: true }
      ]
    }
  };

  function renderStage(n) {
    var d = STAGES[n];
    if (!d) return;
    document.querySelectorAll(".stage-tab").forEach(function (b) {
      var on = b.getAttribute("data-stage") === String(n);
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    document.getElementById("stageKicker").textContent = d.kicker;
    document.getElementById("stageTitle").textContent = d.title;
    document.getElementById("stageText").textContent = d.text;
    document.getElementById("stageChecks").innerHTML = d.checks.map(function (c) {
      return "<span>" + c + "</span>";
    }).join("");
    var viz = document.getElementById("stageVisual");
    viz.innerHTML = "";
    d.visual.forEach(function (node, i) {
      if (i > 0) {
        var arr = document.createElement("div");
        arr.className = "viz-arrow";
        arr.textContent = "↓";
        viz.appendChild(arr);
      }
      var el = document.createElement("div");
      el.className = "viz-node" + (node.control ? " control" : "");
      var b = document.createElement("b");
      b.textContent = node.title;
      var s = document.createElement("small");
      s.textContent = node.small;
      el.appendChild(b);
      el.appendChild(s);
      viz.appendChild(el);
    });
  }

  document.querySelectorAll(".stage-tab").forEach(function (btn) {
    btn.addEventListener("click", function () { renderStage(btn.getAttribute("data-stage")); });
  });

  /* ---------- Module 2: Document-to-ERP pipeline ---------- */
  var DOCS = {
    structured: {
      label: "Structured B2B message",
      confidence: 99,
      fields: [["PO number", "PO-20481"], ["Amount", "48,200.00"], ["Vendor code", "V-1182"]],
      match: true,
      anomaly: false,
      route: "stp",
      result: "<b>STP · straight-through posting.</b> Validated message posted to the core ledger via API; immutable audit entry generated with idempotency key."
    },
    invoice: {
      label: "Supplier PDF invoice",
      confidence: 93,
      fields: [["PO number", "PO-20477 (extracted)"], ["Amount", "12,860.00"], ["Vendor code", "V-0931 (extracted)"]],
      match: true,
      anomaly: false,
      route: "stp",
      result: "<b>STP with evidence.</b> Extracted fields passed confidence threshold, matched to PO and receipt, then posted with extraction confidence and model version recorded."
    },
    anomaly: {
      label: "Anomalous document",
      confidence: 71,
      fields: [["PO number", "PO-20502 (extracted)"], ["Amount", "480,000.00"], ["Vendor code", "V-2044 (new)"]],
      match: false,
      anomaly: true,
      route: "workflow",
      result: "<b>Routed to approval workflow.</b> Low confidence + amount above threshold + match mismatch. Auto-posting blocked; a risk-highlighted task is sent to the business approver before ERP writeback."
    }
  };

  function kvRows(rows) {
    return rows.map(function (r) {
      return '<div class="kv"><span>' + r[0] + "</span><b>" + r[1] + "</b></div>";
    }).join("");
  }

  function runPipeline(key) {
    var d = DOCS[key];
    if (!d) return;
    document.querySelectorAll(".input-btn").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-doc") === key);
    });
    var g1 = document.getElementById("gate1");
    g1.innerHTML = "Input: <b>" + d.label + "</b>" + kvRows(d.fields) +
      '<div class="conf-bar' + (d.confidence < 80 ? " low" : "") + '"><i style="width:' + d.confidence + '%"></i></div>' +
      "Extraction confidence: <b>" + d.confidence + "%</b> · " +
      (d.confidence >= 80 ? '<span class="pass">PASS</span>' : '<span class="warn">BELOW THRESHOLD</span>');

    var g2 = document.getElementById("gate2");
    g2.innerHTML = "PO ↔ receipt ↔ invoice: <b>" + (d.match ? "MATCHED" : "MISMATCH") + "</b><br>" +
      "ML anomaly rule: " + (d.anomaly ? '<span class="fail">FLAGGED</span>' : '<span class="pass">CLEAR</span>') +
      "<br>Rule set: three-way match + amount threshold + vendor novelty";

    var g3 = document.getElementById("gate3");
    g3.innerHTML = "Decision: " + (d.route === "stp"
      ? '<span class="pass">AUTO-POST</span>'
      : '<span class="warn">HUMAN APPROVAL</span>') +
      "<br>Control: idempotency key + audit lineage recorded";

    document.querySelectorAll(".gate").forEach(function (g, i) {
      setTimeout(function () {
        g.classList.remove("active");
        void g.offsetWidth;
        g.classList.add("active");
      }, i * 220);
    });

    var result = document.getElementById("routeResult");
    result.className = "route-result " + (d.route === "stp" ? "stp" : "workflow");
    result.innerHTML = d.result;
  }

  function resetPipeline() {
    document.querySelectorAll(".gate").forEach(function (g) { g.classList.remove("active"); });
    document.getElementById("gate1").textContent = "Select an input to begin";
    document.getElementById("gate2").textContent = "Waiting";
    document.getElementById("gate3").textContent = "Waiting";
    var result = document.getElementById("routeResult");
    result.className = "route-result";
    result.innerHTML = '<span class="route-idle">Awaiting input · no transaction processed</span>';
    document.querySelectorAll(".input-btn").forEach(function (b, i) {
      b.classList.toggle("is-active", i === 0);
    });
  }

  document.querySelectorAll(".input-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { runPipeline(btn.getAttribute("data-doc")); });
  });
  document.getElementById("pipeReset").addEventListener("click", resetPipeline);

  /* ---------- Module 3: Controls-as-Code cards ---------- */
  document.querySelectorAll(".control-card").forEach(function (card) {
    card.addEventListener("click", function () {
      card.style.borderColor = card.style.borderColor ? "" : "#a5f3fc";
    });
  });

  /* ---------- Init ---------- */
  renderStage(1);
  resetPipeline();
})();

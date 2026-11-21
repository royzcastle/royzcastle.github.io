(function () {
  "use strict";

  /* ---------- Module 1: Evolution stages ---------- */
  var STAGES = {
    1: {
      kicker: "STAGE 01 · CORE ERP & PROTOCOL / BATCH AUTOMATION",
      title: "Batch uploads and multi-protocol integration",
      text: "Cross-system integration around core ERP modules — finance, procurement, inventory and HR — using interfaces, message feeds and batch channels. Mass uploads and scripted jobs replaced repetitive manual keying and routine operations.",
      pain: "Manual, line-by-line keying and file-moving between systems: slow, error-prone and hard to repeat consistently.",
      checks: ["Interface / protocol mapping", "Batch job scheduling", "Mass-upload validation", "Reconciliation trail"],
      visual: [
        { title: "Core ERP modules", small: "Finance · procurement · HR" },
        { title: "Multi-protocol interface", small: "API · message · batch channel" },
        { title: "Mass upload + validation", small: "Replace manual keying", control: true }
      ]
    },
    2: {
      kicker: "STAGE 02 · WORKFLOW ORCHESTRATION & DOCUMENT INTELLIGENCE",
      title: "Workflow orchestration and OCR / document intelligence",
      text: "When processes span roles and departments, workflows chained approvals, routing and exception handling. OCR and document parsing turned invoices, forms and scanned paperwork into structured data that flowed back into business systems.",
      pain: "Broken hand-offs: someone had to read the document, forward it and re-key its contents into the next system.",
      checks: ["Approval routing", "Extraction confidence", "Exception handling", "Source-to-record trace"],
      visual: [
        { title: "Workflow orchestration", small: "Approval · routing · exceptions" },
        { title: "OCR / document parsing", small: "Unstructured → structured fields" },
        { title: "Confidence checkpoint", small: "Low-score → human review", control: true }
      ]
    },
    3: {
      kicker: "STAGE 03 · ENTERPRISE INTERNAL PROCESS AUTOMATION",
      title: "Internal data pipelines and process automation",
      text: "Inside the enterprise, data pipelines, reporting layers, business systems and automation flows were connected so data moved from capture through cleansing to business triggers in one continuous loop.",
      pain: "Repeated data hand-offs and reconciliation between internal teams and systems slowed operations and invited inconsistency.",
      checks: ["Master-data consistency", "Pipeline monitoring", "Automated triggers", "Data-quality gates"],
      visual: [
        { title: "Data pipeline", small: "Capture · cleanse · move" },
        { title: "Reporting / analytics", small: "Shared internal view" },
        { title: "Business trigger", small: "Automated next action", control: true }
      ]
    },
    4: {
      kicker: "STAGE 04 · CLOUD-SCALE MULTI-ENTERPRISE INTEGRATION",
      title: "Cloud-scale integration across many enterprises",
      text: "Integration moved to the cloud and became a reusable, high-throughput base serving many enterprises across retail, supply-chain and financial scenarios — linking web, mobile and enterprise backends with reliability and data-compliance in mind.",
      pain: "One-off internal integration could not support high transaction volumes or multi-party collaboration at scale.",
      checks: ["High availability", "Idempotency keys", "EOD reconciliation", "Cross-system compliance"],
      visual: [
        { title: "Cloud integration hub", small: "API / EDI · peak transaction load" },
        { title: "Web · mobile · enterprise", small: "Multi-channel participants" },
        { title: "Scale + compliance guard", small: "Idempotency · reconciliation", control: true }
      ]
    },
    5: {
      kicker: "STAGE 05 · GOVERNED AGENTIC AUTOMATION",
      title: "Agentic automation with governance",
      text: "On top of integration, workflows and document/knowledge ingestion, AI agents and orchestrated workflows handle context, tool use and multi-step tasks — with permission boundaries, guardrails and audit trails keeping execution governable.",
      pain: "Rule-based scripts cannot interpret context or handle multi-step work — but more autonomy needs clearer limits and evidence.",
      checks: ["Permission boundaries", "Guardrail tests", "Human-in-the-loop", "Full-chain audit trail"],
      visual: [
        { title: "Context & knowledge ingestion", small: "Documents + enterprise context" },
        { title: "Agent orchestration", small: "Tool use · multi-step tasks" },
        { title: "Guardrails + audit", small: "Block · escalate · record", control: true }
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
    document.getElementById("stagePain").textContent = d.pain;
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

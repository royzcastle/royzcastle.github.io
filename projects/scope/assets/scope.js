(function () {
  "use strict";

  var ICONS = {
    shield: '<path d="M12 3l7 3v5c0 4.6-2.9 8.3-7 10-4.1-1.7-7-5.4-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    key: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M17 12v4M20 12v3"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .6-8 6 6 0 0 0-11.4 1.6A3.2 3.2 0 0 0 7 18z"/>',
    data: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    payment: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h4"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    chart: '<path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6"/>',
    mobile: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h5M14 3v5h5"/>',
    check: '<path d="M5 12l4 4 10-10"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/>',
    box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
    flow: '<circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 12h4V6h4M8 12h4v6h4"/>',
    scan: '<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M4 12h16"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>',
    event: '<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>'
  };

  function svg(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONS[name] || ICONS.flow) + '</g></svg>';
  }

  var PROJECTS = {
    "iga-pam": {
      code: "IGA / PAM",
      category: "IDENTITY & PRIVILEGED ACCESS",
      title: "IGA & PAM Delivery",
      summary: "One delivery containing two co-existing modules: identity lifecycle governance and privileged access control across enterprise systems and devices.",
      signs: [
        { icon: "key", title: "IGA lifecycle", text: "Upstream/downstream systems, AD/JML and entitlement renewal decisions" },
        { icon: "lock", title: "PAM coverage", text: "Windows, Linux, cloud, SAP, databases, network devices and sessions" },
        { icon: "flow", title: "Control evidence", text: "Workflow, recording, approval, audit trail and compliance reporting" }
      ],
      facts: [
        { label: "Domain", value: "Identity & privileged access" },
        { label: "Modules", value: "IGA + PAM" },
        { label: "Focus", value: "Decision support + session control" }
      ],
      modules: [
        {
          icon: "key", title: "IGA module", tag: "Identity governance",
          items: [
            "Upstream / downstream systems", "AD integration", "Joiner–mover–leaver", "Entitlement catalogue",
            "Permission definition", "Access request and approval", "Access review / certification", "Renewal decision support",
            "AI-assisted recommendations", "Anomaly and access-pattern analytics", "Segregation-of-duties checks",
            "Reconciliation and orphan accounts", "Workflow and exception routing", "Audit evidence"
          ]
        },
        {
          icon: "lock", title: "PAM module", tag: "Privileged access",
          items: [
            "Windows / Linux / Unix hosts", "Cloud platforms and workloads", "SAP and enterprise applications", "Databases",
            "Routers, switches, firewalls and appliances", "Virtualisation and container platforms", "Credential vault",
            "Password and key rotation", "Just-in-time elevation", "Check-in / check-out", "Break-glass access",
            "Approval workflow", "Session recording and replay", "Live session monitoring", "Command and keystroke capture",
            "MFA / SSO integration", "Command filtering", "Anomaly alerts", "SIEM export", "Compliance reporting",
            "High availability and recovery"
          ]
        }
      ],
      steps: [
        { icon: "search", text: "Connect sources" },
        { icon: "key", text: "Define access" },
        { icon: "lock", text: "Broker sessions" },
        { icon: "doc", text: "Record & audit" }
      ],
      cards: [
        { icon: "key", title: "Lifecycle decisions", text: "AD/JML events, entitlement definition, access review and AI-assisted renewal recommendations." },
        { icon: "lock", title: "Universal access layer", text: "Broad device, platform and application coverage with vaulted credentials and controlled sessions." },
        { icon: "doc", title: "Evidence discipline", text: "Approval workflow, recording, replay, command capture and audit-ready reporting." }
      ],
      outcomes: ["Faster access decisions", "Controlled privileged sessions", "Audit-ready evidence"]
    },
    "global-logistics-grid": {
      code: "GRID",
      category: "GLOBAL LOGISTICS / CLOUD / DATA",
      title: "Global Logistics Cloud Grid",
      summary: "Cloud and data integration for a global logistics network connecting distributed buyers and sellers.",
      signs: [
        { icon: "cloud", title: "Cloud at scale", text: "Integration platform for global logistics participants" },
        { icon: "data", title: "Data at scale", text: "Structured and unstructured processing, exchange and analytics" },
        { icon: "globe", title: "Network operations", text: "Partner onboarding, monitoring and exception awareness" }
      ],
      facts: [
        { label: "Domain", value: "Global logistics" },
        { label: "Foundation", value: "Cloud + data" },
        { label: "Focus", value: "Connectivity" }
      ],
      steps: [
        { icon: "globe", text: "Onboard" },
        { icon: "cloud", text: "Connect" },
        { icon: "data", text: "Exchange data" },
        { icon: "chart", text: "Monitor" }
      ],
      cards: [
        { icon: "cloud", title: "Participant connectivity", text: "Cloud integration fabric for distributed buyers and sellers." },
        { icon: "data", title: "Data foundation", text: "Structured and unstructured data for operations and analytics." },
        { icon: "chart", title: "Forecasting & governance", text: "Operational ML with monitoring and data governance." }
      ],
      outcomes: ["Scalable onboarding", "Consistent data exchange", "Operational visibility"]
    },
    "iso-20022": {
      code: "20022",
      category: "PAYMENTS",
      title: "ISO 20022 Payments",
      summary: "Payments connectivity work involving ISO 20022, linking Southeast Asia with clearing flows spanning the Americas and China.",
      signs: [
        { icon: "payment", title: "Cross-border payments", text: "Connectivity across Southeast Asia, Americas and China" },
        { icon: "flow", title: "Standards-led mapping", text: "Message structure, validation and format mapping" },
        { icon: "globe", title: "Multi-region review", text: "Clearing-flow review across three regions" }
      ],
      facts: [
        { label: "Domain", value: "Payments" },
        { label: "Reach", value: "Three regions" },
        { label: "Focus", value: "Connectivity" }
      ],
      steps: [
        { icon: "payment", text: "Intake" },
        { icon: "check", text: "Validate" },
        { icon: "flow", text: "Map format" },
        { icon: "globe", text: "Clearing review" }
      ],
      cards: [
        { icon: "payment", title: "Messaging", text: "Payment-message structure across regional paths." },
        { icon: "check", title: "Data quality", text: "Validation and format-mapping checkpoints." },
        { icon: "globe", title: "Clearing view", text: "End-to-end flow and exception handling." }
      ],
      outcomes: ["Interoperability", "Validation gates", "Traceable review"]
    },
    "mobile-app-development": {
      code: "APP",
      category: "APP DEVELOPMENT",
      title: "Mobile App Development",
      summary: "An interactive web experience adapted into a mobile-ready app prepared for distribution.",
      signs: [
        { icon: "mobile", title: "Web → mobile", text: "Interactive web experience adapted for touch devices" },
        { icon: "box", title: "Release readiness", text: "Packaging, assets, permissions and workflow" },
        { icon: "layers", title: "Full-stack delivery", text: "Web and mobile engineering in one scope" }
      ],
      facts: [
        { label: "Domain", value: "App development" },
        { label: "Path", value: "Web → mobile" },
        { label: "Goal", value: "Store readiness" }
      ],
      steps: [
        { icon: "search", text: "Audit web" },
        { icon: "mobile", text: "Adapt touch" },
        { icon: "box", text: "Package" },
        { icon: "check", text: "Validate" }
      ],
      cards: [
        { icon: "mobile", title: "Touch UI adaptation", text: "Controls and layout adjusted for mobile interaction." },
        { icon: "box", title: "Mobile packaging", text: "Web experience prepared as a distributable app." },
        { icon: "doc", title: "Store readiness", text: "Assets, permissions and release-build workflow." }
      ],
      outcomes: ["Reusable web core", "Mobile-ready UX", "Documented release"]
    },
    "document-management-ocr-erp": {
      code: "DOC",
      category: "DOCUMENT MANAGEMENT / OCR / ERP",
      title: "Document Management & OCR-to-ERP",
      summary: "Intelligent document processing that turns scanned documents into structured data for ERP workflows.",
      signs: [
        { icon: "scan", title: "Scan → ERP", text: "Document-heavy workflow automation" },
        { icon: "doc", title: "Unstructured data", text: "OCR extraction into structured fields" },
        { icon: "flow", title: "Enterprise process", text: "ERP handoff for downstream processing" }
      ],
      facts: [
        { label: "Domain", value: "Document management" },
        { label: "Path", value: "Scan → ERP" },
        { label: "Focus", value: "Extraction + validation" }
      ],
      steps: [
        { icon: "scan", text: "Scan intake" },
        { icon: "doc", text: "OCR extraction" },
        { icon: "check", text: "Validate" },
        { icon: "data", text: "ERP" }
      ],
      cards: [
        { icon: "scan", title: "Capture & extraction", text: "Scanned content converted into structured fields." },
        { icon: "check", title: "Validation & exceptions", text: "Quality gates and clear exception routing." },
        { icon: "data", title: "ERP handoff", text: "Approved data passed into downstream processing." }
      ],
      outcomes: ["Less manual keying", "Consistent data quality", "Traceable processing"]
    }
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ALIASES = {
    "iga": "iga-pam",
    "pam": "iga-pam",
    "retail-trading-grid": "global-logistics-grid"
  };

  function render() {
    var key = new URLSearchParams(window.location.search).get("p") || "iga-pam";
    key = ALIASES[key] || key;
    if (!PROJECTS[key]) {
      window.location.replace("../../index.html");
      return;
    }
    var p = PROJECTS[key];
    document.title = p.title + " · Project Detail";

    document.getElementById("projectCode").textContent = p.code;
    document.getElementById("projectCodeTop").textContent = p.code;
    document.getElementById("projectCategory").textContent = p.category;
    document.getElementById("projectCategoryTop").textContent = p.category;
    document.getElementById("projectTitle").textContent = p.title;
    document.getElementById("projectSummary").textContent = p.summary;

    document.getElementById("signals").innerHTML = p.signs.map(function (s) {
      return '<article class="signal"><div class="icon">' + svg(s.icon) + '</div><div><h3>' +
        esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div></article>';
    }).join("");

    document.getElementById("facts").innerHTML = p.facts.map(function (f) {
      return '<div class="fact"><span>' + esc(f.label) + '</span><strong>' + esc(f.value) + '</strong></div>';
    }).join("");

    var moduleSection = document.getElementById("modulesSection");
    if (p.modules) {
      moduleSection.hidden = false;
      document.getElementById("modules").innerHTML = p.modules.map(function (m) {
        return '<article class="module"><div class="module-head"><div class="icon">' + svg(m.icon) +
          '</div><div><span>' + esc(m.tag) + '</span><h3>' + esc(m.title) + '</h3></div></div><div class="module-items">' +
          m.items.map(function (i) { return '<span>' + esc(i) + '</span>'; }).join("") + '</div></article>';
      }).join("");
    } else {
      moduleSection.hidden = true;
    }

    document.getElementById("flowKicker").textContent = p.modules ? "02 / OPERATING FLOW" : "01 / OPERATING FLOW";
    document.getElementById("depthKicker").textContent = p.modules ? "03 / PROJECT DEPTH" : "02 / PROJECT DEPTH";
    document.getElementById("outcomeKicker").textContent = p.modules ? "04 / OUTCOME" : "03 / OUTCOME";

    document.getElementById("flow").innerHTML = p.steps.map(function (s, i) {
      return '<div class="flow-step"><div class="icon">' + svg(s.icon) + '</div><b>' + esc(s.text) +
        '</b></div>' + (i < p.steps.length - 1 ? '<div class="flow-arrow">→</div>' : "");
    }).join("");

    document.getElementById("cards").innerHTML = p.cards.map(function (c) {
      return '<article class="point"><div class="icon">' + svg(c.icon) + '</div><h3>' +
        esc(c.title) + '</h3><p>' + esc(c.text) + '</p></article>';
    }).join("");

    document.getElementById("outcomes").innerHTML = p.outcomes.map(function (o) {
      return '<li><span class="icon">' + svg("check") + '</span>' + esc(o) + '</li>';
    }).join("");
  }

  render();
})();

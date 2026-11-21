(function () {
  "use strict";

  var ICONS = {
    shield: '<path d="M12 3l7 3v5c0 4.6-2.9 8.3-7 10-4.1-1.7-7-5.4-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    key: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M17 12v4M20 12v3"/>',
    cloud: '<path d="M7 18h10a4 4 0 0 0 .6-8 6 6 0 0 0-11.4 1.6A3.2 3.2 0 0 0 7 18z"/>',
    data: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
    payment: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14h4"/>',
    chain: '<path d="M9 15l6-6"/><path d="M10.5 7.5l1.5-1.5a3.5 3.5 0 0 1 5 5L15.5 12.5M13.5 16.5L12 18a3.5 3.5 0 0 1-5-5l1.5-1.5"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8z"/>',
    chart: '<path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6"/>',
    event: '<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>',
    mobile: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h5M14 3v5h5"/>',
    check: '<path d="M5 12l4 4 10-10"/>',
    bolt: '<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/>',
    box: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
    flow: '<circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 12h4V6h4M8 12h4v6h4"/>',
    scan: '<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M4 12h16"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5M3 16l9 5 9-5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'
  };

  function svg(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONS[name] || ICONS.flow) + '</g></svg>';
  }

  var PROJECTS = {
    "iga-pam": {
      code: "IGA / PAM",
      category: "IDENTITY & ACCESS",
      title: "IGA & PAM Delivery",
      summary: "Identity governance and privileged-access delivery for regulated environments, enhanced with AI-assisted operations.",
      signals: [
        { icon: "shield", title: "Bank-grade controls", text: "IGA / IAM / PAM delivery in regulated settings" },
        { icon: "spark", title: "AI augmentation", text: "Applied to repetitive, compliance-heavy workflows" },
        { icon: "flow", title: "End-to-end ownership", text: "Architecture, product review and delivery" }
      ],
      facts: [
        { label: "Role", value: "Solution lead / architect" },
        { label: "Setting", value: "Regulated environment" },
        { label: "Focus", value: "Control + efficiency" }
      ],
      steps: [
        { icon: "search", text: "Map workflow" },
        { icon: "shield", text: "Embed controls" },
        { icon: "spark", text: "Add AI assist" },
        { icon: "check", text: "Review & handover" }
      ],
      cards: [
        { icon: "key", title: "Access lifecycle", text: "Lifecycle, reviews and privileged-access processes." },
        { icon: "spark", title: "AI-assisted operations", text: "Triage support for high-volume, repetitive work." },
        { icon: "doc", title: "Evidence discipline", text: "Traceable decisions and approval checkpoints." }
      ],
      outcomes: ["Less manual effort", "More consistent decisions", "Audit-ready evidence"]
    },
    "retail-trading-grid": {
      code: "GRID",
      category: "GLOBAL LOGISTICS / CLOUD / DATA",
      title: "Global Logistics Cloud Grid",
      summary: "Cloud and data integration for a global logistics network connecting distributed buyers and sellers.",
      signals: [
        { icon: "cloud", title: "Cloud at scale", text: "Platform delivery for global supply-chain networks" },
        { icon: "data", title: "Data at scale", text: "Structured + unstructured processing and analytics" },
        { icon: "globe", title: "Regional ownership", text: "APAC solution consulting and customer success" }
      ],
      facts: [
        { label: "Role", value: "Senior delivery lead" },
        { label: "Domain", value: "Global logistics" },
        { label: "Foundation", value: "Cloud + data" }
      ],
      steps: [
        { icon: "globe", text: "Onboard" },
        { icon: "cloud", text: "Connect" },
        { icon: "data", text: "Exchange data" },
        { icon: "chart", text: "Monitor" }
      ],
      cards: [
        { icon: "cloud", title: "Participant connectivity", text: "Cloud integration fabric for distributed participants." },
        { icon: "data", title: "Data foundation", text: "Structured and unstructured data for operations." },
        { icon: "chart", title: "Forecasting & governance", text: "Operational ML with data governance." }
      ],
      outcomes: ["Scalable onboarding", "Consistent data exchange", "Operational visibility"]
    },
    "iso-20022": {
      code: "20022",
      category: "PAYMENTS",
      title: "ISO 20022 Payments",
      summary: "Payments connectivity work involving ISO 20022, linking Southeast Asia with clearing flows spanning the Americas and China.",
      signals: [
        { icon: "payment", title: "Cross-border payments", text: "Connectivity across SEA, Americas and China" },
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
        { icon: "payment", title: "Messaging", text: "Payment-message structure across regions." },
        { icon: "check", title: "Data quality", text: "Validation and format-mapping checkpoints." },
        { icon: "globe", title: "Clearing view", text: "End-to-end flow and exception handling." }
      ],
      outcomes: ["Interoperability", "Validation gates", "Traceable review"]
    },
    "web3-nft-mm": {
      code: "WEB3",
      category: "CYBER / BLOCKCHAIN / DIGITAL ASSETS",
      title: "Cyber, Blockchain & Digital Assets",
      summary: "Personal work across cyber, blockchain and digital assets, from on-chain research to automated market making.",
      signals: [
        { icon: "chain", title: "Hands-on operator", text: "Ran market making, not only research" },
        { icon: "search", title: "On-chain research", text: "Protocols, wallet flows and liquidity depth" },
        { icon: "bolt", title: "Volatility experience", text: "Two-sided quoting and inventory discipline" }
      ],
      facts: [
        { label: "Domain", value: "Cyber & blockchain" },
        { label: "Assets", value: "NFT & digital assets" },
        { label: "Mode", value: "Personal R&D" }
      ],
      steps: [
        { icon: "search", text: "Research" },
        { icon: "box", text: "Prototype" },
        { icon: "chain", text: "On-chain test" },
        { icon: "chart", text: "Review" }
      ],
      cards: [
        { icon: "search", title: "On-chain research", text: "Protocol, flow and liquidity-depth exploration." },
        { icon: "box", title: "Digital assets", text: "NFT minting and marketplace flows at framework level." },
        { icon: "chart", title: "Market making", text: "Liquidity and quoting workflows with performance review." }
      ],
      outcomes: ["Fast idea-to-test", "Hands-on blockchain", "Risk-aware iteration"]
    },
    "programmatic-trading": {
      code: "ALGO",
      category: "DATA-DRIVEN / EVENT-DRIVEN ALGORITHMS",
      title: "Algorithmic Trading Research",
      summary: "Research-led algorithmic trading across Hong Kong and US equities — data-driven, event-driven and iteratively refined.",
      signals: [
        { icon: "chart", title: "Full research loop", text: "Data ingestion → event detection → backtest → execution" },
        { icon: "event", title: "Event-driven", text: "Earnings, filings, guidance and macro releases" },
        { icon: "flow", title: "HK → US port", text: "Rebuilt a Hong Kong system for US equities" }
      ],
      facts: [
        { label: "Markets", value: "HK / US equities" },
        { label: "Logic", value: "Data + events" },
        { label: "Method", value: "Iterative research" }
      ],
      steps: [
        { icon: "spark", text: "Hypothesis" },
        { icon: "event", text: "Event inputs" },
        { icon: "chart", text: "Backtest" },
        { icon: "check", text: "Review" }
      ],
      cards: [
        { icon: "event", title: "Event detection", text: "Earnings, filings, guidance and macro-release research." },
        { icon: "chart", title: "Backtesting discipline", text: "Simulated records, robustness and overfitting control." },
        { icon: "flow", title: "Iterative refinement", text: "Position sizing, attribution and post-trade review." }
      ],
      outcomes: ["Reproducible research", "Risk-first interpretation", "Clear audit trail"]
    },
    "document-management-ocr-erp": {
      code: "DOC",
      category: "DOCUMENT MANAGEMENT / OCR / ERP",
      title: "Document Management & OCR-to-ERP",
      summary: "Intelligent document processing that turns scanned documents into structured data for ERP workflows.",
      signals: [
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
    },
    "mobile-app-development": {
      code: "APP",
      category: "APP DEVELOPMENT",
      title: "Mobile App Development",
      summary: "An interactive web experience adapted into a mobile-ready app prepared for distribution.",
      signals: [
        { icon: "mobile", title: "Web → mobile", text: "Interactive web experience adapted for phones" },
        { icon: "box", title: "Store-ready", text: "Packaging, assets and release workflow" },
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
    }
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    var key = new URLSearchParams(window.location.search).get("p") || "iga-pam";
    var p = PROJECTS[key] || PROJECTS["iga-pam"];
    document.title = p.title + " · Scope · royzcastle";

    document.getElementById("projectCode").textContent = p.code;
    document.getElementById("projectCategory").textContent = p.category;
    document.getElementById("projectTitle").textContent = p.title;
    document.getElementById("projectSummary").textContent = p.summary;

    document.getElementById("facts").innerHTML = p.facts.map(function (f) {
      return '<div class="fact"><span>' + esc(f.label) + '</span><strong>' + esc(f.value) + '</strong></div>';
    }).join("");

    document.getElementById("signals").innerHTML = p.signals.map(function (s) {
      return '<article class="signal"><div class="icon">' + svg(s.icon) + '</div><div><h3>' +
        esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div></article>';
    }).join("");

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

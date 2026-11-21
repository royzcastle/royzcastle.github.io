(function () {
  "use strict";

  const PROJECTS = {
    "iga-pam": {
      code: "IGA / PAM",
      category: "IDENTITY & ACCESS",
      title: "IGA & PAM Delivery",
      summary: "A product-standard delivery for identity governance and privileged access, enhanced with tailored AI support for high-volume, repetitive operations.",
      facts: [
        { label: "Domain", value: "Identity & access" },
        { label: "Mode", value: "Product-standard delivery" },
        { label: "Focus", value: "Operational scale" },
        { label: "Disclosure", value: "Anonymised" }
      ],
      scope: [
        "Identity lifecycle and access-review workflows",
        "Privileged access processes",
        "AI-assisted triage of routine operational tasks",
        "Framework-level demonstration of controls and operational efficiency"
      ],
      flow: ["Intake & scope", "Rules & controls", "AI-assisted triage", "Review & sign-off"],
      layers: [
        { title: "Access lifecycle", text: "Joiner, mover and leaver style workflows at a framework level." },
        { title: "Privileged controls", text: "Structured handling of elevated access and related approvals." },
        { title: "Exception handling", text: "Repeatable paths for routine exceptions and follow-up actions." },
        { title: "Evidence trail", text: "Decision records and review points presented as audit-ready artifacts." }
      ],
      controls: [
        "Least-privilege framing",
        "Human-in-the-loop approval",
        "Traceable decision points",
        "Separation of duties"
      ],
      phases: [
        { title: "Baseline", text: "Map the standard product flow and identify repetitive operating steps." },
        { title: "Assist design", text: "Shape an AI-assisted layer around routine triage and review support." },
        { title: "Validation", text: "Exercise sample scenarios and check consistency of outcomes." },
        { title: "Handover", text: "Document the operating model, controls and review responsibilities." }
      ],
      outcomes: [
        "Reduced routine operational effort",
        "More consistent review decisions",
        "Clearer evidence for control owners",
        "A scalable pattern for high-volume access operations"
      ]
    },
    "retail-trading-grid": {
      code: "GRID",
      category: "GLOBAL LOGISTICS / CLOUD / DATA",
      title: "Global Logistics Cloud Grid",
      summary: "A cloud and data integration platform connecting buyers and sellers across a global logistics network.",
      facts: [
        { label: "Domain", value: "Global logistics" },
        { label: "Mode", value: "Cloud & data" },
        { label: "Network", value: "Distributed participants" },
        { label: "Focus", value: "Integration & data exchange" }
      ],
      scope: [
        "Large-scale connectivity across a distributed logistics network",
        "Partner onboarding",
        "Data exchange and normalisation",
        "Operational monitoring across the logistics ecosystem"
      ],
      flow: ["Onboard participants", "Connect via cloud", "Exchange data", "Monitor operations"],
      layers: [
        { title: "Connectivity", text: "A shared cloud integration fabric for distributed logistics participants." },
        { title: "Partner lifecycle", text: "Structured onboarding and ongoing participation at framework level." },
        { title: "Data layer", text: "Data exchange and normalisation described as a repeatable operating pattern." },
        { title: "Observability", text: "Monitoring views for operational health and exception awareness." }
      ],
      controls: [
        "Participant identity and permissions",
        "Data consistency checks",
        "Exception routing",
        "Service-level monitoring"
      ],
      phases: [
        { title: "Map", text: "Define participant groups and the integration boundaries across the logistics network." },
        { title: "Design", text: "Shape common cloud and data patterns for onboarding, exchange and exception handling." },
        { title: "Scale", text: "Extend the model across a large, distributed participant community." },
        { title: "Operate", text: "Establish monitoring and review routines for ongoing operations." }
      ],
      outcomes: [
        "Scalable participant connectivity",
        "More consistent partner onboarding",
        "Clearer data visibility",
        "Operationally resilient integration patterns"
      ]
    },
    "iso-20022": {
      code: "20022",
      category: "PAYMENTS",
      title: "ISO 20022 Payments",
      summary: "A Southeast Asia payments connectivity project involving ISO 20022, with clearing flows spanning the Americas and China.",
      facts: [
        { label: "Domain", value: "Payments" },
        { label: "Mode", value: "Connectivity & mapping" },
        { label: "Reach", value: "Three regions" },
        { label: "Standard", value: "ISO 20022" }
      ],
      scope: [
        "Cross-border payment-message structure",
        "Data validation",
        "Format mapping",
        "End-to-end clearing-flow review across three regions"
      ],
      flow: ["Message intake", "Validate", "Map format", "Clearing review"],
      layers: [
        { title: "Messaging", text: "Cross-border payment-message structure described at framework level." },
        { title: "Data quality", text: "Validation checkpoints for completeness and consistency." },
        { title: "Format alignment", text: "Mapping logic presented as a controlled translation layer." },
        { title: "Clearing view", text: "End-to-end flow review across multiple regional clearing paths." }
      ],
      controls: [
        "Standards alignment",
        "Validation gates",
        "Reconciliation checkpoints",
        "Exception handling"
      ],
      phases: [
        { title: "Discover", text: "Map the regional flows and identify message-handling boundaries." },
        { title: "Define", text: "Set validation and mapping rules at a framework level." },
        { title: "Validate", text: "Review representative scenarios across the three regions." },
        { title: "Handover", text: "Document controls, review points and operating responsibilities." }
      ],
      outcomes: [
        "Improved interoperability framing",
        "Consistent data-quality gates",
        "Clearer regional flow ownership",
        "Traceable review and exception paths"
      ]
    },
    "web3-nft-mm": {
      code: "WEB3",
      category: "CYBER / BLOCKCHAIN / DIGITAL ASSETS",
      title: "Cyber, Blockchain & Digital Assets",
      summary: "Personal work across cyber and blockchain-oriented digital assets, including NFTs and automated market making.",
      facts: [
        { label: "Domain", value: "Cyber & blockchain" },
        { label: "Mode", value: "Personal R&D" },
        { label: "Assets", value: "NFT & digital assets" },
        { label: "Disclosure", value: "Anonymised" }
      ],
      scope: [
        "Prototype design and on-chain interactions",
        "NFT minting and marketplace flows",
        "Liquidity and quoting workflows",
        "Performance review"
      ],
      flow: ["Concept", "Prototype", "On-chain test", "Review & iterate"],
      layers: [
        { title: "Prototype design", text: "Idea-to-prototype framing for digital-asset experiments." },
        { title: "On-chain interaction", text: "Transaction and interaction patterns described at a high level." },
        { title: "NFT flows", text: "Minting and marketplace journeys presented as scope-level flows." },
        { title: "Market making", text: "Liquidity and quoting workflows framed as an operating loop." }
      ],
      controls: [
        "Experimental scope boundaries",
        "Access and key hygiene",
        "Scenario testing",
        "Performance review"
      ],
      phases: [
        { title: "Explore", text: "Identify a focused question or opportunity in the digital-asset space." },
        { title: "Prototype", text: "Build a small, testable representation of the idea." },
        { title: "Exercise", text: "Run representative interactions and observe behaviour." },
        { title: "Review", text: "Capture lessons and decide whether to iterate or stop." }
      ],
      outcomes: [
        "Hands-on blockchain exploration",
        "Faster idea-to-test cycle",
        "Better risk awareness",
        "Reusable experiment patterns"
      ]
    },
    "programmatic-trading": {
      code: "ALGO",
      category: "DATA-DRIVEN / EVENT-DRIVEN ALGORITHMS",
      title: "Algorithmic Trading Research",
      summary: "Data-driven and event-driven algorithmic trading research, developed through iterative algorithm cycles.",
      facts: [
        { label: "Domain", value: "HK / US equities" },
        { label: "Mode", value: "Research-led" },
        { label: "Approach", value: "Data & event driven" },
        { label: "Method", value: "Iterative algorithms" }
      ],
      scope: [
        "Hypothesis development",
        "Data and event inputs",
        "Iterative algorithm refinement",
        "Backtesting and simulated trade-record analysis",
        "Robustness checks and risk attribution"
      ],
      flow: ["Hypothesis", "Data & events", "Iterate algorithm", "Backtest & risk"],
      layers: [
        { title: "Research framing", text: "Ideas expressed as testable hypotheses rather than anecdotes." },
        { title: "Data-driven layer", text: "Research described as evidence-led, with data inputs framed at a high level." },
        { title: "Event-driven layer", text: "Event inputs treated as triggers within the research loop, without implementation detail." },
        { title: "Iterative review", text: "Algorithms refined through repeated testing, robustness checks and risk attribution." }
      ],
      controls: [
        "Look-ahead awareness",
        "Out-of-sample thinking",
        "Overfitting checks",
        "Risk-first interpretation"
      ],
      phases: [
        { title: "Question", text: "Define the research question and the evidence needed to answer it." },
        { title: "Build", text: "Shape data- and event-driven logic as an iterative research cycle." },
        { title: "Challenge", text: "Run backtests, robustness checks and look for failure modes." },
        { title: "Interpret", text: "Frame conclusions with simulated records, risk attribution and explicit caveats." }
      ],
      outcomes: [
        "Disciplined research process",
        "Reproducible analysis habits",
        "Iterative algorithm refinement",
        "Clear audit trail from idea to conclusion"
      ]
    },
    "mobile-app-development": {
      code: "APP",
      category: "APP DEVELOPMENT",
      title: "Mobile App Development",
      summary: "Turning an interactive web experience into a mobile-ready app prepared for distribution.",
      facts: [
        { label: "Domain", value: "App development" },
        { label: "Mode", value: "Web → mobile" },
        { label: "Focus", value: "Store readiness" },
        { label: "Disclosure", value: "Anonymised" }
      ],
      scope: [
        "Touch UI adaptation",
        "Mobile packaging",
        "Store assets and publishing readiness",
        "Release build workflow"
      ],
      flow: ["Web baseline", "Touch adaptation", "Packaging", "Store readiness"],
      layers: [
        { title: "Interface", text: "Interactive experience adapted for touch and mobile viewing." },
        { title: "Packaging", text: "Web experience wrapped into a mobile-ready delivery format." },
        { title: "Store assets", text: "Icons, feature visuals and policy artifacts prepared for review." },
        { title: "Release", text: "Build and publishing workflow documented as a repeatable process." }
      ],
      controls: [
        "Platform guideline awareness",
        "Permission and privacy review",
        "Release checklist",
        "Asset consistency"
      ],
      phases: [
        { title: "Audit", text: "Review the web experience for mobile interaction gaps." },
        { title: "Adapt", text: "Adjust controls and layout for touch-first use." },
        { title: "Package", text: "Prepare the app bundle and required distribution assets." },
        { title: "Validate", text: "Check the release build and document the handover steps." }
      ],
      outcomes: [
        "Reusable web core",
        "Mobile-ready user experience",
        "Distribution readiness",
        "Documented release workflow"
      ]
    }
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    const key = new URLSearchParams(window.location.search).get("p") || "iga-pam";
    const p = PROJECTS[key] || PROJECTS["iga-pam"];
    document.title = p.title + " · Scope · royzcastle";

    document.getElementById("projectCode").textContent = p.code;
    document.getElementById("projectCategory").textContent = p.category;
    document.getElementById("projectTitle").textContent = p.title;
    document.getElementById("projectSummary").textContent = p.summary;

    document.getElementById("facts").innerHTML = p.facts.map(function (f) {
      return '<div class="fact"><span>' + esc(f.label) + '</span><strong>' + esc(f.value) + '</strong></div>';
    }).join("");

    document.getElementById("scopeList").innerHTML = p.scope.map(function (s) {
      return "<li>" + esc(s) + "</li>";
    }).join("");

    document.getElementById("flow").innerHTML = p.flow.map(function (s, i) {
      return '<div class="flow-step"><span>' + (i + 1) + '</span><b>' + esc(s) + '</b></div>' +
        (i < p.flow.length - 1 ? '<div class="flow-arrow">→</div>' : "");
    }).join("");

    document.getElementById("layers").innerHTML = p.layers.map(function (l, i) {
      return '<article class="layer"><span>' + (i + 1) + '</span><h3>' + esc(l.title) +
        '</h3><p>' + esc(l.text) + '</p></article>';
    }).join("");

    document.getElementById("controls").innerHTML = p.controls.map(function (c) {
      return "<li>" + esc(c) + "</li>";
    }).join("");

    document.getElementById("phases").innerHTML = p.phases.map(function (ph, i) {
      return '<div class="phase"><span class="phase-no">' + (i + 1) + '</span><div><h3>' +
        esc(ph.title) + '</h3><p>' + esc(ph.text) + '</p></div></div>';
    }).join("");

    document.getElementById("outcomes").innerHTML = p.outcomes.map(function (o) {
      return "<li>" + esc(o) + "</li>";
    }).join("");
  }

  render();
})();

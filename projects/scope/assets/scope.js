(function () {
  "use strict";

  const PROJECTS = {
    "iga-pam": {
      code: "IGA / PAM",
      category: "IDENTITY & ACCESS",
      title: "IGA & PAM Delivery",
      summary: "A product-standard POC for identity governance and privileged access, with tailored AI improvement to support high-volume, repetitive operations.",
      scope: [
        "Identity lifecycle and access-review workflows",
        "Privileged access processes",
        "AI-assisted triage of routine operational tasks",
        "Framework-level demonstration of controls and operational efficiency"
      ]
    },
    "retail-trading-grid": {
      code: "GRID",
      category: "RETAIL TRADING",
      title: "Retail Trading Grid",
      summary: "A cloud integration platform connecting thousands of buyers and sellers across a retail trading ecosystem.",
      scope: [
        "Large-scale connectivity across a distributed trading network",
        "Partner onboarding",
        "Message and data exchange",
        "Operational monitoring across the trading community"
      ]
    },
    "iso-20022": {
      code: "20022",
      category: "PAYMENTS",
      title: "ISO 20022 Payments",
      summary: "A Southeast Asia payments connectivity project involving ISO 20022, with clearing flows spanning the Americas and China.",
      scope: [
        "Cross-border payment-message structure",
        "Data validation",
        "Format mapping",
        "End-to-end clearing-flow review across three regions"
      ]
    },
    "web3-nft-mm": {
      code: "WEB3",
      category: "CYBER / BLOCKCHAIN / DIGITAL ASSETS",
      title: "Cyber, Blockchain & Digital Assets",
      summary: "Personal work across cyber and blockchain-oriented digital assets, including NFTs and automated market making.",
      scope: [
        "Prototype design and on-chain interactions",
        "NFT minting and marketplace flows",
        "Liquidity and quoting workflows",
        "Performance review"
      ]
    },
    "programmatic-trading": {
      code: "ALGO",
      category: "RESEARCH-LED TRADING",
      title: "Research-Led Algorithmic Trading",
      summary: "Research-led work in automated and algorithmic trading across Hong Kong and US equity markets.",
      scope: [
        "Hypothesis development and backtesting",
        "Simulated trade-record analysis",
        "Robustness and overfitting checks",
        "Risk attribution and review"
      ]
    },
"mobile-app-development": {
      code: "APP",
      category: "APP DEVELOPMENT",
      title: "Mobile App Development",
      summary: "Turning an interactive web experience into a mobile-ready app prepared for distribution.",
      scope: [
        "Touch UI adaptation",
        "Mobile packaging",
        "Store assets and publishing readiness",
        "Release build workflow"
      ]
    }
  };

  function render() {
    const key = new URLSearchParams(window.location.search).get("p") || "iga-pam";
    const p = PROJECTS[key] || PROJECTS["iga-pam"];
    document.title = p.title + " · Scope · royzcastle";
    document.getElementById("projectCode").textContent = p.code;
    document.getElementById("projectCategory").textContent = p.category;
    document.getElementById("projectTitle").textContent = p.title;
    document.getElementById("projectSummary").textContent = p.summary;
    document.getElementById("scopeList").innerHTML = p.scope.map(function (s) {
      return "<li>" + s + "</li>";
    }).join("");
  }

  render();
})();

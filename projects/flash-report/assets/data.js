/* ============================================================
 * data.js — Mock Data Adapter (English)
 * Use case: Macau casino Integrated Resort — CEO Office flash report
 * -------------------------------------------------------------
 * POC uses sample data. For production, replace fetchSnapshot()
 * with a real API / warehouse query — no UI changes required.
 * ============================================================ */

(function (global) {
  "use strict";

  const SNAPSHOT = {
    meta: {
      company: "Starlight Macau Integrated Resort",
      title: "Daily Executive Flash",
      asOf: "21 Nov 2026, 08:30 (GMT+8)",
      period: "MTD (01-21 Nov)",
      currency: "MOP",
      aiModel: "AI Briefing Engine v2.1",
      confidence: 0.93
    },

    kpis: [
      {
        id: "ggr",
        label: "Gross Gaming Revenue",
        icon: "revenue",
        value: "2.86",
        unit: "B",
        prefix: "MOP ",
        delta: 14.2,
        deltaLabel: "YoY",
        target: 106,
        targetLabel: "Monthly target",
        spark: [18.2, 19.6, 19.1, 21.4, 22.8, 23.5, 22.9, 25.1, 26.4, 27.8, 30.2, 28.6]
      },
      {
        id: "mass",
        label: "Mass Table GGR",
        icon: "profit",
        value: "1.24",
        unit: "B",
        prefix: "MOP ",
        delta: 19.6,
        deltaLabel: "YoY",
        target: 112,
        targetLabel: "Monthly target",
        spark: [6.8, 7.4, 7.1, 8.2, 8.9, 9.4, 9.1, 10.2, 10.8, 11.5, 12.6, 12.4]
      },
      {
        id: "vip",
        label: "VIP Rolling Chip Volume",
        icon: "cash",
        value: "18.2",
        unit: "B",
        prefix: "MOP ",
        delta: 8.5,
        deltaLabel: "YoY",
        target: 94,
        targetLabel: "Monthly target",
        spark: [142, 151, 146, 158, 164, 171, 166, 178, 183, 189, 196, 182]
      },
      {
        id: "nongaming",
        label: "Non-Gaming Revenue",
        icon: "customers",
        value: "680",
        unit: "M",
        prefix: "MOP ",
        delta: 22.1,
        deltaLabel: "YoY",
        target: 109,
        targetLabel: "Monthly target",
        spark: [3.1, 3.4, 3.6, 3.9, 4.2, 4.5, 4.8, 5.2, 5.5, 5.9, 6.4, 6.8]
      },
      {
        id: "occupancy",
        label: "Hotel Occupancy",
        icon: "margin",
        value: "94.8",
        unit: "%",
        delta: 2.3,
        deltaUnit: "pp",
        deltaLabel: "MoM",
        target: 101,
        targetLabel: "Goal 94.0%",
        spark: [86.2, 88.1, 87.4, 89.6, 90.8, 91.2, 90.4, 92.6, 93.1, 93.8, 94.2, 94.8]
      },
      {
        id: "adr",
        label: "Average Daily Rate",
        icon: "productivity",
        value: "2,180",
        unit: "",
        prefix: "MOP ",
        delta: 7.4,
        deltaLabel: "YoY",
        target: 103,
        targetLabel: "Annual target",
        spark: [1720, 1780, 1810, 1850, 1900, 1960, 1940, 2010, 2060, 2100, 2140, 2180]
      }
    ],

    // MOP million
    trend: {
      labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
      revenue: [2130, 2290, 2270, 2520, 2710, 2800, 2770, 3030, 3190, 3370, 3660, 3540],
      profit: [310, 340, 360, 390, 420, 450, 480, 520, 550, 590, 640, 680]
    },
    trendLegend: {
      revenue: "Total revenue (gaming + non-gaming)",
      profit: "Non-gaming revenue"
    },

    regions: [
      { name: "VIP", value: 42, color: "#4f46e5", change: 8.5 },
      { name: "Mass tables", value: 35, color: "#2563eb", change: 19.6 },
      { name: "Non-gaming", value: 15, color: "#0ea5e9", change: 22.1 },
      { name: "Slots", value: 8, color: "#94a3b8", change: 4.3 }
    ],
    donutTitle: "Revenue Mix",

    insights: [
      {
        id: "i1",
        severity: "high",
        tag: "VIP",
        title: "VIP win rate 2.85%, below 3-month average of 3.12%",
        body: "Rolling chip volume held at MOP 18.2B (+8.5% YoY), but win-rate variance implies ~MOP 160M GGR impact. Within normal range — monitor closely; no credit-limit changes recommended for now.",
        action: "View VIP detail",
        confidence: 0.91
      },
      {
        id: "i2",
        severity: "medium",
        tag: "Concentration",
        title: "Top 10 VIPs contribute 62% of rolling chip volume",
        body: "VIP concentration rose 4pp MoM, above the 55% management alert threshold. AI recommends expanding the premium-mass segment to reduce single-player dependency.",
        action: "View VIP concentration",
        confidence: 0.88
      },
      {
        id: "i3",
        severity: "opportunity",
        tag: "Opportunity",
        title: "Mass table ADT hits 6-month high",
        body: "Mass average daily revenue per table reached MOP 18,600, driving mass GGR +19.6%. Hotel occupancy also hit 94.8%. AI suggests converting idle VIP tables to mass tables.",
        action: "View recommended actions",
        confidence: 0.86
      }
    ],

    briefing: {
      headline: "Mass and non-gaming drive growth; VIP deceleration needs watching",
      bullets: [
        "Gross gaming revenue reached MOP 2.86B, up 14.2% YoY at 106% of monthly target. Mass (+19.6%) and non-gaming (+22.1%) were the main growth engines.",
        "Hotel occupancy climbed to 94.8% (+2.3pp MoM) and ADR to MOP 2,180 (+7.4% YoY); non-gaming now represents 19.2% of total revenue.",
        "VIP rolling chip volume hit MOP 18.2B (+8.5%), lagging mass. Win rate of 2.85% sits slightly below the 3-month average — flag for weekly review."
      ],
      focus: "Watch: VIP growth of 8.5% trails mass at 19.6%, while the top 10 VIPs account for 62% of rolling volume — concentration risk is rising."
    },

    qa: [
      {
        keys: ["revenue", "ggr", "gaming", "growth", "why", "increase"],
        answer: "Gross gaming revenue reached MOP 2.86B, up 14.2% YoY at 106% of target. Growth came from mass tables (+19.6%, ADT MOP 18,600) and non-gaming (+22.1%, driven by hotel, F&B and retail). VIP grew 8.5% and slots 4.3%."
      },
      {
        keys: ["vip", "rolling", "win rate", "concentration", "high roller"],
        answer: "VIP rolling chip volume was MOP 18.2B (+8.5%), with win rate at 2.85% vs. 3.12% three-month average. The top 10 VIPs contribute 62% of volume, up 4pp MoM and above the 55% alert line. Recommendation: expand premium-mass acquisition and keep monitoring win rate; hold credit limits steady."
      },
      {
        keys: ["mass", "table", "slot", "adt", "floor"],
        answer: "Mass table GGR was MOP 1.24B, +19.6% YoY at 112% of target — the strongest growth engine. Mass ADT hit MOP 18,600, a 6-month high. Slots grew 4.3%. AI suggests evaluating a partial conversion of idle VIP tables to mass tables."
      },
      {
        keys: ["hotel", "occupancy", "non-gaming", "f&b", "retail", "adr", "room"],
        answer: "Hotel occupancy reached 94.8% (+2.3pp MoM) and ADR MOP 2,180 (+7.4% YoY), driving non-gaming revenue of MOP 680M (+22.1%), now 19.2% of total revenue. Recommendation: accelerate phase-two retail leasing to lift the non-gaming mix further."
      },
      {
        keys: ["risk", "alert", "watch", "issue", "anomaly"],
        answer: "Three AI signals are active: (1) HIGH — VIP win rate below average, ~MOP 160M GGR impact; (2) MEDIUM — top-10 VIP concentration at 62%, above alert line; (3) OPPORTUNITY — mass ADT and hotel occupancy both at new highs. Details and recommended actions are in the AI Insights panel."
      },
      {
        keys: ["visitation", "traffic", "guest", "visitor", "headcount"],
        answer: "Daily visitor counts are not yet in this POC dataset. The production version can ingest immigration and membership data to show source markets (Mainland China, Hong Kong, Taiwan, Southeast Asia) and repeat-visit rates."
      }
    ]
  };

  /** Fetch a snapshot. Production: return fetch("/api/flash?resort=macau").then(r => r.json()); */
  function fetchSnapshot() {
    return Promise.resolve(JSON.parse(JSON.stringify(SNAPSHOT)));
  }

  /** Generate AI briefing. Production: call an LLM API with the snapshot as context. */
  function buildBriefing(snapshot, variant) {
    const b = snapshot.briefing;
    if (!variant) {
      return { headline: b.headline, bullets: b.bullets.slice(), focus: b.focus };
    }
    return {
      headline: "Revenue mix improves; VIP concentration is this week's priority",
      bullets: [
        "Total revenue MOP 3.54B, with gaming +14.2% and non-gaming +22.1%. Non-gaming share rose to 19.2%, improving revenue balance.",
        "Hotel occupancy of 94.8% and mass ADT of MOP 18,600 both hit new highs; mass GGR grew 19.6% at 112% of target.",
        "VIP win rate of 2.85% is below average, and top-10 VIP concentration stands at 62% — recommend a joint CFO / VIP team review this week."
      ],
      focus: "Proposed action: approve the table-mix review and launch a premium-mass acquisition initiative."
    };
  }

  /** AI Q&A: keyword matching for the POC. Production: LLM / RAG. */
  function askAI(question, snapshot) {
    const q = (question || "").toLowerCase();
    const hit = snapshot.qa.find(item =>
      item.keys.some(k => q.indexOf(k.toLowerCase()) !== -1)
    );
    if (hit) return hit.answer;
    return "I don't have data on \"" + question + "\" in this POC yet. In production this connects to an LLM and the resort knowledge base for live answers. Try asking \"Why did GGR grow?\", \"VIP risks\", or \"Hotel occupancy\".";
  }

  global.FlashData = {
    fetchSnapshot: fetchSnapshot,
    buildBriefing: buildBriefing,
    askAI: askAI
  };
})(window);

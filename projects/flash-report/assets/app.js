/* ============================================================
 * app.js — Rendering & interactions (no external dependencies)
 * ============================================================ */

(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  let snapshot = null;
  let briefingVariant = false;
  let currentPeriod = "MTD";

  const PERIOD_FACTOR = { MTD: 1, WTD: 0.42, Today: 0.055 };
  const SCALED_IDS = { ggr: true, mass: true, vip: true, nongaming: true };

  const ICONS = {
    revenue: '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />',
    profit: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6" />',
    cash: '<path d="M3 7h18v10H3zM3 10h18M7 14h3" />',
    customers: '<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 20v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8" />',
    margin: '<path d="M6 18L18 6M7.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM16.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />',
    productivity: '<path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />'
  };

  function iconSvg(name, size) {
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONS[name] || ICONS.revenue) + '</svg>';
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------- AI briefing ---------------- */
  function renderBriefing() {
    const b = window.FlashData.buildBriefing(snapshot, briefingVariant);
    $("briefHeadline").textContent = b.headline;
    $("briefBullets").innerHTML = b.bullets.map(function (x) {
      return "<li>" + esc(x) + "</li>";
    }).join("");
    $("briefFocus").textContent = b.focus;
    $("asOf").textContent = snapshot.meta.asOf;
    $("modelTag").textContent = snapshot.meta.aiModel;

    const pct = Math.round(snapshot.meta.confidence * 100);
    $("confidenceFill").style.width = pct + "%";
    $("confidenceText").textContent = pct + "%";
  }

  /* ---------------- KPI cards ---------------- */
  function formatValue(kpi, factor) {
    const raw = kpi.value.replace(/,/g, "");
    const num = parseFloat(raw) * factor;
    const decimals = raw.indexOf(".") !== -1 ? raw.split(".")[1].length : 0;
    let out = num.toFixed(decimals);
    if (raw.indexOf(",") !== -1) {
      out = Number(out).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    return out;
  }

  function sparkline(values, positive) {
    const w = 100, h = 34, p = 2;
    const min = Math.min.apply(null, values), max = Math.max.apply(null, values);
    const span = max - min || 1;
    const pts = values.map(function (v, i) {
      const x = p + (i / (values.length - 1)) * (w - 2 * p);
      const y = h - p - ((v - min) / span) * (h - 2 * p);
      return [x, y];
    });
    const line = pts.map(function (a) { return a[0].toFixed(1) + "," + a[1].toFixed(1); }).join(" ");
    const area = "M" + pts[0][0].toFixed(1) + "," + (h - p) + " L" +
      pts.map(function (a) { return a[0].toFixed(1) + "," + a[1].toFixed(1); }).join(" L") +
      " L" + pts[pts.length - 1][0].toFixed(1) + "," + (h - p) + " Z";
    const color = positive ? "#0f9d58" : "#e11d48";
    const id = "sp-" + Math.random().toString(36).slice(2, 8);
    return '<svg class="spark" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + color + '" stop-opacity=".22"/>' +
      '<stop offset="100%" stop-color="' + color + '" stop-opacity="0"/>' +
      '</linearGradient></defs>' +
      '<path d="' + area + '" fill="url(#' + id + ')"/>' +
      '<polyline points="' + line + '" fill="none" stroke="' + color + '" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<circle cx="' + pts[pts.length - 1][0].toFixed(1) + '" cy="' + pts[pts.length - 1][1].toFixed(1) + '" r="2.2" fill="' + color + '"/>' +
      '</svg>';
  }

  function renderKpis() {
    const factor = PERIOD_FACTOR[currentPeriod] || 1;
    $("periodNote").textContent = snapshot.meta.period + " · " + currentPeriod + " view · " + snapshot.meta.currency;

    $("kpiGrid").innerHTML = snapshot.kpis.map(function (k, idx) {
      const f = SCALED_IDS[k.id] ? factor : 1;
      const value = formatValue(k, f);
      const up = k.delta >= 0;
      const deltaText = (up ? "+" : "") + k.delta + (k.deltaUnit ? k.deltaUnit : "%");
      const targetUnder = k.target < 100;
      const sparkUp = k.spark[k.spark.length - 1] >= k.spark[0];
      return '<article class="kpi-card" style="animation-delay:' + (idx * 35) + 'ms">' +
        '<div class="kpi-label"><span class="kpi-icon">' + iconSvg(k.icon, 13) + '</span>' + esc(k.label) + '</div>' +
        '<div class="kpi-value"><span class="prefix">' + esc(k.prefix || "") + '</span>' + esc(value) +
          (k.unit ? '<span class="unit">' + esc(k.unit) + '</span>' : '') + '</div>' +
        '<div class="kpi-delta-row">' +
          '<span class="delta ' + (up ? "up" : "down") + '">' + (up ? "▲" : "▼") + " " + deltaText + '</span>' +
          '<span class="delta-label">' + esc(k.deltaLabel) + '</span>' +
        '</div>' +
        '<div class="kpi-target">' +
          '<div class="kpi-target-row"><span>' + esc(k.targetLabel) + '</span><strong>' + k.target + '%</strong></div>' +
          '<div class="progress' + (targetUnder ? " is-under" : "") + '"><span style="width:' + Math.min(k.target, 100) + '%"></span></div>' +
        '</div>' +
        sparkline(k.spark, sparkUp) +
        '</article>';
    }).join("");
  }

  /* ---------------- Dual-axis trend chart ---------------- */
  function niceMax(v) {
    const pow = Math.pow(10, Math.floor(Math.log10(v)));
    const n = v / pow;
    const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
    return step * pow;
  }

  function renderTrend() {
    const t = snapshot.trend;
    const W = 720, H = 240;
    const L = 52, R = 52, T = 16, B = 30;
    const pw = W - L - R, ph = H - T - B;
    const maxA = niceMax(Math.max.apply(null, t.revenue));
    const maxB = niceMax(Math.max.apply(null, t.profit));
    const x = function (i) { return L + (i / (t.labels.length - 1)) * pw; };
    const yA = function (v) { return T + ph - (v / maxA) * ph; };
    const yB = function (v) { return T + ph - (v / maxB) * ph; };

    let svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Revenue trend chart">';
    svg += '<defs><linearGradient id="areaRevenue" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#6366f1" stop-opacity=".28"/>' +
      '<stop offset="100%" stop-color="#6366f1" stop-opacity="0"/></linearGradient></defs>';

    for (let i = 0; i <= 4; i++) {
      const yy = T + (i / 4) * ph;
      svg += '<line class="grid-line" x1="' + L + '" y1="' + yy + '" x2="' + (L + pw) + '" y2="' + yy + '"/>';
      svg += '<text class="axis-text" x="' + (L - 8) + '" y="' + (yy + 3) + '" text-anchor="end">' +
        Math.round(maxA * (1 - i / 4)).toLocaleString("en-US") + '</text>';
      svg += '<text class="axis-text" x="' + (L + pw + 8) + '" y="' + (yy + 3) + '">' +
        Math.round(maxB * (1 - i / 4)).toLocaleString("en-US") + '</text>';
    }

    t.labels.forEach(function (lab, i) {
      svg += '<text class="axis-text" x="' + x(i) + '" y="' + (H - 9) + '" text-anchor="middle">' + esc(lab) + '</text>';
    });

    const areaPath = "M" + x(0) + "," + (T + ph) + " " +
      t.revenue.map(function (v, i) { return "L" + x(i).toFixed(1) + "," + yA(v).toFixed(1); }).join(" ") +
      " L" + x(t.revenue.length - 1) + "," + (T + ph) + " Z";
    svg += '<path d="' + areaPath + '" fill="url(#areaRevenue)"/>';

    svg += '<polyline points="' + t.revenue.map(function (v, i) {
      return x(i).toFixed(1) + "," + yA(v).toFixed(1);
    }).join(" ") + '" fill="none" stroke="#4f46e5" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>';

    svg += '<polyline points="' + t.profit.map(function (v, i) {
      return x(i).toFixed(1) + "," + yB(v).toFixed(1);
    }).join(" ") + '" fill="none" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="5 4" stroke-linejoin="round" stroke-linecap="round"/>';

    t.revenue.forEach(function (v, i) {
      svg += '<circle cx="' + x(i).toFixed(1) + '" cy="' + yA(v).toFixed(1) + '" r="2.6" fill="#fff" stroke="#4f46e5" stroke-width="1.7">' +
        '<title>' + esc(t.labels[i]) + ': total MOP ' + v.toLocaleString("en-US") + 'M</title></circle>';
    });
    t.profit.forEach(function (v, i) {
      svg += '<circle cx="' + x(i).toFixed(1) + '" cy="' + yB(v).toFixed(1) + '" r="2.2" fill="#0ea5e9">' +
        '<title>' + esc(t.labels[i]) + ': non-gaming MOP ' + v.toLocaleString("en-US") + 'M</title></circle>';
    });

    svg += '</svg>';
    $("trendChart").innerHTML = svg;
    $("trendLegend").innerHTML =
      '<span class="legend-item"><i class="legend-swatch" style="background:#4f46e5"></i>' + esc(snapshot.trendLegend.revenue) + ' (L)</span>' +
      '<span class="legend-item"><i class="legend-swatch" style="background:#0ea5e9"></i>' + esc(snapshot.trendLegend.profit) + ' (R)</span>';
  }

  /* ---------------- Donut ---------------- */
  function renderDonut() {
    const segs = snapshot.regions;
    const R = 58, C = 2 * Math.PI * R;
    let offset = 0;
    let svg = '<svg viewBox="0 0 156 156" role="img" aria-label="Revenue mix donut chart">';
    svg += '<circle cx="78" cy="78" r="' + R + '" fill="none" stroke="#eef2f8" stroke-width="13"/>';
    segs.forEach(function (s) {
      const len = (s.value / 100) * C;
      svg += '<circle class="donut-seg" cx="78" cy="78" r="' + R + '" fill="none" stroke="' + s.color +
        '" stroke-width="13" stroke-dasharray="' + (len - 2).toFixed(2) + ' ' + (C - len + 2).toFixed(2) +
        '" stroke-dashoffset="' + (-offset).toFixed(2) + '" transform="rotate(-90 78 78)">' +
        '<title>' + esc(s.name) + ': ' + s.value + '%</title></circle>';
      offset += len;
    });
    const total = (snapshot.trend.revenue[snapshot.trend.revenue.length - 1] / 1000).toFixed(2);
    svg += '<text class="donut-center-num" x="78" y="75" text-anchor="middle">MOP ' + total + 'B</text>';
    svg += '<text class="donut-center-lbl" x="78" y="91" text-anchor="middle">TOTAL REVENUE</text>';
    svg += '</svg>';
    $("donutChart").innerHTML = svg;

    $("donutLegend").innerHTML = segs.map(function (s) {
      return '<div class="donut-legend-item">' +
        '<i class="donut-legend-dot" style="background:' + s.color + '"></i>' +
        '<span class="donut-legend-name">' + esc(s.name) + '</span>' +
        '<span class="donut-legend-val">' + s.value + '%</span>' +
        '<span class="donut-legend-chg ' + (s.change >= 0 ? "up" : "down") + '">' +
          (s.change >= 0 ? "+" : "") + s.change + '%</span>' +
        '</div>';
    }).join("");
  }

  /* ---------------- AI insights ---------------- */
  function renderInsights() {
    const label = { high: "HIGH", medium: "MEDIUM", opportunity: "OPPORTUNITY" };
    $("insightCount").textContent = snapshot.insights.length + " signals";
    $("insightList").innerHTML = snapshot.insights.map(function (it) {
      return '<article class="insight ' + it.severity + '">' +
        '<div class="insight-head">' +
          '<span class="sev-tag">' + label[it.severity] + '</span>' +
          '<span class="insight-cat">' + esc(it.tag) + '</span>' +
          '<span class="insight-conf">' + Math.round(it.confidence * 100) + '% confidence</span>' +
        '</div>' +
        '<h3 class="insight-title">' + esc(it.title) + '</h3>' +
        '<p class="insight-body">' + esc(it.body) + '</p>' +
        '<button class="insight-action" type="button">' + esc(it.action) + ' →</button>' +
        '</article>';
    }).join("");
  }

  /* ---------------- Ask AI ---------------- */
  function addMessage(text, who, cls) {
    const el = document.createElement("div");
    el.className = "msg " + who + (cls ? " " + cls : "");
    el.textContent = text;
    $("chatLog").appendChild(el);
    $("chatLog").scrollTop = $("chatLog").scrollHeight;
    return el;
  }

  function ask(question) {
    const q = (question || "").trim();
    if (!q) return;
    addMessage(q, "user");
    $("qaInput").value = "";
    const typing = addMessage("Analyzing report data…", "ai", "is-typing");
    window.setTimeout(function () {
      typing.remove();
      addMessage(window.FlashData.askAI(q, snapshot), "ai");
    }, 620);
  }

  function initChat() {
    addMessage("Good morning. Here is your flash for " + snapshot.meta.asOf + ". Ask me anything about the numbers.", "ai");
    $("qaForm").addEventListener("submit", function (e) {
      e.preventDefault();
      ask($("qaInput").value);
    });
    $("suggestions").addEventListener("click", function (e) {
      const btn = e.target.closest(".suggestion");
      if (btn) ask(btn.dataset.q);
    });
  }

  /* ---------------- Controls ---------------- */
  function initControls() {
    $("regenBtn").addEventListener("click", function () {
      const btn = this;
      const box = document.querySelector(".briefing");
      btn.classList.add("is-loading");
      box.classList.add("is-loading");
      btn.disabled = true;
      window.setTimeout(function () {
        briefingVariant = !briefingVariant;
        renderBriefing();
        btn.classList.remove("is-loading");
        box.classList.remove("is-loading");
        btn.disabled = false;
      }, 650);
    });

    $("refreshBtn").addEventListener("click", function () {
      const btn = this;
      btn.classList.add("is-spin");
      btn.disabled = true;
      window.setTimeout(function () {
        window.FlashData.fetchSnapshot().then(function (data) {
          snapshot = data;
          renderAll();
        }).finally(function () {
          btn.classList.remove("is-spin");
          btn.disabled = false;
        });
      }, 500);
    });

    document.querySelector(".period-switch").addEventListener("click", function (e) {
      const btn = e.target.closest(".period-btn");
      if (!btn) return;
      document.querySelectorAll(".period-btn").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      currentPeriod = btn.dataset.period;
      renderKpis();
    });
  }

  function renderAll() {
    renderBriefing();
    renderKpis();
    renderTrend();
    renderDonut();
    renderInsights();
  }

  window.FlashData.fetchSnapshot().then(function (data) {
    snapshot = data;
    renderAll();
    initChat();
    initControls();
  });
})();

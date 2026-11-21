(function () {
  "use strict";

  /* ---------- Module 1: JML state machine ---------- */
  var JML = {
    join: {
      event: "New hire recorded in HRIS",
      role: "RBAC + ABAC role derivation",
      systems: "Provision across 240 downstream apps",
      state: "Granted · pending attestation",
      readout: "New hire: identity created from HRIS, role derived from department + location (ABAC), entitlements provisioned to 240 downstream systems. Access starts at minimum scope and enters the first certification cycle."
    },
    move: {
      event: "Department transfer event",
      role: "Re-evaluate role + attributes",
      systems: "Add new · revoke old entitlements",
      state: "Old access removed · no privilege creep",
      readout: "Transfer: new role computed from the updated department. Old-department entitlements are revoked at the same event — preventing privilege creep — while required access to the new team is provisioned. Session context is re-issued."
    },
    leave: {
      event: "Termination event received",
      role: "Revoke all roles",
      systems: "Disable identity across all systems",
      state: "All active sessions terminated",
      readout: "Termination: identity disabled at the HRIS event, all entitlements revoked across connected systems, and every active session terminated immediately. Revocation and session termination are written to the audit trail."
    }
  };

  function pulseFlow() {
    var steps = document.querySelectorAll("#jmlFlow .flow-step");
    steps.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.remove("pulse");
        void el.offsetWidth;
        el.classList.add("pulse");
      }, i * 130);
    });
  }

  function setJML(key) {
    var data = JML[key];
    if (!data) return;
    document.querySelectorAll(".event-btn").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-event") === key);
    });
    document.getElementById("jml-event").textContent = data.event;
    document.getElementById("jml-role").textContent = data.role;
    document.getElementById("jml-systems").textContent = data.systems;
    document.getElementById("jml-state").textContent = data.state;
    document.getElementById("jmlReadout").textContent = data.readout;
    pulseFlow();
  }

  document.querySelectorAll(".event-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { setJML(btn.getAttribute("data-event")); });
  });

  /* ---------- Module 1: SoD ---------- */
  var roles = { initiator: false, approver: false };

  function renderSoD() {
    var conflict = roles.initiator && roles.approver;
    var box = document.getElementById("sodStatus");
    box.classList.toggle("conflict", conflict);
    var html = conflict
      ? '<span class="dot"></span><b>SoD POLICY VIOLATION</b><small>Auto-approval blocked · routed to compliance exception workflow</small>'
      : '<span class="dot"></span><b>No conflict</b><small>' +
        (roles.initiator || roles.approver ? "Single role selected · auto-approval permitted" : "Select two roles to run the check") +
        "</small>";
    box.innerHTML = html;
  }

  document.querySelectorAll(".role-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-role");
      roles[key] = !roles[key];
      btn.setAttribute("aria-pressed", roles[key] ? "true" : "false");
      renderSoD();
    });
  });

  /* ---------- Module 1: Access certification ---------- */
  var revoked = 0;
  var flagged = 2;

  function renderAudit() {
    document.getElementById("auditNote").textContent =
      "Dormant access flagged: " + flagged + " · " + revoked + " revoked this session" +
      (revoked ? " · audit evidence generated" : "");
  }

  document.querySelectorAll(".revoke").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row = btn.closest("tr");
      if (row.classList.contains("revoked")) return;
      row.classList.add("revoked");
      btn.textContent = "Revoked";
      btn.disabled = true;
      revoked += 1;
      renderAudit();
    });
  });
  document.querySelectorAll(".keep").forEach(function (btn) {
    btn.addEventListener("click", function () {
      btn.textContent = "Kept";
      btn.disabled = true;
    });
  });

  /* ---------- Module 2: JIT elevation ---------- */
  var jitTimers = [];

  function resetJit() {
    jitTimers.forEach(clearTimeout);
    jitTimers = [];
    document.querySelectorAll(".jit-step").forEach(function (s) { s.className = "jit-step"; });
    var cred = document.getElementById("jitCred");
    cred.className = "jit-cred";
    cred.innerHTML = "Standing privilege: <b>0</b> · no active credential";
    document.getElementById("jitRun").disabled = false;
    document.getElementById("jitRun").textContent = "Run elevation request";
  }

  document.getElementById("jitRun").addEventListener("click", function () {
    resetJit();
    var steps = document.querySelectorAll(".jit-step");
    var btn = document.getElementById("jitRun");
    btn.disabled = true;
    btn.textContent = "Elevation in progress…";
    steps.forEach(function (step, i) {
      jitTimers.push(setTimeout(function () {
        steps.forEach(function (s, j) {
          s.classList.toggle("done", j < i);
          s.classList.toggle("active", j === i);
        });
        if (i === steps.length - 1) {
          var cred = document.getElementById("jitCred");
          cred.className = "jit-cred live";
          cred.innerHTML = "Ephemeral credential expired · password rotated · " +
            "<b>standing privilege restored to 0</b>";
          btn.textContent = "Run again";
          btn.disabled = false;
        }
      }, 420 * (i + 1)));
    });
  });

  /* ---------- Module 2: Terminal command control ---------- */
  var terminated = false;
  var RISK = /drop\s+table|truncate|delete\s+from|rm\s+-rf|shutdown|chmod\s+777/i;

  function termLine(text, cls) {
    var line = document.createElement("div");
    line.className = "term-line" + (cls ? " " + cls : "");
    line.textContent = text;
    document.getElementById("terminal").appendChild(line);
    var term = document.getElementById("terminal");
    term.scrollTop = term.scrollHeight;
  }

  function runCommand(cmd) {
    if (terminated || !cmd.trim()) return;
    termLine("bastion:~$ " + cmd, "good");
    if (RISK.test(cmd)) {
      termLine("POLICY BLOCK · destructive command intercepted", "bad");
      termLine("Session terminated · command blocked · evidence archived for replay", "bad");
      document.getElementById("blockBanner").hidden = false;
      terminated = true;
      document.getElementById("cmdInput").disabled = true;
      return;
    }
    var replies = {
      whoami: "svc-incident-engineer · role: read-only · jit-scope: prod-db.read",
      "show databases": "ledger_core (read) · reporting (read) · audit_archive (read)"
    };
    termLine(replies[cmd.toLowerCase()] || "command executed under least-privilege scope · recorded");
    termLine("recording: session archived · replay available");
  }

  document.querySelectorAll(".cmd").forEach(function (btn) {
    btn.addEventListener("click", function () { runCommand(btn.getAttribute("data-cmd")); });
  });
  document.getElementById("cmdForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("cmdInput");
    runCommand(input.value);
    input.value = "";
  });

  /* ---------- Module 3: NHI token mode ---------- */
  var TOKEN = {
    static: {
      state: "STATIC · OVER-PRIVILEGED", bad: true,
      value: "AKIA•••••••••••••••• (no expiry, full scope)",
      scopes: ["write", "all business lines", "no expiry"], ok: false
    },
    scoped: {
      state: "SCOPED · EPHEMERAL", bad: false,
      value: "nhi://risk-agent · ttl=5m · scope=report.read",
      scopes: ["read-only", "single business line", "5-minute TTL", "user-scoped"], ok: true
    }
  };

  function setMode(mode) {
    var t = TOKEN[mode];
    if (!t) return;
    document.querySelectorAll(".mode-btn").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-mode") === mode);
    });
    var st = document.querySelector(".token-state");
    st.textContent = t.state;
    st.className = "token-state " + (t.bad ? "bad" : "good");
    document.getElementById("tokenValue").textContent = t.value;
    var scopes = document.getElementById("tokenScopes");
    scopes.className = "token-scopes" + (t.ok ? " ok" : "");
    scopes.innerHTML = t.scopes.map(function (s) { return "<span>" + s + "</span>"; }).join("");
  }

  document.querySelectorAll(".mode-btn").forEach(function (btn) {
    btn.addEventListener("click", function () { setMode(btn.getAttribute("data-mode")); });
  });

  /* ---------- Reset buttons ---------- */
  document.querySelectorAll("[data-reset]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var which = btn.getAttribute("data-reset");
      if (which === "jml") setJML("join");
      if (which === "jit") resetJit();
      if (which === "term") {
        var term = document.getElementById("terminal");
        term.innerHTML = '<div class="term-line"><span class="prompt">bastion:~$</span> session isolated · recording started</div>';
        document.getElementById("blockBanner").hidden = true;
        var input = document.getElementById("cmdInput");
        input.disabled = false;
        input.value = "";
        terminated = false;
      }
    });
  });

  /* ---------- Initial state ---------- */
  setJML("join");
  renderSoD();
  renderAudit();
  resetJit();
})();

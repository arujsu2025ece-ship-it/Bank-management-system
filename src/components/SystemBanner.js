/* Dynamic system banner: reacts to connectivity, maintenance window and env. */
(function () {
  window.BMS = window.BMS || {};
  const KEY = "bms.banner.dismissed";

  function compute(cfg) {
    const now = Date.now();
    const start = Date.parse(cfg.banner.maintenanceStart);
    const end = Date.parse(cfg.banner.maintenanceEnd);
    if (!navigator.onLine)
      return { level: "offline", text: "You are offline. Changes will not be saved until the connection returns.", sticky: true };
    if (start && end && now >= start && now <= end)
      return { level: "maintenance", text: "Scheduled maintenance is in progress. Some services may be unavailable.", sticky: true };
    if (start && start > now) {
      const mins = Math.round((start - now) / 60000);
      const when = mins >= 60 ? Math.round(mins / 60) + " hr" : mins + " min";
      return { level: "notice", text: "Maintenance starts in " + when + ". Finish any open transfers.", sticky: false };
    }
    if (cfg.banner.message) return { level: "notice", text: cfg.banner.message, sticky: false };
    if (cfg.env !== "production")
      return { level: "env", text: "You are in the " + cfg.env + " environment. Data here is not real customer data.", sticky: false };
    return null;
  }

  function mount(el, cfg) {
    cfg = cfg || window.BMS.config;
    if (!cfg.banner.enabled) { el.hidden = true; return; }

    function render() {
      const state = compute(cfg);
      const dismissed = sessionStorage.getItem(KEY) === (state && state.text);
      if (!state || (dismissed && !state.sticky)) { el.hidden = true; return; }
      el.hidden = false;
      el.className = "banner banner--" + state.level;
      el.setAttribute("role", state.level === "offline" ? "alert" : "status");
      el.innerHTML = '<p class="banner__text"></p>' +
        (state.sticky ? "" : '<button class="banner__close" aria-label="Dismiss banner">&times;</button>');
      el.querySelector(".banner__text").textContent = state.text;
      const close = el.querySelector(".banner__close");
      if (close) close.addEventListener("click", function () {
        sessionStorage.setItem(KEY, state.text); render();
      });
    }

    window.addEventListener("online", render);
    window.addEventListener("offline", render);
    setInterval(render, 60000);
    render();
  }

  window.BMS.SystemBanner = { mount: mount, compute: compute };
})();

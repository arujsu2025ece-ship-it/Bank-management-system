(function () {
  window.BMS = window.BMS || {};
  const ITEMS = [
    ["Dashboard", "M3 12l9-9 9 9M5 10v10h14V10"],
    ["Tasks", "M9 11l3 3 8-8M4 12v7a1 1 0 0 0 1 1h14"],
    ["Accounts", "M3 10l9-6 9 6M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18"],
    ["Loans", "M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
    ["Transactions", "M7 7h13l-4-4M17 17H4l4 4"],
    ["Reports", "M4 20V10M10 20V4M16 20v-7M22 20H2"],
    ["Settings", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 12l2 1-2 4-2-1M5 12l-2-1 2-4 2 1"]
  ];
  function mount(el, opts) {
    el.innerHTML = '<nav aria-label="Main">' + ITEMS.map(function (it, i) {
      return '<a href="#" class="side__link' + (i === 1 ? ' is-active' : '') + '"' + (i === 1 ? ' aria-current="page"' : '') + '>' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + it[1] + '"/></svg>' +
        '<span>' + it[0] + '</span></a>';
    }).join("") + '</nav>' +
    '<p class="side__foot">v' + window.BMS.config.version + ' &middot; ' + window.BMS.config.env + '</p>';
    el.addEventListener("click", function (e) {
      const a = e.target.closest(".side__link"); if (!a) return;
      e.preventDefault();
      el.querySelectorAll(".side__link").forEach(function (l) { l.classList.remove("is-active"); l.removeAttribute("aria-current"); });
      a.classList.add("is-active"); a.setAttribute("aria-current", "page");
      opts.onNavigate();
    });
  }
  window.BMS.Sidebar = { mount: mount };
})();

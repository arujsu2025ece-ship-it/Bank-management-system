(function () {
  window.BMS = window.BMS || {};
  function mount(el, opts) {
    const cfg = window.BMS.config;
    el.innerHTML =
      '<button class="icon-btn nav__menu" aria-label="Open menu" aria-expanded="false" aria-controls="sidebar">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>' +
      '<a class="nav__brand" href="#"><span class="nav__mark" aria-hidden="true">B</span><span>' + cfg.appName + '</span></a>' +
      '<label class="nav__search"><span class="sr-only">Search tasks</span>' +
        '<input type="search" id="task-search" placeholder="Search tasks, accounts, IDs" autocomplete="off"></label>' +
      '<div class="nav__right">' +
        '<button class="icon-btn" aria-label="Notifications"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4"/></svg><span class="dot"></span></button>' +
        '<div class="user" title="Signed in as Aruj (Teller)"><span class="user__avatar">A</span><span class="user__name">Aruj</span></div>' +
      '</div>';
    el.querySelector(".nav__menu").addEventListener("click", opts.onMenu);
    el.querySelector("#task-search").addEventListener("input", function (e) { opts.onSearch(e.target.value); });
  }
  window.BMS.Navbar = { mount: mount };
})();

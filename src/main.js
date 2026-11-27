(function () {
  const B = window.BMS;
  const $ = function (s) { return document.querySelector(s); };
  document.title = B.config.appName;

  B.SystemBanner.mount($("#system-banner"));

  const shell = $(".shell");
  function setSidebar(open) {
    shell.classList.toggle("sidebar-open", open);
    const btn = $(".nav__menu"); if (btn) btn.setAttribute("aria-expanded", String(open));
  }
  B.Navbar.mount($("#navbar"), {
    onMenu: function () { setSidebar(!shell.classList.contains("sidebar-open")); },
    onSearch: function (q) { query = q.toLowerCase(); renderTasks(); }
  });
  B.Sidebar.mount($("#sidebar"), { onNavigate: function () { setSidebar(false); } });
  $("#scrim").addEventListener("click", function () { setSidebar(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setSidebar(false); });

  let query = "", filter = "all";
  const list = $("#task-list");
  function renderTasks() {
    const rows = B.tasks.filter(function (t) {
      const hit = (t.title + t.id + t.account + t.assignee).toLowerCase().indexOf(query) > -1;
      return hit && (filter === "all" || t.status === filter);
    });
    list.innerHTML = "";
    rows.forEach(function (t) { list.appendChild(B.TaskCard.create(t)); });
    $("#empty").hidden = rows.length > 0;
    $("#count").textContent = rows.length + (rows.length === 1 ? " task" : " tasks");
    $("#stat-total").textContent = B.tasks.length;
    $("#stat-todo").textContent = B.tasks.filter(function (t) { return t.status === "todo"; }).length;
    $("#stat-progress").textContent = B.tasks.filter(function (t) { return t.status === "progress"; }).length;
    $("#stat-done").textContent = B.tasks.filter(function (t) { return t.status === "done"; }).length;
  }
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () {
      filter = b.dataset.filter;
      document.querySelectorAll(".tab").forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
      renderTasks();
    });
  });

  const dialog = $("#task-dialog");
  $("#new-task-button").addEventListener("click", function () { dialog.showModal(); });
  dialog.querySelectorAll(".dialog-close").forEach(function (button) {
    button.addEventListener("click", function () { dialog.close(); });
  });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });
  $("#task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const nextId = "BMS-" + (Math.max.apply(null, B.tasks.map(function (t) {
      return Number(t.id.replace(/\D/g, "")) || 0;
    })) + 1);
    B.tasks.unshift({
      id: nextId,
      title: data.get("title").trim(),
      account: data.get("account").trim(),
      status: data.get("status"),
      priority: data.get("priority"),
      assignee: "Aruj",
      due: "Today"
    });
    e.target.reset();
    dialog.close();
    filter = "all";
    document.querySelectorAll(".tab").forEach(function (x) {
      x.setAttribute("aria-selected", String(x.dataset.filter === "all"));
    });
    renderTasks();
  });
  renderTasks();
})();

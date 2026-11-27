(function () {
  window.BMS = window.BMS || {};
  const LABEL = { todo: "To do", progress: "In progress", review: "In review", done: "Done" };
  const PRI = { high: "High", medium: "Medium", low: "Low" };
  function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function create(t) {
    const li = document.createElement("li");
    li.className = "task task--" + t.priority;
    li.innerHTML =
      '<div class="task__top"><span class="task__id">' + esc(t.id) + '</span>' +
      '<span class="chip chip--' + t.status + '">' + LABEL[t.status] + '</span></div>' +
      '<h3 class="task__title">' + esc(t.title) + '</h3>' +
      '<dl class="task__meta"><div><dt>Account</dt><dd>' + esc(t.account) + '</dd></div>' +
      '<div><dt>Priority</dt><dd>' + PRI[t.priority] + '</dd></div>' +
      '<div><dt>Due</dt><dd>' + esc(t.due) + '</dd></div></dl>' +
      '<div class="task__foot"><span class="task__who"><span class="user__avatar">' +
      esc(t.assignee.split(" ").map(function (w) { return w[0]; }).join("")) + '</span>' + esc(t.assignee) + '</span></div>';
    return li;
  }
  window.BMS.TaskCard = { create: create };
})();

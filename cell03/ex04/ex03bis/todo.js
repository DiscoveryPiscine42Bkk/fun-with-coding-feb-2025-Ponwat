$(document).ready(function () {
  $("#new-todo").click(function () {
    const todo = prompt("Enter a new todo:");
    if (todo === null || todo === "") {
      return;
    }
    todos.push(todo);
    $("#ft_list").prepend(`<div class="todo">${todo}</div>`);
    const a = $(".todo");
    console.log(a);
  });

  $("#ft_list").on("click", ".todo", function () {
    if (confirm(`Do you want to delete ${$(this).text()}?`)) {
      $(this).remove();
    }
  });

  $(window).on("beforeunload", function () {
    const todos = $(".todo")
      .map((_, element) => element.innerHTML)
      .get()
      .reverse();
    const todos_json = JSON.stringify(todos);
    document.cookie = `todos=${todos_json}`;
  });

  const todos_cookie = document.cookie
    .split(";")
    .find((cookie) => cookie.startsWith("todos="));
  if (todos_cookie) {
    todos = JSON.parse(todos_cookie.split("=")[1]);
    todos.forEach((todo) => {
      $("#ft_list").prepend(`<div class="todo">${todo}</div>`);
    });
  }
});

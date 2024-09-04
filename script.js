document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const notStartedList = document.getElementById("not-started-list");
  const pendingList = document.getElementById("pending-list");
  const doneList = document.getElementById("done-list");

  // Load todos from localStorage
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function renderTodos() {
    notStartedList.innerHTML = "";
    pendingList.innerHTML = "";
    doneList.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = todo.text;

      // Create status dropdown
      const statusSelect = document.createElement("select");
      statusSelect.innerHTML = `
               <option value="not-started" ${
                 todo.status === "not-started" ? "selected" : ""
               }>Not Started</option>
               <option value="pending" ${
                 todo.status === "pending" ? "selected" : ""
               }>Pending</option>
               <option value="done" ${
                 todo.status === "done" ? "selected" : ""
               }>Done</option>
           `;
      statusSelect.addEventListener("change", (e) => {
        todos[index].status = e.target.value;
        saveTodos();
        renderTodos();
      });

      li.appendChild(statusSelect);

      // Conditionally add the delete button
      if (todo.status !== "pending") {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", (e) => {
          e.stopPropagation();
          todos.splice(index, 1);
          saveTodos();
          renderTodos();
        });

        li.appendChild(deleteButton);
      }

      // Append to appropriate list
      if (todo.status === "not-started") {
        notStartedList.appendChild(li);
      } else if (todo.status === "pending") {
        pendingList.appendChild(li);
      } else if (todo.status === "done") {
        doneList.appendChild(li);
      }
    });
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTodo = {
      text: input.value,
      status: "not-started",
    };
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    input.value = "";
  });

  renderTodos();
});

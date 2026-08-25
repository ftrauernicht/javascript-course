// Chapter 1 - To-Do List
const STORAGE_KEY = "todo-list-tasks";

const input = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const list = document.getElementById("task-list");

let tasks = loadTasks();

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function render() {
  list.innerHTML = tasks
    .map((task, index) => {
      const doneClass = task.done ? "task done" : "task";
      const checkedAttribute = task.done ? "checked" : "";
      return `
        <li class="${doneClass}">
          <input type="checkbox" data-index="${index}" ${checkedAttribute} />
          <span>${task.text}</span>
          <button class="remove" data-index="${index}">&times;</button>
        </li>
      `;
    })
    .join("");

  list.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const index = Number(checkbox.dataset.index);
      tasks[index].done = checkbox.checked;
      saveTasks();
      render();
    });
  });

  list.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      tasks.splice(index, 1);
      saveTasks();
      render();
    });
  });
}

function addTask() {
  const text = input.value.trim();
  if (text === "") {
    return;
  }

  tasks.push({ text: text, done: false });
  input.value = "";
  saveTasks();
  render();
}

addButton.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

render();

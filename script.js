const addBtn = document.getElementById("addBtn");

const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const task = taskInput.value.trim();

  if (task === "") {
    return;
  }

  const li = document.createElement("li");

  li.innerHTML = `
    <span class="task-text">${task}</span>
    <button class="delete">X</button>
  `;

  taskList.appendChild(li);

  taskInput.value = "";

  const deleteBtn = li.querySelector(".delete");

  deleteBtn.addEventListener("click", function () {
    li.remove();
  });
}

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearAll = document.getElementById("clearAll");
const themeToggle = document.getElementById("themeToggle");

// Charger les tâches
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Charger thème
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "🌙";
}

displayTasks();

// Bouton thème
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  } else {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀";
  }
});

// Ajouter une tâche
addBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  save();
  displayTasks();
});

// Afficher les tâches
function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = "task";

    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) span.classList.add("completed");

    span.addEventListener("click", () => {
      task.completed = !task.completed;
      save();
      displayTasks();
    });

    // SWIPE DELETE
    let startX = 0;
    li.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    li.addEventListener("touchmove", (e) => {
      let moveX = e.touches[0].clientX;
      if (startX - moveX > 50) {
        li.classList.add("swipe");
      }
    });

    li.addEventListener("touchend", () => {
      if (li.classList.contains("swipe")) {
        tasks.splice(index, 1);
        save();
        displayTasks();
      }
    });

    li.appendChild(span);
    taskList.appendChild(li);
  });
}

// Clear All
clearAll.addEventListener("click", () => {
  tasks = [];
  save();
  displayTasks();
});

// Sauvegarde
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filtres
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");

    filterTasks(btn.getAttribute("data-filter"));
  });
});

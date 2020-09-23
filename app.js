// Define UI Variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear task event
  clearBtn.addEventListener("click", clearTasks);

  // Filter tasks
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  const storedTasks = localStorage.getItem("tasks");
  let tasks = storedTasks === null ? [] : JSON.parse(storedTasks); // Making this nicer

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element for delete
    const link = document.createElement("a");
    // Add class to link
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li=
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element for delete
  const link = document.createElement("a");
  // Add class to link
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li=
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task in LS
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();

    // Remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
  e.preventDefault();
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  const storedTasks = localStorage.getItem("tasks");
  let tasks = storedTasks === null ? [] : JSON.parse(storedTasks); // Making this nicer

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
  // innerHTML is up to 400 times slower than using a while loop
  //   taskList.innerHTML = "";

  // Faster (while loop)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();

  e.preventDefault();
}

// Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.clear();
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  console.log(text);

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

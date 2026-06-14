const taskInput =
document.getElementById("taskInput");

const addBtn =
document.getElementById("addBtn");

const taskList =
document.getElementById("taskList");

const filterBtns =
document.querySelectorAll(".filter");

let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

let currentFilter = "all";

/* SAVE TO LOCAL STORAGE */

function saveTasks() {

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}

/* DISPLAY TASKS */

function renderTasks() {

taskList.innerHTML = "";

let filteredTasks = tasks.filter(task => {

if(currentFilter === "active")
return !task.completed;

if(currentFilter === "completed")
return task.completed;

return true;

});

filteredTasks.forEach(task => {

const li =
document.createElement("li");

li.className =
task.completed
? "task completed"
: "task";

li.dataset.id = task.id;

li.innerHTML = `
<span>${task.text}</span>

<div class="actions">

<button class="complete">
${task.completed ? "Undo" : "Done"}
</button>

<button class="edit">
Edit
</button>

<button class="delete">
Delete
</button>

</div>
`;

taskList.appendChild(li);

});

}

/* CREATE TASK */

addBtn.addEventListener("click", () => {

const text =
taskInput.value.trim();

if(text === "") return;

tasks.push({

id: Date.now(),

text: text,

completed: false

});

saveTasks();

renderTasks();

taskInput.value = "";

});

/* EVENT DELEGATION */

taskList.addEventListener("click", e => {

const li =
e.target.closest(".task");

if(!li) return;

const id =
Number(li.dataset.id);

const task =
tasks.find(t => t.id === id);

if(e.target.classList.contains("delete")){

tasks =
tasks.filter(
t => t.id !== id
);

}

if(e.target.classList.contains("complete")){

task.completed =
!task.completed;

}

if(e.target.classList.contains("edit")){

const newText =
prompt(
"Edit Task",
task.text
);

if(newText){

task.text =
newText.trim();

}

}

saveTasks();

renderTasks();

});

/* FILTERING */

filterBtns.forEach(btn => {

btn.addEventListener("click", () => {

document
.querySelector(".filter.active")
.classList
.remove("active");

btn.classList.add("active");

currentFilter =
btn.dataset.filter;

renderTasks();

});

});

renderTasks();

"use strict";

const input = document.querySelector(".search");
const flexBox = document.querySelector(".flexBox");
const addTask = document.querySelector(".addTask");
const popIt = document.querySelector(".popIt");
const cancer = document.querySelector(".cancer");
const apply = document.querySelector(".apply");
const fogging = document.querySelector(".fogging");
const tasks = [];
let currentTask;

const renderTasks = () => {
  const htmlTasks = document.querySelectorAll(".newTask");
  for (const htmlTask of htmlTasks) {
    flexBox.removeChild(htmlTask);
  }

  for (const task of tasks) {
    flexBox.insertBefore(task, addTask);
    task.addEventListener("click", () => {
      popIt.style.display = "block";
      fogging.style.display = "block";
      currentTask = task.id;
    });
  }
};

addTask.addEventListener("click", () => {
  popIt.style.display = "block";
  fogging.style.display = "block";
});

cancer.addEventListener("click", () => {
  popIt.style.display = "none";
  fogging.style.display = "none";
});

apply.addEventListener("click", (event) => {
  const name = document.querySelector(".nameNew");
  const date = document.querySelector(".dateNew");
  const user = document.querySelector(".userNew");
  const description = document.querySelector(".descriptionNew");
  const state = document.querySelector("select");
console.log(currentTask);

  if (+currentTask) {
    const task = document.getElementById(currentTask)
    console.log(task)
    document.querySelector(`#${currentTask} .name h3`) = name.value
    task.querySelector(".date p") = date.value
    task.querySelector(".user p") = user.value
    task.querySelector(".desc p") = description.value
    task.querySelector(".state p") = state.value
    
    return;
  }

  const task = createNewTask(
    name.value,
    date.value,
    user.value,
    description.value,
    state.value,
    `${tasks.length}`
  );

  tasks.push(task);
  renderTasks();
  popIt.style.display = "none";
  fogging.style.display = "none";
});

input.addEventListener("input", () => {
  const val = input.value.trim();
  const items = document.querySelectorAll(".newTask");
  if (val) {
    for (const item of items) {
      if (item.querySelector(".name").innerText.search(val) == -1) {
        item.classList.add("hide");
      } else {
        item.classList.remove("hide");
      }
    }
  }
});


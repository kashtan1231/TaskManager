"use strict";

const input = document.querySelector(".search");
const flexBox = document.querySelector(".flexBox");
const addTask = document.querySelector(".addTask");
const popIt = document.querySelector(".popIt");
const cancer = document.querySelector(".cancer");
const apply = document.querySelector(".apply");
const attention = document.querySelector(".attention");
const fogging = document.querySelector(".fogging");
const filter = document.querySelector(".filter");
const tasks = [];
const users = [];
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

const getChildElementByClass = (parent, className, nth = 1) => {
  let counter = 0;
  for (const node of parent.childNodes) {
    if (node.className === className) {
      counter++;
      if (counter === nth) return node;
    }
  }
  return null;
};

const getChildElementByName = (parent, name, nth = 1) => {
  let counter = 0;
  for (const node of parent.childNodes) {
    if (node.localName === name) {
      counter++;
      if (counter === nth) return node;
    }
  }
  return null;
};

addTask.addEventListener("click", () => {
  const name = document.querySelector(".nameNew");
  const date = document.querySelector(".dateNew");
  const user = document.querySelector(".userNew");
  const description = document.querySelector(".descriptionNew");
  const state = document.querySelector(".stateNew");

  name.value = null;
  date.value = null;
  user.value = null;
  description.value = null;
  state.value = null;

  popIt.style.display = "block";
  fogging.style.display = "block";
  attention.style.display = "none";
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

  if (currentTask) {
    const task = document.getElementById(currentTask);
    getChildElementByName(task, "h3").innerHTML = name.value;
    const content = getChildElementByClass(task, "content");
    getChildElementByName(content, "p").innerHTML = date.value;
    getChildElementByName(content, "p", 2).innerHTML = user.value;
    const desc = getChildElementByClass(task, "desc");
    getChildElementByName(desc, "p").innerHTML = description.value;
    const stateDiv = getChildElementByClass(task, "state");
    getChildElementByName(stateDiv, "p").innerHTML = state.value;

    popIt.style.display = "none";
    fogging.style.display = "none";
    currentTask = null;
    return;
  }
  if (name.value && date.value && user.value && state.value !== "Сталин") {
    const task = createNewTask(
      name.value,
      date.value,
      user.value,
      description.value,
      state.value,
      `${tasks.length}`
    );
    
    users.push(user);
for (const castomer of users) {
  if (castomer.value !== user.value) {
    const filUser = document.createElement("option");
    filUser.innerHTML = user.value;
    filter.appendChild(filUser);
    
  }
}
   


    tasks.push(task);
    renderTasks();
    popIt.style.display = "none";
    fogging.style.display = "none";
    currentTask = null;
    return;
  } else {
    attention.style.display = "block";
  }
});

input.addEventListener("input", () => {
  const val = input.value.trim();
  const items = document.querySelectorAll(".newTask");
  if (val) {
    for (const item of items) {
      if (getChildElementByName(item, "h3").innerText.search(val) == -1) {
        item.classList.add("hide");
      } else {
        item.classList.remove("hide");
      }
    }
    return;
  } else {
    for (const item of items) {
      item.classList.remove("hide");
    }
  }
  renderTasks();
});

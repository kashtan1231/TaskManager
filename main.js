"use strict";

const input = document.querySelector(".search");
const flexBox = document.querySelector(".flexBox");
const addTask = document.querySelector(".addTask");
const popIt = document.querySelector(".popIt");
const deletE = document.querySelector(".delete");
const cancer = document.querySelector(".cancer");
const apply = document.querySelector(".apply");
const attention = document.querySelector(".attention");
const attentionDate = document.querySelector(".attentionDate")
const fogging = document.querySelector(".fogging");
const filter = document.querySelector(".filter");
const filterButton = document.querySelector(".filterButton");
const tasks = [];
const users = [];
let currentTask;

const getPopItValues = () => {
  const name = document.querySelector(".nameNew");
  const date = document.querySelector(".dateNew");
  const user = document.querySelector(".userNew");
  const description = document.querySelector(".descriptionNew");
  const state = document.querySelector(".stateNew");

  return { name, date, user, description, state };
};

const getTaskValues = (task) => {
  const taskName = getChildElementByName(task, "h3");

  const content = getChildElementByClass(task, "content");
  const taskDate = getChildElementByName(content, "p");
  const taskUser = getChildElementByName(content, "p", 2);

  const desc = getChildElementByClass(task, "desc");
  const taskDescription = getChildElementByName(desc, "p");

  const stateDiv = getChildElementByClass(task, "state");
  const taskState = getChildElementByName(stateDiv, "p");

  return { taskName, taskDate, taskUser, taskDescription, taskState };
};

const setPopItValues = (
  namePop,
  datePop,
  userPop,
  descriptionPop,
  statePop
) => {
  const { name, date, user, description, state } = getPopItValues();

  name.value = namePop;
  date.value = datePop;
  user.value = userPop;
  description.value = descriptionPop;
  state.value = statePop;
};

const renderTasks = () => {
  const htmlTasks = document.querySelectorAll(".newTask");
  for (const htmlTask of htmlTasks) {
    flexBox.removeChild(htmlTask);
  }

  for (const taskId in tasks) {
    const task = tasks[taskId];
    task.id = taskId;
    flexBox.insertBefore(task, addTask);
    task.addEventListener("click", () => {
      const { taskName, taskDate, taskUser, taskDescription, taskState } =
        getTaskValues(task);
      setPopItValues(
        taskName.innerHTML,
        taskDate.innerHTML,
        taskUser.innerHTML,
        taskDescription.innerHTML,
        taskState.innerHTML
      );
      
      popIt.style.display = "block";
      fogging.style.display = "block";
      deletE.style.display = "inline";
      currentTask = task.id;
    });
  }
};

const dateComp = (year, month, day, yearPop, monthPop, dayPop) => {
  if (+yearPop > +year) return true;
  else if (+yearPop === +year) {
    if (+monthPop > +month) return true;
    else if (+monthPop === +month) {
      if (+dayPop >= +day) return true;
      else return false;
    } else return false;
  } else return false;
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
  const { name, date, user, description, state } = getPopItValues();

  name.value = "Name";
  date.value = null;
  user.value = "User";
  description.value = "Desc";
  state.value = "В процессе";

  popIt.style.display = "block";
  fogging.style.display = "block";
  attention.style.display = "none";
  deletE.style.display = "none";
});

deletE.addEventListener("click", () => {
  if (currentTask) {
    tasks.splice(currentTask, 1);
    renderTasks();
  }
  currentTask = null;
  popIt.style.display = "none";
  fogging.style.display = "none";
});

cancer.addEventListener("click", () => {
  popIt.style.display = "none";
  fogging.style.display = "none";
  currentTask = null;
});

apply.addEventListener("click", (event) => {
  const { name, date, user, description, state } = getPopItValues();
  const today = new Date();

  if (currentTask) {
    const task = document.getElementById(currentTask);

    const { taskName, taskDate, taskUser, taskDescription, taskState } =
      getTaskValues(task);

    taskName.innerHTML = name.value;
    taskDate.innerHTML = date.value;
    taskUser.innerHTML = user.value;
    taskDescription.innerHTML = description.value;
    taskState.innerHTML = state.value;

    popIt.style.display = "none";
    fogging.style.display = "none";
    currentTask = null;
    return;
  }
  if (name.value && date.value && user.value && state.value) {
    const [yearPop, monthPop, dayPop] = date.value.split("-");
    const [year, month, day] = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];

    if (dateComp(year, month, day, yearPop, monthPop, dayPop) === true) {
      const task = createNewTask(
        name.value,
        date.value,
        user.value,
        description.value,
        state.value,
        `${tasks.length}`
      );

      let chek = false;
      for (let i = 0; i < filter.children.length; i++) {
        if (user.value === filter.options[i].innerHTML) {
          chek = true;
        }
      }

      if (!chek) {
        const filUser = document.createElement("option");
        filUser.innerHTML = user.value;
        filter.appendChild(filUser);
      }

      tasks.push(task);
      renderTasks();
      popIt.style.display = "none";
      fogging.style.display = "none";
      currentTask = null;
      attention.style.display = "none";
      attentionDate.style.display = "none";
    } else {
      attentionDate.style.display = "block";
      attention.style.display = "none";
    }
  } else {
    attention.style.display = "block";
    attentionDate.style.display = "none";
  }
});

filterButton.addEventListener("click", () => {
  const index = filter.options.selectedIndex;
  const val = filter.options[index].innerHTML;
  const items = document.querySelectorAll(".newTask");

  for (const item of items) {
    const content = getChildElementByClass(item, "content");

    if (getChildElementByName(content, "p", 2).innerHTML !== val) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
    }
    if (val === filter.options[0].innerHTML) {
      item.classList.remove("hide");
    }
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

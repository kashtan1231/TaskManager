const createNewTask = (name, date, user, description, state, id) => {
  const task = document.createElement("div");
  task.className = "newTask";

  const header = document.createElement("h3");
  header.innerHTML = name;

  task.appendChild(header);

  const content = document.createElement("div");
  content.className = "content";

  task.appendChild(content);

  const dateP = document.createElement("p");
  dateP.innerHTML = date;

  content.appendChild(dateP);

  const userP = document.createElement("p");
  userP.innerHTML = user;

  content.appendChild(userP);

  const separate = document.createElement("div");
  separate.className = "separate";

  task.appendChild(separate);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "desc";

  task.appendChild(descriptionDiv);

  const descriptionP = document.createElement("p");
  descriptionP.innerHTML = description;

  descriptionDiv.appendChild(descriptionP);

  const stateDiv = document.createElement("div");
  stateDiv.className = "state";

  task.appendChild(stateDiv);

  const stateP = document.createElement("p");
  stateP.innerHTML = state;

  stateDiv.appendChild(stateP);

  task.id = id;

  return task;
};

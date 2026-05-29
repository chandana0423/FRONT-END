const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskDesc = document.getElementById("taskDesc");
const taskList = document.getElementById("taskList");
const filterInput = document.getElementById("filterInput");

const cityInput = document.getElementById("cityInput");
const weatherBtn = document.getElementById("weatherBtn");
const weatherResult = document.getElementById("weatherResult");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks(taskArray) {
  taskList.innerHTML = "";

  taskArray.map((task) => {
    const div = document.createElement("div");

    div.classList.add("task");

    div.innerHTML = `
      <h3>${task.name}</h3>
      <p>${task.description}</p>
      <button class="delete-btn" onclick="deleteTask(${task.id})">
        Delete
      </button>
    `;

    taskList.appendChild(div);
  });
}


taskForm.onsubmit = function (e) {
  e.preventDefault();

  const newTask = {
    id: Date.now(),
    name: taskName.value,
    description: taskDesc.value,
  };

  tasks.push(newTask);


  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(tasks);


  taskName.value = "";
  taskDesc.value = "";
};

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(tasks);
}

filterInput.addEventListener("keyup", function () {
  const searchText = filterInput.value.toLowerCase();

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchText)
  );

  renderTasks(filteredTasks);
});


renderTasks(tasks);


weatherBtn.addEventListener("click", async () => {
  const city = cityInput.value;

  if (city === "") {
    alert("Please enter city name");
    return;
  }

  try {
    const response = await fetch(
      `https://wttr.in/${city}?format=j1`
    );

    const data = await response.json();

    const temp = data.current_condition[0].temp_C;

    weatherResult.innerHTML = `
      City: ${city} <br>
      Temperature: ${temp} °C
    `;
  } catch (error) {
    weatherResult.innerHTML = "Error fetching weather data";
  }
});
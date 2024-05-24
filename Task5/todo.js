let tasks = [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dateInput = document.getElementById('dateInput');
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value || new Date().toISOString().split('T')[0]; // Use current date if no date is selected

  if (taskText === '') return;

  tasks.push({ text: taskText, date: taskDate, completed: false });
  taskInput.value = '';
  dateInput.value = '';
  sortTasksByDate();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

function sortTasksByDate() {
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
}

function displayTasks(filteredTasks = tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  filteredTasks.forEach((task, index) => {
    const tr = document.createElement('tr');

    const tdTask = document.createElement('td');
    tdTask.textContent = task.text;

    const tdDate = document.createElement('td');
    tdDate.textContent = task.date;

    const tdCompleted = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'check';
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleTaskStatus(index);
    tdCompleted.appendChild(checkbox);

    const tdActions = document.createElement('td');
    const dltBtn = document.createElement('button');
    dltBtn.textContent = 'Delete';
    dltBtn.className = 'dltBtn';
    dltBtn.onclick = () => deleteTask(index);
    tdActions.appendChild(dltBtn);

    tr.appendChild(tdTask);
    tr.appendChild(tdDate);
    tr.appendChild(tdCompleted);
    tr.appendChild(tdActions);
    taskList.appendChild(tr);
  });
}

function searchTasks() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchInput));
  displayTasks(filteredTasks);
}

function displayCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  displayTasks(completedTasks);
}

function displayPendingTasks() {
  const pendingTasks = tasks.filter(task => !task.completed);
  displayTasks(pendingTasks);
}

function displayTasksByDate() {
  const dateInput = document.getElementById('dateInput').value;
  const filteredTasks = tasks.filter(task => task.date === dateInput);
  displayTasks(filteredTasks);
}

let zoomLevel = 100;

function zoomIn() {
  zoomLevel += 5;
  updateZoom();
}

function zoomOut() {
  zoomLevel = Math.max(zoomLevel - 5, 5);
  updateZoom();
}

function updateZoom() {
  document.body.style.zoom = `${zoomLevel}%`;
}

document.getElementById('zoomInBtn').addEventListener('click', zoomIn);
document.getElementById('zoomOutBtn').addEventListener('click', zoomOut);

displayTasks();


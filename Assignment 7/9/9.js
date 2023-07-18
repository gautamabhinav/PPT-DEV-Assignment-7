const taskInput = document.getElementById('task-input');
const submitButton = document.getElementById('submit-btn');
const taskList = document.getElementById('task-list');

submitButton.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);

function addTask() {
  const task = taskInput.value.trim();

  if (task !== '') {
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
    taskInput.value = '';
  }
}

function createTaskItem(task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = task;
  const updateButton = document.createElement('button');
  updateButton.textContent = 'Update Status';
  updateButton.classList.add('update-button');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Todo';
  li.appendChild(span);
  li.appendChild(updateButton);
  li.appendChild(deleteButton);
  return li;
}

function handleTaskActions(event) {
  if (event.target.classList.contains('update-button')) {
    updateTaskStatus(event.target.parentNode);
  } else if (event.target.textContent === 'Delete Todo') {
    deleteTask(event.target.parentNode);
  }
}

function updateTaskStatus(taskItem) {
  taskItem.classList.toggle('completed');
}

function deleteTask(taskItem) {
  taskItem.remove();
}

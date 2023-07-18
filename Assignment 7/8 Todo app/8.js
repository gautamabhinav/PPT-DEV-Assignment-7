const taskInput = document.getElementById('task-input');
const submitButton = document.getElementById('submit-btn');
const taskList = document.getElementById('task-list');

submitButton.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);

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
  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  li.appendChild(span);
  li.appendChild(removeButton);
  return li;
}

function removeTask(event) {
  if (event.target.nodeName === 'BUTTON') {
    const li = event.target.parentNode;
    taskList.removeChild(li);
  }
}

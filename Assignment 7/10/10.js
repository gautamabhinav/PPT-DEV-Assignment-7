const taskInput = document.getElementById('task-input');
const submitButton = document.getElementById('submit-btn');
const taskList = document.getElementById('task-list');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const editTaskInput = document.getElementById('edit-task');
const updateButton = document.getElementById('update-btn');
let currentTaskItem = null;

submitButton.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);
editForm.addEventListener('submit', updateTask);

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
  const actionsContainer = document.createElement('div');
  actionsContainer.classList.add('actions');
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('edit-button');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Todo';
  actionsContainer.appendChild(editButton);
  actionsContainer.appendChild(deleteButton);
  li.appendChild(span);
  li.appendChild(actionsContainer);
  return li;
}

function handleTaskActions(event) {
  if (event.target.classList.contains('edit-button')) {
    openEditModal(event.target.parentNode.parentNode);
  } else if (event.target.textContent === 'Delete Todo') {
    deleteTask(event.target.parentNode.parentNode);
  }
}

function openEditModal(taskItem) {
  currentTaskItem = taskItem;
  const taskText = taskItem.querySelector('span').textContent;
  editTaskInput.value = taskText;
  editModal.style.display = 'block';
}

function updateTask(event) {
  event.preventDefault();
  const updatedTask = editTaskInput.value.trim();

  if (updatedTask !== '') {
    currentTaskItem.querySelector('span').textContent = updatedTask;
    closeEditModal();
  }
}

function closeEditModal() {
  editModal.style.display = 'none';
  editTaskInput.value = '';
  currentTaskItem = null;
}

function deleteTask(taskItem) {
  taskItem.remove();
}

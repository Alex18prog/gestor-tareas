const tasksUl = document.getElementById('tasks');
const addTaskBtn = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');

// Función para cargar tareas desde el backend
async function loadTasks() {
  const res = await fetch('/tasks');
  const tasks = await res.json();
  tasksUl.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.task;

    // Botón para eliminar
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Eliminar';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(delBtn);
    tasksUl.appendChild(li);
  });
}

// Función para añadir tarea
addTaskBtn.addEventListener('click', async () => {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;

  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: taskText })
  });

  newTaskInput.value = '';
  loadTasks();
});

// Función para eliminar tarea
async function deleteTask(id) {
  await fetch(`/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

// Cargar tareas al inicio
loadTasks();

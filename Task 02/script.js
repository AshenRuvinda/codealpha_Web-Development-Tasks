// Load tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingIndex = null;

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const pendingTaskList = document.getElementById('pendingTaskList');
    const completedTaskList = document.getElementById('completedTaskList');
    pendingTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="button-group">
                <button class="edit-btn" onclick="openEditModal(${index})">Edit</button>
                <button class="${task.completed ? 'undo-btn' : 'complete-btn'}" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        // Add animation classes
        taskItem.classList.add('task-item-enter');
        setTimeout(() => {
            taskItem.classList.remove('task-item-enter');
            taskItem.classList.add('task-item-enter-active');
        }, 10);

        if (task.completed) {
            completedTaskList.appendChild(taskItem);
        } else {
            pendingTaskList.appendChild(taskItem);
        }
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }
}

function openEditModal(index) {
    editingIndex = index;
    const editInput = document.getElementById('editInput');
    editInput.value = tasks[index].text;
    document.getElementById('editModal').classList.add('active');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    editingIndex = null;
}

function saveEditedTask() {
    const editInput = document.getElementById('editInput');
    const newText = editInput.value.trim();
    if (newText && editingIndex !== null) {
        tasks[editingIndex].text = newText;
        saveTasks();
        renderTasks();
        closeEditModal();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    const taskList = tasks[index].completed ? document.getElementById('completedTaskList') : document.getElementById('pendingTaskList');
    const taskItems = Array.from(taskList.getElementsByClassName('task-item'));
    const taskItem = taskItems.find((el, i) => {
        const taskIndex = tasks.indexOf(tasks.find(t => t.text === el.querySelector('span').textContent && t.completed === tasks[index].completed));
        return taskIndex === index;
    });

    if (taskItem) {
        taskItem.classList.add('task-item-exit');
        taskItem.classList.remove('task-item-enter-active');
        setTimeout(() => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }, 400); // Match animation duration
    } else {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Event listeners
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

document.getElementById('saveEditBtn').addEventListener('click', saveEditedTask);
document.getElementById('cancelEditBtn').addEventListener('click', closeEditModal);
document.getElementById('editInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveEditedTask();
});

// Initial render
renderTasks();
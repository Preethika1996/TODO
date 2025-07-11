
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filterSelect');
const resetButton = document.getElementById('resetButton');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = filterTasks();
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        li.appendChild(taskText);

     
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);
        li.appendChild(editButton);

      
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        li.appendChild(deleteButton);

      
        const completeCheckbox = document.createElement('input');
        completeCheckbox.type = 'checkbox';
        completeCheckbox.checked = task.completed;
        completeCheckbox.onchange = () => toggleTaskCompletion(index);
        li.appendChild(completeCheckbox);

        taskList.appendChild(li);
    });
}


function filterTasks() {
    const filter = filterSelect.value;
    if (filter === 'active') {
        return tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        return tasks.filter(task => task.completed);
    }
    return tasks;
}

addTaskButton.onclick = function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        taskInput.value = '';
        saveTasks();
        renderTasks();
    } else {
        alert('Please enter a task');
    }
};


function editTask(index) {
    const newTaskText = prompt('Edit task:', tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        saveTasks();
        renderTasks();
    }
}


function deleteTask(index) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}


function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


resetButton.onclick = function () {
    const confirmReset = confirm('Are you sure you want to reset all tasks?');
    if (confirmReset) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
};

renderTasks();


filterSelect.onchange = renderTasks;

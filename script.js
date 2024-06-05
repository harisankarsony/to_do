let tasks = [];
let activeButton = 'all';

const input = document.querySelector('.input');
const taskContainer = document.querySelector('.task-container');
const taskList = document.querySelector('.task-list');
const taskFooter = document.querySelector('.task-footer');

// render current tasks in the task-list.
function showTasks(uncompletedAttr, activeButtonAttr = 'all') {
    let uncompleted = uncompletedAttr;
    const html = `${tasks.map(function (task, index) {
        let id = task.id;
        let isDone = task.done;
        let checkedVal = 'unchecked';
        let textDecor = 'none';
        if (isDone === 1) {
            checkedVal = 'checked';
            textDecor = 'line-through';
        }
        return `<li><input data='${id}' type="checkbox" class="checkbox" ${checkedVal} /><label style="text-decoration: ${textDecor};" class='label'>${task['text']}</label><button data='${index}' class="delete-button">x</button></li>`
    }).join('')}`;

    taskContainer.style.display = 'block';

    taskList.innerHTML = html;

    let allOutlineStatus = 'none';
    let activeOutlineStatus = 'none';
    let completedOutlineStatus = 'none';
    switch (activeButtonAttr) {
        case 'active':
            activeOutlineStatus = '1px solid rgba(182, 0, 0, 0.747)';
            break;
        case 'completed':
            completedOutlineStatus = '1px solid rgba(182, 0, 0, 0.747)';
            break;
        case 'all':
            allOutlineStatus = '1px solid rgba(182, 0, 0, 0.747)';
            break;
    }
    let taskFooterHtml = `<button class='all' style="outline: ${allOutlineStatus}; border-radius: 3px;" onclick="showAllTasks()">All</button> <button class='active' style="outline: ${activeOutlineStatus}; border-radius: 3px;" onclick="showActiveTasks()">Active</button> <button class='completed' style="outline: ${completedOutlineStatus}; border-radius: 3px;" onclick="showCompletedTasks()">Completed</button><button class='clear' onclick="deleteCompletedTasks()">Clear completed</button>`;

    let length = tasks.length;

    length === 1 ? taskFooter.innerHTML = `${uncompleted} item left ${taskFooterHtml}` : taskFooter.innerHTML = `${uncompleted} items left ${taskFooterHtml}`;
}

// add new task to task list
input.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        if (input.value.length !== 0) {
            tasks.unshift({ text: input.value, done: 0, id: Date.now().toString() });

            if (activeButton === 'completed')
                showCompletedTasks()
            else if (activeButton === 'active')
                showActiveTasks();
            else
                showAllTasks();

            input.value = '';
        }
    }
});

// delete existing task from task list
// mark completed task as done
taskList.addEventListener('click', (e) => {

    let currid = e.target.getAttribute('data');
    let i;
    tasks.forEach((task, index) => {
        if (task.id === currid) {
            i = index
        }
    });

    if (e.target.className === 'delete-button') {
        tasks.splice(i, 1);
    }

    else if (e.target.className === 'checkbox') {
        tasks[i].done === 1 ? tasks[i].done = 0 : tasks[i].done = 1;
    }

    if (activeButton === 'completed')
        showCompletedTasks();
    else if (activeButton === 'active')
        showActiveTasks();
    else
        showAllTasks();
});

// get uncompleted count
function getUnCompletedCount(tasks) {
    return tasks.filter(item => !item.done).length;
}

// show completed tasks
function showCompletedTasks() {
    let uncompleted = getUnCompletedCount(tasks);
    let tempTasks = tasks;
    tasks = tasks.filter(task => task.done > 0);
    activeButton = 'completed';
    showTasks(uncompleted, activeButton);
    tasks = tempTasks;
}

// show active tasks
function showActiveTasks() {
    let uncompleted = getUnCompletedCount(tasks);
    let tempTasks = tasks;
    tasks = tasks.filter(task => task.done === 0);
    activeButton = 'active';
    showTasks(uncompleted, activeButton);
    tasks = tempTasks;
}

// show all tasks
function showAllTasks() {
    let uncompleted = getUnCompletedCount(tasks);
    activeButton = 'all';
    showTasks(uncompleted, activeButton);
}

// delete completed tasks
function deleteCompletedTasks() {
    tasks = tasks.filter(task => task.done === 0);
    if (activeButton === 'completed')
        showCompletedTasks()
    else if (activeButton === 'active')
        showActiveTasks();
    else
        showAllTasks();
}




// new code

// mark all tasks

let flag = 0;
function markAllTasks() {
    if (flag === 0) {
        for (i of tasks) {
            i.done = 1;
        }
        flag = 1;
    }
    else {
        for (i of tasks) {
            i.done = 0;
        }
        flag = 0;
    }
    if (activeButton === 'completed')
        showCompletedTasks()
    else if (activeButton === 'active')
        showActiveTasks();
    else
        showAllTasks();
}

// TO DO
// code cleanup and refactoring
// use DOM manipulation instead of writing html and assigning to innerHtml

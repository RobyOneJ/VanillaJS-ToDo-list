// add an array with some todo items
let todoTasks = [
    { name: "Walk Chilli", dueDate: "02/02/2024", done: false, category: "Low" },
    { name: "Make Dinner", dueDate: "02/02/2024", done: true, category: "Low" }
];

// specify available category options
const categories = ["High", "Important", "Medium", "Low"];
const selectElement = document.getElementById("task-category");
for (let cat of categories) {
    const optionElement = document.createElement("option");
    optionElement.value = cat;
    optionElement.innerText = cat;
    selectElement.appendChild(optionElement);
}
selectElement.selectedIndex = -1;

// being able to mark items as done. We're going to do this by tracking the state of the todo items in an array
updateTodoList();

function addTask() {
    const newTask = document.getElementById("new-task-text");
    const dueDate = document.getElementById("task-due-date");
    const catElement = selectElement.options[selectElement.selectedIndex];

    if (newTask.value && dueDate.value) {
        todoTasks.push({ name: newTask.value, dueDate: dueDate.value, done: false, category: catElement?.value});
        newTask.value = "";
        dueDate.value = "";
        selectElement.selectedIndex = -1;
        updateTodoList();
    }
}

function updateTodoList() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    for (const [index, task] of todoTasks.entries()) {
        const newTodoTaskElement = createNewTodoTaskElement(task, index);
        todoList.appendChild(newTodoTaskElement);
    }
}

function createNewTodoTaskElement(task, index) {
    const newTodoTaskTextElement = document.createElement("p");
    newTodoTaskTextElement.innerText = task.name;
    const taskDueDateTextElement = document.createElement("p");
    taskDueDateTextElement.innerText = task.dueDate;


    if (task.done == true) {
        newTodoTaskTextElement.classList.add("complete");
    }

    //const importantButtonElement = document.createElement("input");
    //importantButtonElement.type = "button";
    //importantButtonElement.value = "Important";
    //importantButtonElement.onclick = function () {
    //    toggleImportant(index);
    //};

    // create the category select
    const categorySelectElement = document.createElement("select");
    const emptyOption = document.createElement('option');
    emptyOption.value = undefined;
    categorySelectElement.appendChild(emptyOption);
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const optionElement = document.createElement("option");
        optionElement.value = cat;
        optionElement.innerText = cat;
        categorySelectElement.appendChild(optionElement);
        if (cat === task.category) {
            categorySelectElement.selectedIndex = i+1;
        }
    }

    // add empty option in the select
    //if (!task.category) {
    //    categorySelectElement.selectedIndex = -1;
    //}
        

    // add a function to update the task when changing category
    categorySelectElement.onchange = function () {
        const cat = categorySelectElement.options[categorySelectElement.selectedIndex];
        task.category = cat.value;
        updateTodoList();
    }

    const completeButtonElement = document.createElement("input");
    completeButtonElement.type = "button";
    completeButtonElement.value = "Complete";
    completeButtonElement.onclick = function () {
        toggleComplete(task);
    };

    const newTodoTaskElement = document.createElement("li");
    if (index > 0) {
        const upButtonElement = document.createElement("input");
        upButtonElement.type = "button";
        upButtonElement.value = "Up";
        upButtonElement.onclick = function () {
            moveUp(index);
        };
        newTodoTaskElement.appendChild(upButtonElement);
    }

    if (index < todoTasks.length - 1) {
        const downButtonElement = document.createElement("input");
        downButtonElement.type = "button";
        downButtonElement.value = "Dn";
        downButtonElement.onclick = function () {
            moveDown(index);
        };
        newTodoTaskElement.appendChild(downButtonElement);
    }

    if (task.category) {
        newTodoTaskElement.classList.add(task.category.toLowerCase());
    }
    


    newTodoTaskElement.appendChild(newTodoTaskTextElement);
    newTodoTaskElement.appendChild(taskDueDateTextElement);

    //if (task.important) {
    //    const importantMarkerTextElement = document.createElement("p");
    //    importantMarkerTextElement.innerText = "!";
    //    newTodoTaskElement.appendChild(importantMarkerTextElement);
    //}

    newTodoTaskElement.appendChild(categorySelectElement);
    newTodoTaskElement.appendChild(completeButtonElement);
    return newTodoTaskElement;
}

//function toggleImportant(index) {
//    if (todoTasks[index].important == false) {
//        todoTasks[index].important = true;
//    } else {
//        todoTasks[index].important = false;
//    }
//
//    updateTodoList();
//}


//going to use the index passed into the function to update the correct boolean in the todoTasksStatus array
function toggleComplete(task) {
    if (task.done == false) {
        task.done = true;
    } else {
        task.done = false;
    }

    updateTodoList();
}



// Add arrows for moving items up/down the list
function moveUp(index) {
    const item = todoTasks[index];
    const itemUp = todoTasks[index - 1];
    todoTasks[index - 1] = item;
    todoTasks[index] = itemUp;

    updateTodoList();
}

function moveDown(index) {
    const item = todoTasks[index];
    const itemDown = todoTasks[index + 1];
    todoTasks[index] = itemDown;
    todoTasks[index + 1] = item;

    updateTodoList();
}


// Categorise items by colour????
//function itemCategory() {
//
//}
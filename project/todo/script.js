// Retrieve todo from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem
("todo")) || [];
const TODO_INPUT = document.getElementById
("todoInput");
const TODO_LIST = document.getElementById
("todoList");
const TODO_COUNT = document.getElementById
("todoCount");
const ADD_BUTTON = document.querySelector(".btn");
const DEL_BUTTON = document.getElementById
("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    ADD_BUTTON.addEventListener("click", addTask);
    TODO_INPUT.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

function addTask() {
    const NEW_TASK = TODO_INPUT.value.trim();
    if (NEW_TASK !== "") {
        todo.push({
          text: NEW_TASK,
          disabled: false, 
        });
        saveToLocalStorage();
        TODO_INPUT.value = "";
        displayTasks();
    }
}

function deleteAllTasks() {
    // some logic
    console.log("TestDelete");
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function editTask(index) {
    const TODO_ITEM = document.getElementById(`todo-${index}`);
    const EXISTING_TEXT = todo[index].text;
    const INPUT_ELEMENT = document.createElement("input");

    INPUT_ELEMENT.value = EXISTING_TEXT;
    TODO_ITEM.replaceWith(INPUT_ELEMENT);
    INPUT_ELEMENT.focus();

    INPUT_ELEMENT.addEventListener("blur", function () {
        const UPDATE_TEXT = INPUT_ELEMENT.value.trim();
        if (UPDATE_TEXT) {
            todo[index].text = UPDATE_TEXT;
            saveToLocalStorage();
        }
        displayTasks();
    });

    INPUT_ELEMENT.addEventListener('keydown', function (event) {
        const UPDATE_TEXT = INPUT_ELEMENT.value.trim();
        if (event.key === "Enter") {
            event.preventDefault();
            todo[index].text = UPDATE_TEXT;
            saveToLocalStorage()
            displayTasks();
        }    
    });
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}
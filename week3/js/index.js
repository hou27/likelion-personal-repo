const todoContainerEl = document.querySelector("#todoContainer");
const todoInputEl = document.querySelector("#todoInput");
const todoButtonEl = document.querySelector("#todoButton");
const logoutButtonEl = document.querySelector("#logoutButton");

const checkLogin = () => {
  if (!localStorage.getItem("login")) {
    alert("로그인이 필요합니다.");
    location.href = "./signin.html";
  }
};

const createTodo = () => {
  const todoText = todoInputEl.value;

  const todos = JSON.parse(localStorage.getItem("todos"));
  const newTodo = {
    id: todos.length > 0 ? todos.at(-1).id + 1 : 1,
    content: todoText,
    complete: false,
    user: localStorage.getItem("login"),
  };

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  todoInputEl.value = "";

  readTodo();
};

const readTodo = () => {
  todoContainerEl.innerHTML = "";
  const todos = JSON.parse(localStorage.getItem("todos")).reverse();
  todos.forEach((todo) => {
    const divEl = document.createElement("div");
    const completeEl = document.createElement("input");
    const userEl = document.createElement("p");
    const deleteEl = document.createElement("button");
    const contentEl = document.createElement("label");

    divEl.className = "todoItem";

    completeEl.type = "checkbox";
    completeEl.className = "checkbox";
    completeEl.id = todo.id;
    completeEl.addEventListener("click", () => {
      updateComplete(todo.id, completeEl.checked);
    });
    completeEl.checked = todo.complete;

    deleteEl.type = "button";
    deleteEl.textContent = "X";
    deleteEl.className = "deleteButton";
    deleteEl.addEventListener("click", () => deleteTodo(todo.id));

    contentEl.textContent = todo.content;
    contentEl.htmlFor = todo.id;

    userEl.textContent = todo.user;

    divEl.append(completeEl, contentEl, userEl, deleteEl);
    todoContainerEl.append(divEl);
  });
};

const updateComplete = (id, isCompleted) => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  const index = todos.findIndex((todo) => todo.id === id);
  todos[index].complete = isCompleted;
  localStorage.setItem("todos", JSON.stringify(todos));
};

const init = () => {
  checkLogin();

  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }

  readTodo();

  todoButtonEl.addEventListener("click", createTodo);
};

document.addEventListener("DOMContentLoaded", init);

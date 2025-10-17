import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopusWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    console.log(data);

    addTodoPopup.close();
  },
});

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template");
    const todoElement = todo.getView();
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoPopup.setEventListeners();

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".popup_visible");
    closeModal(openModal);
    document.removeEventListener("keyup", handleEscapeClose);
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  document.addEventListener("keyup", handleEscapeClose);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const dueDate = Date.parse(date);
  if (!isNaN(dueDate)) {
    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    todosList.append(todo);
    evt.target.reset();
    newTodoValidator.resetValidation();

    addTodoPopup.close();

    closeModal(addTodoPopupEl);
  }
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

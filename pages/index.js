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
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

initAddTodoForm();

const { closeModal, openModal } = newFunction();

function newFunction() {
  const openModal = (modal) => {
    modal.classList.add("popup_visible");
  };
  const closeModal = (modal) => {
    modal.classList.remove("popup_visible");
  };
  return { closeModal, openModal };
}

function initAddTodoForm() {
  addTodoForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;
    const date = new Date(dateInput);

    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id };
    const todo = generateTodo(values);

    todosList.append(todo);
    todoCounter.updateTotal(true);

    // reset form and close popup properly
    addTodoForm.reset();
    closeModal(addTodoPopupEl);
  });
}

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopupEl);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();

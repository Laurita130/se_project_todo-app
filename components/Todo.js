class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._completed = data.completed;
    this._handleDelete = handleDelete;
    this._todoElement = null;
    this._todoCheckboxEl = null;
    this._todoLabel = null;
    this._setEventListeners = this._setEventListeners.bind(this);
  }

  _setEventListeners = () => {
    this._handleDeleteBtn =
      this._todoElement.querySelector(".todo__delete-btn");
    this._handleDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDelete(this._completed);
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._toggleCompletion();
      this._handleCheck(this._completed);
    });
  };

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _toggleCompletion() {
    this._completed = !this._completed;
  }

  _generateTodoDateEl() {
    this._todoDate = this._element.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  _generateNameEl() {
    this._todoNameEl = this._element.querySelector(".todo__name");
    this._todoNameEl.textContent = this._data.name;
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoNameEl.textContent = this._data.name;
    todoDate.textContent = this._data.date
      ? `Due: ${new Date(this._data.date).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`
      : "";

    this._generateCheckboxEl();
    this._setEventListeners();
    this._element = null;

    return this._todoElement;
  }
}

export default Todo;

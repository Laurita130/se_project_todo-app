class Todo {
  constructor(data, selector, handleCheck) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._completed = data.completed;
    this._todoElement = null;
    this._todoCheckboxEl = null;
    this._todoLabel = null;
    this._setEventListeners = this._setEventListeners.bind(this);
  }

  _setEventListeners() {
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
    if (this._handleCheck) {
      this._todoCheckboxEl.addEventListener("change", () => {
        this._handleCheck(this._data.completed);
      });
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    this._todoCheckboxEl.addEventListener(
      "change",
      this._toggleCompletion.bind(this)
    );
  }

  _toggleCompletion() {
    this._data.completed = !this._data.completed;

    this._todoLabel.classList.toggle("todo__label_completed");
  }

  _generateTodoDateEl() {
    const todoDate = this._todoElement.querySelector(".todo__date");
    const dueDate = new Date(this._data.date);
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

    return this._todoElement;
  }
}

export default Todo;

class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
    this._submitButton = formEl.querySelector(this._submitButton);
  }
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(formElement, inputElement) {
    const errorElementId = `#${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _toggleButtonState() {
    this._submitButtonEl = this._formEl.querySelector(
      this._submitButtonSelector
    );
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButtonEl.classList.add(this._inactiveButtonClass);
      this._submitButtonEl.disabled = true;
    } else {
      this._submitButtonEl.classList.remove(this._inactiveButtonClass);
      this._submitButtonEl.disabled = false;
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._formEl,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(this._formEl, inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._submitButtonEl);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formEl.reset(
        this._toggleButtonState(this._inputList, this._submitButtonSelector)
      );
    });
    this._setEventListeners();
    this._toggleButtonState(this._inputList, this._submitButtonSelector);
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._formEl, inputElement);
    });
    this._toggleButtonState(this._inputList, this._submitButtonSelector);
  }
}

export default FormValidator;

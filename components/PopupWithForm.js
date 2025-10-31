import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".popup__input");

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    if (this._popupForm) {
      this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        if (typeof this._handleFormSubmit === "function") {
          this._handleFormSubmit(this._getInputValues());
        }
        if (typeof this.close === "function") {
          this.close();
        }

        this._popupForm.reset();
      });
    }
  }

  close() {
    super.close();
    if (this._popupForm) {
      this._popupForm.reset();
    }
  }
}

export default PopupWithForm;

export default class FormValidator {
    constructor(object, formSelector) {
        this._object = object;
        this._formElement = document.querySelector(formSelector);
        this._buttonElement = this._formElement.querySelector(this._object.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._object.inputSelector));
    }

    _showInputError (inputElement, errorMessage) {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.add(this._object.inputErrorClass);
        errorElement.textContent = errorMessage;
      };
      
    _hideInputError (inputElement) {
        const errorElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.remove(this._object.inputErrorClass);
        errorElement.textContent = '';
    };

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
      
    disableButton () {
        this._buttonElement.classList.add(this._object.inactiveButtonClass); 
        this._buttonElement.disabled = true; 
    };

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        };
    };

    _toggleButtonState = () => { 
        if (this._hasInvalidInput()) { 
            this.disableButton()
        } else {
            this._buttonElement.classList.remove(this._object.inactiveButtonClass);
            this._buttonElement.disabled = false; 
        };
    };

    _setEventListeners = () => {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._errorElement = this._formElement.querySelector(`${inputElement.id}-error`);
            this._hideInputError(inputElement);
        })
    }

    enableValidation () {
        this._setEventListeners();
    };
}
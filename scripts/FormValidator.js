export default class FormValidator {
    constructor(object, formElement) {
        this._object = object;
        this._formElement = formElement;
        this._buttonElement = formElement.querySelector(this._object.submitButtonSelector);
        this._inputList = Array.from(formElement.querySelectorAll(this._object.inputSelector));
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
      
    _disableButton () {
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
        if (this._hasInvalidInput(this._inputList)) { 
            this._disableButton()
        } else {
            this._buttonElement.classList.remove(this._object.inactiveButtonClass);
            this._buttonElement.disabled = false; 
        };
    };

    _setEventListeners = () => {
        this._toggleButtonState(this._inputList);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList);
            });
        });
    };

    enableValidation () {
        this._buttonElement.classList.add(this._object.inactiveButtonClass);
        this._setEventListeners(this._formElement);
    };
}
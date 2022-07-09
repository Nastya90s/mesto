export default class FormValidator {
    constructor(object, formElement) {
        this._object = object;
        this._formElement = formElement;
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

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
      
    _disableButton (buttonElement) {
        buttonElement.classList.add(this._object.inactiveButtonClass); 
        buttonElement.disabled = true; 
    };

    _checkInputValidity (inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        };
    };

    _toggleButtonState = (inputList, buttonElement) => { 
        if (this._hasInvalidInput(inputList)) { 
            this._disableButton(buttonElement)
        } else {buttonElement.classList.remove(this._object.inactiveButtonClass) 
            buttonElement.disabled = false; 
        };
    };

    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._object.inputSelector));
        const buttonElement = this._formElement.querySelector(this._object.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    enableValidation () {
        const buttonElement = this._formElement.querySelector(this._object.submitButtonSelector);
        buttonElement.classList.add(this._object.inactiveButtonClass);
        this._setEventListeners(this._formElement);
    };
}
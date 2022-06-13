const showInputError = (object, formElement, inputElement, errorMessage) => {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (object, formElement, inputElement) => {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (object, formElement, inputElement) => {
  if (!inputElement.validity.valid){
    showInputError(object,formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(object, formElement, inputElement);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
};

const disableButton = (object, buttonElement) => {
  buttonElement.classList.add(object.inactiveButtonClass); 
  buttonElement.disabled = true; 
};

const toggleButtonState = (object, inputList, buttonElement) => { 
if (hasInvalidInput(inputList)) { 
  disableButton(object, buttonElement)
} else {buttonElement.classList.remove(object.inactiveButtonClass) 
  buttonElement.disabled = false; 
  };
};


const setEventListeners = (object, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);
  toggleButtonState(object, inputList, buttonElement);
  inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', function () {
    checkInputValidity(object, formElement, inputElement);
    toggleButtonState(object, inputList, buttonElement);
  });
 });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach((formElement) => {
      const buttonElement = formElement.querySelector(object.submitButtonSelector);
      buttonElement.classList.add(object.inactiveButtonClass);
      setEventListeners(object, formElement);
   });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
});

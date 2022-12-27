import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    constructor (popupSelector, submitCallback) {
        super(popupSelector); // Вызывает конструктор Popup, который сохраняет _popupElement
        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__save-button');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this.close = this.close.bind(this);
    }

    // Приватный метод, который собирает данные всех полей формы
    _getInputValues () {
       this._inputsData = {};
       this._inputList.forEach(input => {
        this._inputsData[input.name] = input.value;
       }) 
       return this._inputsData;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    renderLoading(state, message) {
        if (state) {
            this._submitButton.textContent = message;
        } else {
            this._submitButton.textContent = 'Сохранить';
        }
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues()
            this._submitCallback(inputValues)
        });
    }

    close () {
        this._form.reset()
        super.close();
    }
}
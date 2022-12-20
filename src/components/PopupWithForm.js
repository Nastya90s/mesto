import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    // Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    constructor (popupSelector, submitCallback) {
        super(popupSelector); // Вызывает конструктор Popup, который сохраняет _popupElement
        this._submitCallback = submitCallback;
        this._form = this._popupElement.querySelector('.popup__form');
        this.close = this.close.bind(this);
    }

    // Приватный метод, который собирает данные всех полей формы
    _getInputValues () {
        return Object.fromEntries(new FormData(this._form))
    }

    setEventListeners () {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues()
            this._submitCallback(inputValues)
            this.close()
        });
    }

    close () {
        this._form.reset()
        super.close(); // Родительским классом убираются обработчики Esc, клика вне зоны попапа 
    }
}
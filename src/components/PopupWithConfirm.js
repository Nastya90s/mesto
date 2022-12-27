import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popupElement.querySelector('.popup__form');
  };

    openCard (card) {
        this._card = card;
        super.open();
    }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._card)
    });
  }
};
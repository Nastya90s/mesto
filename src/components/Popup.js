export default class Popup {
  constructor (popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupCloseButton = this._popupElement.querySelector('.popup__close-button');
    console.log(popupSelector, this._popupElement);
    this._closeOnOverlay = this._closeOnOverlay.bind(this);
    this.close = this.close.bind(this);

  }
  
  close () {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _closeOnOverlay (evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose (evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._closeOnOverlay);
    this._popupCloseButton.addEventListener('click', this.close);
  }

  open () {
    document.addEventListener('keyup', this._handleEscClose);
    this._popupElement.classList.add('popup_opened');
  }
}
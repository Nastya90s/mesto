import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupImageStretch = this._popupElement.querySelector('.popup__image');
    this._popupImageSubtitle = this._popupElement.querySelector('.popup__subtitle');
  }
  open(link, name) {
    this._popupImageStretch.src = link;
    this._popupImageStretch.alt = name;
    this._popupImageSubtitle.textContent = name;

    super.open();
  }
}
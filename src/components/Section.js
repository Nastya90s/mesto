export default class Section {
  constructor ({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  // Добавление карточки
  addItem (element) {
    this._containerElement.prepend(element)
  }

  renderItems (cards) {
    cards.forEach(card => this._renderer(card))
  }
}
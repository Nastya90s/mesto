export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  // Добавление карточки
  addItem (element, prepend) {
    if (prepend) { // Если true то добавить в начало контейнера
      this._containerElement.prepend(element)
    } else { // Иначе, добавить в конец контейнера
      this._containerElement.append(element)
    }
  }

  render () {
    for (const item of this._items) {
      const element = this._renderer(item.link, item.name)
      this.addItem(element)
    }
  }
}
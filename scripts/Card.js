export default class Card {
    constructor(link, name, cardElement) {
        this._cardElement = cardElement;
        this._link = link;
        this._name = name;
    }

    _prepareTemplate() {
        const cardImage = this._cardElement.querySelector('.element__image');

        this._cardElement.querySelector('.element__title').textContent = this._name;
        cardImage.setAttribute('src', this._link);
        cardImage.setAttribute('alt', this._name);

        const likeButton = this._cardElement.querySelector('.element__like-button');
        const deleteButton = this._cardElement.querySelector('.element__delete-button');

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('element__like-button_active');
        })

        deleteButton.addEventListener('click', () => {
            this._cardElement.remove();
        })

        cardImage.addEventListener('click', () => {
            popupImageStretch.src = this._link;
            popupImageStretch.alt = this._name;
            popupImageSubtitle.textContent = this._name;
            openPopup(popupImage);
        })

        return this._cardElement;
    }

    getTemplate() {
        return this._prepareTemplate();
    }
  }
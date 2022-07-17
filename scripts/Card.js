export default class Card {
    constructor(link, name, elementsTemplate) {
        this._cardElement = elementsTemplate.querySelector('.element').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._link = link;
        this._name = name;
    }

    _addListenerLikeButton () {
        const likeButton = this._cardElement.querySelector('.element__like-button');

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('element__like-button_active');
        })
    }

    _addListenerDeleteButton () {
        const deleteButton = this._cardElement.querySelector('.element__delete-button');

        deleteButton.addEventListener('click', () => {
            this._cardElement.remove();
        })
    }

    _addListenerCardImage (popupImage, openPopup) {
        const popupImageStretch = popupImage.querySelector('.popup__image');
        const popupImageSubtitle = popupImage.querySelector('.popup__subtitle');

        this._cardImage.addEventListener('click', () => {
            popupImageStretch.src = this._link;
            popupImageStretch.alt = this._name;
            popupImageSubtitle.textContent = this._name;
            openPopup(popupImage);
        })
    }

    _prepareTemplate(popupImage, openPopup) {
        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._cardImage.setAttribute('src', this._link);
        this._cardImage.setAttribute('alt', this._name);

        this._addListenerLikeButton();
        this._addListenerDeleteButton();
        this._addListenerCardImage(popupImage, openPopup);

        return this._cardElement;
    }

    getTemplate(popupImage, openPopup) {
        return this._prepareTemplate(popupImage, openPopup);
    }
  }
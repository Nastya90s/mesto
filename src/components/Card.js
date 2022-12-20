export default class Card {
    constructor(link, name, templateSelector, handleCardClick) {
        this._elementsTemplate = document.querySelector(templateSelector).content;
        this._cardElement = this._elementsTemplate.querySelector('.element').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._likeButton = this._cardElement.querySelector('.element__like-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._handleCardClick = handleCardClick;
        this._link = link;
        this._name = name;
    }

    _toggleLikeButton () {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _deleteCard () {
        this._cardElement.remove();
    }

    _prepareTemplate() {
        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._cardImage.setAttribute('src', this._link);
        this._cardImage.setAttribute('alt', this._name);

        this._likeButton.addEventListener('click', () => this._toggleLikeButton());
        this._deleteButton.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', this._handleCardClick);

        return this._cardElement;
    }

    getTemplate() {
        return this._prepareTemplate();
    }
  }
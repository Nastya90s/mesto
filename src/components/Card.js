export default class Card {
    constructor(card, templateSelector, handleCardClick, handlePopupDeleteCard, userId, requestAddLike, requestRemoveLike ) {
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handlePopupDeleteCard = handlePopupDeleteCard;
        this._requestAddLike = requestAddLike;
        this._requestRemoveLike = requestRemoveLike;
        this._userId = userId;
        this._link = card.link;
        this._name = card.name;
        this._likes = card.likes;
        this._id = card._id;
        this._ownerId = card.owner._id;
    }

    _getTemplate() {
        const templateCardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true)

        return templateCardElement
    }

    addLike () {
        this._likeButton.classList.add('element__like-button_active');
    }

    removeLike () {
        this._likeButton.classList.remove('element__like-button_active');
    }

    _isLiked () {
        this._likes.forEach(user => {
            if (user._id === this._userId) {
                this.addLike()
            } else {
                this.removeLike()
            }
        })
    }

    _isOwner () {
        if (this._userId !== this._ownerId) {
            this._deleteButton.remove();
        }
    }

    deleteCard() {
        this._element.remove();
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('element__like-button_active');
    }

    _setEventListeners () {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();

            if (this._likeButton.classList.contains('element__like-button_active')) {
                this._requestAddLike();
            } else {
                this._requestRemoveLike();
            }
        }) 
        this._deleteButton.addEventListener('click', () => {
            this._handlePopupDeleteCard(this);
        })
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    setQuantityLikes(cardElement) {
        this._likeCount.textContent = cardElement.likes.length;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__like-button');
        this._deleteButton = this._element.querySelector('.element__delete-button');
        this._cardTitle =  this._element.querySelector('.element__title');
        this._likeCount = this._element.querySelector('.element__like-count');
        this._cardTitle.textContent = this._name;
        this._cardImage.setAttribute('src', this._link);
        this._cardImage.setAttribute('alt', this._name);
        this._likeCount.textContent = this._likes.length;
        this._isLiked();
        this._isOwner();
        this._setEventListeners();
        return this._element;
    }
  }
//Объявление popupEditProfile
const popupEditProfile = document.querySelector(".popup_type_edit");
const openPopUpEditProfile = document.querySelector(".profile__edit-button");

//Объявление данных из профиля
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

//Объявление popupAddPlace
const popupAddPlace = document.querySelector('.popup_type_add');
const openPopUpAddPlace = document.querySelector('.profile__add-button');

//Объявление элементов формы
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

const placeInput = popupAddPlace.querySelector('.popup__input_type_place');
const srcInput = popupAddPlace.querySelector('.popup__input_type_src');

//Объявление окна с картинкой
const popupImage = document.querySelector('.popup_type_image');
const popupImageStretch = popupImage.querySelector('.popup__image');
const popupImageSubtitle = popupImage.querySelector('.popup__subtitle');
   
//Template
const elementsTemplate = document.querySelector('#elements-template').content;
const elementsContainer = document.querySelector('.elements');

const createCards = (cardTitle, cardSrc) => {
  const cardElement = elementsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');

  cardElement.querySelector('.element__title').textContent = cardTitle;
  cardImage.setAttribute('src', cardSrc);
  cardImage.setAttribute('alt', cardTitle);

  const likeButton = cardElement.querySelector('.element__like-button');
  const deleteButton = cardElement.querySelector('.element__delete-button');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active');
  })

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  })

  cardImage.addEventListener('click', () => {
    popupImageStretch.src = cardSrc;
    popupImageStretch.alt = cardTitle;
    popupImageSubtitle.textContent = cardTitle;
    openPopup(popupImage);
  })

  return cardElement;
}

const renderCard = (newCard) => {
  elementsContainer.append(newCard);
}

initialCards.forEach(item => {
  const newCard = createCards(item.name, item.link)
  renderCard(newCard);

})

//Добавление новой картчоки
const addCard = (evt) => {
  evt.preventDefault();
  const newCard = createCards(placeInput.value, srcInput.value);
  elementsContainer.prepend(newCard);
  placeInput.value = '';
  srcInput.value = '';
  closePopup(popupAddPlace);
}

// Открытие и закрытие попапов
const openPopup = (popUp) => {
  popUp.classList.add("popup_opened");
  document.addEventListener("keyup", onDocumentKeyUp);
}

const closePopup = (popUp) => {
  popUp.classList.remove("popup_opened");
    document.removeEventListener('keyup', onDocumentKeyUp);
}

const onDocumentKeyUp = (evt) => {
  const popUp = document.querySelector('.popup_opened');
   if (evt.key === "Escape") {
   closePopup(popUp);
  }
}

openPopUpEditProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});

openPopUpAddPlace.addEventListener('click', () => {
  openPopup(popupAddPlace);
});

popupEditProfile.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupAddPlace.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupAddPlace);
});

popupImage.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupImage);
})

// Cохранение данных профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupAddPlace.addEventListener('submit', addCard);
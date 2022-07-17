import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './cards.js'

//Объявление popupEditProfile
const popupEditProfile = document.querySelector(".popup_type_edit");
const popUpOpenEditProfile = document.querySelector(".profile__edit-button");

//Объявление данных из профиля
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");

//Объявление popupAddPlace
const popupAddPlace = document.querySelector('.popup_type_add');
const popUpOpenAddPlace = document.querySelector('.profile__add-button');

//Объявление элементов формы
const formElementEdit = document.querySelector(".popup__form_type_edit");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

const formElementAdd = document.querySelector(".popup__form_type_add");
const placeInput = popupAddPlace.querySelector('.popup__input_type_place');
const srcInput = popupAddPlace.querySelector('.popup__input_type_src');

//Объявление окна с картинкой
const popupImage = document.querySelector('.popup_type_image');

//Template
const elementsTemplate = document.querySelector('#elements-template').content;
const elementsContainer = document.querySelector('.elements');

// Открытие и закрытие попапов
const openPopup = (popUp) => {
  popUp.classList.add("popup_opened");
  document.addEventListener("keyup", onDocumentKeyUp);
  popUp.addEventListener('mousedown', closeOnOverlay);
}

const createCards = (cardTitle, cardSrc) => {
  const card = new Card(cardSrc, cardTitle, elementsTemplate);

  return card.getTemplate(popupImage, openPopup)
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
  evt.target.reset();
  closePopup(popupAddPlace);
}

const closePopup = (popUp) => {
  popUp.classList.remove("popup_opened");
    document.removeEventListener('keyup', onDocumentKeyUp);
    popUp.removeEventListener('mousedown', closeOnOverlay);
}

const onDocumentKeyUp = (evt) => {
  if (evt.key === "Escape") {
   const popUp = document.querySelector('.popup_opened');
   closePopup(popUp);
  }
};

const closeOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
  }
};

popUpOpenEditProfile.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditProfile);
});

popUpOpenAddPlace.addEventListener('click', () => {
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
});

// Cохранение данных профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElementEdit.addEventListener('submit', handleProfileFormSubmit);
formElementAdd.addEventListener('submit', addCard);

// FormValidator
const formValidatorOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
}

const profileValidation = new FormValidator(formValidatorOptions, popupEditProfile);
const newCardValidation = new FormValidator(formValidatorOptions, popupAddPlace);

profileValidation.enableValidation();
newCardValidation.enableValidation();
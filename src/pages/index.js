import "../styles/index.css"; // Импорт стилей чтобы webpack их включил в обработку

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupAddSelector,
  popupEditSelector,
  popUpOpenEditProfile,
  popUpOpenAddPlace,
  formValidatorOptions,
  inputTypeName,
  inputTypeJob,
} from "../utils/variables.js";
import initialCards from "../cards.js";

//Объявление попапа с картинкой
const popupWithImage = new PopupWithImage(".popup_type_image");

// Объявление класса работы с инфрмацией пользователя
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
});

const profileValidation = new FormValidator(
  formValidatorOptions,
  ".popup_type_edit"
);
const newCardValidation = new FormValidator(
  formValidatorOptions,
  ".popup_type_add"
);

// Функция создания html-объекта карточки
const createCard = (link, name) => {
  // Новый экземпляр класса Card: ссылка, название и функция для клика по карточке
  const card = new Card(link, name, "#elements-template", () => {
    popupWithImage.open(link, name);
  });

  return card.getTemplate();
};

function handleCreateCardFromForm(inputValues) {
  const { place, src } = inputValues;
  newCardValidation.disableButton();
  const cardElement = createCard(src, place);
  cardsSection.addItem(cardElement, true);
}

function handleSubmitEditProfile(userData) {
  const { job, name } = userData;
  userInfo.setUserInfo({ title: name, subtitle: job });
}

// Экземпляр класса Section
const cardsSection = new Section(
  {
    items: initialCards, // Перечень карточек
    renderer: createCard, // Функция создания карточки
  },
  ".elements"
);

// Создать все карточки
cardsSection.render();

// Создание экземпляра класса для попапа добавления новой карточки
const popupAddCard = new PopupWithForm(
  popupAddSelector,
  handleCreateCardFromForm
);

// Вызов попапа добавления карточки
popUpOpenAddPlace.addEventListener("click", () => {
  newCardValidation.resetValidation();
  popupAddCard.open();
});

// Редактирование профиля
const popupEditProfile = new PopupWithForm(
  popupEditSelector,
  handleSubmitEditProfile
);

popUpOpenEditProfile.addEventListener("click", () => {
  profileValidation.resetValidation();
  // Получаем значения на странице
  const { title, subtitle } = userInfo.getUserInfo();

  // Присваиваем значения попапу редактирования профиля
  inputTypeName.value = title;
  inputTypeJob.value = subtitle;

  popupEditProfile.open(); // вместо openPopup(popupEditProfile);
});

profileValidation.enableValidation();
newCardValidation.enableValidation();

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();

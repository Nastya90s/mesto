import "../styles/index.css"; // Импорт стилей чтобы webpack их включил в обработку

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  popupAddSelector,
  popupEditSelector,
  popUpOpenEditProfile,
  popUpOpenAddPlace,
  formValidatorOptions,
  popupAvatar,
  avatarButton,
  popupConfirm,
} from "../utils/variables.js";

//Объявление попапа с картинкой
const popupWithImage = new PopupWithImage(".popup_type_image");
const popupWithConfirm = new PopupWithConfirm(popupConfirm, handleDeleteCard);

// Объявление класса работы с инфрмацией пользователя
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const profileValidation = new FormValidator(
  formValidatorOptions,
  ".popup_type_edit"
);
const newCardValidation = new FormValidator(
  formValidatorOptions,
  ".popup_type_add"
);
const avatarValidation = new FormValidator(
  formValidatorOptions, 
  ".popup_type_avatar"
)
function handleCardClick(name, link) {
  popupWithImage.open(link, name);
}

function handlePopupDeleteCard(data) {
  popupWithConfirm.openCard(data);
}

function handleDeleteCard(card) {
  api.removeCard(card._id)
    .then(() => {
      card.deleteCard()
      popupWithConfirm.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleUpdateAvatar(data) {
  popupWithAvatar.renderLoading(true, "Сохранение...")
  api.saveNewUserAvatar(data)
    .then((userData) => {
      console.log(userData);
      userInfo.setUserAvatar(userData)
      popupWithAvatar.close()
    })
    .catch((err) => {
      console.log(err);
    }) 
    .finally(() => {
      popupWithAvatar.renderLoading(false);
    })
}

// Функция создания html-объекта карточки
const createCard = (cardData) => {
  // Новый экземпляр класса Card: ссылка, название и функция для клика по карточке
  const card = new Card(
    cardData, 
    "#elements-template",
    handleCardClick, 
    handlePopupDeleteCard, 
    userId, 
    () => {
      api.addLike(card._id)
      .then((cardElement) => {
        card.addLike();
        card.setQuantityLikes(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
    }, 
    () => {
      api.removeLike(card._id)
      .then((cardElement) => {
        card.removeLike();
        card.setQuantityLikes(cardElement);
      })
      .catch((err) => {
        console.log(err);
      }) 
    });

  return card.generateCard();
};

function handleCreateCardFromForm(inputValues) {
  popupAddCard.renderLoading(true, 'Сохранение...');
  api.sendNewCard(inputValues)
    .then((res) => {
      cardsSection.addItem(createCard(res))
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false)
    })
}

function handleSubmitEditProfile(userData) {
  popupEditProfile.renderLoading(true, 'Сохранение...');
  api.saveNewUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo(res)
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false)
    })
}

// Экземпляр класса Section
const cardsSection = new Section(
  {
    renderer: (item) => {
      const finalCard = createCard(item);
      cardsSection.addItem(finalCard);
    } 
  },
  ".elements"
);


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

const popupWithAvatar = new PopupWithForm(popupAvatar, handleUpdateAvatar);

popUpOpenEditProfile.addEventListener("click", () => {
  profileValidation.resetValidation();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  popupEditProfile.open();
});
avatarButton.addEventListener("click", () => {
  avatarValidation.resetValidation();
  popupWithAvatar.open();
})

profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupWithAvatar.setEventListeners();
popupWithConfirm.setEventListeners();



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '94b9605b-5472-447a-96bc-8a72a81051a5',
    'Content-Type': 'application/json'
  }
}); 

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  console.log(userData);
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.user = userData;
    cardsSection.renderItems(initialCards.reverse());
})
.catch(err => {
  console.log(err);
});
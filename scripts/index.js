const openPopUp = document.querySelector(".profile__edit-button");
const closePopUp = document.querySelector(".popup__close-button");
const popUp = document.querySelector(".popup");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");


function openProfilePopup() {
    popUp.classList.add("popup_opened");
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

function closeProfilePopup() {
    popUp.classList.remove("popup_opened");
}

openPopUp.addEventListener("click", openProfilePopup)
closePopUp.addEventListener("click", closeProfilePopup)

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

function handlerProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closeProfilePopup();
}
formElement.addEventListener("submit", handlerProfileFormSubmit);
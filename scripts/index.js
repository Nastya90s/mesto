let openPopUp = document.querySelector(".profile__edit-button");
let closePopUp = document.querySelector(".popup__close-button");
let popUp = document.querySelector(".popup");



function open() {
    popUp.classList.add("popup_opened");
    nameInput.value = document.querySelector(".profile__title").textContent;
    jobInput.value = document.querySelector(".profile__subtitle").textContent;
}

function close() {
    popUp.classList.remove("popup_opened");
}

openPopUp.addEventListener("click", open)
closePopUp.addEventListener("click", close)

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input-name");
let jobInput = document.querySelector(".popup__input-job");

function formSubmitHandler(evt) {
    evt.preventDefault();
    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__subtitle").textContent = jobInput.value;
    close();
}
formElement.addEventListener("submit", formSubmitHandler);





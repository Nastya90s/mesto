export default class UserInfo {
  // Принимает в конструктор объект с селекторами имени пользователя и информации о себе
  constructor ({ titleSelector, subtitleSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
  }

  // Возвращает данные профиля
  getUserInfo () {
    return {
      title: this._titleElement.textContent,
      subtitle: this._subtitleElement.textContent
    };
  }

  // Устанавливает данные профиля
  setUserInfo ({ title, subtitle }) {
    this._titleElement.textContent = title;
    this._subtitleElement.textContent = subtitle;
  }
}
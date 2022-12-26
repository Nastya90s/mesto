export default class UserInfo {
  constructor ({ titleSelector, subtitleSelector, avatarSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo () {
    return {
      title: this._titleElement.textContent,
      subtitle: this._subtitleElement.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo ({ name, about }) {
    this._titleElement.textContent = name;
    this._subtitleElement.textContent = about;
  }

  setUserAvatar ({ avatar }) {
    this._avatar.src = avatar;
    this._avatar.alt = 'Аватар';
  }
}

 
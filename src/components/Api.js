export default class Api {
    constructor({ baseUrl, headers }) { 
      this._baseUrl = baseUrl;
      this._headers = headers;
  
      this._checkResponse = (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      };
    }
  
    getUserInfo() {
      return fetch(this._baseUrl + '/users/me', {
        method: 'Get',
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    getInitialCards() {
      return fetch(this._baseUrl + '/cards', {
        method: 'Get',
        headers: this._headers, 
    })
      .then(this._checkResponse);
    }
  
    saveNewUserInfo(userData) {
        console.log(userData)
      return fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.title,
          about: userData.subtitle
        })})
        .then(this._checkResponse);
    }
  
    saveNewUserAvatar(userData) {
    return fetch(this._baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: userData.avatar
        })})
        .then(this._checkResponse);
    }
  
    sendNewCard(inputValues) {
        console.log(inputValues);
      return fetch(this._baseUrl + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: inputValues.place,
          link: inputValues.src,
        })})
        .then(this._checkResponse);
    }
  
    removeCard(cardId) {
      return fetch(this._baseUrl + '/cards/' + cardId, {
        method: 'DELETE',
        headers: this._headers,
        })
        .then(this._checkResponse);
    }
  
    addLike(cardId) {
      return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
        method: 'PUT',
        headers: this._headers,
        })
        .then(this._checkResponse);
    }
  
    removeLike(cardId) {
      return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
        method: 'DELETE',
        headers: this._headers,
        })
        .then(this._checkResponse);
    }
  }
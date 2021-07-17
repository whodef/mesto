export default class Api {
    _api_prefix;
    _mandatory_headers;

    constructor(options) {
        this._api_prefix = options.url;
        this._mandatory_headers = options.headers;
    }

    static _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserData() {
        return fetch(`${this._api_prefix}/users/me`, {
            method: 'GET',
            headers: this._mandatory_headers
        })
            .then(Api._checkRes);
    }

    getCards() {
        return fetch(`${this._api_prefix}/cards`, {
            method: 'GET',
            headers: this._mandatory_headers
        })
            .then(Api._checkRes);
    }

    setUserAvatar(link) {
        return fetch(`${this._api_prefix}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._mandatory_headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(Api._checkRes);
    }

    setProfileInfo(name, caption) {
        return fetch(`${this._api_prefix}/users/me`, {
            method: 'PATCH',
            headers: this._mandatory_headers,
            body: JSON.stringify({
                name: name,
                about: caption
            })
        })
            .then(Api._checkRes);
    }

    addCard(name, link) {
        return fetch(`${this._api_prefix}/cards`, {
            method: 'POST',
            headers: this._mandatory_headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(Api._checkRes);
    }

    likeCard(cardId) {
        return fetch(`${this._api_prefix}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._mandatory_headers
        })
            .then(Api._checkRes);
    }

    removeLikeFromCard(cardId) {
        return fetch(`${this._api_prefix}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._mandatory_headers
        })
            .then(Api._checkRes);
    }

    deleteCard(cardId) {
        return fetch(`${this._api_prefix}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._mandatory_headers
        })
            .then(Api._checkRes);
    }
}
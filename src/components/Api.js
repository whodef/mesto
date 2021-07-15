export default class Api {
    #api_prefix;
    #mandatory_headers;

    constructor(options) {
        this.#api_prefix = options.url;
        this.#mandatory_headers = options.headers;
    }

    static #checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserData() {
        return fetch(`${this.#api_prefix}/users/me`, {
            method: 'GET',
            headers: this.#mandatory_headers
        })
            .then(Api.#checkRes);
    }

    getCards() {
        return fetch(`${this.#api_prefix}/cards`, {
            method: 'GET',
            headers: this.#mandatory_headers
        })
            .then(Api.#checkRes);
    }

    setUserAvatar(link) {
        return fetch(`${this.#api_prefix}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.#mandatory_headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(Api.#checkRes);
    }

    setProfileInfo(name, caption) {
        return fetch(`${this.#api_prefix}/users/me`, {
            method: 'PATCH',
            headers: this.#mandatory_headers,
            body: JSON.stringify({
                name: name,
                about: caption
            })
        })
            .then(Api.#checkRes);
    }

    addCard(name, link) {
        return fetch(`${this.#api_prefix}/cards`, {
            method: 'POST',
            headers: this.#mandatory_headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(Api.#checkRes);
    }

    likeCard(cardId) {
        return fetch(`${this.#api_prefix}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.#mandatory_headers
        })
            .then(Api.#checkRes);
    }

    removeLikeFromCard(cardId) {
        return fetch(`${this.#api_prefix}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.#mandatory_headers
        })
            .then(Api.#checkRes);
    }

    deleteCard(cardId) {
        return fetch(`${this.#api_prefix}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.#mandatory_headers
        })
            .then(Api.#checkRes);
    }
}
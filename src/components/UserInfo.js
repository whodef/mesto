export default class UserInfo {
    _name;
    _caption;

    constructor(nameSelector, captionSelector) {
        this._name = document.querySelector(nameSelector);
        this._caption = document.querySelector(captionSelector);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._caption.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data['name'];
        this._caption.textContent = data['description'];
    }
}
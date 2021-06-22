export default class UserInfo {
    _nameSelector;
    _captionSelector;
    _captionInput;
    _nameInput;
    _formEditProfile;

    constructor({ nameSelector, captionSelector }) {
        this._nameSelector = nameSelector;
        this._captionSelector = captionSelector;
    }

    getUserInfo() {
        this._formEditProfile = document.querySelector('.overlay__form');
        this._nameInput = this._formEditProfile.querySelector('#edit-name');
        this._captionInput = this._formEditProfile.querySelector('#edit-description');


        this._nameInput.value = this._nameSelector.textContent;
        this._captionInput.value = this._captionSelector.textContent;
    }

    setUserInfo(elem) {
        this._nameSelector.textContent = elem['input-name'];
        this._captionSelector.textContent = elem['input-description'];
    }
}
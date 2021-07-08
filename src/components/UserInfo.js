export default class UserInfo {
    // _userNameElement;
    // _userCaptionElement;
    // _userAvatarElement;
    // _userName;
    // _userCaption;
    // _userAvatar;
    // _userId;

    constructor({userNameSelector, userCaptionSelector, userAvatarSelector}) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userCaptionElement = document.querySelector(userCaptionSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
        this._userId = null;
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            caption: this._userCaptionElement.textContent,
            avatar: this._userAvatarElement.src,
            id: this._userId
        }
    }

    setUserInfo(data) {
        this._userNameElement.textContent = data['name'];
        this._userCaptionElement.textContent = data['about'];
        this._userAvatarElement.src = data['avatar'];
        this._userId = data['_id'];
    }
}
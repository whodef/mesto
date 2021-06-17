export default class UserInfo {

    constructor(name, info) {
        this._nameSelector = name;
        this._infoSelector = info;
    }

    getUserInfo = (data) => {
        let userInfo;
        userInfo = {
            name: data.name,
            info: data.info,
        };
        return userInfo;
    }

    setUserInfo = (data) => {
        this._nameSelector.textContent = data.name;
        this._infoSelector.textContent = data.info;
    }
}
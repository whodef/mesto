import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    _submitHandler;

    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        super.overlay.addEventListener('submit', this._submitHandler);
    }
}
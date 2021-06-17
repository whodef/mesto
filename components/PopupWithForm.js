import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

    constructor({ popupSelector, submitHandler }) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }

    _getInputValues = () => {
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.overlay__form-input'));
        this._formValues = {};

        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    _formSubmitHandler = (e) => {
        e.preventDefault();
        this._submitHandler(this._getInputValues());
    }

    close = () => {
        const inputList = Array.from(this._popupSelector.querySelectorAll('.overlay__form-input'));

        inputList.forEach(element => element.textContent = '');

        this._popupSelector.removeEventListener('submit', this._formSubmitHandler);
        super.close();
    }

    setEventListeners = () => {
        this._popupSelector.addEventListener('submit', this._formSubmitHandler);
        super.setEventListeners();
    }
}
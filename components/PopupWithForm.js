import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    _submitHandler;
    _resetHandler;

    constructor(popupSelector, {submitHandler, resetHandler}) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._resetHandler = resetHandler;
        this._formSubmitHandler = this._formSubmitHandler.bind(this);
    }

    _getInputValues() {
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.overlay__form-input'));
        this._formValues = {};

        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    _formSubmitHandler(e) {
        e.preventDefault();
        this._submitHandler(this._getInputValues());
    }

    close() {
        const inputList = Array.from(this._popupSelector.querySelectorAll('.overlay__form-input'));

        inputList.forEach(elem => elem.textContent = '');

        this._popupSelector.removeEventListener('submit', this._formSubmitHandler);
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (e) => this._formSubmitHandler(e));
    }

    reset() {
        this._resetHandler();
    }
}
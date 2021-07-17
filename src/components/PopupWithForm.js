import Popup from "./Popup.js";
import {formConfig} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
    _form;
    _formValues;
    _submitButton;
    _inputList;
    _submitHandler;

    constructor(popupSelector, onSubmit) {
        super(popupSelector);
        const {formSelector, inputSelector, buttonSelector} = formConfig;

        this._form = super.overlay.querySelector(formSelector);
        this._inputList = this._form.querySelectorAll(inputSelector);
        this._submitButton = this._form.querySelector(buttonSelector);
        this._submitHandler = onSubmit;
        this._formValues = {};

        this._setEventListeners();
    }

    _getInputValues() {
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _formSubmitHandler(e) {
        e.preventDefault();
        this._submitHandler(this._getInputValues());
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (e) => this._formSubmitHandler(e));
    }

    setSubmitHandler(handler) {
        this._submitHandler = handler;
    }

    renderLoading(isLoading) {
        isLoading ? this._submitButton.textContent = 'Сохранение...' : this._submitButton.textContent = 'Сохранить';
    }

    close() {
        super.close();
        this._form.reset();
    }
}
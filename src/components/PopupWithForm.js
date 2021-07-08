import Popup from "./Popup.js";
import {formConfig} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
    _form;
    _formValues;
    _submitButton;

    constructor(popupSelector, onSubmit) {
        super(popupSelector);

        const {formSelector} = formConfig;
        this._form = this._overlay.querySelector(formSelector);
        this._formSubmitHandler = this._formSubmitHandler.bind(this);
        this._onSubmit = onSubmit;
        this._formValues = {};
    }

    _getInputValues() {
        const {inputSelector} = formConfig;
        const inputList = this._form.querySelectorAll(inputSelector);
        inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    _formSubmitHandler(e) {
        e.preventDefault();
        this._onSubmit(this._getInputValues());
    }

    renderLoading(isLoading) {
        const {buttonSelector} = formConfig;
        this._submitButton = this._form.querySelector(buttonSelector);
        isLoading ? this._submitButton.textContent = 'Сохранение...' : this._submitButton.textContent = 'Сохранить';
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => this._formSubmitHandler(e));
    }
}
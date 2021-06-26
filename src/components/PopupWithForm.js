import Popup from "./Popup.js";
import {formConfig} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
    _form;
    _formValues;

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

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => this._formSubmitHandler(e));
    }
}
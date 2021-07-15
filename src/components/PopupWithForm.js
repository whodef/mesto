import Popup from "./Popup.js";
import {formConfig} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
    #form;
    #formValues;
    #submitButton;
    #inputList;
    #submitHandler;

    constructor(popupSelector, onSubmit) {
        super(popupSelector);
        const {formSelector, inputSelector, buttonSelector} = formConfig;

        this.#form = super.overlay.querySelector(formSelector);
        this.#inputList = this.#form.querySelectorAll(inputSelector);
        this.#submitButton = this.#form.querySelector(buttonSelector);
        this.#submitHandler = onSubmit;
        this.#formValues = {};

        this.#setEventListeners();
    }

    #getInputValues() {
        this.#inputList.forEach(input => {
            this.#formValues[input.name] = input.value;
        });
        return this.#formValues;
    }

    #formSubmitHandler(e) {
        e.preventDefault();
        this.#submitHandler(this.#getInputValues());
    }

    #setEventListeners() {
        this.#form.addEventListener('submit', (e) => this.#formSubmitHandler(e));
    }

    renderLoading(isLoading) {
        isLoading ? this.#submitButton.textContent = 'Сохранение...' : this.#submitButton.textContent = 'Сохранить';
    }

    close() {
        super.close();
        this.#form.reset();
    }
}
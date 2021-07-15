export default class FormValidator {
    #selectorConfig;
    #formElement;
    #inputList;
    #buttonElement;

    constructor(element, config) {
        this.#formElement = element;
        this.#selectorConfig = config;
        this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#selectorConfig.inputSelector));
        this.#buttonElement = this.#formElement.querySelector(this.#selectorConfig.buttonSelector);
    }

    static #hasInvalidInput(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid)
    };

    #showInputError(inputElement, errorMessage) {
        inputElement.classList.add(this.#selectorConfig.inputErrorMode);
        const errorElement = this.#formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.#selectorConfig.errorMode);
    }

    #hideInputError(inputElement) {
        inputElement.classList.remove(this.#selectorConfig.inputErrorMode);
        const errorElement = this.#formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this.#selectorConfig.inputErrorMode);
        errorElement.classList.remove(this.#selectorConfig.errorMode);
    }

    #checkInputValidity(inputElement) {
        inputElement.validity.valid ? this.#hideInputError(inputElement) : this.#showInputError(inputElement, inputElement.validationMessage);
    };

    #toggleButtonMode() {
        if (FormValidator.#hasInvalidInput(this.#inputList)) {
            this.disableSubmitButton();
        } else {
            this.#buttonElement.disabled = false;
            this.#buttonElement.classList.remove(this.#selectorConfig.buttonMode);
        }
    }

    #setEventListeners() {
        this.#toggleButtonMode();
        this.#inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (e) => {
                e.preventDefault();
                this.#checkInputValidity(inputElement);
                this.#toggleButtonMode();
            });
        });
    };

    disableSubmitButton() {
        this.#buttonElement.disabled = true;
        this.#buttonElement.classList.add(this.#selectorConfig.buttonMode);
    }

    enableValidation() {
        this.#setEventListeners();
    }

    cleanFormValidation() {
        this.#inputList.forEach(this.#hideInputError.bind(this));
        this.disableSubmitButton();
        this.#formElement.reset();
    }
}
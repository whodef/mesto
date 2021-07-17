export default class FormValidator {
    _selectorConfig;
    _formElement;
    _inputList;
    _buttonElement;

    constructor(element, config) {
        this._formElement = element;
        this._selectorConfig = config;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectorConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectorConfig.buttonSelector);
    }

    static _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid)
    };

    _showInputError(inputElement, errorMessage) {
        inputElement.classList.add(this._selectorConfig.inputErrorMode);
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectorConfig.errorMode);
    }

    _hideInputError(inputElement) {
        inputElement.classList.remove(this._selectorConfig.inputErrorMode);
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorElement.classList.remove(this._selectorConfig.inputErrorMode);
        errorElement.classList.remove(this._selectorConfig.errorMode);
    }

    _checkInputValidity(inputElement) {
        inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement, inputElement.validationMessage);
    };

    _toggleButtonMode() {
        if (FormValidator._hasInvalidInput(this._inputList)) {
            this.disableSubmitButton();
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._selectorConfig.buttonMode);
        }
    }

    _setEventListeners() {
        this._toggleButtonMode();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (e) => {
                e.preventDefault();
                this._checkInputValidity(inputElement);
                this._toggleButtonMode();
            });
        });
    };

    disableSubmitButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._selectorConfig.buttonMode);
    }

    enableValidation() {
        this._setEventListeners();
    }

    cleanFormValidation() {
        this._inputList.forEach(this._hideInputError.bind(this));
        this.disableSubmitButton();
        this._formElement.reset();
    }
}
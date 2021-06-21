export default class Popup {

    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(e) {
        if (e.target === e.currentTarget) {
            this.close();
        }
    }

    open() {
        this._popupSelector.classList.add('overlay_open');
        //this._popupSelector.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keyup', (e) =>  this._handleEscClose(e));
    }

    close() {
        this._popupSelector.classList.remove('overlay_open');
        this._popupSelector.removeEventListener('click', this._handleOverlayClose);
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._closeButton = this._popupSelector.querySelector('.overlay__close-button');
        this._closeButton.addEventListener('click', () => this.close());
        this._popupSelector.addEventListener('mousedown', (e) => this._handleOverlayClose(e));
    }
}
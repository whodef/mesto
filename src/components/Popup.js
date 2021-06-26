import { overlayConfig } from "../utils/constants.js";

export default class Popup {
    _overlay;
    _openedClass;
    _closeButton;

    constructor(popupSelector) {
        const { overlayOpened, overlayCloseButton } = overlayConfig;
        this._overlay = document.querySelector(popupSelector);
        this._openedClass = overlayOpened;
        this._closeButton = this._overlay.querySelector(overlayCloseButton);
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
        document.addEventListener('keyup', this._handleEscClose);
        this._overlay.classList.add(this._openedClass);
    }

    close() {
        document.removeEventListener('keyup', this._handleEscClose);
        this._overlay.classList.remove(this._openedClass);
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
        this._overlay.addEventListener('mousedown', (e) => this._handleOverlayClose(e));
    }
}
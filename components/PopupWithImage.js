import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = popupSelector.querySelector('.overlay__image');
        this._popupCaption = popupSelector.querySelector('.overlay__image-caption');
    }

    open(name, link) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._popupCaption.textContent = this._popupImage.alt;

        super.open();
    }
}
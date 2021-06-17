import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = popupSelector.querySelector('.overlay__image');
        this._popupCaption = popupSelector.querySelector('.overlay__image-caption');
    }

    open = (item) => {
        this._caption = item._caption;
        this._image = item._image;

        // заполнение данными всплывающего окна с картинкой при его открытии
        this._popupImage.src = this._image;
        this._popupCaption.textContent = this._caption;
        this._popupImage.setAttribute('alt', this._image);
        super.open();
    }
}
import Popup from './Popup.js';
import {overlayWithImageConfig} from "../utils/constants";

export default class PopupWithImage extends Popup {
    _image;
    _caption;

    constructor(popupSelector) {
        super(popupSelector);
        const {imageOverlay, imageCaption} = overlayWithImageConfig;

        this._image = super.overlay.querySelector(imageOverlay);
        this._caption = super.overlay.querySelector(imageCaption);
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = data.alt;
        this._caption.textContent = data.caption;

        super.open();
    }
}
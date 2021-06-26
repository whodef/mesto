import Popup from './Popup.js';
import {overlayWithImageConfig} from "../utils/constants.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
    }

    open(data) {
        const {imageOverlay, imageCaption} = overlayWithImageConfig;
        const image = this._overlay.querySelector(imageOverlay);

        image.src = data.link;
        image.alt = data.alt;

        this._overlay.querySelector(imageCaption).textContent = data.caption;

        super.open();
    }
}
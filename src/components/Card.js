import {cardConfig} from "../utils/constants.js";

export default class Card {
    _name;
    _link;
    _cardWrapper;
    _handleCardClick;
    _likeButton;
    _item;
    _cardImage;

    constructor(data, cardTemplate, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardWrapper = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate = () => {
        const {cardListItem} = cardConfig;
        return document.querySelector(this._cardWrapper).content.querySelector(cardListItem).cloneNode(true);
    }

    _handleOnClick = () => {
        const card = {
            alt: this._name,
            caption: this._name,
            link: this._link
        }
        this._handleCardClick(card);
    }

    _handleLike = () => {
        const {cardActiveLikeItem} = cardConfig;
        this._likeButton.classList.toggle(cardActiveLikeItem);
    }

    _handleRemove = () => {
        this._item.remove();
    }

    _setEventListeners = () => {
        const {cardRemoveButton, cardLikeItem} = cardConfig;
        this._item.querySelector(cardRemoveButton).addEventListener('click', this._handleRemove);

        this._likeButton = this._item.querySelector(cardLikeItem);

        this._likeButton.addEventListener('click', this._handleLike);
        this._cardImage.addEventListener('click', this._handleOnClick);
    }

    constructCard = () => {
        const {cardImage, cardTitle} = cardConfig;

        this._item = this._getTemplate();
        this._cardImage = this._item.querySelector(cardImage);

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._item.querySelector(cardTitle).textContent = this._name;

        this._setEventListeners();

        return this._item;
    }
}
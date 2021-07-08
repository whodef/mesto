import {cardConfig} from '../utils/constants.js';
import {apiToken} from '../utils/constants';

export default class Card {
    _name;
    _link;
    _cardWrapper;
    _handleCardClick;
    _likeButton;
    _item;
    _cardImage;
    _owner;
    _isOwner;
    _likes;
    _deleteCard;
    _addLike;
    _removeLike;
    _currentUser;

    constructor(data, cardTemplate, handleCardClick) {
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._likes = data.likes;
        this._isOwner = false;

        this._cardWrapper = cardTemplate;
        this._handleCardClick = handleCardClick;
        // this._deleteCard = deleteCard;
        // this._addLike = addLike;
        // this._removeLike = removeLike;
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
        const {cardLikeButtonActive} = cardConfig;
        this._likeButton.classList.toggle(cardLikeButtonActive);
        this._isLiked = !this._isLiked
        this._likeButton.blur();
    }


    _handleRemove = () => {
        this._item.remove();
    }

    _showBin() {
        const {cardRemoveButton} = cardConfig;
        this._handleRemove = this._item.querySelector(cardRemoveButton);
        if (this._owner === apiToken) {
            this._handleRemove.classList.toggle(cardRemoveButton);
        }
    }

    _showLike() {
        this._likes.forEach(element => {
            if (element._id === apiToken) {
                this._handleLike();
            }
        });
    }

    _setEventListeners = () => {
        const {cardRemoveButton, cardLikeButton} = cardConfig;
        this._item.querySelector(cardRemoveButton).addEventListener('click', this._handleRemove);

        this._likeButton = this._item.querySelector(cardLikeButton);

        this._likeButton.addEventListener('click', this._handleLike);
        this._cardImage.addEventListener('click', this._handleOnClick);

    }

    setCurrentUser(id) {
        this._currentUser = id;
        if (id === this._owner) this._isOwner = true;
    }

    constructCard = () => {
        const {cardImage, cardTitle, cardLikeButton, likeCounter, cardLikeButtonActive} = cardConfig;

        this._item = this._getTemplate();

        this._cardImage = this._item.querySelector(cardImage);
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();

        this._item.querySelector(cardTitle).textContent = this._name;
        this._likeButton = this._item.querySelector(cardLikeButton);

        // Счётчик лайков
        this._counter = this._item.querySelector(likeCounter);
        this._counter.textContent = this._likes.length;

        if (this._likes.length > 0) {
            this._likeButton.classList.add(cardLikeButtonActive)
        }

        // Показ элементов карточки
        this._showLike();
        this._showBin();

        // Возврат карточки
        return this._item;
    }

    deleteCard() {
        this._item.remove();
        this._item = null;
    }
}
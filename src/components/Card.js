import {cardConfig} from '../utils/constants.js';

export default class Card {
    _myId;
    _name;
    _link;
    _cardWrapper;
    _handleCardClick;
    _likeButton;
    _item;
    _cardImage;
    _owner;
    _likes;

    constructor(data, cardTemplate, handleCardClick, handleCardLike, handleCardDelete) {
        this._myId = data['myId'];
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._likes = data.likes;
        this._cardWrapper = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardDelete = handleCardDelete;
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

        const isLike = this._likeButton.classList.contains(cardLikeButtonActive);
        this._handleCardLike(this._id, isLike).then((res) => {
            this._counter.textContent = res.likes.length;
        })
            .catch(err => console.log(err));
    }

    handleRemove = () => {
        this._handleCardDelete(this);
    }

    _showBin() {
        const {cardRemoveButton} = cardConfig;
        const button = this._item.querySelector(cardRemoveButton);
        if (this._owner._id !== this._myId) {
            button.remove();
        }
    }

    _setEventListeners = () => {
        const {cardRemoveButton, cardLikeButton} = cardConfig;
        this._likeButton = this._item.querySelector(cardLikeButton);

        this._cardImage.addEventListener('click', this._handleOnClick);
        this._likeButton.addEventListener('click', this._handleLike);
        this._item.querySelector(cardRemoveButton).addEventListener('click', this.handleRemove);

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
            this._likes.forEach(like => {
                if (like._id === this._myId) {
                    this._likeButton.classList.add(cardLikeButtonActive);
                    return true;
                }
            });
        }
        this._showBin();

        return this._item;
    }
}
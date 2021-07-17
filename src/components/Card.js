import {cardConfig} from '../utils/constants.js';

export default class Card {
    _authUserID;
    _cardClickHandler;
    _cardDeleteHandler;
    _cardLikeHandler;
    _domNode;
    _id;
    _likeButton;
    _likes;
    _link;
    _name;
    _owner;

    constructor(data, cardTemplate, handleCardClick, handleCardLike, handleCardDelete) {
        const {cardListItem} = cardConfig;
        this._domNode = document.querySelector(cardTemplate).content.querySelector(cardListItem).cloneNode(true);

        this._authUserID = data['authUserID'];
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._likes = data.likes;

        this._cardClickHandler = handleCardClick;
        this._cardLikeHandler = handleCardLike;
        this._cardDeleteHandler = handleCardDelete;
    }

    get id() {
        return this._id;
    }

    _cardImageClickListener = () => {
        const card = {
            alt: this._name,
            caption: this._name,
            link: this._link
        }
        this._cardClickHandler(card);
    }

    _cardLikeButtonClickListener = () => {
        const {cardLikeButtonActive} = cardConfig;
        const isLike = this._likeButton.classList.contains(cardLikeButtonActive);
        this._cardLikeHandler(this, isLike);
    }

    _cardRemoveListener = () => {
        this._cardDeleteHandler(this);
    }

    _showBin(cardRemoveButtonNode) {
        if (this._owner._id !== this._authUserID) {
            cardRemoveButtonNode.remove();
        }
    }

    _setEventListeners = (cardImageNode, cardRemoveButtonNode) => {
        cardImageNode.addEventListener('click', this._cardImageClickListener);
        cardRemoveButtonNode.addEventListener('click', this._cardRemoveListener);
        this._likeButton.addEventListener('click', this._cardLikeButtonClickListener);
    }

    _renderLikesElement() {
        const {likeCounter, cardLikeButtonActive} = cardConfig;
        this._counter = this._domNode.querySelector(likeCounter);
        this._counter.textContent = this._likes.length;

        this._likeButton.classList.remove(cardLikeButtonActive);
        this._likes.forEach(like => {
            if (like._id === this._authUserID) {
                this._likeButton.classList.add(cardLikeButtonActive);
            }
        });
    }

    updateLikes = likesList => {
        this._likes = likesList;
        this._renderLikesElement();
    };

    delete = () => {
        this._domNode.remove();
    }

    make = () => {
        const {cardImage, cardTitle, cardLikeButton, cardRemoveButton} = cardConfig;
        const cardImageNode = this._domNode.querySelector(cardImage);
        cardImageNode.src = this._link;
        cardImageNode.alt = this._name;

        this._likeButton = this._domNode.querySelector(cardLikeButton);
        this._domNode.querySelector(cardTitle).textContent = this._name;

        const cardRemoveButtonNode = this._domNode.querySelector(cardRemoveButton);
        this._showBin(cardRemoveButtonNode);

        this._renderLikesElement();

        this._setEventListeners(cardImageNode, cardRemoveButtonNode);

        return this._domNode;
    }
}
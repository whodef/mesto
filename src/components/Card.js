import {cardConfig} from '../utils/constants.js';

export default class Card {
    #authUserID;
    #cardClickHandler;
    #cardDeleteHandler;
    #cardLikeHandler;
    #domNode;
    #id;
    #likeButton;
    #likes;
    #link;
    #name;
    #owner;

    constructor(data, cardTemplate, handleCardClick, handleCardLike, handleCardDelete) {
        const {cardListItem} = cardConfig;
        this.#domNode = document.querySelector(cardTemplate).content.querySelector(cardListItem).cloneNode(true);

        this.#authUserID = data['authUserID'];
        this.#id = data._id;
        this.#name = data.name;
        this.#link = data.link;
        this.#owner = data.owner;
        this.#likes = data.likes;

        this.#cardClickHandler = handleCardClick;
        this.#cardLikeHandler = handleCardLike;
        this.#cardDeleteHandler = handleCardDelete;
    }

    get id() {
        return this.#id;
    }

    #cardImageClickListener = () => {
        const card = {
            alt: this.#name,
            caption: this.#name,
            link: this.#link
        }
        this.#cardClickHandler(card);
    }

    #cardLikeButtonClickListener = () => {
        const {cardLikeButtonActive} = cardConfig;
        const isLike = this.#likeButton.classList.contains(cardLikeButtonActive);
        this.#cardLikeHandler(this, isLike);
    }

    #cardRemoveListener = () => {
        this.#cardDeleteHandler(this);
    }

    #showBin(cardRemoveButtonNode) {
        if (this.#owner._id !== this.#authUserID) {
            cardRemoveButtonNode.remove();
        }
    }

    #setEventListeners = (cardImageNode, cardRemoveButtonNode) => {
        cardImageNode.addEventListener('click', this.#cardImageClickListener);
        cardRemoveButtonNode.addEventListener('click', this.#cardRemoveListener);
        this.#likeButton.addEventListener('click', this.#cardLikeButtonClickListener);
    }

    #renderLikesElement() {
        const {likeCounter, cardLikeButtonActive} = cardConfig;
        this._counter = this.#domNode.querySelector(likeCounter);
        this._counter.textContent = this.#likes.length;

        this.#likeButton.classList.remove(cardLikeButtonActive);
        this.#likes.forEach(like => {
            if (like._id === this.#authUserID) {
                this.#likeButton.classList.add(cardLikeButtonActive);
            }
        });
    }

    updateLikes = likesList => {
        this.#likes = likesList;
        this.#renderLikesElement();
    };

    delete = () => {
        this.#domNode.remove();
    }

    make = () => {
        const {cardImage, cardTitle, cardLikeButton, cardRemoveButton} = cardConfig;
        const cardImageNode = this.#domNode.querySelector(cardImage);
        cardImageNode.src = this.#link;
        cardImageNode.alt = this.#name;

        this.#likeButton = this.#domNode.querySelector(cardLikeButton);
        this.#domNode.querySelector(cardTitle).textContent = this.#name;

        const cardRemoveButtonNode = this.#domNode.querySelector(cardRemoveButton);
        this.#showBin(cardRemoveButtonNode);

        this.#renderLikesElement();

        this.#setEventListeners(cardImageNode, cardRemoveButtonNode);

        return this.#domNode;
    }
}
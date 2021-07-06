export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://images.unsplash.com/photo-1499621401321-83004ade2347?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2551&q=80'
    },
    {
        name: 'Челябинская область',
        link: 'https://images.unsplash.com/photo-1565881013382-810f846f7dc2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80'
    },
    {
        name: 'Иваново',
        link: 'https://images.unsplash.com/photo-1601381960548-fd47eab39cbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1242&q=80'
    },
    {
        name: 'Камчатка',
        link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2601&q=80'
    },
    {
        name: 'Холмогорский район',
        link: 'https://images.unsplash.com/photo-1446506123797-f3e3eb4c092d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2551&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://images.unsplash.com/photo-1516179993453-2fa0b77c8d69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80'
    }
];

export const overlayConfig = {
    overlayOpened: 'overlay_open',
    overlayCloseButton: '.overlay__close-button',
}

export const cardConfig = {
    cardTemplate: '#card-template',
    cardListSection: '.card__list',
    cardListItem: '.card__item',
    cardTitle: '.card__description-title',
    cardImage: '.card__image',
    cardRemoveButton: '.card__delete-button',
    cardLikeItem: '.card__like-button',
    cardActiveLikeItem: 'card__like-button_active'
};

export const newCardPopupConfig = {
    newCardOverlaySelector: '#new-card-overlay',
    newCardForm: document.querySelector('.overlay__form[name = overlay-form-card]')
}

export const overlayWithImageConfig = {
    overlayImageSelector: '#image-overlay',
    imageOverlay: '.overlay__image',
    imageCaption: '.overlay__image-caption',
}

export const formConfig = {
    formSelector: '.overlay__form',
    inputSelector: '.overlay__form-input',
    buttonSelector: '.overlay__save-button',
    buttonMode: '.overlay__save-button',
    inputErrorMode: 'overlay__form-input_set',
    errorMode: 'overlay__form-error_visible'
};

export const profilePopupConfig = {
    profileOverlaySelector: '#change-profile-overlay',
    profileForm: document.querySelector('.overlay__form[name = overlay-form-profile]'),
    userNameInput: document.querySelector('.overlay__form-input[name = input-name-profile]'),
    userAboutInput: document.querySelector('.overlay__form-input[name = input-description-profile]'),
}

export const profileConfig = {
    userName: '.profile__name',
    userAbout: '.profile__description',
    userAvatar: '.profile__image'
}

export const changeProfileButton = document.querySelector('.profile__change-button');
export const addCardButton = document.querySelector('.profile__add-button');
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

// Overlay
export const cardsContainer = document.querySelector('.overlay');
export const cardTemplate = document.querySelector('#card-template').content;

// Профиль
export const changeProfileOpenOverlayBtn = document.querySelector('#change-profile');
export const profileDescriptionOnPage = document.querySelector('.profile__description');
export const profileNameOnPage = document.querySelector('.profile__name');
export const changeProfileOverlay = document.querySelector('#change-profile-overlay');
export const changeProfileForm = changeProfileOverlay.querySelector('.overlay__form');

// Карточки
export const addCardOpenOverlayBtn = document.querySelector('#add-new-card');
export const addCardOverlay = document.querySelector('#new-card-overlay');
export const addCardForm = addCardOverlay.querySelector('.overlay__form');
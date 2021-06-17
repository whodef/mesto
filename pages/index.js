import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    initialCards,
    changeProfileOpenOverlayBtn,
    profileDescriptionOnPage,
    profileNameOnPage,
    changeProfileOverlay,
    changeProfileForm,
    changeProfileFormNameInput,
    changeProfileFormExtInput,
    addCardOpenOverlayBtn,
    addCardOverlay,
    addCardForm,
    addCardFormNameInput,
    addCardFormExtInput,
    cardsContainer,
    cardTemplate,
    viewImageOverlay,
    viewImageContentImage,
    viewImageContentCaption,
} from '../utils/constants.js';

// // Добавление карточек в разметку
// const createCard = new Section({
//         data: initialCards,
//         renderer: (name, link) => {
//             const card = new Card(name, link, cardTemplate, cardImgClickListener); // переделать
//             const cardElement = card.constructCard();
//             createCard.addItem(cardElement);
//         }
//     },
//     cardsContainer
// );
// createCard.rendererItem();
//
//
// // Открытие окна карточки
// const popupWithImage = new PopupWithImage(viewImageOverlay);
// popupWithImage.setEventListeners();
//



const forms = [
    {
        name: 'profileForm',
        form: changeProfileForm
    },
    {
        name: 'addCardForm',
        form: addCardForm
    }
];

const formValidators = {};

// Открытие-закрытие всплывающего окна
const openOverlay = ((elem) => {
    elem.classList.add('overlay_open');
    elem.addEventListener('click', closeOverlayClickListener);
    document.addEventListener('keyup', closeOverlayEscListener);
});

const closeOverlay = ((elem) => {
    elem.classList.remove('overlay_animation-helper', 'overlay_open');
    elem.removeEventListener('click', closeOverlayClickListener);
    document.removeEventListener('keyup', closeOverlayEscListener);
});

const closeOverlayClickListener = ((e) => {
    const elem = e.target;
    if (elem.classList.contains('overlay') || elem.classList.contains('overlay__close-button')) {
        const currentOpenOverlay = document.querySelector('.overlay_open');
        closeOverlay(currentOpenOverlay);
    }
});

const closeOverlayEscListener = ((e) => {
    if (e.key === "Escape") {
        const currentOpenOverlay = document.querySelector('.overlay_open');
        closeOverlay(currentOpenOverlay);
    }
});
// -------------------------------------

const cardImgClickListener = ((name, link) => {
    viewImageContentImage.src = link;
    viewImageContentImage.alt = name;
    viewImageContentCaption.textContent = viewImageContentImage.alt;
    openOverlay(viewImageOverlay);
});

const changeProfileFormSubmitHandler = ((e) => {
    e.preventDefault();
    profileNameOnPage.textContent = changeProfileFormNameInput.value;
    profileDescriptionOnPage.textContent = changeProfileFormExtInput.value;
    closeOverlay(changeProfileOverlay);
});

const createCard = (name, link) => {
    const card = new Card(name, link, cardTemplate, cardImgClickListener);
    return card.constructCard();
}

const addCardFormSubmitHandler = ((e) => {
    e.preventDefault();
    cardsContainer.prepend(createCard(addCardFormNameInput.value, addCardFormExtInput.value));
    closeOverlay(addCardOverlay);
});

changeProfileOpenOverlayBtn.addEventListener('click', () => {
    formValidators['profileForm'].cleanFormValidation();
    openOverlay(changeProfileOverlay);
    changeProfileFormNameInput.value = profileNameOnPage.textContent;
    changeProfileFormExtInput.value = profileDescriptionOnPage.textContent;
});

addCardOpenOverlayBtn.addEventListener('click', () => {
    formValidators['addCardForm'].cleanFormValidation();
    openOverlay(addCardOverlay);
});

changeProfileOverlay.querySelector('.overlay__form').addEventListener('submit', changeProfileFormSubmitHandler);

addCardOverlay.querySelector('.overlay__form').addEventListener('submit', addCardFormSubmitHandler);

initialCards.forEach((item) => {
    cardsContainer.append(createCard(item.name, item.link));
});

// Валидация форм
forms.forEach(item => {
    formValidators[item.name] = new FormValidator(
        item.form,
        {
            formSelector: '.overlay__form',
            inputSelector: '.overlay__form-input',
            buttonSelector: '.overlay__save-button',
            buttonMode: '.overlay__save-button',
            inputErrorMode: 'overlay__form-input_state',
            errorMode: 'overlay__form-error_visible'
        }
    );
    formValidators[item.name].enableValidation();
});
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    initialCards,
    cardsContainer,
    changeProfileOpenOverlayBtn,
    profileDescriptionOnPage,
    profileNameOnPage,
    changeProfileForm,
    addCardOpenOverlayBtn,
    addCardOverlay,
    addCardForm,
    cardTemplate, changeProfileOverlay,
} from '../utils/constants.js';

const sectionInitialCards = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link, cardTemplate, {
                handleCardClick: () => {
                    const popupWithImage = new PopupWithImage(cardsContainer);
                    popupWithImage.open(item.name, item.link);
                    popupWithImage.setEventListeners();
                }
            }
        );
        return card.constructCard();
    }
}, '.card__list');

sectionInitialCards.render();

const overlayAddCard = new PopupWithForm(addCardOverlay, {
    submitHandler: (input) => {
        sectionInitialCards.addItem({name: input['input-name'], link: input['input-imageurl']}, true);
        sectionInitialCards.render();
        overlayAddCard.close();
    },
    resetHandler: () => {
        formValidators['addCardForm'].cleanFormValidation();
    }
});

const userInfo = new UserInfo({
    nameSelector: profileNameOnPage,
    captionSelector: profileDescriptionOnPage
});

const overlayProfile = new PopupWithForm(changeProfileOverlay, {
    submitHandler: (input) => {
        userInfo.setUserInfo(input);
        overlayProfile.close();
    },
    resetHandler: () => {
        formValidators['profileForm'].cleanFormValidation();
    }
});

const openOverlayEditProfile = () => {
    userInfo.getUserInfo();
    overlayProfile.reset();
    overlayProfile.open();
};

const openOverlayAddCard = () => {
    overlayAddCard.reset();
    overlayAddCard.open();
};

overlayAddCard.setEventListeners();

overlayProfile.setEventListeners();

addCardOpenOverlayBtn.addEventListener('click', openOverlayAddCard);

changeProfileOpenOverlayBtn.addEventListener('click', openOverlayEditProfile);

// Открытие-закрытие всплывающего окна
// const openOverlay = ((elem) => {
//     elem.classList.add('overlay_open');
//     elem.addEventListener('click', closeOverlayClickListener);
//     document.addEventListener('keyup', closeOverlayEscListener);
// });
//
// const closeOverlay = ((elem) => {
//     elem.classList.remove('overlay_animation-helper', 'overlay_open');
//     elem.removeEventListener('click', closeOverlayClickListener);
//     document.removeEventListener('keyup', closeOverlayEscListener);
// });
//
// const closeOverlayClickListener = ((e) => {
//     const elem = e.target;
//     if (elem.classList.contains('overlay') || elem.classList.contains('overlay__close-button')) {
//         const currentOpenOverlay = document.querySelector('.overlay_open');
//         closeOverlay(currentOpenOverlay);
//     }
// });
//
// const closeOverlayEscListener = ((e) => {
//     if (e.key === "Escape") {
//         const currentOpenOverlay = document.querySelector('.overlay_open');
//         closeOverlay(currentOpenOverlay);
//     }
// });
// -------------------------------------
//
// const cardImgClickListener = ((name, link) => {
//     viewImageContentImage.src = link;
//     viewImageContentImage.alt = name;
//     viewImageContentCaption.textContent = viewImageContentImage.alt;
//     openOverlay(viewImageOverlay);
// });
//
// const changeProfileFormSubmitHandler = ((e) => {
//     e.preventDefault();
//     profileNameOnPage.textContent = changeProfileFormNameInput.value;
//     profileDescriptionOnPage.textContent = changeProfileFormExtInput.value;
//     closeOverlay(changeProfileOverlay);
// });
//
// const createCard = (name, link) => {
//     const card = new Card(name, link, cardTemplate, cardImgClickListener);
//     return card.constructCard();
// }
//
// const addCardFormSubmitHandler = ((e) => {
//     e.preventDefault();
//     cardsContainer.prepend(createCard(addCardFormNameInput.value, addCardFormExtInput.value));
//     closeOverlay(addCardOverlay);
// });
//
// changeProfileOpenOverlayBtn.addEventListener('click', () => {
//     formValidators['profileForm'].cleanFormValidation();
//     openOverlay(changeProfileOverlay);
//     changeProfileFormNameInput.value = profileNameOnPage.textContent;
//     changeProfileFormExtInput.value = profileDescriptionOnPage.textContent;
// });
//
// addCardOpenOverlayBtn.addEventListener('click', () => {
//     formValidators['addCardForm'].cleanFormValidation();
//     openOverlay(addCardOverlay);
// });
//
// changeProfileOverlay.querySelector('.overlay__form').addEventListener('submit', changeProfileFormSubmitHandler);
//
// addCardOverlay.querySelector('.overlay__form').addEventListener('submit', addCardFormSubmitHandler);
//
// initialCards.forEach((item) => {
//     cardsContainer.append(createCard(item.name, item.link));
// });


// ----- НЕ ТРОЖЬ, РАБОТАЕТ -----
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
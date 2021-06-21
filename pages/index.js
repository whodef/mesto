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
    cardTemplate,
    changeProfileOverlay
} from '../utils/constants.js';

// Для валидации форм
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

// Создание карточек
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

// Добавление карточки
const overlayAddCard = new PopupWithForm(addCardOverlay, {
    submitHandler: (input) => {
        sectionInitialCards.addItem({
            name: input['input-name'],
            link: input['input-imageurl']
        }, true);
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
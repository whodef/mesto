import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    formConfig,
    initialCards,
    cardConfig,
    overlayWithImageConfig,
    newCardPopupConfig,
    profilePopupConfig,
    profileConfig,
    changeProfileButton,
    addCardButton
} from '../utils/constants.js';

const formValidators = {};

const {overlayImageSelector} = overlayWithImageConfig;
const imagePopup = new PopupWithImage(overlayImageSelector);

// Отрисовка списка карточек
const {cardTemplate, cardListSection} = cardConfig;
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardTemplate, item => imagePopup.open(item));
        const cardElement = card.constructCard();
        cardList.addItem(cardElement);
    }
}, cardListSection);

cardList.render();

// Добавление новой карточки
const {newCardOverlaySelector} = newCardPopupConfig;
const newCardPopup = new PopupWithForm(newCardOverlaySelector, (inputValues) => {
    const data = {
        name: inputValues['input-name-card'],
        link: inputValues['input-image-url']
    };
    const card = new Card(data, cardTemplate, item => imagePopup.open(item));

    cardList.addItem(card.constructCard());
    newCardPopup.close();
});

// Создание UserInfo
const {userName, userAbout} = profileConfig;
const userInfo = new UserInfo(userName, userAbout);

// Всплывающее окно Профиля
const {profileOverlaySelector} = profilePopupConfig;
const profilePopup = new PopupWithForm(profileOverlaySelector, (inputValues) => {
    const data = {
        name: inputValues['input-name-profile'],
        description: inputValues['input-description-profile']
    };
    userInfo.setUserInfo(data);
    profilePopup.close();
});

// Валидация форм
const formSelector = document.querySelectorAll(formConfig['formSelector']);
formSelector.forEach(item => {
    formValidators[item.name] = new FormValidator(item, formConfig);
    formValidators[item.name].enableValidation();
});

changeProfileButton.addEventListener('click', () => {
    const {name, about} = userInfo.getUserInfo();
    const {userNameInput, userAboutInput} = profilePopupConfig;

    // Перестало работать
    //userNameInput.value = name;
    //userAboutInput.value = about;

    userNameInput.setAttribute('value', name);
    userAboutInput.setAttribute('value', about);

    formValidators['overlay-form-profile'].cleanFormValidation();
    profilePopup.open();
});

addCardButton.addEventListener('click', () => {
    formValidators['overlay-form-card'].cleanFormValidation();
    newCardPopup.open();
});

imagePopup.setEventListeners();

profilePopup.setEventListeners();

newCardPopup.setEventListeners();
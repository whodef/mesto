import './index.css';
import Api from '../components/Api.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js"
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

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: '8e17de69-5c22-4aaf-b9e8-673eda086f85',
        'Content-Type': 'application/json'
    },
});


const formValidators = {};

const {overlayImageSelector} = overlayWithImageConfig;
const imagePopup = new PopupWithImage(overlayImageSelector);

// Функция создания карточки
const createCard = (data) => {
    const card = new Card(data, cardTemplate, item => imagePopup.open(item));
    return card.constructCard();
}

// Отрисовка списка карточек
const {cardTemplate, cardListSection} = cardConfig;
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const cardElement = createCard(item);
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
    cardList.addItem(createCard(data));
    newCardPopup.close();
});

// Создание UserInfo
const {userName, userAbout} = profileConfig;
const userInfo = new UserInfo(userName, userAbout);

// Колбэк функция обновления аватара


// Всплывающее окно редактирования профиля
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
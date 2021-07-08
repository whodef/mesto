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
    apiAddress,
    apiToken,
    cardConfig,
    overlayWithImageConfig,
    newCardPopupConfig,
    profilePopupConfig,
    profileConfig,
    changeProfileButton,
    addCardButton
} from '../utils/constants.js';

const formValidators = {};

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: '8e17de69-5c22-4aaf-b9e8-673eda086f85',
        'Content-Type': 'application/json'
    },
});

const {overlayImageSelector} = overlayWithImageConfig;
const imagePopup = new PopupWithImage(overlayImageSelector);

// Функция создания карточки
const createCard = (data) => {
    const card = new Card(data, cardTemplate, item => imagePopup.open(item));
    return card.constructCard();
}


// TODO: Отрисовка списка карточек
const {cardTemplate, cardListSection} = cardConfig;

api.getCards()
    .then((data) => {
        console.log(data);
        const cardList = new Section({
                items: data,
                renderer: (item) => {
                    console.log(item);
                    const cardElement = createCard(item);
                    cardList.addItem(cardElement);
                }
            }, cardListSection
        );
        cardList.render();
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

// Добавление новой карточки
const {newCardOverlaySelector} = newCardPopupConfig;
const newCardPopup = new PopupWithForm(newCardOverlaySelector, (inputValues) => {
    const data = {
        name: inputValues['input-name-card'],
        link: inputValues['input-image-url']
    };
    apiGetCard.addItem(createCard(data));
    newCardPopup.close();
});

// Создание UserInfo
const userInfo = new UserInfo(profileConfig);

// отображение информации о пользователе
api.getUserData()
    .then((data) => {
        userInfo.setUserInfo(data);
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });


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

// // Получение начальных карточек и данных о пользователе с сервера
// Promise.all([api.getUserData(), api.getCards()])
//     .then(([data, cards]) => {
//         // Получение данных о пользователе
//         userInfo.setUserInfo(data.name, data.about);
//         userInfo.setUserAvatar(data.avatar);
//         userInfo.setUserId(data._id);
//
//         // Создаётся экземпляр класса Section
//         const {cardListSection} = cardConfig;
//         const cardList = new Section(
//             {
//                 items: cards,
//                 renderer: createCard
//             },
//             cardListSection
//         );
//         cardList.render();
//     })
//     .catch(err => console.log(`Ошибка при загрузке данных с сервера: ${err.status}`))

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
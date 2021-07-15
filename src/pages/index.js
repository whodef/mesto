import './index.css';
import Api from '../components/Api.js'
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
    addCardButton,
    avatarPopupConfig,
    cardConfig,
    changeProfileAvatar,
    changeProfileButton,
    confirmPopupConfig,
    formConfig,
    newCardPopupConfig,
    overlayWithImageConfig,
    profileConfig,
    profilePopupConfig
} from '../utils/constants.js';

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: '8e17de69-5c22-4aaf-b9e8-673eda086f85',
        'Content-Type': 'application/json'
    },
});

// Для валидации форм
const formValidators = {};

// Создание UserInfo
const userInfo = new UserInfo(profileConfig);

// Для функции создания карточки
const {overlayImageSelector} = overlayWithImageConfig;
const imagePopup = new PopupWithImage(overlayImageSelector);

// Карточки, собственно
const createCard = (data) => {
    data['authUserID'] = userInfo.getUserInfo()['id'];
    const card = new Card(data, cardTemplate,
        card => imagePopup.open(card),
        (card, isLike) => {
            const responsePromise = isLike ? api.removeLikeFromCard(card.id) : api.likeCard(card.id);

            responsePromise.then((res) => {
                card.updateLikes(res.likes);
            })
                .catch(err => console.error(err));
        },
        card => {
            const {confirmPopupSelector} = confirmPopupConfig;
            const confirmPopup = new PopupWithForm(confirmPopupSelector, () => {
                return api.deleteCard(card.id)
                    .then(() => {
                        card.delete();
                        confirmPopup.close();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
            confirmPopup.open();
        }
    );
    return card.make();
};

// Отрисовка списка карточек
const {cardTemplate, cardListSection} = cardConfig;
let cardList;

// Отправка запросов, на получение данных профиля и данных карточек, выполняется одновременно
Promise.all([api.getUserData(), api.getCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);
        cardList = new Section({
                items: cards,
                renderer: (item) => {
                    const cardElement = createCard(item);
                    cardList.addItem(cardElement);
                }
            }, cardListSection
        );
        cardList.render();
    })
    .catch(err => console.error(err));

// Всплывающее окно редактирования аватара в профиле
const avatarPopup = new PopupWithForm(avatarPopupConfig.popupSelector, (inputValues) => {
    avatarPopup.renderLoading(true);
    api.setUserAvatar(inputValues['input-avatar'])
        .then(data => {
            userInfo.setUserInfo(data);
            avatarPopup.close();
            avatarPopup.renderLoading(false);
        })
        .catch(err => console.error(err));
});

// Всплывающее окно редактирования профиля
const profilePopup = new PopupWithForm(profilePopupConfig.profileOverlaySelector, (inputValues) => {
    profilePopup.renderLoading(true);
    api.setProfileInfo(
        inputValues['input-name-profile'],
        inputValues['input-description-profile']
    )
        .then(data => {
            userInfo.setUserInfo(data);
            profilePopup.close();
            profilePopup.renderLoading(false);
        })
        .catch(err => console.error(err));
});

// Добавление новой карточки
const {newCardOverlaySelector} = newCardPopupConfig;
const newCardPopup = new PopupWithForm(newCardOverlaySelector, (inputValues) => {
    api.addCard(
        inputValues['input-name-card'],
        inputValues['input-image-url']
    )
        .then(data => {
            cardList.addItem(createCard(data), true);
            newCardPopup.close();
        })
        .catch(err => console.error(err));
});

// Валидация форм
const forms = document.querySelectorAll(formConfig['formSelector']);
forms.forEach(item => {
    formValidators[item.name] = new FormValidator(item, formConfig);
    formValidators[item.name].enableValidation();
});

// Редактирование аватара пользователя
changeProfileAvatar.addEventListener('click', () => {
    const {avatar} = userInfo.getUserInfo();
    const {urlInput} = avatarPopupConfig;

    urlInput.setAttribute('value', avatar);

    formValidators['form-avatar'].cleanFormValidation();
    avatarPopup.open();
});

// Редактирование пользовательской информации "О себе"
changeProfileButton.addEventListener('click', () => {
    const {name, caption} = userInfo.getUserInfo();
    const {userNameInput, userAboutInput} = profilePopupConfig;

    userNameInput.setAttribute('value', name);
    userAboutInput.setAttribute('value', caption);

    formValidators['overlay-form-profile'].cleanFormValidation();
    profilePopup.open();
});

addCardButton.addEventListener('click', () => {
    formValidators['overlay-form-card'].cleanFormValidation();
    newCardPopup.open();
});
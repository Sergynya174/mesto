import './index.js';
import './index.css';
import {FormValidator} from './scripts/FormValidator.js';
import {Card} from './scripts/Card.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formsValidationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-line',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input-line_type_error',
  errorClass: 'popup__error_visible'
}

const btnEdit = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('#popup__profile');
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#job');
const nameUser = document.querySelector('.profile__title');
const jobUser = document.querySelector('.profile__subtitle');

const btnAdd = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('#popup__cards');
const inputTitle = document.querySelector('#title');
const inputLink = document.querySelector('#link');

const cardsContainer = document.querySelector('.cards');
const popupImg = document.querySelector('#popup__img');

const popupProfileValid = new FormValidator(formsValidationConfig, popupProfile);
const popupCardsValid = new FormValidator(formsValidationConfig, popupCards);

const createCard = (item) => { 
  const card = new Card(item, '#cards__template', handleCardClick)
  const cardElement = card.generateCard();
  return cardElement;
}

const renderCard = (item) => {
  const card = createCard(item);
  defaultCard.addItem(card);
}

const defaultCard = new Section({items: initialCards, renderer: renderCard}, cardsContainer);

const popupWithImage = new PopupWithImage (popupImg);

const handleCardClick = (evt) => {
  const data = {
    name: evt.target.alt,
    link: evt.target.src
  }
  popupWithImage.open(data);
};

const cardPopup = new PopupWithForm (popupCards, {
  formSubmitCallBack: (data) => {
    const card = {
      name: data.title,
      link: data.link
    };
    renderCard(card);
    cardPopup.close()
  } 
});

const profilePopup = new PopupWithForm (popupProfile, {
  formSubmitCallBack: (data) => {
    userInfo.setUserInfo(data);
    profilePopup.close();
  }
});

const userInfo = new UserInfo ( {
  data: {
    name: nameUser,
    job: jobUser
  }
});

btnEdit.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputJob.value = data.job;
  profilePopup.open();
});

btnAdd.addEventListener('click', () => {
  cardPopup.open();
});

defaultCard.renderCard();
popupProfileValid.enableValidation();

popupCardsValid.enableValidation();
popupWithImage.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners()
import {FormValidator} from './FormValidator.js'
import {Card} from './Card.js'
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import { data } from 'autoprefixer';

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

const btnCloseProfile = document.querySelector('#close-profile');
const btnEdit = document.querySelector('.profile__edit-button');
const popupOpened = 'popup_opened';
const popupProfile = document.querySelector('#popup__profile');
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#job');
const nameUser = document.querySelector('.profile__title');
const jobUser = document.querySelector('.profile__subtitle');
const formElementProfile = document.querySelector('#container-one');

const btnCloseCard = document.querySelector('#close-card');
const btnAdd = document.querySelector('.profile__add-button');
const formElementCards = document.querySelector('#container-two');
const popupCards = document.querySelector('#popup__cards');
const inputTitle = document.querySelector('#title');
const inputLink = document.querySelector('#link');

const cardsContainer = document.querySelector('.cards');
const btnCloseImg = document.querySelector('#close-img');
const popupImg = document.querySelector('#popup__img');
const popupElementImg = popupImg.querySelector('#img');
const popupNameImg = popupImg.querySelector('.popup__name-img');

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
  formSubmitCallBack: () => {
    const card = {
      name: inputTitle.value,
      link: inputLink.value
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
    name: data.name,
    job: data.job
  }
});

btnEdit.addEventListener('click', () => {
  profilePopup.open();
  const data = userInfo.getUserInfo();
  inputName.value = data.name;
  inputJob.value = data.job;
});

btnAdd.addEventListener('click', () => {
  cardPopup.open();
});

defaultCard.renderCard();
popupProfileValid.enableValidation();

popupCardsValid.enableValidation();
popupWithImage.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();
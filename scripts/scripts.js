import {FormValidator} from './FormValidator.js'
import {Card} from './Card.js'

const initialCards = [
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

popupProfileValid.enableValidation();
popupCardsValid.enableValidation();

function openPopup (popup){
  popup.classList.add(popupOpened);
  document.addEventListener('keydown', keyHandlerEsc);
  document.addEventListener('click', closeClickPopup);
}

function closePopup (popup){
  popup.classList.remove(popupOpened);
  document.removeEventListener('keydown', keyHandlerEsc);
  document.removeEventListener('click', closeClickPopup);
}

function handleProfileFormSubmit (evt){
  evt.preventDefault();
  nameUser.textContent = inputName.value;
  jobUser.textContent = inputJob.value;
  closePopup(popupProfile);
}

function openProfilePopup (evt){
  evt.preventDefault();
  inputName.value = nameUser.textContent;
  inputJob.value = jobUser.textContent;
  openPopup(popupProfile);
}

function openFormImg (link, name){
  popupElementImg.src = link;
  popupNameImg.textContent = name;
  popupElementImg.alt = name;
  openPopup(popupImg);
}

function createCard (element) {
  const card = new Card(element, '#cards__template', openFormImg)
  const cardElement = card.generateCard();

  return cardElement;
};

function openCardsPopup (evt){
  evt.preventDefault();
  inputTitle.value = '';
  inputLink.value = '';
  openPopup(popupCards);
}

function handleCardsFormSubmit (evt){
  evt.preventDefault();
  const card = {
    name: inputTitle.value,
    link: inputLink.value
  }
  renderCard(card);
  closePopup(popupCards);
}

function keyHandlerEsc(evt){
  if(evt.key === 'Escape'){
    const popupCloseEsc = document.querySelector('.popup_opened')
    closePopup(popupCloseEsc)
  }
}

function closeClickPopup(evt){
  if(evt.target.classList.contains('popup_opened')){
    const popupCloseOverlay = document.querySelector('.popup_opened')
    closePopup(popupCloseOverlay)
  }
}

const renderCard = (element) => {
  const cardElement = createCard(element);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(element => {
  renderCard(element);
});

btnEdit.addEventListener('click', openProfilePopup);

btnCloseProfile.addEventListener('click', function(){
  closePopup(popupProfile);
});

btnAdd.addEventListener('click', openCardsPopup);

btnCloseCard.addEventListener('click', function(){
  closePopup(popupCards);
});

btnCloseImg.addEventListener('click', function(){
  closePopup(popupImg);
});

formElementCards.addEventListener('submit', handleCardsFormSubmit);
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
const btnCloseOne = document.querySelector('#close-one');
const btnEdit = document.querySelector('.profile__edit-button');
const popupOpened = 'popup_opened';
let popupProfile = document.querySelector('#profile');
let inputName = document.querySelector('#name');
let inputJob = document.querySelector('#job');
let nameUser = document.querySelector('.profile__title');
let jobUser = document.querySelector('.profile__subtitle');
let formElementProfile = document.querySelector('#container-one');

const btnCloseTwo = document.querySelector('#close-two');
const btnAdd = document.querySelector('.profile__add-button');
let formElementCards = document.querySelector('#container-two');
let popupCards = document.querySelector('#cards');
let inputTitle = document.querySelector('#title');
let inputLink = document.querySelector('#link');


btnEdit.addEventListener('click', formAcceptHandler);
btnCloseOne.addEventListener('click', formSubmitHandler);

function openPopupProfile (){
    popupProfile.classList.add(popupOpened);
}

function closePopupProfile (){
    popupProfile.classList.remove(popupOpened);
}

function formSubmitHandler (evt){
    evt.preventDefault();
    nameUser.textContent = inputName.value;
    jobUser.textContent = inputJob.value;
    closePopupProfile();
}

function formAcceptHandler (evt){
    evt.preventDefault();
    inputName.value = nameUser.textContent;
    inputJob.value = jobUser.textContent;
    openPopupProfile();
}

formElementProfile.addEventListener('submit', formSubmitHandler);


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

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cards__template').content;

  const renderCard = (element) => {
    const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
    const cardImageLink =  cardElement.querySelector('.cards__photo');
    const cardText = cardElement.querySelector('.cards__text');
    const cardImageName = cardElement.querySelector('.cards__photo');
    const cardBtnRemove = cardElement.querySelector('.cards__remove');
    const cardBtnlike = cardElement.querySelector('.cards__like');

    cardBtnlike.addEventListener('click', cardLikeButton);
    cardBtnRemove.addEventListener('click', cardRemoveButton);

    cardImageLink.src = element.link;
    cardText.textContent = element.name;
    cardImageName.alt = element.name;

    cardsContainer.prepend(cardElement);
  }

  initialCards.forEach(element => {
    renderCard(element);
  });

  function cardLikeButton(evt) {
    evt.target.classList.toggle('cards__like_black');
}

  function cardRemoveButton(evt) {
    evt.target.closest('.cards__card').remove();
}

function openPopupCards(){
  popupCards.classList.add(popupOpened);
}

function closePopupCards (){
  popupCards.classList.remove(popupOpened);
}


function formAcceptCards (evt){
  evt.preventDefault();
  inputTitle.value = '';
  inputLink.value = '';
  openPopupCards();
}

function formSubmitCards (evt){
  evt.preventDefault();
  const card = {
    name: inputTitle.value,
    link: inputLink.value
  }
  renderCard(card);
  closePopupCards();
}

btnAdd.addEventListener('click', formAcceptCards);
btnCloseTwo.addEventListener('click', formSubmitCards);
formElementCards.addEventListener('submit', formSubmitCards);

const formElementImg = document.querySelector('#container-three');
const btnCloseThree = document.querySelector('#close-three');
const popupImg = document.querySelector('#img');
const btnOpenImg = document.querySelector('.cards__photo');

function closePopupImg (){
  popupImg.classList.remove(popupOpened);
}

btnCloseThree.addEventListener('click', closePopupImg);

btnOpenImg.addEventListener('click', openFormImg);

function openFormImg (){
  popupImg.classList.add(popupOpened);
}


/*const renderImg = (element) => {
  const cardElement = cardTemplate.querySelectorAll('.cards__photo');
  const popupImg = cardElement.querySelector('.popup__img');
  const namePopupImg = document.querySelector('.popup__name-img');
  const cardText = cardElement.querySelector('.cards__text');

  btnOpenImg.addEventListener('click', openFormImg);
}

const arrayImg = initialCards.map(element =>{
  return element.link
});

arrayImg.forEach(element => {
  renderImg(element);
});



console.log(arrayImg);*/
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


btnEdit.addEventListener('click', function(){
  openPopup(popupProfile);
});

btnCloseProfile.addEventListener('click', function(){
  closePopup(popupProfile);
});

function openPopup (popup){
    popup.classList.add(popupOpened);
}

function closePopup (popup){
    popup.classList.remove(popupOpened);
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

formElementProfile.addEventListener('submit', handleProfileFormSubmit);


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

  function createCard (element) {
    const cardElement = cardTemplate.querySelector('.cards__card').cloneNode(true);
    const cardImage =  cardElement.querySelector('.cards__photo');
    const cardText = cardElement.querySelector('.cards__text');
    const cardBtnRemove = cardElement.querySelector('.cards__remove');
    const cardBtnlike = cardElement.querySelector('.cards__like');

    cardBtnlike.addEventListener('click', handleLikeButton);
    cardBtnRemove.addEventListener('click', handleRemoveButton);

    cardImage.addEventListener('click', function() {
      openFormImg(element);
    })

    cardImage.src = element.link;
    cardText.textContent = element.name;
    cardImage.alt = element.name;

    return cardElement;
  };

  const renderCard = (element) => {
    const cardElement = createCard(element);
    cardsContainer.prepend(cardElement);
  }

  initialCards.forEach(element => {
    renderCard(element);
  });

  function handleLikeButton(evt) {
    evt.target.classList.toggle('cards__like_black');
}

  function handleRemoveButton(evt) {
    evt.target.closest('.cards__card').remove();
}

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

btnAdd.addEventListener('click', function(){
  openPopup(popupCards);
});

btnCloseCard.addEventListener('click', function(){
  closePopup(popupCards);
});

formElementCards.addEventListener('submit', handleCardsFormSubmit);

const formElementImg = document.querySelector('#container-three');
const btnCloseImg = document.querySelector('#close-img');
const btnOpenImg = document.querySelector('.cards__photo');
const popupImg = document.querySelector('#popup__img');
const popupElementImg = popupImg.querySelector('#img');
const popupNameImg = popupImg.querySelector('.popup__name-img');


btnCloseImg.addEventListener('click', function(){
  closePopup(popupImg)
});

function openFormImg (element){
  popupElementImg.src = element.link;
  popupNameImg.textContent = element.name;
  popupElementImg.alt = element.name;
  openPopup(popupImg);
}
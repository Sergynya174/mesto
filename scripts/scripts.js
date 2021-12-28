const btnClose = document.querySelector('.popup__close-btn');
const btnSave = document.querySelector('.popup__save-btn');
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button');
const btnLike = document.querySelector('.elements__like');
let popup = document.querySelector('.popup');
const popupOpened = 'popup_opened';
let inputName = document.querySelector('#name');
let inputJob = document.querySelector('#job');
let nameUser = document.querySelector('.profile__title');
let jobUser = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__container')


btnEdit.addEventListener('click', function(){
    popup.classList.add(popupOpened);
});

btnClose.addEventListener('click', function(){
    popup.classList.remove(popupOpened);
});

function formSubmitHandler (evt){
    evt.preventDefault();
    nameUser.textContent = inputName.value;
    jobUser.textContent = inputJob.value;
    popup.classList.remove(popupOpened);
};

formElement.addEventListener('submit', formSubmitHandler);
const btnClose = document.querySelector('.popup__close-btn');
const btnEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
const popupOpened = 'popup_opened';
let inputName = document.querySelector('#name');
let inputJob = document.querySelector('#job');
let nameUser = document.querySelector('.profile__title');
let jobUser = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__container')

function openPopup () {
    popup.classList.add(popupOpened);
}

btnEdit.addEventListener('click', openPopup);

function closePopup () {
    popup.classList.remove(popupOpened);
}

btnClose.addEventListener('click', closePopup);

function formSubmitHandler (evt){
    evt.preventDefault();
    nameUser.textContent = inputName.value;
    jobUser.textContent = inputJob.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
const btnClose = document.querySelector('.popup__close-btn');
const btnEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
const popupOpened = 'popup_opened';
let inputName = document.querySelector('#name');
let inputJob = document.querySelector('#job');
let nameUser = document.querySelector('.profile__title');
let jobUser = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__container')

btnEdit.addEventListener('click', openPopup);
btnEdit.addEventListener('click', formAcceptHandler);
btnClose.addEventListener('click', closePopup);

function openPopup () {
    popup.classList.add(popupOpened);
}

function closePopup () {
    popup.classList.remove(popupOpened);
}

function formSubmitHandler (evt){
    evt.preventDefault();
    nameUser.textContent = inputName.value;
    jobUser.textContent = inputJob.value;
    closePopup();
}

function formAcceptHandler (evt){
    evt.preventDefault();
    inputName.value = nameUser.textContent;
    inputJob.value = jobUser.textContent;
}

formElement.addEventListener('submit', formSubmitHandler);
import './index.js';
import './index.css';
import {FormValidator} from './scripts/FormValidator.js';
import {Card} from './scripts/Card.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import {api} from './scripts/Api.js';

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
const nameUser = document.querySelector('.profile__title');
const jobUser = document.querySelector('.profile__subtitle');

const btnAdd = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('#popup__cards');

const cardsContainer = document.querySelector('.cards');
const popupImg = document.querySelector('#popup__img');

const btnAvatar = document.querySelector('.profile__avatar-button');
const popupAvatar = document.querySelector('#popup__avatar');
const avatarUser = document.querySelector('.profile__avatar');

const popupDelete = document.querySelector('#popup__delete');
export let userId;

const popupProfileValid = new FormValidator(formsValidationConfig, popupProfile);
const popupCardsValid = new FormValidator(formsValidationConfig, popupCards);
const popupAvatarValid = new FormValidator(formsValidationConfig, popupAvatar);

api.getProfile().then(userData => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
}).catch(err => {
  console.log(err)
})

const renderCard = (item) => {
  const card = createCard(item);
  defaultCard.addItem(card);
}

const defaultCard = new Section({renderer: renderCard}, cardsContainer);

const createCard = (item) => {
  const card = new Card(item, '#cards__template', handleCardClick, (id) => {
    deletePopup.open()
    deletePopup.changeSubmitHandler(() => {
      api.deleteCard(id).then(res => {
        card.handleRemoveButton()
        deletePopup.close()
      })
    })
  },
  (id) => {
    if(card.isLiked()) {
      api.deleteLike(id).then(res => {
        card.setLikes(res.likes)
      })
    } else {
      api.addLike(id).then(res => {
        card.setLikes(res.likes)
      })
    }
  }
  )
  const cardElement = card.generateCard();
  return cardElement;
}

api.getCards().then(cards => {
  defaultCard.renderCard(cards);
}).catch(err => {
  console.log(err)
})

const handleCardClick = (evt) => {
  const data = {
    name: evt.target.alt,
    link: evt.target.src
  }
  popupWithImage.open(data);
};

const cardPopup = new PopupWithForm (popupCards, (cardData) => {
    cardPopup.renderLoading(true)
    api.addCard(cardData).then(data => {
      const card = {
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      };
      renderCard(card);
      cardPopup.close()
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      cardPopup.renderLoading(false)
    })
  }
);

const profilePopup = new PopupWithForm (popupProfile,
  (userData) => {
    profilePopup.renderLoading(true);
    api.editProfile(userData).then(data => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      profilePopup.renderLoading(false);
    })
  }
);

const userInfo = new UserInfo ( {
  data: {
    name: nameUser,
    about: jobUser,
    avatar: avatarUser
  }
});

const popupWithImage = new PopupWithImage (popupImg);

const avatarPopup = new PopupWithForm (popupAvatar, 
  (userData) => {
    avatarPopup.renderLoading(true)
    api.addAvatar(userData).then(data => {
      userInfo.setUserAvatar(data);
      avatarPopup.close();
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      avatarPopup.renderLoading(false)
    })
  }
);

const deletePopup = new PopupWithForm (popupDelete, () => {
});

btnEdit.addEventListener('click', () => {
  profilePopup.open();
});

btnAdd.addEventListener('click', () => {
  cardPopup.open();
});

btnAvatar.addEventListener('click', () => {
  avatarPopup.open();
})

popupProfileValid.enableValidation();
popupCardsValid.enableValidation();
popupAvatarValid.enableValidation();

profilePopup.setEventListeners();
popupWithImage.setEventListeners();
cardPopup.setEventListeners();
avatarPopup.setEventListeners();
deletePopup.setEventListeners();
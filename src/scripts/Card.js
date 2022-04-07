import {userId} from '../index.js';

export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick, handelLakeClick){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handelLakeClick = handelLakeClick;
    this._popupDelete = document.querySelector('#popup__delete');
  }

  _getTemplate(){
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__card')
      .cloneNode(true);

    return cardElement;
  }

  isLiked() {
    const userLikedCard = this._likes.find(user => user._id === this._userId)
    return userLikedCard
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage = this._element.querySelector('.cards__photo');
    this._cardText = this._element.querySelector('.cards__text');

    this._cardImage.src = this._link;
    this._cardText.textContent = this._name;
    this._cardImage.alt = this._name;
    this.setLikes(this._likes);

    return this._element;
  }

  setLikes(newLikes) {
    this._likes = newLikes
    const likeCountElement =  this._element.querySelector('.cards__like-count');
    likeCountElement.textContent = this._likes.length;

    if(this.isLiked()) {
      this._fillLike();
    } else {
      this._unfillLike();
    }
  }

  _fillLike() {
    this._cardBtnlike.classList.add('cards__like_black');
  }

  _unfillLike() {
    this._cardBtnlike.classList.remove('cards__like_black');
  }

  handleRemoveButton(){
    this._element.remove();
    this._element = null;
  }

  _setEventListeners(){
    this._cardImage = this._element.querySelector('.cards__photo');
    this._cardText =this._element.querySelector('.cards__text');
    this._cardBtnlike = this._element.querySelector('.cards__like');
    this._cardBtnRemove = this._element.querySelector('.cards__remove');

    if(this._ownerId !== this._userId) {
      this._cardBtnRemove.style.display = 'none';
    }

    this._cardBtnlike.addEventListener('click', () => {
      this._handelLakeClick(this._id);
    });

    this._cardBtnRemove.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._cardImage.addEventListener('click', this._handleCardClick);
  }
}
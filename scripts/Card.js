export class Card {
  constructor(data, cardSelector, openFormImg){
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openFormImg = openFormImg;
  }

  _getTemplate(){
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__photo').src = this._link;
    this._element.querySelector('.cards__text').textContent = this._name;
    this._element.querySelector('.cards__text').alt = this._name;

    return this._element;
  }

  _handleLikeButton(){
    this._cardBtnlike.classList.toggle('cards__like_black');
  }

  _handleRemoveButton(){
    this._cardBtnRemove.closest('.cards__card').remove();
  }

  _setEventListeners(){
    this._cardBtnlike = this._element.querySelector('.cards__like');
    this._cardBtnRemove = this._element.querySelector('.cards__remove');
    this._cardText = this._element.querySelector('.cards__text');
    this._cardImage =  this._element.querySelector('.cards__photo');

    this._cardBtnlike.addEventListener('click', () => {
      this._handleLikeButton();
    });

    this._cardBtnRemove.addEventListener('click', () => {
      this._handleRemoveButton();
    });

    this._cardImage.addEventListener('click', () => {
      this._openFormImg(this._link, this._name);
    });
  }
}
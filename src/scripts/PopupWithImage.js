import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup){
        super(popup);
        this._popupElementImg = popup.querySelector('#img');
        this._popupNameImg = popup.querySelector('.popup__name-img');
    }

    open(data){
        super.open();
        this._popupElementImg.src = data.link;
        this._popupElementImg.alt = data.name;
        this._popupNameImg.textContent = data.name;
    }
}
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, {formSubmitCallBack}) {
        super(popup);
        this._form = this._popup.querySelector('.popup__container');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input-line'));
        this._formSubmitCallBack = formSubmitCallBack;
        this._submitButton = this._popup.querySelector('.popup__save-btn');
        this._button = this._submitButton.textContent;
    }

    _getInputValues(){
        const data = {};
        this._inputs.forEach((element) => {
            data[element.name] = element.value;
        });
        return data;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._formSubmitCallBack = newSubmitHandler;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitCallBack(this._getInputValues());
        });
    }

    close(){
        super.close();
        this._form.reset();
    }

    renderLoading(isLoading){
        if(isLoading){
            this._submitButton.textContent = (`${this._button} ...`);
        } else {
            this._submitButton.textContent = this._button;
        }
      }
}
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, {formSubmitCallBack}) {
        super(popup);
        this._formSubmit = this._formSubmit.bind(this);
        this._form = this._popup.querySelector('.popup__container');
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input-line'));
        this._formSubmit = formSubmitCallBack;
    }

    _formSubmit(evt) {
        evt.preventDefault();
        this._formSubmitCallBack(this._getInputValues());
        this._form.reset();
    }

    _getInputValues(){
        const data = {};
        this._inputs.forEach((element) => {
            data[element.name] = element.value;
        });
        return data;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', this._formSubmit(this._getInputValues()));
    }

    close(){
        super.close();
        this._form.reset();
    }
}
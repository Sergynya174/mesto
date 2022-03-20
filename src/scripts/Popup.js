export default class Popup{
    constructor(popup){
        this._popup = popup;
        this._popupCloseBtn = this._popup.querySelector('.popup__close-btn');
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt){
        if(evt.key === 'Escape'){
            this.close();
        }
    }

    setEventListeners(){
        this._popupCloseBtn.addEventListener('click', () => {
            this.close();
        });

        this._popup.addEventListener('click', (evt) => {
            if(evt.target.classList.contains('popup_opened')){
                this.close();
            }
        });
    }
}
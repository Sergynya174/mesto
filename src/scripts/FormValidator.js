export class FormValidator {
  constructor(config, form){
    this._config = config;
    this._form = form.querySelector('.popup__container');

    this._inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _handleSubmit(evt){
    evt.preventDefault()
  }

  _showError(input){
    const errorElement = this._form.querySelector(`#${input.id}-error`)
    input.classList.add(this._config.inputErrorClass)
    errorElement.classList.add(this._config.errorClass)   
    errorElement.textContent = input.validationMessage
  }
      
  _hideError(input){
    const errorElement = this._form.querySelector(`#${input.id}-error`)
    input.classList.remove(this._config.inputErrorClass)
    errorElement.classList.remove(this._config.errorClass)
    errorElement.textContent = ''
  }

  _handleField = (input) =>{
    if (input.validity.valid){
      this._hideError(input, input.validationMessage);
    }
    else {
      this._showError(input);
    }
  }

  setSubmitButtonState(){
    this._button.disabled = !this._form.checkValidity()
    this._button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity())
  }

  _setFormListeners(){    
    this._inputs.forEach(input => input.addEventListener('input', () => this._handleField(input)))
      
    this._form.addEventListener('submit', this._handleSubmit)
    this._form.addEventListener('input', () => this.setSubmitButtonState())
      
    this.setSubmitButtonState()
  }

  enableValidation() {
    this.setSubmitButtonState();
    this._setFormListeners();
  }
}

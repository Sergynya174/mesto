const formsValidationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input-line',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: 'popup__input-line_type_error',
  errorClass: 'popup__error_visible'
}


function enableValidation(element) {
  const forms = [...document.querySelectorAll(element.formSelector)]

  forms.forEach(form => setFormListeners(form, element))
}

function setFormListeners(form, config){
  const inputs = [...form.querySelectorAll(config.inputSelector)]

  inputs.forEach(input => input.addEventListener('input', () => handleField(form, input, config)))

  form.addEventListener('submit', handleSubmit)
  form.addEventListener('input', () => setSubmitButtonState(form, config))

  setSubmitButtonState(form, config)
}

function handleSubmit(evt){
  evt.preventDefault()
}

function handleField(form, input, config){
  if (input.validity.valid){
    hideError(form, input, config)
  }
  else {
    showError(form, input, config)
  }
}

function showError(form, input, config){
  input.classList.add(config.inputErrorClass)

  const errorElement = form.querySelector(`#${input.id}-error`)
  errorElement.classList.add(config.errorClass)

  errorElement.textContent = input.validationMessage
  console.log(errorElement)
}

function hideError(form, input, config){
  input.classList.remove(config.inputErrorClass)

  const errorElement = form.querySelector(`#${input.id}-error`)
  errorElement.classList.remove(config.errorClass)
  errorElement.textContent = ''
}

function setSubmitButtonState(form, config){
  const button = form.querySelector(config.submitButtonSelector)

  button.disabled = !form.checkValidity()
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
}

enableValidation(formsValidationConfig)
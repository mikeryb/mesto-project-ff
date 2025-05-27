export function showInputError(element, errorClass, errorMessage) {
  element.classList.add(errorClass);
  document.querySelector(`.${element.id}-error`).textContent = errorMessage;
}

export function hideInputError(element, errorClass) {
  element.classList.remove(errorClass);
  document.querySelector(`.${element.id}-error`).textContent = "";
}

export function isValid(form, errorClass) {
  if (form.validity.patternMismatch) {
    form.setCustomValidity(form.dataset.errorMessage);
  } else {
    form.setCustomValidity("");
  }
  if (!form.validity.valid) {
    showInputError(form, errorClass, form.validationMessage);
  } else {
    hideInputError(form, errorClass);
  }
}

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement, buttonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(buttonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(buttonClass);
  }
}

export function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass
}) {  
 const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((element) => {
    element.addEventListener('input', (evt) => {
      isValid(evt.target, inputErrorClass);
      const inputList = Array.from(element.querySelectorAll(inputSelector));
      const button = element.querySelector(submitButtonSelector);
      toggleButtonState(inputList, button, inactiveButtonClass);
    })
  })  
}

export function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((element) => {
    hideInputError(element, validationConfig.errorClass);
  })
}

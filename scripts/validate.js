const showInputError = (formElement, inputElement, errorMessage, setings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(setings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(setings.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, setings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(setings.inputErrorClass);
    errorElement.classList.remove(setings.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, setings) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, setings);
    } else {
      hideInputError(formElement, inputElement, setings);
    }
  };
  
  const setEventListeners = (formElement, setings) => {
    const inputList = Array.from(formElement.querySelectorAll(setings.inputSelector));
    const buttonElement = formElement.querySelector(setings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, setings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, setings);
        toggleButtonState(inputList, buttonElement, setings);
      });
    });
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
  }

  // Состояние не активной кнопки
  const disableButton = (buttonElement, setings) => {
    buttonElement.classList.add(setings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  };

  const toggleButtonState = (inputList, buttonElement, setings) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, setings);
    } else {
        buttonElement.classList.remove(setings.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
  };
  
  const enableValidation = (setings) => {
    const formList = Array.from(document.querySelectorAll(setings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, setings);
    });
  };

  enableValidation(setings);
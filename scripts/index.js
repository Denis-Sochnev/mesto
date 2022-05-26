const openButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.pop-up');
const closeButton = document.querySelector('.pop-up__close');
const profileName = document.querySelector('.profile__name');
const profileProffesion = document.querySelector('.profile__profession');
const inputName = document.querySelector('.form__information_name');
const inputProffesion = document. querySelector('.form__information_profession');

let formElement = document.querySelector('.form'); 
let nameInput = document.querySelector('.form__information_name');
let jobInput = document.querySelector('.form__information_profession');

// Функция открытия pop-up 
function popupOpened() {
    popup.classList.add ('pop-up_oppened');
}

// Функция закрытия pop-up (удаление модификатора)
function popupClosed() {
    popup.classList.remove ('pop-up_oppened');
}

// Сохранение внесенной информации в форме
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProffesion.textContent = jobInput.value;
    popupClosed();
}
formElement.addEventListener('submit', formSubmitHandler);

// Открытие pop-up с информацией в полях ввода
openButton.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputProffesion.value = profileProffesion.textContent;
    popupOpened();
})

// Закрытие  pop-up при нажатии
closeButton.addEventListener('click', popupClosed);
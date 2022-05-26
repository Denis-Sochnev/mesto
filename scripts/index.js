const openButton = document.querySelector('.profile-info__edit-button');
const popup = document.querySelector('.pop-up');
const closeButton = document.querySelector('.pop-up__close');
const profileName = document.querySelector('.profile-info__name');
const profileProffesion = document.querySelector('.profile-info__profession');
const inputName = document.querySelector('.form__information_name');
const inputProffesion = document. querySelector('.form__information_profession');
const saveButton = document.querySelector('.form__save');
const popupProfile = document.querySelector('.pop-up__body');


// Открытие pop-up с информацией в полях ввода
openButton.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputProffesion.value = profileProffesion.textContent;
    popupOpen(popupProfile);
})

// Функция открытия pop-up 
function popupOpen() {
    popup.classList.add ('pop-up_oppened');
}

// Закрытие  pop-up при нажатии
closeButton.addEventListener('click', popupClose);

// Функция закрытия pop-up (удаление модификатора)
function popupClose() {
    const popupOpened = document.querySelector('.pop-up_oppened');
    popup.classList.remove ('pop-up_oppened');
}

// Сохранение внесенной информации в форме
let formElement = document.querySelector('.pop-up'); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector('.form__information_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.form__information_profession'); // Воспользуйтесь инструментом .querySelector()

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProffesion.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler);


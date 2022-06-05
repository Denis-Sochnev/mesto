// Массив для формирования карточке на странице
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

// Переменные pop-up для редоктирования имени и профессии
const openButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.pop-up');
const closeButton = document.querySelector('.pop-up__close');
const profileName = document.querySelector('.profile__name');
const profileProffesion = document.querySelector('.profile__profession');
const inputName = document.querySelector('.form__information_value_name');
const inputProffesion = document. querySelector('.form__information_value_profession');

let formElement = document.querySelector('.form'); 
let nameInput = document.querySelector('.form__information_value_name');
let jobInput = document.querySelector('.form__information_value_profession');

// Переменные pop-up для добавления карточек (изображение + наименование)
const addButton = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.pop-up_value_add-card');
const buttonCreate = document. querySelector('.form__save_value_create');
const popupCardClose = document. querySelector('.pop-up_close_card');

let formCard = document.querySelector('.form_add_card');
let inputLabel = document.querySelector('.form__information_value_label');
let inputLink = document.querySelector('.form__information_value_link');

//Переменные для октрытия изображения
const imageContainer = document.querySelector('.pop-up_open-container');
const imagePopup = document.querySelector('.pop-up__image');
const labelPopup = document.querySelector('.pop-up__label-image');
const imageClose = document.querySelector('.pop-up__close-image');

// Переменные для автоматической подгрузки карточик используя массив + постановка лайков
const cardsBlock = document.querySelector('.cards-grid');
const buttonLike = document.querySelector('.card__like');
const cardForm = document.querySelector('.template-card').content;
const arrayInfo = initialCards.map(function (element) {
    return {
      name: element.name,
      link: element.link
    };
  });

// Автоматическое добавление карточек при загрузке страницы
function autoAdd() {
    arrayInfo.forEach(autoCard);
}

function autoCard({ name, link }) {
  const cardElement = cardForm.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__name').textContent = name;
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__trashcan').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('.card__image').addEventListener('click', function(evt) {
    imagePopup.src = evt.target.src;
    labelPopup.textContent = evt.target.alt;
    popupImage();
  });

  cardsBlock.append(cardElement);
}
autoAdd();

// Функция открытия pop-up Image 
function popupImage() {
  imageContainer.classList.add ('pop-up_oppened');
}

// Функция закрытия pop-up Image 
function popupImageClose() {
  imageContainer.classList.remove ('pop-up_oppened');
}

// Функция открытия pop-up 
function popupOpened() {
    popup.classList.add ('pop-up_oppened');
}

// Функция закрытия pop-up (удаление модификатора)
function popupClosed() {
    popup.classList.remove ('pop-up_oppened');
}

// Функция открытия pop-up добавления карточки
function popupCardOpened() {
    popupCard.classList.add ('pop-up_oppened');
}

// Функция закрытия pop-up добавления карточки (удаление модификатора)
function popupСardClosed() {
    popupCard.classList.remove ('pop-up_oppened');
}

// Сохранение внесенной информации в форме
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProffesion.textContent = jobInput.value;
    popupClosed();
}
formElement.addEventListener('submit', formSubmitHandler);

// Добавление карточки на страницу
function addCard (evt) {
    evt.preventDefault();
    const cardElement = cardForm.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = inputLink.value;
    cardElement.querySelector('.card__image').alt = inputLabel.value;
    cardElement.querySelector('.card__name').textContent = inputLabel.value;
    cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
      });
    cardElement.querySelector('.card__trashcan').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    cardsBlock.prepend(cardElement);
    cardElement.querySelector('.card__image').addEventListener('click', function(evt) {
      imagePopup.src = evt.target.src;
      labelPopup.textContent = evt.target.alt;
      popupImage();
    });

    inputLink.value = '';
    inputLabel.value = '';
    popupСardClosed();
}
formCard.addEventListener('submit', addCard);

// Открытие pop-up с информацией в полях ввода
openButton.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputProffesion.value = profileProffesion.textContent;
    popupOpened();
})

// Закрытие  pop-up при нажатии
closeButton.addEventListener('click', popupClosed);

// Открытие pop-up добавления карточки
addButton.addEventListener('click', () => {
    popupCardOpened();
})

// Закрытие  pop-up при нажатии
popupCardClose.addEventListener('click', popupСardClosed);

// Закрытие  pop-up Image при нажатии
imageClose.addEventListener('click', popupImageClose);
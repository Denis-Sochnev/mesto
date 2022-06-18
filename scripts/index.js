const setings = {
  formSelector: '.form',
  inputSelector: '.form__information',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_inactive',
  inputErrorClass: 'form__information_error',
  errorClass: 'form__input-error_active'
};

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

// Переменные pop-up
const popups = document.querySelectorAll('.pop-up');
const popupProfile = document.querySelector('.pop-up_edit-profile')
const popupCard = document.querySelector('.pop-up_add-card')
const popupPicture = document.querySelector('.pop-up_open-picture')

// Переменные для кнопок
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonCreate = document. querySelector('.form__save_value_create');

// Переменные pop-up для редоктирования имени и профессии
const profileName = document.querySelector('.profile__name');
const profileProffesion = document.querySelector('.profile__profession');
const inputName = document.querySelector('.form__information_value_name');
const inputProffesion = document. querySelector('.form__information_value_profession');

// Переменные для "input"
const inputLabel = document.querySelector('.form__information_value_label');
const inputLink = document.querySelector('.form__information_value_link');
const nameInput = document.querySelector('.form__information_value_name');
const jobInput = document.querySelector('.form__information_value_profession');

// Переменные для изображений
const imagePopup = document.querySelector('.pop-up__image');
const labelPopup = document.querySelector('.pop-up__label-image');

// Переменные для формы
const formEditProfile = document.querySelector('.form_edit-profile');
const formAddCard = document.querySelector('.form_add-card');

// Переменные для автоматической подгрузки карточик используя массив
const cardsBlock = document.querySelector('.cards-grid');
const cardForm = document.querySelector('.template-card').content;

//Закрытие по нажатию клавишы
const pressButtonEsc = evt => {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.pop-up_oppened')
    closedPopup(popupOpen)
 }
}

// Функция открытия pop-up
function openedPopup(popups) {
  popups.classList.add('pop-up_oppened');
  document.addEventListener('keydown', pressButtonEsc);
}

// Функция закрытия pop-up (удаление модификатора)
function closedPopup(popups) {
  popups.classList.remove('pop-up_oppened');
  document.removeEventListener('keydown', pressButtonEsc);
}

// Автоматическое добавление карточек при загрузке страницы
initialCards.forEach((element) => {
  const fullCard = createCard(element);
  loadingCard(fullCard);
});

function loadingCard(card) {
  cardsBlock.append(card);
}

// Функция для формирования карточки
function createCard(element) {
  const name = element.name;
  const link = element.link;
  const cardElement = cardForm.querySelector('.card').cloneNode(true);
  const nameCard = cardElement.querySelector('.card__name');
  const pictureCard = cardElement.querySelector('.card__image');
  const likeCardButton = cardElement.querySelector('.card__like');
  const trashcanCardButton = cardElement.querySelector('.card__trashcan');

  likeCardButton.addEventListener('click', likeCard);
  trashcanCardButton.addEventListener('click', deleteCard);
  pictureCard.addEventListener('click', showingPopupPicture);

  nameCard.textContent = name;
  pictureCard.src = link;
  pictureCard.alt = name;

  return cardElement;
}

// Функция постановка "like"
function likeCard(evt) {
  evt.target.classList.toggle('card__like_active');
}

// Функция удаления карточки
function deleteCard (evt) {
  evt.target.closest('.card').remove();
}

// Функция вывода изображения в "pop-up"
function showingPopupPicture (evt) {
  imagePopup.src = evt.target.src;
  imagePopup.alt = evt.target.closest('.card').querySelector('.card__name').textContent;
  labelPopup.textContent = evt.target.closest('.card').querySelector('.card__name').textContent;
  openedPopup(popupPicture);
}

// Функция добаления новой карточки на страницу
function placementCard (evt) {
  evt.preventDefault();
  const fullCardNew = createCard({name: inputLabel.value, link: inputLink.value});
  cardsBlock.prepend(fullCardNew);
  closedPopup(popupCard);
  evt.target.reset();
  disableButton(evt.target.querySelector(setings.submitButtonSelector), setings);
}

// Сохранение внесенной информации в форме
function submiFormtHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProffesion.textContent = jobInput.value;
    closedPopup(popupProfile);
}

// Открытие pop-up с информацией в полях ввода
buttonEditProfile.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputProffesion.value = profileProffesion.textContent;
    openedPopup(popupProfile);
})

// Открытие pop-up добавления карточки
buttonAddCard.addEventListener('click', () => {
  openedPopup(popupCard);
})

//Закрытие по нажатию вне контейнера формы
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('pop-up_oppened')) {
      closedPopup(popup);
    }
    if (evt.target.classList.contains('pop-up__close')) {
      closedPopup(popup);
    }
  });
});

// Отправка заполненой формы на редоктирование профиля
formEditProfile.addEventListener('submit', submiFormtHandler);

// Отправка заполненой формы на создание карточки
formAddCard.addEventListener('submit', placementCard);

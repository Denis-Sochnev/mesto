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
const popupProfile = document.querySelector('.pop-up__edit-profile')
const popupCard = document.querySelector('.pop-up__add-card')
const popupPicture = document.querySelector('.pop-up__open-picture')

// Переменные для кнопок
const openButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const buttonCreate = document. querySelector('.form__save_value_create');
const buttonLike = document.querySelector('.card__like');
const closeButton = document.querySelector('.pop-up__close');
const popupCardClose = document. querySelector('.pop-up__close-card');
const imageClose = document.querySelector('.pop-up__close-image');

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
const formElement = document.querySelector('.form');
const formCard = document.querySelector('.form__add-card');

// Переменные для автоматической подгрузки карточик используя массив
const cardsBlock = document.querySelector('.cards-grid');
const cardForm = document.querySelector('.template-card').content;


// Функция открытия pop-up
function openedPopup(popups) {
  popups.classList.add('pop-up_oppened');
}

// Функция закрытия pop-up (удаление модификатора)
function closedPopup(popups) {
  popups.classList.remove('pop-up_oppened');
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
  imagePopup.alt = evt.target.name;
  labelPopup.textContent = evt.target.name;
  openedPopup(popupPicture);
}

// Функция добаления новой карточки на страницу
function placementCard (evt) {
  evt.preventDefault();
  const fullCardNew = createCard({name: inputLabel.value, link: inputLink.value});
  loadingCard(fullCardNew);
  cardsBlock.prepend(fullCardNew);
  closedPopup(popupCard);
  evt.target.reset();
}

// Сохранение внесенной информации в форме
function submiFormtHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProffesion.textContent = jobInput.value;
    closedPopup(popupProfile);
}

// Открытие pop-up с информацией в полях ввода
openButton.addEventListener('click', () => {
    inputName.value = profileName.textContent;
    inputProffesion.value = profileProffesion.textContent;
    openedPopup(popupProfile);
})

// Открытие pop-up добавления карточки
addButton.addEventListener('click', () => {
  openedPopup(popupCard);
})

// Общее условие для закрытия pop-up
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('pop-up__close')) {
      closedPopup(popup)
      }
  })
})

// Отправка заполненой формы на редоктирование профиля
formElement.addEventListener('submit', submiFormtHandler);

// Отправка заполненой формы на создание карточки
formCard.addEventListener('submit', placementCard);
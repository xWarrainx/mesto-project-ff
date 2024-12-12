import { initialCards } from './cards.js';
import { like, createCard, deleteCard} from '../components/card.js';
import { showPopup, handleCloseByEsc, handleCloseOverlay, closePopup } from '../components/modal.js';
import '../pages/index.css';

// Определяем переменные
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonsClose  = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.places__list');
const profileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
//--------------------------Работа с формами-------------------------------------------
const formElement = document.forms.edit_profile;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = formElement.elements.name;
const inputDescription = formElement.elements.description;
//--------------------------------Добавление новой карточки--------------------------------
const formNewElement = document.forms.new_place;

const placeName = formNewElement.elements.place_name;
const placelink = formNewElement.elements.link;
const newCard = [
    {
      name: '',
      link: '',
    },
];

// Открытие попапа с картинкой
function showImage(dataCard) {
    popupImage.src = dataCard.link;
    popupImage.alt = dataCard.name;
    popupCaption.textContent = document.querySelector('.card__title').textContent;
        showPopup(popupTypeImage);
}

// Функция получения значения из профиля
const getUserInfo = () => {
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent
}

// Функция получения измененных значений
const setUserInfo = () => {
    profileTitle.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
}

// @todo: Вывести карточки на страницу (forEach)
initialCards.forEach(initialCard => {
    const cardElement = createCard(initialCard, like, showImage, deleteCard);
    cardsContainer.append(cardElement);
});

buttonsClose.forEach(btn => {
    btn.addEventListener('click', () => {
        const popup = btn.closest('.popup');
        closePopup(popup);
    });
})

// Вешаем слушатели на кнопки открытия
profileBtn.addEventListener('click', () => {
    getUserInfo();
    showPopup(popupEdit);
});

addCardBtn.addEventListener('click', () => {
    showPopup(popupAddCard);
});

// Вешаем слушатель на кнопку сабмит
formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    setUserInfo();
    closePopup(popup);
});

// Вешаем слушатель на кнопку сабмит
formNewElement.addEventListener('submit', (evt) => {
    evt.preventDefault();       // убрали действия по умолчанию
    newCard.name = placeName.value; // записали значания из инпута
    newCard.link = placelink.value; // в объект с новой карточкой
    const cardElement = createCard(newCard, like, showImage, deleteCard); // создаем карточку из объекта новой карточки
    cardsContainer.prepend(cardElement);    // и вставляем ее в начало списка
    closePopup(popupAddCard);   // закрываем попап
    evt.target.reset();     // сбрасываем значения в инпутах формы
});

// Присваиваем popup класс popup_is-animated для анимации открытия
popup.classList.add('popup_is-animated');
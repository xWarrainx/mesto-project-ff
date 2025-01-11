import { createCard, like, deleteCard } from '../components/card.js';
import { showPopup, handleCloseByEsc, handleCloseOverlay, closePopup } from '../components/modal.js';
import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, clearValidation } from '../components/validation.js';
import { getUserData, getAllCards, updateUserData, updateUserAvatar, createNewCard, deleteCardAPI, putLikeAPI, deleteLikeAPI } from '../components/api.js';
import '../pages/index.css';


//Определяем переменные
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonsClose  = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.places__list');
const profileBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_avatar');
//--------------------------Работа с формами-------------------------------------------
const formEdit = document.forms.edit_profile;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const inputName = formEdit.elements.name;
const inputDescription = formEdit.elements.description;
//--------------------------------Добавление новой карточки--------------------------------
const formNewElement = document.forms.new_place;

const placeName = formNewElement.elements.place_name;
const placelink = formNewElement.elements.link;

//-------------------------------Замена аватара--------------------------------------------
const profileImageAvatar = document.querySelector('.profile__image-avatar');
const profileAvatar = document.querySelector('.profile__image');
const formAvatar = document.forms.avatar;
const avatarUrlInput = formAvatar.elements.avatar_url;
//---------------------------------Объявление validationConfig------------------------------
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let userId = null;

//Получаем данные пользователя и записываем их значения
Promise.all([
    getUserData(),
    getAllCards()
])
.then(([userData, cards]) => {
    userId = userData._id;
    setUserInfo(userData.name, userData.about);
    profileImageAvatar.setAttribute('style', `background-image: url(${userData.avatar});`);
    cards.forEach(dataCard => {
        const cardElement = createCard(dataCard, like, showImage, userId, deleteCard);
        cardsContainer.append(cardElement);
    });
})
.catch((error) => {
    console.error('Ошибка загрузки данных (данные пользователя, данные карточек):', error);
})

//Функция замены текста кнопки Сохранение...
const changeButtonText = (element, text) => {
    if (!element) return;
    const submitButton = element.querySelector('.popup__button');
    if (!submitButton) {
        console.error('Кнопка не найдена');
        return
    }
        submitButton.textContent = text;
}

//Открытие попапа с картинкой
function showImage(dataCard) {
    popupImage.src = dataCard.link;
    popupImage.alt = dataCard.name;
    popupCaption.textContent = dataCard.name;
        showPopup(popupTypeImage);
}

//Функция получения значения из профиля
const getUserInfo = () => {
    inputName.value = profileTitle.textContent;
    inputDescription.value = profileDescription.textContent
}

// Функция получения измененных значений
const setUserInfo = (name, description) => {
    profileTitle.textContent = name;
    profileDescription.textContent = description;
}

buttonsClose.forEach(btn => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => {
        closePopup(popup);
    });
});

//Вешаем слушателя на аватар пользователя
profileAvatar.addEventListener('click', () => {
    formAvatar.reset();
    clearValidation(formAvatar, validationConfig);
    showPopup(popupAvatar);
});

//Вешаем слушатель на кнопку сабмит добавления аватара
formAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeButtonText(evt.target, "Сохранение...");
    updateUserAvatar(avatarUrlInput)
    .then((res) => {
        profileImageAvatar.setAttribute('style', `background-image: url(${res.avatar});`);
        closePopup(popupAvatar);
    })
    .catch((error) => {
        console.error('Ошибка загрузки данных (обновление аватара):', error);
    })
    .finally(() => {
        changeButtonText(evt.target, "Сохранить");
    });
});

//Вешаем слушатели на кнопки открытия
profileBtn.addEventListener('click', () => {
    getUserInfo();
    clearValidation(formEdit, validationConfig);
    showPopup(popupEdit);
});

addCardBtn.addEventListener('click', () => {
    formNewElement.reset();
    clearValidation(formNewElement, validationConfig);
    showPopup(popupAddCard);
});

//Вешаем слушатель на кнопку сабмит
formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeButtonText(evt.target, "Сохранение...");
    updateUserData(inputName, inputDescription)
    .then((data) => {
        setUserInfo(data.name, data.about);
        closePopup(popup);
    })
    .catch((error) => {
        console.error('Ошибка загрузки данных (обновление данный пользователя):', error);
    })
    .finally(() => {
        changeButtonText(evt.target, "Сохранить");
    });
});

// Вешаем слушатель на кнопку сабмит добавления новой карточки
formNewElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCard = {
          name: placeName.value,
          link: placelink.value
        }
        changeButtonText(evt.target, "Сохранение...");
        createNewCard(newCard)
    .then((dataCard) => {
        const cardElement = createCard(dataCard, like, showImage, userId, deleteCard);
        cardsContainer.prepend(cardElement);
        closePopup(popupAddCard);
        evt.target.reset();     // сбрасываем значения в инпутах формы
    })
    .catch((error) => {
        console.error('Ошибка загрузки данных (данные новой карточки):', error);
    })
    .finally(() => {
        changeButtonText(evt.target, "Сохранить");
    });
});

// Присваиваем popup класс popup_is-animated для анимации открытия
popupList.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

//Вызываем функцию, которая перебирает все формы на странице и вешает на них функцию слушателя
enableValidation(validationConfig);
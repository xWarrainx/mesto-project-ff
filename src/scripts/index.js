import { createCard } from '../components/card.js';
import { showPopup, handleCloseByEsc, handleCloseOverlay, closePopup } from '../components/modal.js';
import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, clearValidation } from '../components/validation.js';
import { getUserData, getAllCards, updateUserData, updateUserAvatar, createNewCard, deleteCardAPI, putLikeAPI, deleteLikeAPI } from '../components/api.js';
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
//---------------------------------Объявление validationConfig--------------------------------
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
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about
    profileImageAvatar.setAttribute('style', `background-image: url(${userData.avatar});`);
    cards.forEach(dataCard => {
        const cardElement = createCard(dataCard, like, showImage, userId, deleteCard);
        cardsContainer.append(cardElement);
    });
})
.catch((error) => {
    console.error('Ошибка загрузки данных (данные пользователя, данные карточек):', error);
})

//Функция удаления карточки
const deleteCard = (cardElement, dataCard) => {
    cardElement.remove();
    deleteCardAPI(dataCard)
    .catch((error) => {
        console.error('Ошибка загрузки данных (удаление карточки):', error);
    });
}

//Функция замены текста кнопки Сохранение...
const changeButtonText = (evt) => {
    const submitButton = evt.querySelector('.popup__button');
    if (submitButton.textContent === 'Сохранить') {
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = 'Сохранить'
    }
}

//Функция обработка лайка
const like = (likeBtn, cardId, likeCounter) => {
    if (likeBtn.classList.contains('card__like-button_is-active')) {
        deleteLikeAPI(cardId)
        .then((dataCard) => {
            likeCounter.textContent = dataCard.likes.length;
            likeBtn.classList.toggle('card__like-button_is-active');
        })
        .catch((error) => {
            console.error('Ошибка загрузки данных (удаление лайка):', error);
        })
    } else {
        putLikeAPI(cardId)
        .then((dataCard) => {
            likeCounter.textContent = dataCard.likes.length;
            likeBtn.classList.toggle('card__like-button_is-active')
        })
        .catch((error) => {
            console.error('Ошибка загрузки данных (установка лайка):', error);
        });
    }
}

// Открытие попапа с картинкой
function showImage(dataCard) {
    popupImage.src = dataCard.link;
    popupImage.alt = dataCard.name;
    popupCaption.textContent = dataCard.name;
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

buttonsClose.forEach(btn => {
    btn.addEventListener('click', () => {
        const popup = btn.closest('.popup');
        closePopup(popup);
    });
});

//Вешаем слушателя на аватар пользователя
profileAvatar.addEventListener('click', () => {
    formAvatar.reset();
    clearValidation(formAvatar, validationConfig);
    showPopup(popupAvatar);
});

formAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    changeButtonText(evt.target);
    profileImageAvatar.setAttribute('style', `background-image: url(${avatarUrlInput.value});`);
    updateUserAvatar(avatarUrlInput)
    .then(() => {
        changeButtonText(evt.target);
    })
    .catch((error) => {
        console.error('Ошибка загрузки данных (обновление аватара):', error);
    });
    closePopup(popupAvatar);
});

// Вешаем слушатели на кнопки открытия
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

// Вешаем слушатель на кнопку сабмит
formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    setUserInfo();
    changeButtonText(evt.target);
    updateUserData(inputName, inputDescription)
    .then(() => {
        changeButtonText(evt.target);
    })
    .catch((error) => {
        console.error('Ошибка загрузки данных (обновление данный пользователя):', error);
    });
    closePopup(popup);
});

// Вешаем слушатель на кнопку сабмит
formNewElement.addEventListener('submit', (evt) => {
    evt.preventDefault();       // убрали действия по умолчанию
    const newCard = {
          name: placeName.value,
          link: placelink.value
        }
        changeButtonText(evt.target);
    createNewCard(newCard).then((dataCard) => {
        const cardElement = createCard(dataCard, like, showImage, userId, deleteCard);
        cardsContainer.prepend(cardElement);
        changeButtonText(evt.target);
    })
    .catch((error) => {
        console.error('Ошибка загрузки данных (данные новой карточки):', error);
    })
    closePopup(popupAddCard);   // закрываем попап
    evt.target.reset();     // сбрасываем значения в инпутах формы
});

// Присваиваем popup класс popup_is-animated для анимации открытия
popupList.forEach(popup => {
    popup.classList.add('popup_is-animated');
});

//Вызываем функцию, которая перебирает все формы на странице и вешает на них функцию слушателя
enableValidation(validationConfig);
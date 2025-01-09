// Функция открытия popup
export const showPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseByEsc);
    popup.addEventListener('click', handleCloseOverlay);
}

// Функция закрытие по клавише Esc
export const handleCloseByEsc = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    };
}

// Фунция закрытия по клику на оверлей
export const handleCloseOverlay = (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
        closePopup(evt.currentTarget);
    };
}

// Функция закрытия popup
export const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseByEsc);
    popup.removeEventListener('click', handleCloseOverlay);
}
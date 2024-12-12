// Функция открытия popup
export const showPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseByEsc);
    popup.addEventListener('click', handleCloseBtn);
    popup.addEventListener('click', handleCloseOverlay);
}
// Функция закрытие по клавише Esc
export const handleCloseByEsc = (evt) => {
    if (evt.key === "Escape") {
        const popupOpenedList = document.querySelectorAll('.popup_is-opened');
        popupOpenedList.forEach(openedPopup => closePopup(openedPopup));
    };
}

// Фунция закрытия по кнопке
export const handleCloseBtn = () => {
    const closeBtnList = document.querySelectorAll('.popup__close');
    closeBtnList.forEach(btn => {
        btn.addEventListener('click', () => {
            const popup = btn.closest('.popup');
            closePopup(popup);
        });
    });
}

// Фунция закрытия по клику на оверлей
export const handleCloseOverlay = (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePopup(evt.currentTarget);
        };
}

// Функция закрытия popup
export const closePopup = (popup) => {
    popup.classList.add('popup_is-animated');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseByEsc);
    popup.removeEventListener('click', handleCloseBtn);
    popup.removeEventListener('click', handleCloseOverlay);
}
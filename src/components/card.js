
// @todo: Функция создания карточки
export const createCard = (dataCard, like, showImage, deleteCard) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeBtn = cardElement.querySelector('.card__like-button');

    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.name;
    cardElement.querySelector('.card__title').textContent = dataCard.name;


    likeBtn.addEventListener('click', () => {
        like(likeBtn);
    });


    cardImage.addEventListener('click', () => {
        showImage(dataCard);
    });

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
}
// @todo: Функция удаления карточки
export const deleteCard = cardElement => cardElement.remove();

// Обработка лайка
export const like = likeBtn => likeBtn.classList.toggle('card__like-button_is-active');
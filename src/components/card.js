// @todo: Функция создания карточки
export const createCard = (dataCard, like, showImage, userId, deleteCard) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeBtn = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.name;
    cardElement.querySelector('.card__title').textContent = dataCard.name;
    likeCounter.textContent = dataCard.likes.length;


    if (dataCard.likes.find((like) => like._id === userId)) {
        likeBtn.classList.add('card__like-button_is-active');
    };

    likeBtn.addEventListener('click', () => {
        like(likeBtn, dataCard._id, likeCounter);
    });

    cardImage.addEventListener('click', () => {
        showImage(dataCard);
    });

    if (userId === dataCard.owner._id) {
        cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
            deleteCard(cardElement, dataCard);
    });
   } else {
        cardElement.querySelector('.card__delete-button').remove();
    }
    return cardElement;
}
// @todo: Темплейт карточки


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(dataCard, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = dataCard.link;
    cardElement.querySelector('.card__image').alt = dataCard.name;
    cardElement.querySelector('.card__title').textContent = dataCard.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
}
// @todo: Функция удаления карточки
const deleteCard = cardElement => cardElement.remove();

// @todo: Вывести карточки на страницу (forEach)
initialCards.forEach(initialCard => {
    const cardElement = createCard(initialCard, deleteCard);
    cardsContainer.append(cardElement);
});
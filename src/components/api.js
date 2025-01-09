//Функция возвращения переведенных в json данных
const handleResponse = (res) => {
        return (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    mestoBaseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: '2f59518d-2ba3-4808-8cf6-577ad9501b48',
      'Content-Type': 'application/json'
    }
  }

//Функция запроса данных о пользователе
export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(handleResponse)
}

//Функция запроса с сервера карточек
export const getAllCards = () => {
    return fetch(`${config.mestoBaseUrl}/cards`, {
        headers: config.headers
    })
        .then(handleResponse)
}

//Функция обновления данных пользователя на сервере
export const updateUserData = (inputName, inputDescription) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: inputName.value,
            about: inputDescription.value,
        })
    })
        .then(handleResponse)
}

//Функция обновления аватара пользователя на сервере
export const updateUserAvatar = (input) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: input.value,
        })
    })
        .then(handleResponse)
}

//Функция запроса на сервер размещения новой карточек
export const createNewCard = (newCard) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link,
        })
    })
        .then(handleResponse)
}

//Функция запроса на сервер удаления карточки
export const deleteCardAPI = (dataCard) => {
    return fetch(`${config.baseUrl}/cards/${dataCard._id}`, {
        method: "DELETE",
        headers: config.headers,
    })
        .then(handleResponse)
}

//Функция запроса на сервер добавления лайка
export const putLikeAPI = (dataCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${dataCard}`, {
        method: "PUT",
        headers: config.headers,
        body: JSON.stringify({
            likes: getUserData
        })
    })
        .then(handleResponse)
}

//Функция запроса на сервер удаления лайка
export const deleteLikeAPI = (dataCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${dataCard}`, {
        method: "DELETE",
        headers: config.headers,
    })
        .then(handleResponse)
}
const apiConfig = {
  commonUrl: "https://nomoreparties.co/v1/wff-cohort-39/",
  contentType: "application/json",
  token: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
};

function testServerAnswer(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function patchProfileInfo(title, description) {
  return fetch(`${apiConfig.commonUrl}users/me`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": apiConfig.contentType,
    },
    body: JSON.stringify({
      name: title,
      about: description,
    }),
  }).then((res) => testServerAnswer(res));
}

export function uploadCardOnServer(title, imageLink) {
  return fetch(`${apiConfig.commonUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": apiConfig.contentType,
    },
    body: JSON.stringify({
      name: title,
      link: imageLink,
    }),
  }).then((res) => testServerAnswer(res));
}

export function getCardList() {
  return fetch(`${apiConfig.commonUrl}/cards`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then((res) => testServerAnswer(res));
}



export function getUserInfo() {
  return fetch(`${apiConfig.commonUrl}users/me`, {
    headers: {
      authorization: apiConfig.token,
    },
  }).then((res) => testServerAnswer(res));
}


export function patchNewAva(newLink) {
return fetch(`${apiConfig.commonUrl}users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: apiConfig.token,
      "Content-Type": apiConfig.contentType,
    },
    body: JSON.stringify({
      avatar: newLink
    }),
  })
    .then((res) => testServerAnswer(res))
}


export function deleteCardFromServerApi(id) {
    return fetch(`${apiConfig.commonUrl}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: apiConfig.token,
    },
  })
  .then ((res) => testServerAnswer(res))
}

export function deleteLike(card) {
 return fetch(`${apiConfig.commonUrl}cards/likes/${card.id}`, {
      method: "DELETE",
      headers: {
        authorization: apiConfig.token,
      },
    })
      .then((res) => testServerAnswer(res))
}

export function putLike(card) {
  return fetch(`${apiConfig.commonUrl}cards/likes/${card.id}`, {
      method: "PUT",
      headers: {
        authorization: apiConfig.token,
      },
    })
      .then((res) => testServerAnswer(res))
}
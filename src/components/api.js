export function updateCardList(
  url,
  title,
  imageLink,
  del,
  like,
  openImageModal,
  popupImageImg,
  popupImage,
  popupImageTitle,
  id,
  delUrl,
  openModal,
  delPopup,
  closeModal,
  container,
  addCard,
  deleteCardFromServer,
  addPopup
) {
  const button = addPopup.querySelector('.button');
  button.textContent = "Сохранение..."
  fetch(url, {
    method: "POST",
    headers: {
      authorization: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      link: imageLink,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      
      container.prepend(
        addCard(
          result.name,
          result.link,
          del,
          like,
          openImageModal,
          popupImageImg,
          popupImage,
          popupImageTitle,
          result._id,
          result.likes.length,
          id,
          result.owner._id,
          delUrl,
          openModal,
          delPopup,
          closeModal,
          result.likes,
          deleteCardFromServer
        )
      )
      button.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
      button.textContent = "Сохранить"
    });
}

export function updateProfileInfo(url, title, description, popup, name, about) {
  const button = popup.querySelector('.button');
  button.textContent = 'Сохранение...';
  fetch(url, {
    method: "PATCH",
    headers: {
      authorization: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: title,
      about: description,
    }),
  })
  .then((res) => res.json())
  .then((res) => {
    name.textContent = res.name;
    about.textContent = res.about;   
    button.textContent = 'Сохранить';
  })
  .catch((err) => {
    button.textContent = 'Сохранить';
    console.log(err)})
}

export function loadCards(
  url,
  container,
  del,
  like,
  openImageModal,
  popupImageImg,
  popupImage,
  popupImageTitle,
  id,
  deleteUrl,
  openModal,
  delPopup,
  closeModal,
  addCard,
  deleteCardFromServer
) {
  fetch(url, {
    headers: {
      authorization: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      result.forEach(function (loadContent) {
        container.append(
          addCard(
            loadContent.name,
            loadContent.link,
            del,
            like,
            openImageModal,
            popupImageImg,
            popupImage,
            popupImageTitle,
            loadContent._id,
            loadContent.likes.length,
            id,
            loadContent.owner._id,
            deleteUrl,
            openModal,
            delPopup,
            closeModal,
            loadContent.likes,
            deleteCardFromServer
          )
        );
      });
    })
    .catch((err) => console.log(err));
}

export function loadUserInfo(url, name, image, description) {
  fetch(url, {
    headers: {
      authorization: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      name.textContent = result.name;
      image.style = `background-image: url(${result.avatar})`;
      description.textContent = result.about;
    });
}

export function patchAvaForm(popup, popupForm, profileImage, closeModal) {
  const button = popup.querySelector('.button');
  button.textContent = 'Сохранение...'
  fetch("https://nomoreparties.co/v1/wff-cohort-39/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: popup.querySelector(".popup__input").value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        profileImage.style = `background-image: url(${data.avatar})`;
        button.textContent = 'Сохранить';
        popupForm.reset();
        closeModal(popup);
      })
      .catch((err) => {
        console.log(err);
        button.textContent = 'Сохранить'
      })
}

export function deleteCardFromServer(url, id, element, closePopupFunction, popup) {
    fetch(`${url}${id}`, {
      method: "DELETE",
      headers: {
        authorization: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
      },
    }).then(() => {
      element.remove();
      closePopupFunction(popup);
})
      .catch((err) => (console.log(err)));
};

export function likeCard(evt) {
  const targetClasses = evt.target.classList;
  const card = evt.target.closest(".card");
  const likeCounter = card.querySelector(".like_counter");

  if (targetClasses.contains("card__like-button_is-active")) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${card.id}`, {
      method: "DELETE",
      headers: {
        authorization: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        targetClasses.remove("card__like-button_is-active");
      })
      .catch((err) => (console.log(err)));
  } else {
    fetch(`https://nomoreparties.co/v1/wff-cohort-39/cards/likes/${card.id}`, {
      method: "PUT",
      headers: {
        authorization: "e4307151-f9f4-457f-86d0-9ae28e4516f5",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        targetClasses.add("card__like-button_is-active");
      })
      .catch((err) => (console.log(err)));
  }
}
import { deleteLike, putLike, deleteCardFromServerApi } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function getCardTemplate() {
  return cardTemplate.querySelector(".card").cloneNode(true);
}

export function addCard(
  name,
  link,
  del,
  openImage,
  popup,
  modal,
  title,
  id,
  likeCount,
  userId,
  cardId,
  openPopupFunction,
  delPopup,
  closePopupFunction,
  likeArray,
  deleteCardFromServer,
  deleteLike,
  putLike
) {
  const card = getCardTemplate();
  const image = card.querySelector(".card__image");
  const likeButton = card.querySelector(".card__like-button");
  image.setAttribute("src", link);
  image.setAttribute("alt", name);
  card.setAttribute("id", id);
  card.querySelector(".like_counter").textContent = likeCount;
  card.querySelector(".card__title").textContent = name;
  validateOwnerId(
    userId,
    cardId,
    card,
    id,
    openPopupFunction,
    delPopup,
    closePopupFunction,
    del,
    deleteCardFromServer
  );
  likeButton.addEventListener("click", function (evt) {
    likeCard(evt, deleteLike, putLike);
  });
  validateOwnerLike(likeArray, userId, likeButton, id);
  image.addEventListener("click", function (evt) {
    openImage(evt, popup, modal, title);
  });
  return card;
}

function validateOwnerId(
  userId,
  cardId,
  card,
  id,
  openPopupFunction,
  delPopup,
  closePopupFunction,
  del,
  deleteCard
) {
  const deleteButton = card.querySelector(".card__delete-button");
  if (userId === cardId) {
    deleteButton.addEventListener("click", () =>
      del(card, id, openPopupFunction, delPopup, closePopupFunction, deleteCard)
    );
  } else {
    deleteButton.remove();
  }
}

function validateOwnerLike(likeArray, userId, button) {
  if (likeArray) {
    likeArray.forEach((element) => {
      if (element._id === userId) {
        button.classList.add("card__like-button_is-active");
        return;
      }
    });
  }
}

function likeCard(evt, deleteLike, putLike) {
  const targetClasses = evt.target.classList;
  const card = evt.target.closest(".card");
  const likeCounter = card.querySelector(".like_counter");

  if (targetClasses.contains("card__like-button_is-active")) {
    deleteLike(card)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        targetClasses.remove("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    putLike(card)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        targetClasses.add("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

export function deleteCard(id, element, closePopupFunction, popup) {
  deleteCardFromServerApi(id)
    .then(() => {
      element.remove();
      closePopupFunction(popup);
    })
    .catch((err) => console.log(err));
}

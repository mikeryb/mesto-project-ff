const cardTemplate = document.querySelector("#card-template").content;

export function addCard(
  name,
  link,
  del,
  like,
  openImage,
  popup,
  modal,
  title,
  id,
  likeCount,
  userId,
  cardId,
  deleteUrl,
  openPopupFunction,
  delPopup,
  closePopupFunction,
  likeArray,
  deleteCardFromServer
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const image = card.querySelector(".card__image");
  const likeButton = card.querySelector(".card__like-button");
  image.setAttribute("src", link);
  image.setAttribute("alt", name);
  card.setAttribute("id", id);
  card.querySelector(".like_counter").textContent = likeCount;
  card.querySelector(".card__title").textContent = name;
  testingOwnerOfCard(
    userId,
    cardId,
    card,
    id,
    deleteUrl,
    openPopupFunction,
    delPopup,
    closePopupFunction,
    del,
    deleteCardFromServer
  );
  likeButton.addEventListener("click", function (evt) {
    like(evt);
  });
  testingOfOwnLike(likeArray, userId, likeButton, id);
 image.addEventListener("click", function (evt) {
    openImage(evt, popup, modal, title);
  });
  return card;
}

function testingOwnerOfCard(
  userId,
  cardId,
  card,
  id,
  deleteUrl,
  openPopupFunction,
  delPopup,
  closePopupFunction,
  del,
  deleteCardFromServer
) {
  const deleteButton = card.querySelector(".card__delete-button");
  if (userId === cardId) {
    deleteButton.addEventListener("click", () =>
        del(
          card,
          id,
          deleteUrl,
          openPopupFunction,
          delPopup,
          closePopupFunction,
          deleteCardFromServer
        )
      );
  } else {
    deleteButton.remove();
  }
}

function testingOfOwnLike(likeArray, userId, button) {
  if (likeArray) {
  likeArray.forEach((element) => {
    if (element._id === userId) {
      button.classList.add("card__like-button_is-active");
      return;
    }
  });
}};

export function deleteCard(
  element,
  id,
  url,
  openPopupFunction,
  popup,
  closePopupFunction, 
  deleteCardFromServer
) {
  openPopupFunction(popup);
  popup.querySelector(".button").addEventListener("click", function (evt) {
    deleteCardFromServer(url, id, element, closePopupFunction, popup);
  });
}





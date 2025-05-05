const cardTemplate = document.querySelector("#card-template").content;

export function addCard(name, link, del, like, openImage, popup, modal, title) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const image = card.querySelector(".card__image");
  image.setAttribute("src", link);
  image.setAttribute("alt", name);
  card.querySelector(".card__title").textContent = name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", () => del(card));
  card
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      like(evt);
    });
  card.querySelector(".card__image").addEventListener("click", function (evt) {
    openImage(evt, popup, modal, title);
  });
  return card;
}

export function deleteCard(element) {
  element.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

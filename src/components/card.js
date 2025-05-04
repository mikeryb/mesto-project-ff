import { closeModal } from "./modal.js";

export function addCard(name, link, del, like) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const image = card.querySelector(".card__image");
  image.setAttribute("src", link);
  image.setAttribute("alt", name);
  card.querySelector(".card__title").textContent = name;
  card
    .querySelector(".card__delete-button")
    .addEventListener("click", () => del(card));
  return card;
}

export function deleteCard(element) {
  element.remove();
}

export function addCardSubmit(evt, form, del, container) {
  evt.preventDefault();
  const name = form.querySelector('[name="place-name"]').value;
  const link = form.elements.link.value;
  container.prepend(addCard(name, link, del));
  closeModal(document.querySelector(".popup_is-opened"));
  form.querySelector('[name="place-name"]').value = "";
  form.elements.link.value = "";
}

export function like(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

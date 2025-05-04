// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { initialCards } from '../scripts/cards.js';


const container = document.querySelector(".places__list");

function addCard(name, link, del) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const image = card.querySelector(".card__image");
  image.setAttribute("src", link);
  image.setAttribute("alt", `${name}. Пейзаж.`);
  card.querySelector(".card__title").textContent = name;
  card.querySelector(".card__delete-button").addEventListener("click",() => del(card));
  return card;
}

function deleteCard(element) {
  element.remove();
}

initialCards.forEach(function (loadContent) {
  container.append(addCard(loadContent.name, loadContent.link, deleteCard));
});

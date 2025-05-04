// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import { addCard, deleteCard, addCardSubmit, like } from "./components/card.js";
import {
  openModal,
  closeModal,
  closeEvent,
  EscClosePopup,
  PopupFill,
  handleFormSubmit,
  openImageModal,
} from "./components/modal.js";

const container = document.querySelector(".places__list");
const edit = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const add = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const name = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const editForm = document.querySelector('form[name="edit-profile"]');
const addForm = document.querySelector('form[name="new-place"]');
const cards = document.querySelector(".places__list");
const imagePopupImg = document.querySelector(".popup__image");
const imagePopupTitle = document.querySelector(".popup__caption");

initialCards.forEach(function (loadContent) {
  container.append(addCard(loadContent.name, loadContent.link, deleteCard));
});

edit.addEventListener("click", function () {
  openModal(editPopup);
  PopupFill(editForm, name, description);
});
add.addEventListener("click", function () {
  openModal(addPopup);
});

editForm.addEventListener("submit", function (evt) {
  handleFormSubmit(evt, editForm, name, description);
});

addForm.addEventListener("submit", function (evt) {
  addCardSubmit(evt, addForm, deleteCard, container, like);
});

cards.addEventListener("click", function (evt) {
  like(evt);
});

cards.addEventListener("click", function (evt) {
  openImageModal(evt, imagePopupImg, imagePopup, imagePopupTitle);
});

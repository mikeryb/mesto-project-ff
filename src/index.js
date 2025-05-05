// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { initialCards } from "../scripts/cards.js";
import { addCard, deleteCard, likeCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  addCloseEvents,
  escClosePopup,
} from "./components/modal.js";

const container = document.querySelector(".places__list");
const buttonPopupEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const buttonPopupAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formEdit = document.querySelector('form[name="edit-profile"]');
const formAdd = document.querySelector('form[name="new-place"]');
const contentCards = document.querySelector(".places__list");
const popupImageImg = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__caption");
const inputNameFormNewCard = formAdd.querySelector('[name="place-name"]');
const inputLinkFormNewCard = formAdd.elements.link;
const allPopups = document.querySelectorAll(".popup");

allPopups.forEach(addCloseEvents);

initialCards.forEach(function (loadContent) {
  container.append(
    addCard(
      loadContent.name,
      loadContent.link,
      deleteCard,
      likeCard,
      openImageModal,
      popupImageImg,
      popupImage,
      popupImageTitle
    )
  );
});

function popupFill(form, name, description) {
  form.elements.name.value = name.textContent;
  form.elements.description.value = description.textContent;
}

buttonPopupEdit.addEventListener("click", function () {
  openModal(popupEdit);
  popupFill(formEdit, profileName, profileDescription);
});

buttonPopupAdd.addEventListener("click", function () {
  formAdd.reset();
  openModal(popupAdd);
});

function editFormSubmit(evt, form, name, description, popup) {
  evt.preventDefault();
  const nameInput = form.elements.name;
  const jobInput = form.elements.description;
  name.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closeModal(popup);
}

formEdit.addEventListener("submit", function (evt) {
  editFormSubmit(evt, formEdit, profileName, profileDescription, popupEdit);
});

function addCardSubmit(
  evt,
  form,
  del,
  container,
  like,
  close,
  addPopup,
  openImage,
  targetPopup,
  modal,
  title
) {
  evt.preventDefault();
  container.prepend(
    addCard(
      inputNameFormNewCard.value,
      inputLinkFormNewCard.value,
      del,
      like,
      openImage,
      targetPopup,
      modal,
      title
    )
  );
  close(addPopup);
  form.reset();
}

formAdd.addEventListener("submit", function (evt) {
  addCardSubmit(
    evt,
    formAdd,
    deleteCard,
    container,
    likeCard,
    closeModal,
    popupAdd,
    openImageModal,
    popupImageImg,
    popupImage,
    popupImageTitle
  );
});

function openImageModal(evt, popup, modal, title) {
  if (evt.target.classList.contains("card__image")) {
    popup.src = evt.target.src;
    popup.alt = evt.target.alt;
    title.textContent = evt.target.alt;
    openModal(modal);
  }
}

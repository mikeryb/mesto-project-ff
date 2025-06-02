// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { addCard, deleteCard } from "./components/card.js";
import { openModal, closeModal, addCloseEvents } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  patchProfileInfo,
  deleteLike,
  putLike,
  uploadCardOnServer,
  getCardList,
  getUserInfo,
  patchNewAva,
} from "./components/api.js";

const container = document.querySelector(".places__list");
const buttonPopupEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const buttonPopupAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const formAddCard = document.querySelector('form[name="new-place"]');
const popupImageImg = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__caption");
const inputNameFormNewCard = formAddCard.querySelector('[name="place-name"]');
const inputLinkFormNewCard = formAddCard.elements.link;
const allPopups = document.querySelectorAll(".popup");
const delPopup = document.querySelector(".popup_type_delete");
const validationConfig = {
  inputSelector: ".popup__input",
  errorClass: "popup__input_error",
};
const buttonPopupAva = document.querySelector(".profile__image");
const popupAva = document.querySelector(".popup_type_new-ava");
const popupAvaForm = popupAva.querySelector(".popup__form");
let myId = "";

//API part

function loadData() {
  Promise.all([getUserInfo(), getCardList()])
    .then(([userData, cardsData]) => {
      loadUserInfo(profileName, profileImage, profileDescription, userData);
      loadCards(
        container,
        openConfirmationPopup,
        openImageModal,
        popupImageImg,
        popupImage,
        popupImageTitle,
        userData._id,
        openModal,
        delPopup,
        closeModal,
        addCard,
        deleteCard,
        cardsData
      );
    })
    .catch((err) => console.log(err));
}

loadData();

function loadUserInfo(name, image, description, userData) {
  name.textContent = userData.name;
  image.style = `background-image: url(${userData.avatar})`;
  description.textContent = userData.about;
  myId = userData._id;
}

function updateProfileInfo(title, description, popup, name, about) {
  const button = popup.querySelector(".button");
  button.textContent = "Сохранение...";
  patchProfileInfo(title, description)
    .then((res) => {
      name.textContent = res.name;
      about.textContent = res.about;
      button.textContent = "Сохранить";
      closeModal(popup);
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateCardList(
  title,
  imageLink,
  del,
  openImageModal,
  popupImageImg,
  popupImage,
  popupImageTitle,
  openModal,
  delPopup,
  closeModal,
  container,
  addCard,
  deleteCard,
  addPopup
) {
  const button = addPopup.querySelector(".button");
  button.textContent = "Сохранение...";
  uploadCardOnServer(title, imageLink)
    .then((result) => {
      container.prepend(
        addCard(
          result.name,
          result.link,
          del,
          openImageModal,
          popupImageImg,
          popupImage,
          popupImageTitle,
          result._id,
          result.likes.length,
          myId,
          result.owner._id,
          openModal,
          delPopup,
          closeModal,
          result.likes,
          deleteCard,
          deleteLike,
          putLike
        )
      );
      formAddCard.reset();
      clearValidation(formAddCard, validationConfig);
      closeModal(addPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

function loadCards(
  container,
  del,
  openImageModal,
  popupImageImg,
  popupImage,
  popupImageTitle,
  id,
  openModal,
  delPopup,
  closeModal,
  addCard,
  deleteCard,
  cardsData
) {
  cardsData.forEach(function (loadContent) {
    container.append(
      addCard(
        loadContent.name,
        loadContent.link,
        del,
        openImageModal,
        popupImageImg,
        popupImage,
        popupImageTitle,
        loadContent._id,
        loadContent.likes.length,
        id,
        loadContent.owner._id,
        openModal,
        delPopup,
        closeModal,
        loadContent.likes,
        deleteCard,
        deleteLike,
        putLike
      )
    );
  });
}

function uploadNewAva(popup, popupForm, profileImage, closeModal) {
  const button = popup.querySelector(".button");
  button.textContent = "Сохранение...";
  const newLink = popup.querySelector(".popup__input").value;
  patchNewAva(newLink)
    .then((data) => {
      profileImage.style = `background-image: url(${data.avatar})`;
      popupForm.reset();
      closeModal(popup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = "Сохранить";
    });
}

//validation

enableValidation({
  formSelector: ".popup__form",
  inputErrorClass: "popup__input_error",
  submitButtonSelector: ".popup__button",
  inputSelector: ".popup__input",
  inactiveButtonClass: "popup__button_disabled",
});

//main part

function openConfirmationPopup(
  element,
  id,
  openPopupFunction,
  popup,
  closePopupFunction,
  deleteCardFromServer
) {
  openPopupFunction(popup);
  popup.querySelector(".button").addEventListener("click", function (evt) {
    deleteCardFromServer(id, element, closePopupFunction, popup);
  });
}

buttonPopupAva.addEventListener("click", function () {
  popupAvaForm.reset();
  openModal(popupAva);
  popupAvaForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    uploadNewAva(popupAva, popupAvaForm, profileImage, closeModal);
  });
  clearValidation(popupAvaForm, validationConfig);
});

allPopups.forEach(addCloseEvents);

function fillProfileFormInputs(form, name, description) {
  form.elements.name.value = name.textContent;
  form.elements.description.value = description.textContent;
  clearValidation(form, validationConfig);
}

buttonPopupEdit.addEventListener("click", function () {
  openModal(popupEdit);
  fillProfileFormInputs(formEditProfile, profileName, profileDescription);
});

buttonPopupAdd.addEventListener("click", function () {
  openModal(popupAdd);
});

function editFormSubmit(evt, form, name, description, popup) {
  evt.preventDefault();
  const nameInput = form.elements.name;
  const jobInput = form.elements.description;
  updateProfileInfo(nameInput.value, jobInput.value, popup, name, description);
}

formEditProfile.addEventListener("submit", function (evt) {
  editFormSubmit(
    evt,
    formEditProfile,
    profileName,
    profileDescription,
    popupEdit
  );
});

function addCardSubmit(
  evt,
  form,
  del,
  container,
  close,
  addPopup,
  openImage,
  targetPopup,
  modal,
  title
) {
  evt.preventDefault();
  updateCardList(
    inputNameFormNewCard.value,
    inputLinkFormNewCard.value,
    openConfirmationPopup,
    openImageModal,
    popupImageImg,
    popupImage,
    popupImageTitle,
    openModal,
    delPopup,
    closeModal,
    container,
    addCard,
    deleteCard,
    addPopup
  );
  form.reset();
}

formAddCard.addEventListener("submit", function (evt) {
  addCardSubmit(
    evt,
    formAddCard,
    openConfirmationPopup,
    container,
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

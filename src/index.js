// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "../pages/index.css";
import { addCard, deleteCard  } from "./components/card.js";
import { openModal, closeModal, addCloseEvents } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { patchProfileInfo, deleteCardFromServerApi, deleteLike, putLike, uploadCardOnServer, getCardList, getUserInfo, patchNewAva } from "./components/api.js";

const container = document.querySelector(".places__list");
const buttonPopupEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const buttonPopupAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const formEdit = document.querySelector('form[name="edit-profile"]');
const formAdd = document.querySelector('form[name="new-place"]');
const popupImageImg = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__caption");
const inputNameFormNewCard = formAdd.querySelector('[name="place-name"]');
const inputLinkFormNewCard = formAdd.elements.link;
const allPopups = document.querySelectorAll(".popup");
const delPopup = document.querySelector(".popup_type_delete");
const validationConfig = {
  inputSelector: ".popup__input",
  errorClass: "popup__input_error",
};
const updateProfileUrl = "https://nomoreparties.co/v1/wff-cohort-39/users/me";
const myId = "0f8010b070875d80ca6e74f6";
const deleteUrl = "https://nomoreparties.co/v1/wff-cohort-39/cards/";
const buttonPopupAva = document.querySelector(".profile__image");
const popupAva = document.querySelector(".popup_type_new-ava");
const popupAvaForm = popupAva.querySelector(".popup__form");

//API part

function likeCard(evt) {
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

function deleteCardFromServer(
  id,
  element,
  closePopupFunction,
  popup
) {
deleteCardFromServerApi(id)
    .then(() => {
      element.remove();
      closePopupFunction(popup);
    })
    .catch((err) => console.log(err));
}

function loadUserInfo(name, image, description) {
  getUserInfo()
  .then((result) => {
    name.textContent = result.name;
    image.style = `background-image: url(${result.avatar})`;
    description.textContent = result.about;
  });
}

function updateProfileInfo(title, description, popup, name, about) {
  const button = popup.querySelector(".button");
  button.textContent = "Сохранение...";
  patchProfileInfo(title, description)
  .then ((res) => {
  name.textContent = res.name;
  about.textContent = res.about;
  button.textContent = "Сохранить";
  })
  .catch((err) => console.log(err));
}

function updateCardList(
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
  const button = addPopup.querySelector(".button");
  button.textContent = "Сохранение...";
  uploadCardOnServer(title, imageLink)
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
      );
      button.textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
      button.textContent = "Сохранить";
    });
}

function loadCards(
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
  getCardList()
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

loadCards(
  container,
  deleteCard,
  likeCard,
  openImageModal,
  popupImageImg,
  popupImage,
  popupImageTitle,
  myId,
  deleteUrl,
  openModal,
  delPopup,
  closeModal,
  addCard,
  deleteCardFromServer
);

loadUserInfo(profileName,  profileImage, profileDescription);

function uploadNewAva(popup, popupForm, profileImage, closeModal) {
  const button = popup.querySelector(".button");
  button.textContent = "Сохранение...";
  const newLink = popup.querySelector(".popup__input").value;
  patchNewAva(newLink)  
    .then((data) => {
      profileImage.style = `background-image: url(${data.avatar})`;
      button.textContent = "Сохранить";
      popupForm.reset();
      closeModal(popup);
    })
    .catch((err) => {
      console.log(err);
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

function popupFill(form, name, description) {
  form.elements.name.value = name.textContent;
  form.elements.description.value = description.textContent;
  clearValidation(form, validationConfig);
}

buttonPopupEdit.addEventListener("click", function () {
  openModal(popupEdit);
  popupFill(formEdit, profileName, profileDescription);
});

buttonPopupAdd.addEventListener("click", function () {
  formAdd.reset();
  clearValidation(formAdd, validationConfig);
  openModal(popupAdd);
});

function editFormSubmit(evt, form, name, description, popup, url) {
  evt.preventDefault();
  const nameInput = form.elements.name;
  const jobInput = form.elements.description;
  updateProfileInfo(nameInput.value, jobInput.value, popup, name, description);
  closeModal(popup);  
}

formEdit.addEventListener("submit", function (evt) {
  editFormSubmit(
    evt,
    formEdit,
    profileName,
    profileDescription,
    popupEdit,
    updateProfileUrl
  );
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
  updateCardList(
    inputNameFormNewCard.value,
    inputLinkFormNewCard.value,
    deleteCard,
    likeCard,
    openImageModal,
    popupImageImg,
    popupImage,
    popupImageTitle,
    myId,
    deleteUrl,
    openModal,
    delPopup,
    closeModal,
    container,
    addCard,
    deleteCardFromServer,
    addPopup
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

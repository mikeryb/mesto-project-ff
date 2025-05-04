export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  closeEvent(modal);
  document.addEventListener("keydown", EscClosePopup);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", EscClosePopup);
}

export function closeEvent(modal) {
  const close = modal.querySelector(".popup__close");
  close.addEventListener("click", function () {
    closeModal(modal);
  });
  modal.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closeModal(modal);
    }
  });
}

export function EscClosePopup(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

export function PopupFill(form, name, description) {
  form.elements.name.value = name.innerText;
  form.elements.description.value = description.innerText;
}

export function handleFormSubmit(evt, form, name, description) {
  evt.preventDefault();
  const nameInput = form.elements.name;
  const jobInput = form.elements.description;
  name.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closeModal(document.querySelector(".popup_is-opened"));
}

export function openImageModal(evt, popup, modal, title) {
  if (evt.target.classList.contains("card__image")) {
    popup.src = evt.target.src;
    popup.alt = evt.target.alt;
    title.textContent = evt.target.alt;
    openModal(modal);
  }
}

export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClosePopup);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClosePopup);
}

export function addCloseEvents(modal) {
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

export function escClosePopup(e) {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}




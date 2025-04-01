// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const container = document.querySelector(".places__list");

function addCard(name, link, del) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  card.querySelector(".card__image").setAttribute("src", link);
  card.querySelector(".card__title").textContent = name;
  container.append(card);

  card.querySelector(".card__delete-button").addEventListener("click", del);
}
function deleteCard(e) {
  e.target.closest(".card").remove();
}

initialCards.forEach(function (loadContent) {
  addCard(loadContent.name, loadContent.link, deleteCard);
});

'use strict';

// advert-card.js
// Функция отрисовки карточки объявления

(function () {
  const clonCreateCard = function (cardNew) {

    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

    const clonTemplateElementCard = document.createDocumentFragment();

    const clonCardTemplate = cardTemplate.cloneNode(true);

    // Короткая запись

    clonCardTemplate.querySelector(`.popup__avatar`).setAttribute(`src`, `${cardNew.author.avatar}`);
    clonCardTemplate.querySelector(`.popup__title`).textContent = cardNew.offer.title;
    clonCardTemplate.querySelector(`.popup__text--address`).textContent = `${cardNew.offer.address}`;
    clonCardTemplate.querySelector(`.popup__text--price`).textContent = `${cardNew.offer.price}₽/ночь`;
    clonCardTemplate.querySelector(`.popup__type`).textContent = `${cardNew.offer.type}`;
    clonCardTemplate.querySelector(`.popup__text--capacity`).textContent = (`${cardNew.offer.rooms} комнат(ы) для ${cardNew.offer.guests} гостей`);
    clonCardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardNew.offer.checkin}, выезд до ${cardNew.offer.checkout}`;
    clonCardTemplate.querySelector(`.popup__features`).setAttribute(`li`, `${cardNew.offer.features}`);
    clonCardTemplate.querySelector(`.popup__description`).textContent = `${cardNew.offer.description}`;

    const containerCardPhotos = clonCardTemplate.querySelector(`.popup__photos`);

    const homePhotoCard = window.clonedPhotos.getCreateHomePhoto(containerCardPhotos, cardNew.offer.photos);

    containerCardPhotos.replaceChild(homePhotoCard, containerCardPhotos.querySelector(`.popup__photo`));

    clonTemplateElementCard.appendChild(clonCardTemplate);

    // Вставляю карточку перед mapFilterContaine

    window.constants.map.insertBefore(clonTemplateElementCard, window.constants.mapFilterContainer);
  };

  const writeDownAddress = function (addressX, addressY) {
    window.constants.inputAddress.value = (`${addressX}, ${addressY}`);
  };

  writeDownAddress(window.constants.mapPinMain.offsetLeft, window.constants.mapPinMain.offsetTop);

  window.advertCard = {
    clonCreateCard,
    writeDownAddress
  };
})();

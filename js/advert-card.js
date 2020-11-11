'use strict';

// advert-card.js
// Функция отрисовки карточки объявления

(function () {
  const cloneCreateCard = function (cardNew) {

    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

    const cloneTemplateElementCard = document.createDocumentFragment();

    const cloneCardTemplate = cardTemplate.cloneNode(true);

    // Короткая запись

    cloneCardTemplate.querySelector(`.popup__avatar`).setAttribute(`src`, `${cardNew.author.avatar}`);
    cloneCardTemplate.querySelector(`.popup__title`).textContent = cardNew.offer.title;
    cloneCardTemplate.querySelector(`.popup__text--address`).textContent = `${cardNew.offer.address}`;
    cloneCardTemplate.querySelector(`.popup__text--price`).textContent = `${cardNew.offer.price}₽/ночь`;
    cloneCardTemplate.querySelector(`.popup__type`).textContent = `${cardNew.offer.type}`;
    cloneCardTemplate.querySelector(`.popup__text--capacity`).textContent = (`${cardNew.offer.rooms} комнат(ы) для ${cardNew.offer.guests} гостей`);
    cloneCardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardNew.offer.checkin}, выезд до ${cardNew.offer.checkout}`;
    cloneCardTemplate.querySelector(`.popup__features`).setAttribute(`li`, `${cardNew.offer.features}`);
    cloneCardTemplate.querySelector(`.popup__description`).textContent = `${cardNew.offer.description}`;

    const containerCardPhotos = cloneCardTemplate.querySelector(`.popup__photos`);

    const homePhotoCard = window.clonedPhotos.getCreateHomePhoto(containerCardPhotos, cardNew.offer.photos);

    containerCardPhotos.replaceChild(homePhotoCard, containerCardPhotos.querySelector(`.popup__photo`));

    cloneTemplateElementCard.appendChild(cloneCardTemplate);

    // Вставляю карточку перед mapFilterContaine

    window.constants.map.insertBefore(cloneTemplateElementCard, window.constants.mapFilterContainer);
  };

  const writeDownAddress = function (addressX, addressY) {
    window.constants.inputAddress.value = (`${addressX}, ${addressY}`);
  };

  writeDownAddress(window.constants.mapPinMain.offsetLeft, window.constants.mapPinMain.offsetTop);

  window.advertCard = {
    cloneCreateCard,
    writeDownAddress
  };
})();

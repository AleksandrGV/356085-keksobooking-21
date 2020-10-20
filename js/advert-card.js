'use strict';

// advert-card.js
// Функция отрисовки карточки объявления

(function () {
  const createCard = function (cardNew) {

    const templateElementCard = document.createDocumentFragment();

    const mapFilterContainer = document.querySelector(`.map__filters-container`);
    const clonCardTemplate = window.cardTemplate.cloneNode(true);

    // Короткая запись

    clonCardTemplate.querySelector(`.popup__avatar`).setAttribute(`src`, `${cardNew.author.avatar}`);
    clonCardTemplate.querySelector(`.popup__title`).textContent = cardNew.offer.title;
    clonCardTemplate.querySelector(`.popup__text--address`).textContent = `${cardNew.offer.address}`;
    clonCardTemplate.querySelector(`.popup__text--price`).textContent = `${cardNew.offer.price}₽/ночь`;
    clonCardTemplate.querySelector(`.popup__type`).textContent = `${cardNew.offer.type}`;
    clonCardTemplate.querySelector(`.popup__text--capacity`).textContent = (`${cardNew.offer.rooms} комнат(ы) для ${cardNew.offer.quests} гостей`);
    clonCardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardNew.offer.checkin}, выезд до ${cardNew.offer.checkuot}`;
    clonCardTemplate.querySelector(`.popup__features`).setAttribute(`li`, `${cardNew.offer.features}`);
    clonCardTemplate.querySelector(`.popup__description`).textContent = `${cardNew.offer.description}`;

    const containerCardPhotos = clonCardTemplate.querySelector(`.popup__photos`);

    const homePhotoCard = window.clonedPhotos.getCreateHomePhoto(containerCardPhotos, cardNew.offer.photos);

    containerCardPhotos.replaceChild(homePhotoCard, containerCardPhotos.querySelector(`.popup__photo`));

    templateElementCard.appendChild(clonCardTemplate);

    // Вставляю карточку перед mapFilterContaine

    window.map.insertBefore(templateElementCard, mapFilterContainer);
  };

  const writeDownAddress = function (addressX, addressY) {
    window.variables.inputAddress.value = (`${addressX}, ${addressY}`);
  };

  writeDownAddress(window.variables.mapPinMain.offsetLeft, window.variables.mapPinMain.offsetTop);

  window.advertCard = {
    createCard: createCard(),
    writeDownAddress: writeDownAddress()
  };
})();

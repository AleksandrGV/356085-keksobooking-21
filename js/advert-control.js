'use strict';

// advert-control.js
// Открытие карточки через делегирование (всплытие)

(function () {
  const onOpenCard = function (openCard) {
    const popup = window.constants.map.querySelector(`.popup`);
    const mapPin = openCard.target.closest(`.map__pin`);
    popupClose(popup);
    if (mapPin) {
      const indexPinClone = mapPin.dataset.indexPin;
      if (indexPinClone) {
        const currentPins = window.filtersPins.length ? window.filtersPins : window.serverDataset;
        window.advertCard.cloneCreateCard(currentPins[indexPinClone]);
      }
    }
  };

  window.constants.mapPins.addEventListener(`click`, function (evt) {
    onOpenCard(evt);
  });

  window.constants.mapPins.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      onOpenCard(evt);
    }
  });

  // Закрытие карточки объявления

  const popupClose = function (popup) {
    if (popup) {
      popup.remove();
    }
  };

  document.addEventListener(`keydown`, function (evt) {
    const popup = window.constants.map.querySelector(`.popup`);
    if (evt.key === `Escape`) {
      popupClose(popup);
    }
  });

  document.addEventListener(`mousedown`, function (evt) {
    const popup = document.querySelector(`.popup`);
    if (evt.button === 0) {
      popupClose(popup);
    }
  });

  window.advertControl = {
    onOpenCard
  };
})();

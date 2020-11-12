'use strict';

// advert-control.js
// Открытие карточки через делегирование (всплытие)

(function () {
  const onOpenCard = function (openCard) {
    const mapPin = openCard.target.closest(`.map__pin`);
    closeCard();
    if (mapPin) {
      const indexPinClone = mapPin.dataset.indexPin;
      if (indexPinClone) {
        const currentPins = window.filtersPins.length ? window.filtersPins : window.serverDatasets;
        window.advertCard.cloneCreateCard(currentPins[indexPinClone]);
        document.addEventListener(`keydown`, onPopupEscPress);
      }
    }
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
    }
  };

  // Закрытие карточки объявления

  const closeCard = function () {
    const closeButton = document.querySelector(`.popup__close`);
    const popup = window.constants.map.querySelector(`.popup`);
    if (closeButton || popup) {
      popup.remove();
      document.removeEventListener(`keydown`, onPopupEscPress);
    }
  };

  // Обработчики

  window.constants.mapPins.addEventListener(`click`, function (evt) {
    onOpenCard(evt);

    document.addEventListener(`keydown`, function () {
      // if (evtClose.key === `Escape`) {
        closeCard();
      // }
    });

    document.addEventListener(`mousedown`, function (evtClose) {
      if (evtClose.button === 0) {
        closeCard();
      }
    });
  });

  window.constants.mapPins.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      onOpenCard(evt);
    }
  });

  window.advertControl = {
    onOpenCard
  };
})();

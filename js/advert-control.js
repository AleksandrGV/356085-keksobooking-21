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

        document.querySelector(`.popup__close`).addEventListener(`click`, onPopupEscPress);
        // document.querySelector(`.popup__close`).removeEventListener(`keydown`, onPopupEscPress);
      }
    }
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === window.constants.NumberOnKeyboard.ESCAPE || evt.button === window.constants.MOUSE_BUTTON_NUMBER) {
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
      // closeButton.addEventListener(`keydown`, onPopupEscPress);
    }
  };

  // Обработчики

  window.constants.mapPins.addEventListener(`click`, function (evt) {
    onOpenCard(evt);
  });

  window.constants.mapPins.addEventListener(`keydown`, function (evt) {
    if (evt.key === window.constants.NumberOnKeyboard.ENTER) {
      onOpenCard(evt);
    }
  });


  window.advertControl = {
    onOpenCard
  };
})();

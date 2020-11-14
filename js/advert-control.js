'use strict';

// advert-control.js
// Открытие карточки через делегирование (всплытие)

(() => {
  const onOpenCard = (openCard) => {
    const mapPin = openCard.target.closest(`.map__pin`);
    closeCard();
    if (mapPin) {
      const indexPinClone = mapPin.dataset.indexPin;
      if (indexPinClone) {
        const currentPins = window.filtersPins.length ? window.filtersPins : window.serverDatasets;
        window.advertCard.cloneCreate(currentPins[indexPinClone]);
        document.addEventListener(`keydown`, onPopupClose);
        document.querySelector(`.popup__close`).addEventListener(`click`, onPopupClose);
      }
    }
  };

  const onPopupClose = (evt) => {
    if (evt.key === window.constants.NumberOnKeyboard.ESCAPE || evt.button === window.constants.MOUSE_BUTTON_NUMBER) {
      evt.preventDefault();
      closeCard();
    }
  };

  // Закрытие карточки объявления
  const closeCard = () => {
    const popup = window.constants.map.querySelector(`.popup`);
    if (popup) {
      popup.remove();
    }
  };

  // Обработчики
  window.constants.mapPins.addEventListener(`click`, (evt) => {
    onOpenCard(evt);
  });

  window.constants.mapPins.addEventListener(`keydown`, (evt) => {
    if (evt.key === window.constants.NumberOnKeyboard.ENTER) {
      onOpenCard(evt);
    }
  });

  window.advertControl = {
    onOpenCard
  };
})();

'use strict';

// advert-control.js
// Открытие карточки через делегирование (всплытие)

(function () {
  const onOpenCard = function (openCard) {
    const popup = window.variables.map.querySelector(`.popup`);
    const mapPin = openCard.target.closest(`.map__pin`);
    window.variables.popupClose(popup);
    if (mapPin) {
      const indexPinClone = window.variables.mapPin.dataset.indexPin;
      if (indexPinClone) {
        window.advertCard.createCard(window.main.mockPinsData[indexPinClone]);
      }
    }
  };

  window.advertControl = {
    onOpenCard: onOpenCard()
  };
})();

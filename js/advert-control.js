'use strict';

// advert-control.js
// Открытие карточки через делегирование (всплытие)

const map = document.querySelector(`.map`);

const onOpenCard = function (openCard) {
  const popup = map.querySelector(`.popup`);
  const mapPin = openCard.target.closest(`.map__pin`);
  popupClose(popup);
  if (mapPin) {
    const indexPinClone = mapPin.dataset.indexPin;
    if (indexPinClone) {
      createCard(mockPinsData[indexPinClone]);
    }
  }
};

mapPins.addEventListener(`click`, function (evt) {
  onOpenCard(evt);
});

// Временами не стабильно работает

mapPins.addEventListener(`keydown`, function (evt) {
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
  const popup = map.querySelector(`.popup`);
  if (evt.key === `Escape`) {
    popupClose(popup);
  }
});

document.addEventListener(`mousedown`, function (evt) {
  const popup = map.querySelector(`.popup`);
  if (evt.button === 0) {
    popupClose(popup);
  }
});

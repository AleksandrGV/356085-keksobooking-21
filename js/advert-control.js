'use strict';

// advert-control.js
// Открытие карточки через делегирование (всплытие)

(() => {

  const onOpenCard = (openCard) => {
    window.mapPin = openCard.target.closest(`.map__pin`);
    closeCard();
    if (window.mapPin) {
      const indexPinClone = window.mapPin.dataset.indexPin;
      if (indexPinClone) {
        const currentPins = window.filtersPins.length ? window.filtersPins : window.serverDatasets;
        window.advertCard.cloneCreate(currentPins[indexPinClone]);
        document.querySelector(`#pin`).addEventListener(`click`, () => {
          console.log(window.mapPin.classList.add(`.map__pin--active`));
        });
        document.addEventListener(`keydown`, onPopupClose);
        document.querySelector(`.popup__close`).addEventListener(`click`, onPopupClose);
        //   window.constants.pinTemplate.classList.add(`map__pin--active`);
        // });
      }
      document.removeEventListener(`keydown`, onPopupClose);
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
    onOpenCard,
    closeCard,
  };
})();

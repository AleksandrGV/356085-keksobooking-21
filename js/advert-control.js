'use strict';

// advert-control.js
// Открытие карточки через делегирование (всплытие)

(() => {

  const updatePinClasses = (activePin) => {
    const activeClass = `map__pin--active`;
    const previusActivePin = window.constants.map.querySelector(`.${activeClass}`);

    if (previusActivePin) {
      previusActivePin.classList.remove(activeClass);
    }
    activePin.classList.add(activeClass);
  };

  const onOpenCard = (openCard) => {
    const currentPin = openCard.target.closest(`.map__pin:not(.map__pin--main)`);
    closeCard();
    if (currentPin) {
      const indexPinClone = currentPin.dataset.indexPin;
      if (indexPinClone) {
        updatePinClasses(currentPin);
        const currentPins = window.filtersPins.length ? window.filtersPins : window.serverDatasets;
        window.advertCard.cloneCreate(currentPins[indexPinClone]);

        document.addEventListener(`keydown`, onPopupClose);
        document.querySelector(`.popup__close`).addEventListener(`click`, onPopupClose);
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

"use strict";

(() => {

  const startedPosition = {
    LEFT: 570,
    TOP: 375
  };

  const resetMainPin = () => {
    window.constants.mapPinMain.style = `left: ${startedPosition.LEFT}px; top: ${startedPosition.TOP}px`;
    window.advertCard.writeDownAddress(window.constants.mapPinMain.offsetLeft, window.constants.mapPinMain.offsetTop);
  };

  const formClear = () => {
    window.constants.adForm.reset();
    window.constants.mapFilters.reset();
    window.pageState.blocksForm();
    window.advertControl.closeCard();
    window.services.removePreviusPins();
    resetMainPin();
  };

  window.constants.adForm.querySelector(`.ad-form__reset`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    formClear();
  });

})();


"use strict";

(() => {

  const formClear = () => {
    window.constants.adForm.reset();
    window.constants.mapFilters.reset();
    window.pageState.blocksForm();
    window.advertControl.closeCard();
    window.services.removePreviusPins(); // Не появляются после разблокировки пины
    window.advertCard.writeDownAddress(window.constants.mapPinMain.offsetLeft, window.constants.mapPinMain.offsetTop);
  };

  window.constants.adForm.querySelector(`.ad-form__reset`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    formClear();
  });

})();


'use strict';

// Сортировка

(function () {

  const filterPinsActive = function (id, value) {
    let filtersPins = [];
    if (id === window.constants.HOUSING_FILTRATION.TYPE) {
      filtersPins = window.serverDataset.filter(function (pin) {
        // console.log(pin.offer.type);
        // console.log(value);
        return pin.offer.type === value;
      });
    }
    window.services.removePreviusPins();
    console.log(filtersPins);
    window.pin.renderingPins(filtersPins);
  };

  window.constants.mapFilterContainer.addEventListener(`change`, function (evt) {
    filterPinsActive(evt.target.id, evt.target.value);
  });
})();

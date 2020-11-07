'use strict';

// Сортировка

(function () {

  // const mapCheckbox = document.querySelectorAll(`.map__checkbox`).checked;

  window.filtersPins = [];
  const filterPinsActive = function (id, value) {
    if (value === `any`) {
      window.filtersPins = window.serverDataset.slice(5);
    } else if (id === window.constants.HOUSING_FILTRATION.TYPE) {
      window.filtersPins = window.serverDataset.filter(function (pin) {
        return pin.offer.type === value;
      });
    } else if (id === window.constants.HOUSING_FILTRATION.PRICE) {
      window.filtersPins = window.serverDataset.filter(function (pin) {
        if (pin.offer.price >= 10000 && pin.offer.price <= 50000) {
          return value === `middle`;
        } else if (pin.offer.price < 10000) {
          return value === `low`;
        } else if (pin.offer.price > 50000) {
          return value === `high`;
        }
        return pin.offer.price === value;
      });
    } else if (id === window.constants.HOUSING_FILTRATION.ROOMS) {
      window.filtersPins = window.serverDataset.filter(function (pin) {
        return pin.offer.rooms === Number(value);
      });
    } else if (id === window.constants.HOUSING_FILTRATION.GUESTS) {
      window.filtersPins = window.serverDataset.filter(function (pin) {
        return pin.offer.guests === Number(value);
      });
    } else if (id !== window.constants.HOUSING_FILTRATION.FEATURES) {
      window.filtersPins = window.serverDataset.filter(function (pin) {

        // if (pin.offer.features === `wifi`) {
        //   return value === `wifi`;
        // } else if (pin.offer.features === `dishwasher`) {
        //   return value === `dishwasher`;
        // } else if (pin.offer.features === `parking`) {
        //   return value === `parking`;
        // } else if (pin.offer.features === `washer`) {
        //   return value === `washer`;
        // } else if (pin.offer.features === `elevator`) {
        //   return value === `elevator`;
        // } else if (pin.offer.features === `conditioner`) {
        //   return value === `conditioner`;
        // }
        console.log(pin.offer.features);
        console.log(value);
        return pin.offer.features === value;
      });
    }
    window.services.removePreviusPins();
    window.pin.renderingPins(window.filtersPins);
  };

  window.constants.mapFilterContainer.addEventListener(`change`, function (evt) {
    if (evt.target.closest(window.constants.HOUSING_FILTRATION.FEATURES)) {
      filterPinsActive(evt.target.checked, evt.target.value);
    }
    filterPinsActive(evt.target.id, evt.target.value);
  });
})();

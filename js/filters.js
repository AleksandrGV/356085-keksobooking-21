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
    // } else if (id !== window.constants.HOUSING_FILTRATION.FEATURES) {
    //   const featuresWrapper = document.querySelector(`#${window.constants.HOUSING_FILTRATION.FEATURES}`);
    //   const featuresChecked = featuresWrapper.querySelectorAll(`.map__checkbox:checked`);
    //   // console.log(featuresChecked);
    //   let featuresFilter = [];

    //   for (let i = 0; i < featuresChecked.length; i++) {
    //     featuresFilter.push(featuresChecked[i].value);
    //   }
    //     // console.log(featuresFilter);
    //     // console.log(value);
    //   window.filtersPins = window.serverDataset.filter(function (pin) {
    //     // console.log(featuresChecked);

    //     console.log(featuresFilter.every((feat) => pin.offer.featuresFilter.includes(feat)));
    //     // console.log(featuresFilter);
    //     // console.log(pin.offer.featuresFilter === window.filtersPins);
    //   });
    //   console.log(featuresFilter);
    }
    window.services.removePreviusPins();
    window.pin.renderingPins(window.filtersPins);
  };

  window.constants.mapFilterContainer.addEventListener(`change`, function (evt) {
    if (evt.target.closest(`#${window.constants.HOUSING_FILTRATION.FEATURES}`)) {
      const featuresWrapper = document.querySelector(`#${window.constants.HOUSING_FILTRATION.FEATURES}`);
      const featuresChecked = featuresWrapper.querySelectorAll(`.map__checkbox:checked`);

      let featuresFilter = [];

      for (let i = 0; i < featuresChecked.length; i++) {
        featuresFilter.push(featuresChecked[i].value);
      }
      debugger
      const filtersChecbox = window.serverDataset.slice().filter(function (pin) {
        return featuresFilter.every((feat) => pin.offer.featuresFilter.includes(feat));
      });
      console.log(filtersChecbox);
      console.log(featuresFilter);
      console.log(window.pin.renderingPins(filtersChecbox));
      // filterPinsActive(evt.target.checked, evt.target.value);
    }
    filterPinsActive(evt.target.id, evt.target.value);
  });
})();

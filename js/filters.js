'use strict';

// Фильтрация

(function () {

  window.filtersPins = [];

  const filterPinsActive = function (id, value) {

    let filtersPinsType = [];
    let filtersPinsPrice = [];
    let filtersPinsRooms = [];
    let filtersPinsGuests = [];
    let filtersPinsFeatures = [];


    if (value === `any`) {
      window.filtersPins = window.serverDataset.slice(0, 5);
    } else if (id === window.constants.HOUSING_FILTRATION.TYPE) {
      filtersPinsType = window.serverDataset.filter(function (pin) {
        // console.log(filtersPinsType.splice(0, pin.length));
        // console.log(window.services.removePreviusCard());
        return pin.offer.type === value;
      });
    } else if (id === window.constants.HOUSING_FILTRATION.PRICE) {
      filtersPinsPrice = window.serverDataset.filter(function (pin) {
        if (pin.offer.price >= window.constants.OFFER_PRICE_FILTER.MIN && pin.offer.price <= window.constants.OFFER_PRICE_FILTER.MAX) {
          return value === `middle`;
        } else if (pin.offer.price < window.constants.OFFER_PRICE_FILTER.MIN) {
          return value === `low`;
        } else if (pin.offer.price > window.constants.OFFER_PRICE_FILTER.MAX) {
          return value === `high`;
        }
        return pin.offer.price === value;
      });
    } else if (id === window.constants.HOUSING_FILTRATION.ROOMS) {
      filtersPinsRooms = window.serverDataset.filter(function (pin) {
        return pin.offer.rooms === Number(value);
      });
    } else if (id === window.constants.HOUSING_FILTRATION.GUESTS) {
      filtersPinsGuests = window.serverDataset.filter(function (pin) {
        return pin.offer.guests === Number(value);
      });
    } else if (id !== window.constants.HOUSING_FILTRATION.FEATURES) {
      const featuresWrapper = document.querySelector(`#${window.constants.HOUSING_FILTRATION.FEATURES}`);
      const featuresChecked = featuresWrapper.querySelectorAll(`.map__checkbox:checked`);

      let featuresFilter = [];

      for (let i = 0; i < featuresChecked.length; i++) {
        featuresFilter.push(featuresChecked[i].value);
      }
      filtersPinsFeatures = window.serverDataset.slice(0, 5).filter(function (pin) {
        return featuresFilter.every((feat) => pin.offer.features.includes(feat));
      });
    }
    window.services.removePreviusPins();

    const pinsActive = function () {
      return window.filtersPins.concat(filtersPinsType).concat(filtersPinsPrice)
      .concat(filtersPinsRooms).concat(filtersPinsGuests).concat(filtersPinsFeatures);
    };

    const pinsActiveConcat = pinsActive();

    window.pin.clonRenderingPins(pinsActiveConcat);
  };

  window.constants.mapFilterContainer.addEventListener(`change`, function (evt) {
    window.debounce();
    if (evt.target.closest(`#${window.constants.HOUSING_FILTRATION.FEATURES}`)) {
      filterPinsActive(evt.target.checked, evt.target.value);
    } else {
      filterPinsActive(evt.target.id, evt.target.value);
    }
  });

  window.filters = {
    filterPinsActive
  };
})();

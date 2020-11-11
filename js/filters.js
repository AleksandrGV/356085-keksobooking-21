'use strict';

// Фильтрация

(function () {

  window.filtersPins = [];

  const getFormMapFilters = function () {

    let formMapFilterData = {};

    window.constants.formMapFilters.forEach(function (premises) {
      formMapFilterData = Object.assign(formMapFilterData, {
        [premises.id]: premises.value,
      });
    });
    return formMapFilterData;
  };

  const getFeatures = function () {
    const features = window.constants.mapFilterContainer.querySelectorAll(`.map__checkbox:checked`);

    let featuresData = [];

    features.forEach(function (feature) {
      if (feature.checked) {
        featuresData.push(feature.value);
      }
    });
    return featuresData;
  };

  window.constants.mapFilterContainer.addEventListener(`change`, function () {
    const filtration = getFormMapFilters();
    const features = getFeatures();

    window.filtersPins = window.serverDataset.slice().filter(function (pin) {
      if (filtration[window.constants.HOUSING_FILTRATION.TYPE] === `any`) {
        return true;
      } else {
        return pin.offer.type === filtration[window.constants.HOUSING_FILTRATION.TYPE];
      }
    }).filter(function (pin) {
      if (filtration[window.constants.HOUSING_FILTRATION.PRICE] === `any`) {
        return true;
      } else {
        if (filtration[window.constants.HOUSING_FILTRATION.PRICE] === `middle` && pin.offer.price >= window.constants.OFFER_PRICE_FILTER.MIN && pin.offer.price <= window.constants.OFFER_PRICE_FILTER.MAX) {
          return true;
        } else if (filtration[window.constants.HOUSING_FILTRATION.PRICE] === `low` && pin.offer.price < window.constants.OFFER_PRICE_FILTER.MIN) {
          return true;
        } else if (filtration[window.constants.HOUSING_FILTRATION.PRICE] === `high` && pin.offer.price > window.constants.OFFER_PRICE_FILTER.MAX) {
          return true;
        }
      }
      return false;
    }).filter(function (pin) {
      if (filtration[window.constants.HOUSING_FILTRATION.ROOMS] === `any`) {
        return true;
      } else {
        return Number(pin.offer.rooms) === Number(filtration[window.constants.HOUSING_FILTRATION.ROOMS]);
      }
    }).filter(function (pin) {
      if (filtration[window.constants.HOUSING_FILTRATION.GUESTS] === `any`) {
        return true;
      } else {
        return Number(pin.offer.rooms) === Number(filtration[window.constants.HOUSING_FILTRATION.GUESTS]);
      }
    }).filter(function (pin) {
      return features.every((feature) => pin.offer.features.includes(feature));
    });
    window.services.removePreviusPins();
    window.debounce();
    window.pin.cloneRenderingPins(window.filtersPins.slice(0, 5));
  });

})();

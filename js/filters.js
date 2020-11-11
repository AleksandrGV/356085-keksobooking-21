'use strict';

// Фильтрация

(function () {

  const HOUSING_FILTRATION = {
    TYPE: `housing-type`,
    PRICE: `housing-price`,
    ROOMS: `housing-rooms`,
    GUESTS: `housing-guests`,
    FEATURES: `housing-features`
  };

  const HOUSING_OPTION = {
    ANY: `any`,
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`
  };

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

    const featuresData = [];

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
      if (filtration[HOUSING_FILTRATION.TYPE] === HOUSING_OPTION.ANY) {
        return true;
      } else {
        return pin.offer.type === filtration[HOUSING_FILTRATION.TYPE];
      }
    }).filter(function (pin) {
      if (filtration[HOUSING_FILTRATION.PRICE] === HOUSING_OPTION.ANY) {
        return true;
      } else {
        if (filtration[HOUSING_FILTRATION.PRICE] === HOUSING_OPTION.MIDDLE && pin.offer.price >= window.constants.OFFER_PRICE_FILTER.MIN && pin.offer.price <= window.constants.OFFER_PRICE_FILTER.MAX) {
          return true;
        } else if (filtration[HOUSING_FILTRATION.PRICE] === HOUSING_OPTION.LOW && pin.offer.price < window.constants.OFFER_PRICE_FILTER.MIN) {
          return true;
        } else if (filtration[HOUSING_FILTRATION.PRICE] === HOUSING_OPTION.HIGH && pin.offer.price > window.constants.OFFER_PRICE_FILTER.MAX) {
          return true;
        }
      }
      return false;
    }).filter(function (pin) {
      if (filtration[HOUSING_FILTRATION.ROOMS] === HOUSING_OPTION.ANY) {
        return true;
      } else {
        return Number(pin.offer.rooms) === Number(filtration[HOUSING_FILTRATION.ROOMS]);
      }
    }).filter(function (pin) {
      if (filtration[HOUSING_FILTRATION.GUESTS] === HOUSING_OPTION.ANY) {
        return true;
      } else {
        return Number(pin.offer.rooms) === Number(filtration[HOUSING_FILTRATION.GUESTS]);
      }
    }).filter(function (pin) {
      return features.every((feature) => pin.offer.features.includes(feature));
    });
    window.services.removePreviusPins();

    const clickDelay = function () {
      window.pin.cloneRenderingPins(window.filtersPins.slice(0, 5));
    };

    const clickDebounce = window.debounce(clickDelay);

    document.addEventListener(`click`, function (evt) {
      clickDebounce(evt);
    });
  });


})();

'use strict';

// Фильтрация

(function () {

  const HousingFiltration = {
    TYPE: `housing-type`,
    PRICE: `housing-price`,
    ROOMS: `housing-rooms`,
    GUESTS: `housing-guests`,
    FEATURES: `housing-features`
  };

  const HousingOption = {
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

    window.filtersPins = window.serverDatasets.slice().filter(function (pin) {
      if (filtration[HousingFiltration.TYPE] === HousingOption.ANY) {
        return true;
      } else {
        return pin.offer.type === filtration[HousingFiltration.TYPE];
      }
    }).filter(function (pin) {
      if (filtration[HousingFiltration.PRICE] === HousingOption.ANY) {
        return true;
      } else {
        if (filtration[HousingFiltration.PRICE] === HousingOption.MIDDLE && pin.offer.price >= window.constants.OfferPriceFilter.MIN && pin.offer.price <= window.constants.OfferPriceFilter.MAX) {
          return true;
        } else if (filtration[HousingFiltration.PRICE] === HousingOption.LOW && pin.offer.price < window.constants.OfferPriceFilter.MIN) {
          return true;
        } else if (filtration[HousingFiltration.PRICE] === HousingOption.HIGH && pin.offer.price > window.constants.OfferPriceFilter.MAX) {
          return true;
        }
      }
      return false;
    }).filter(function (pin) {
      if (filtration[HousingFiltration.ROOMS] === HousingOption.ANY) {
        return true;
      } else {
        return Number(pin.offer.rooms) === Number(filtration[HousingFiltration.ROOMS]);
      }
    }).filter(function (pin) {
      if (filtration[HousingFiltration.GUESTS] === HousingOption.ANY) {
        return true;
      } else {
        return Number(pin.offer.rooms) === Number(filtration[HousingFiltration.GUESTS]);
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

'use strict';

// Фильтрация

(() => {

  const ANY_TYPE = `any`;

  const HousingFiltration = {
    TYPE: `housing-type`,
    PRICE: `housing-price`,
    ROOMS: `housing-rooms`,
    GUESTS: `housing-guests`,
    FEATURES: `features`
  };

  const PriceRange = {
    MIN: 10000,
    MAX: 50000
  };

  const PriceOption = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`
  };

  window.filtersPins = [];

  const getFeatures = () => {
    const features = window.constants.mapFilterContainer.querySelectorAll(`.map__checkbox:checked`);

    const featuresData = [];

    features.forEach((feature) => {
      if (feature.checked) {
        featuresData.push(feature.value);
      }
    });
    return featuresData;
  };

  const filteredTypes = {
    [HousingFiltration.TYPE]: (pinData, selectedValue) => {
      return pinData.offer.type === selectedValue;
    },
    [HousingFiltration.PRICE]: (pinData, selectedValue) => {
      return getPriceRange(pinData.offer.price) === selectedValue;
    },
    [HousingFiltration.ROOMS]: (pinData, selectedValue) => {
      return pinData.offer.rooms === Number(selectedValue);
    },
    [HousingFiltration.GUESTS]: (pinData, selectedValue) => {
      return pinData.offer.guests === Number(selectedValue);
    },
    [HousingFiltration.FEATURES]: (pinData, selectedValue) => {
      return selectedValue.every((feature) => pinData.offer.features.includes(feature));
    }
  };

  const getFiltrationValues = () => {
    let formMapFilterData = {};

    window.constants.formMapFilters.forEach((premises) => {
      formMapFilterData = Object.assign(formMapFilterData, {
        [premises.id]: premises.value,
      });
    });

    formMapFilterData.features = getFeatures();

    return formMapFilterData;
  };

  const getPriceRange = (price) => {
    switch (true) {
      case price < PriceRange.LOW: {
        return PriceOption.LOW;
      }
      case price >= PriceRange.MIN && price <= PriceRange.MAX: {
        return PriceOption.MIDDLE;
      }
      case price > PriceRange.MAX: {
        return PriceOption.HIGH;
      }
      default: {
        return ANY_TYPE;
      }
    }
  };

  const filteredBySelectedValues = ((currentPinData, filtration) => {
    return Object.entries(filteredTypes).every((filterEntry) => {
      const type = filterEntry.shift();
      const filter = filterEntry.pop();

      if (filtration[type] === ANY_TYPE) {
        return true;
      }
      return filter(currentPinData, filtration[type]);
    });
  });

  const onFilterChange = window.debounce(() => {

    window.filtersPins = [];

    const filtration = getFiltrationValues();

    for (let i = 0; i < window.serverDatasets.length; i++) {
      if (window.filtersPins.length === 5) {
        break;
      }
      const currentPinData = window.serverDatasets[i];

      if (filteredBySelectedValues(currentPinData, filtration)) {
        window.filtersPins.push(currentPinData);
      }
    }
    window.services.removePreviusPins();
    window.pin.cloneRendering(window.filtersPins);
  });

  window.constants.mapFilterContainer.addEventListener(`change`, onFilterChange);

})();

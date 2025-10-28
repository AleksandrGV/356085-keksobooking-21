'use strict';

(() => {

  const ANY_TYPE = `any`;
  // УБИРАЕМ ограничение количества пинов
  // const NUMBER_VISIBLE_PINS = 5;

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

  // Получаем выбранные features
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

  // Объект с функциями фильтрации
  const filteredTypes = {
    [HousingFiltration.TYPE]: (pinData, selectedValue) => {
      return selectedValue === ANY_TYPE || pinData.offer.type === selectedValue;
    },
    [HousingFiltration.PRICE]: (pinData, selectedValue) => {
      if (selectedValue === ANY_TYPE) {
        return true;
      }
      return getPriceRange(pinData.offer.price) === selectedValue;
    },
    [HousingFiltration.ROOMS]: (pinData, selectedValue) => {
      return selectedValue === ANY_TYPE || pinData.offer.rooms === Number(selectedValue);
    },
    [HousingFiltration.GUESTS]: (pinData, selectedValue) => {
      return selectedValue === ANY_TYPE || pinData.offer.guests === Number(selectedValue);
    },
    [HousingFiltration.FEATURES]: (pinData, selectedValue) => {
      return selectedValue.length === 0 || selectedValue.every((feature) =>
        pinData.offer.features.includes(feature)
      );
    }
  };

  // Получаем текущие значения фильтров
  const getFiltrationValues = () => {
    const formMapFilterData = {};

    window.constants.formMapFilters.forEach((premises) => {
      formMapFilterData[premises.id] = premises.value;
    });

    formMapFilterData.features = getFeatures();

    return formMapFilterData;
  };

  // Определяем ценовой диапазон
  const getPriceRange = (price) => {
    switch (true) {
      case price < PriceRange.MIN:
        return PriceOption.LOW;
      case price >= PriceRange.MIN && price <= PriceRange.MAX:
        return PriceOption.MIDDLE;
      case price > PriceRange.MAX:
        return PriceOption.HIGH;
      default:
        return ANY_TYPE;
    }
  };

  // Проверяем, проходит ли объявление через все фильтры
  const filteredBySelectedValues = (currentPinData, filtration) => {
    return Object.entries(filteredTypes).every(([type, filter]) => {
      if (filtration[type] === ANY_TYPE ||
          (type === HousingFiltration.FEATURES && filtration[type].length === 0)) {
        return true;
      }
      return filter(currentPinData, filtration[type]);
    });
  };

  // Основная функция применения фильтров
  const applyFilters = () => {
    const filtration = getFiltrationValues();
    const allOffers = window.networking.getAllOffers(); // Берем ВСЕ данные

    const filteredPins = allOffers.filter((currentPinData) => {
      return filteredBySelectedValues(currentPinData, filtration);
    });

    return filteredPins;
  };

  // Обработчик изменения фильтров
  const onFilterChange = window.debounce(() => {
    // Применяем фильтры ко ВСЕМ данным
    const filteredPins = applyFilters();

    // Обновляем отображаемые пины
    window.services.removePreviusPins();
    window.advertControl.closeCard();
    window.pin.cloneRendering(filteredPins); // Отображаем ВСЕ отфильтрованные
  });

  // Функция для применения фильтров к любым данным (для использования в других модулях)
  const applyFiltersToData = (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    const filtration = getFiltrationValues();
    return data.filter((currentPinData) => {
      return filteredBySelectedValues(currentPinData, filtration);
    });
  };

  // НОВАЯ ФУНКЦИЯ: Сброс всех фильтров к значениям по умолчанию
  const resetAllFilters = () => {
    // console.log('Сбрасываем все фильтры к значениям по умолчанию');

    // Сбрасываем селекты к значению "any"
    const filterSelects = window.constants.mapFilters.querySelectorAll(`select`);
    filterSelects.forEach((select) => {
      select.value = `any`;
    });

    // Сбрасываем чекбоксы
    const filterCheckboxes = window.constants.mapFilters.querySelectorAll(`input[type="checkbox"]`);
    filterCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Сбрасываем поле features
    if (window.filters) {
      window.filters.selectedFeatures = [];
      // Обновляем отображение features если есть такая функция
      if (typeof window.filters.updateFeaturesDisplay === `function`) {
        window.filters.updateFeaturesDisplay();
      }
    }

    // console.log('Все фильтры сброшены');
  };

  window.constants.mapFilterContainer.addEventListener(`change`, onFilterChange);

  window.filters = {
    applyFilters,
    applyFiltersToData,
    getFiltrationValues,
    resetAllFilters
  };

})();

// Код работавший с данными которые приходили с сервера
// 'use strict';

// // Фильтрация

// (() => {

//   const ANY_TYPE = `any`;
//   const NUMBER_VISIBLE_PINS = 5;

//   const HousingFiltration = {
//     TYPE: `housing-type`,
//     PRICE: `housing-price`,
//     ROOMS: `housing-rooms`,
//     GUESTS: `housing-guests`,
//     FEATURES: `features`
//   };

//   const PriceRange = {
//     MIN: 10000,
//     MAX: 50000
//   };

//   const PriceOption = {
//     LOW: `low`,
//     MIDDLE: `middle`,
//     HIGH: `high`
//   };

//   window.filtersPins = [];

//   const getFeatures = () => {
//     const features = window.constants.mapFilterContainer.querySelectorAll(`.map__checkbox:checked`);

//     const featuresData = [];

//     features.forEach((feature) => {
//       if (feature.checked) {
//         featuresData.push(feature.value);
//       }
//     });
//     return featuresData;
//   };

//   const filteredTypes = {
//     [HousingFiltration.TYPE]: (pinData, selectedValue) => {
//       return pinData.offer.type === selectedValue;
//     },
//     [HousingFiltration.PRICE]: (pinData, selectedValue) => {
//       return getPriceRange(pinData.offer.price) === selectedValue;
//     },
//     [HousingFiltration.ROOMS]: (pinData, selectedValue) => {
//       return pinData.offer.rooms === Number(selectedValue);
//     },
//     [HousingFiltration.GUESTS]: (pinData, selectedValue) => {
//       return pinData.offer.guests === Number(selectedValue);
//     },
//     [HousingFiltration.FEATURES]: (pinData, selectedValue) => {
//       return selectedValue.every((feature) => pinData.offer.features.includes(feature));
//     }
//   };

//   const getFiltrationValues = () => {
//     let formMapFilterData = {};

//     window.constants.formMapFilters.forEach((premises) => {
//       formMapFilterData = Object.assign(formMapFilterData, {
//         [premises.id]: premises.value,
//       });
//     });

//     formMapFilterData.features = getFeatures();

//     return formMapFilterData;
//   };

//   const getPriceRange = (price) => {
//     switch (true) {
//       case price < PriceRange.MIN: {
//         return PriceOption.LOW;
//       }
//       case price >= PriceRange.MIN && price <= PriceRange.MAX: {
//         return PriceOption.MIDDLE;
//       }
//       case price > PriceRange.MAX: {
//         return PriceOption.HIGH;
//       }
//       default: {
//         return ANY_TYPE;
//       }
//     }
//   };

//   const filteredBySelectedValues = ((currentPinData, filtration) => {
//     return Object.entries(filteredTypes).every((filterEntry) => {
//       const type = filterEntry.shift();
//       const filter = filterEntry.pop();

//       if (filtration[type] === ANY_TYPE) {
//         return true;
//       }
//       return filter(currentPinData, filtration[type]);
//     });
//   });

//   const onFilterChange = window.debounce(() => {

//     window.filtersPins = [];

//     const filtration = getFiltrationValues();

//     for (let i = 0; i < window.serverDatasets.length; i++) {
//       if (window.filtersPins.length === NUMBER_VISIBLE_PINS) {
//         break;
//       }
//       const currentPinData = window.serverDatasets[i];

//       if (filteredBySelectedValues(currentPinData, filtration)) {
//         window.filtersPins.push(currentPinData);
//       }
//     }
//     window.services.removePreviusPins();
//     window.advertControl.closeCard();
//     window.pin.cloneRendering(window.filtersPins);
//   });

//   window.constants.mapFilterContainer.addEventListener(`change`, onFilterChange);

// })();

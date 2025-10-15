'use strict';

// advert-control.js
// Открытие карточки через делегирование (всплытие)

(() => {

  const updatePinClasses = (activePin) => {
    const activeClass = `map__pin--active`;
    const previusActivePin = window.constants.map.querySelector(`.${activeClass}`);

    if (previusActivePin) {
      previusActivePin.classList.remove(activeClass);
    }
    activePin.classList.add(activeClass);
  };

  const getCurrentPinsData = () => {
    // Пробуем получить данные в порядке приоритета
    if (window.filters && typeof window.filters.applyFilters === `function`) {
      const filtered = window.filters.applyFilters();
      if (filtered && filtered.length > 0) {
        return filtered;
      }
    }

    if (window.networking && typeof window.networking.getFilteredOffers === `function`) {
      const filteredOffers = window.networking.getFilteredOffers();
      if (filteredOffers && filteredOffers.length > 0) {
        return filteredOffers;
      }
    }

    if (window.allOffers && window.allOffers.length > 0) {
      return window.allOffers;
    }

    // Без console
    if (window.services && window.services.errorHandler) {
      window.services.errorHandler(`Нет данных для отображения карточки`);
    }

    return [];
  };

  const onOpenCard = (openCard) => {
    const currentPin = openCard.target.closest(`.map__pin:not(.map__pin--main)`);

    if (!currentPin) {
      return;
    }
    closeCard();

    const indexPinClone = currentPin.dataset.indexPin;

    if (indexPinClone === undefined) {
      // Без console
      if (window.services && window.services.errorHandler) {
        window.services.errorHandler(`Индекс пина не найден`);
      }
      return;
    }

    updatePinClasses(currentPin);

    const currentPins = getCurrentPinsData();
    const index = parseInt(indexPinClone, 10);

    // Проверяем, что advertCard существует
    if (!window.advertCard) {
      if (window.services && window.services.errorHandler) {
        window.services.errorHandler(`window.advertCard не определен`);
      }
      return;
    }

    // Проверяем, что cloneCreate существует
    if (typeof window.advertCard.cloneCreate !== `function`) {
      if (window.services && window.services.errorHandler) {
        window.services.errorHandler(`window.advertCard.cloneCreate не является функцией`);
      }
      return;
    }

    // Проверяем, что индекс существует в массиве
    if (currentPins && currentPins.length > index && currentPins[index]) {
      window.advertCard.cloneCreate(currentPins[index]);

      document.addEventListener(`keydown`, onPopupClose);
      const closeButton = document.querySelector(`.popup__close`);
      if (closeButton) {
        closeButton.addEventListener(`click`, onPopupClose);
      }
    } else {
      // ЗАМЕНА console.error - вот эта строка
      if (window.services && window.services.errorHandler) {
        window.services.errorHandler(`Объявление с индексом ${index} не найдено`);
      }
    }
  };

  const onPopupClose = (evt) => {
    if (evt.key === window.constants.NumberOnKeyboard.ESCAPE || evt.button === window.constants.MOUSE_BUTTON_NUMBER) {
      evt.preventDefault();
      closeCard();
    }
  };

  // Закрытие карточки объявления
  const closeCard = () => {
    const popup = window.constants.map.querySelector(`.popup`);
    if (popup) {
      popup.remove();
    }

    // Убираем активный класс с пина
    const activePin = window.constants.map.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }

    // Убираем обработчики
    document.removeEventListener(`keydown`, onPopupClose);
  };

  // Обработчики
  window.constants.mapPins.addEventListener(`click`, (evt) => {
    onOpenCard(evt);
  });

  window.constants.mapPins.addEventListener(`keydown`, (evt) => {
    if (evt.key === window.constants.NumberOnKeyboard.ENTER) {
      onOpenCard(evt);
    }
  });

  window.advertControl = {
    onOpenCard,
    closeCard,
  };
})();

// Код работавший с данными которые приходили с сервера
// 'use strict';

// // advert-control.js
// // Открытие карточки через делегирование (всплытие)

// (() => {

//   const updatePinClasses = (activePin) => {
//     const activeClass = `map__pin--active`;
//     const previusActivePin = window.constants.map.querySelector(`.${activeClass}`);

//     if (previusActivePin) {
//       previusActivePin.classList.remove(activeClass);
//     }
//     activePin.classList.add(activeClass);
//   };

//   const onOpenCard = (openCard) => {
//     const currentPin = openCard.target.closest(`.map__pin:not(.map__pin--main)`);
//     closeCard();
//     if (currentPin) {
//       const indexPinClone = currentPin.dataset.indexPin;
//       if (indexPinClone) {
//         updatePinClasses(currentPin);
//         const currentPins = window.filtersPins.length ? window.filtersPins : window.serverDatasets;
//         window.advertCard.cloneCreate(currentPins[indexPinClone]);

//         document.addEventListener(`keydown`, onPopupClose);
//         document.querySelector(`.popup__close`).addEventListener(`click`, onPopupClose);
//       }
//       document.removeEventListener(`keydown`, onPopupClose);
//     }
//   };

//   const onPopupClose = (evt) => {
//     if (evt.key === window.constants.NumberOnKeyboard.ESCAPE || evt.button === window.constants.MOUSE_BUTTON_NUMBER) {
//       evt.preventDefault();
//       closeCard();
//     }
//   };

//   // Закрытие карточки объявления
//   const closeCard = () => {
//     const popup = window.constants.map.querySelector(`.popup`);
//     if (popup) {
//       popup.remove();
//     }
//   };

//   // Обработчики
//   window.constants.mapPins.addEventListener(`click`, (evt) => {
//     onOpenCard(evt);
//   });

//   window.constants.mapPins.addEventListener(`keydown`, (evt) => {
//     if (evt.key === window.constants.NumberOnKeyboard.ENTER) {
//       onOpenCard(evt);
//     }
//   });

//   window.advertControl = {
//     onOpenCard,
//     closeCard,
//   };
// })();

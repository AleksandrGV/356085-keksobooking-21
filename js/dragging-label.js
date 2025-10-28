'use strict';
// dragging-label.js
// Перетаскивание метки

(() => {

  const BoundingFieldHeight = {
    MIN: 130,
    MAX: 630
  };

  // Функция для обработки ошибок
  const errorHandler = (errorMessage) => {
    if (window.services && window.services.errorHandler) {
      window.services.errorHandler(errorMessage);
    }
  };

  // Функция для предупреждений
  const warnHandler = (warningMessage) => {
    if (window.services && window.services.errorHandler) {
      window.services.errorHandler('Предупреждение: ' + warningMessage);
    }
  };

  const limitField = {
    top: window.constants.mapPins.offsetTop + BoundingFieldHeight.MIN,
    left: window.constants.mapPins.offsetLeft,
    bottom: window.constants.mapPins.offsetTop + BoundingFieldHeight.MAX,
    right: window.constants.mapPins.offsetLeft + window.constants.mapPins.offsetWidth - window.constants.mapPinMain.offsetWidth
  };

  let onMouseMove;
  let onMouseUp;
  let onTouchMove;
  let onTouchEnd;

  const onSuccess = (data) => {
    if (data && Array.isArray(data)) {
      const activePin = data.slice(window.constants.RangeElements.MIN, window.constants.RangeElements.MAX);
      if (window.pin && typeof window.pin.cloneRendering === 'function') {
        window.services.removePreviusPins();
        window.pin.cloneRendering(activePin);
      } else {
        warnHandler('Функция window.pin.cloneRendering не найдена');
      }
    } else {
      warnHandler('Получены некорректные данные');
    }
  };

  // Функция для обновления пинов при перемещении
  const updatePinsOnMove = (x, y) => {
    if (window.networking && typeof window.networking.updateOffersByPinPosition === 'function') {
      window.networking.updateOffersByPinPosition(x, y, onSuccess);
    }
  };

  // Общая функция для обработки перемещения
  const handleMove = (clientX, clientY, startCoordinates) => {
    const shift = {
      x: startCoordinates.x - clientX,
      y: startCoordinates.y - clientY
    };

    const vertical = window.constants.mapPinMain.offsetTop - shift.y;
    const horizontal = window.constants.mapPinMain.offsetLeft - shift.x;

    // Ограничиваем перемещение по вертикали
    if (vertical >= limitField.top && vertical <= limitField.bottom) {
      window.constants.mapPinMain.style.top = `${vertical}px`;
    }

    // Ограничиваем перемещение по горизонтали
    if (horizontal >= limitField.left && horizontal <= limitField.right) {
      window.constants.mapPinMain.style.left = `${horizontal}px`;
    }

    // Обновляем адрес в форме
    if (window.advertCard && typeof window.advertCard.writeDownAddress === 'function') {
      window.advertCard.writeDownAddress(horizontal, vertical);
    }

    // ОБНОВЛЯЕМ ПИНЫ ПРИ ПЕРЕМЕЩЕНИИ
    updatePinsOnMove(horizontal, vertical);

    return { x: clientX, y: clientY };
  };

  // Функция завершения перемещения
  const handleMoveEnd = (dragged) => {
    if (dragged) {
      // ОБНОВЛЯЕМ ДАННЫЕ ПРИ ЗАВЕРШЕНИИ ПЕРЕМЕЩЕНИЯ
      const currentX = parseInt(window.constants.mapPinMain.style.left, 10);
      const currentY = parseInt(window.constants.mapPinMain.style.top, 10);

      if (window.networking && typeof window.networking.updateOffersByPinPosition === 'function') {
        window.networking.updateOffersByPinPosition(currentX, currentY, onSuccess);
      } else {
        warnHandler('window.networking.updateOffersByPinPosition не найдена');
      }

      // Разблокируем поля формы
      if (window.pageState && typeof window.pageState.unlocksFormFields === 'function') {
        window.pageState.unlocksFormFields();
      }
    }
  };

  // Проверяем, что необходимые глобальные объекты существуют
  if (!window.constants || !window.constants.mapPinMain) {
    errorHandler('window.constants или window.constants.mapPinMain не определены');
    return;
  }

  // Обработчик для мыши (десктоп)
  window.constants.mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    if (evt.button !== window.constants.MOUSE_BUTTON_NUMBER) {
      return;
    }

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;

      startCoordinates = handleMove(moveEvt.clientX, moveEvt.clientY, startCoordinates);
    };

    onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      handleMoveEnd(dragged);

      // Убираем обработчики
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      // Предотвращаем клик после перетаскивания
      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          window.constants.mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        window.constants.mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  // Обработчик для touch-устройств (мобильные)
  window.constants.mapPinMain.addEventListener(`touchstart`, (evt) => {
    evt.preventDefault();

    const firstTouch = evt.touches[0]; // ИСПРАВЛЕНО: переименована переменная
    let startCoordinates = {
      x: firstTouch.clientX,
      y: firstTouch.clientY
    };

    let dragged = false;

    onTouchMove = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;

      const currentTouch = moveEvt.touches[0]; // ИСПРАВЛЕНО: переименована переменная
      startCoordinates = handleMove(currentTouch.clientX, currentTouch.clientY, startCoordinates);
    };

    onTouchEnd = (endEvt) => {
      endEvt.preventDefault();

      handleMoveEnd(dragged);

      // Убираем обработчики
      document.removeEventListener(`touchmove`, onTouchMove);
      document.removeEventListener(`touchend`, onTouchEnd);
    };

    document.addEventListener(`touchmove`, onTouchMove);
    document.addEventListener(`touchend`, onTouchEnd);
  });

  window.draggingLabel = {
    onSuccess,
    errorHandler
  };

})();




// 'use strict';

// (() => {

//   const BoundingFieldHeight = {
//     MIN: 130,
//     MAX: 630
//   };

//   const errorHandler = (errorMessage) => {
//     if (window.services && window.services.errorHandler) {
//       window.services.errorHandler(errorMessage);
//     }
//   };

//   const limitField = {
//     top: window.constants.mapPins.offsetTop + BoundingFieldHeight.MIN,
//     left: window.constants.mapPins.offsetLeft,
//     bottom: window.constants.mapPins.offsetTop + BoundingFieldHeight.MAX,
//     right: window.constants.mapPins.offsetLeft + window.constants.mapPins.offsetWidth - window.constants.mapPinMain.offsetWidth
//   };

//   let onMouseMove;
//   let onMouseUp;

//   // УСОВЕРШЕНСТВОВАННАЯ ФУНКЦИЯ onSuccess
//   const onSuccess = (loadedData) => {
//     if (loadedData && Array.isArray(loadedData)) {
//       // ПРИМЕНЯЕМ ФИЛЬТРЫ К ПОЛУЧЕННЫМ ДАННЫМ
//       let pinsToShow = loadedData;

//       // Если есть активные фильтры, применяем их
//       if (window.filters && typeof window.filters.applyFiltersToData === `function`) {
//         pinsToShow = window.filters.applyFiltersToData(loadedData);
//       }

//       window.services.removePreviusPins();
//       if (window.pin && typeof window.pin.cloneRendering === `function`) {
//         window.pin.cloneRendering(pinsToShow);
//       }
//     } else {
//       if (window.services && window.services.errorHandler) {
//         window.services.errorHandler(`Получены некорректные данные при перемещении пина`);
//       }
//     }
//   };

//   // Функция для обновления пинов при перемещении
//   const updatePinsOnMove = (x, y) => {
//     if (window.networking && typeof window.networking.updateOffersByPinPosition === `function`) {
//       window.networking.updateOffersByPinPosition(x, y, onSuccess);
//     }
//   };

//   // Проверяем, что необходимые глобальные объекты существуют
//   if (!window.constants || !window.constants.mapPinMain) {
//     errorHandler(`window.constants или window.constants.mapPinMain не определены`);
//     return;
//   }

//   window.constants.mapPinMain.addEventListener(`mousedown`, (evt) => {
//     evt.preventDefault();

//     if (evt.button !== window.constants.MOUSE_BUTTON_NUMBER) {
//       return;
//     }

//     let startCoordinates = {
//       x: evt.clientX,
//       y: evt.clientY
//     };

//     let dragged = false;

//     onMouseMove = (moveEvt) => {
//       moveEvt.preventDefault();
//       dragged = true;

//       const shift = {
//         x: startCoordinates.x - moveEvt.clientX,
//         y: startCoordinates.y - moveEvt.clientY
//       };

//       startCoordinates = {
//         x: moveEvt.clientX,
//         y: moveEvt.clientY
//       };

//       if (moveEvt.target.closest(`.map__pins`)) {
//         const vertical = window.constants.mapPinMain.offsetTop - shift.y;
//         const horizontal = window.constants.mapPinMain.offsetLeft - shift.x;

//         // Ограничиваем перемещение по вертикали
//         if (vertical >= limitField.top && vertical <= limitField.bottom) {
//           window.constants.mapPinMain.style.top = `${vertical}px`;
//         }

//         // Ограничиваем перемещение по горизонтали
//         if (horizontal >= limitField.left && horizontal <= limitField.right) {
//           window.constants.mapPinMain.style.left = `${horizontal}px`;
//         }

//         // Обновляем адрес в форме
//         if (window.advertCard && typeof window.advertCard.writeDownAddress === `function`) {
//           window.advertCard.writeDownAddress(horizontal, vertical);
//         }

//         // ОБНОВЛЯЕМ ПИНЫ ПРИ ПЕРЕМЕЩЕНИИ С УЧЕТОМ ФИЛЬТРОВ
//         updatePinsOnMove(horizontal, vertical);
//       } else {
//         if (onMouseUp) {
//           onMouseUp(moveEvt);
//         }
//       }
//     };

//     onMouseUp = (upEvt) => {
//       upEvt.preventDefault();

//       // Загружаем данные только если пин был перемещен
//       if (dragged) {
//         // ФИНАЛЬНОЕ ОБНОВЛЕНИЕ ПРИ ЗАВЕРШЕНИИ ПЕРЕМЕЩЕНИЯ
//         const currentX = parseInt(window.constants.mapPinMain.style.left, 10);
//         const currentY = parseInt(window.constants.mapPinMain.style.top, 10);

//         if (window.networking && typeof window.networking.updateOffersByPinPosition === `function`) {
//           window.networking.updateOffersByPinPosition(currentX, currentY, onSuccess);
//         }

//         // Разблокируем поля формы
//         if (window.pageState && typeof window.pageState.unlocksFormFields === `function`) {
//           window.pageState.unlocksFormFields();
//         }
//       }

//       // Убираем обработчики
//       document.removeEventListener(`mousemove`, onMouseMove);
//       document.removeEventListener(`mouseup`, onMouseUp);

//       // Предотвращаем клик после перетаскивания
//       if (dragged) {
//         const onClickPreventDefault = (clickEvt) => {
//           clickEvt.preventDefault();
//           window.constants.mapPinMain.removeEventListener(`click`, onClickPreventDefault);
//         };
//         window.constants.mapPinMain.addEventListener(`click`, onClickPreventDefault);
//       }
//     };

//     document.addEventListener(`mousemove`, onMouseMove);
//     document.addEventListener(`mouseup`, onMouseUp);
//   });

//   window.draggingLabel = {
//     onSuccess,
//     errorHandler
//   };

// })();

// Первоначальный вариант работавший с данными которые приходили с сервера
// 'use strict';
// // dragging-label.js
// // Перетаскивание метки

// (() => {

//   const BoundingFieldHeight = {
//     MIN: 130,
//     MAX: 630
//   };

//   const limitField = {
//     top: window.constants.mapPins.offsetTop + BoundingFieldHeight.MIN,
//     left: window.constants.mapPins.offsetLeft,
//     bottom: window.constants.mapPins.offsetTop + BoundingFieldHeight.MAX,
//     right: window.constants.mapPins.offsetLeft + window.constants.mapPins.offsetWidth - window.constants.mapPinMain.offsetWidth
//   };

//   let onMouseMove;
//   let onMouseUp;

//   const onSuccess = (data) => {
//     const activePin = data.slice(window.constants.RangeElements.MIN, window.constants.RangeElements.MAX);
//     window.pin.cloneRendering(activePin);
//   };

//   window.constants.mapPinMain.addEventListener(`mousedown`, (evt) => {
//     evt.preventDefault();
//     if (evt.button !== window.constants.MOUSE_BUTTON_NUMBER) {
//       return;
//     }
//     // Находим начальные координаты

//     let startCoordinates = {
//       x: evt.clientX,
//       y: evt.clientY
//     };

//     let dragged = false;

//     onMouseMove = (moveEvt) => {
//       moveEvt.preventDefault();

//       dragged = true;

//       const shift = {
//         x: startCoordinates.x - moveEvt.clientX,
//         y: startCoordinates.y - moveEvt.clientY
//       };

//       startCoordinates = {
//         x: moveEvt.clientX,
//         y: moveEvt.clientY
//       };

//       if (moveEvt.target.closest(`.map__pins`)) {

//         const vertical = window.constants.mapPinMain.offsetTop - shift.y;
//         const horizontal = window.constants.mapPinMain.offsetLeft - shift.x;

//         if (vertical >= limitField.top && vertical <= limitField.bottom) {
//           window.constants.mapPinMain.style.top = `${vertical}` + `px`;
//         }

//         if (horizontal >= limitField.left && horizontal <= limitField.right) {
//           window.constants.mapPinMain.style.left = `${horizontal}` + `px`;
//         }
//         window.advertCard.writeDownAddress(horizontal, vertical);
//       } else {
//         onMouseUp(evt);
//       }
//     };

//     onMouseUp = (upEvt) => {
//       upEvt.preventDefault();
//       // было
//       // window.networking.load(onSuccess, window.services.errorHandler);

//       // Стало:
// window.networking.load(onSuccess, function(error) {
//   console.error('Ошибка загрузки:', error);
// });
//       window.pageState.unlocksFormFields();

//       document.removeEventListener(`mousemove`, onMouseMove);
//       document.removeEventListener(`mouseup`, onMouseUp);

//       if (dragged) {

//         const onClickPreventDefault = (clickEvt) => {
//           clickEvt.preventDefault();
//           window.constants.mapPinMain.removeEventListener(`click`, onClickPreventDefault);
//         };
//         window.constants.mapPinMain.addEventListener(`click`, onClickPreventDefault);
//       }
//     };

//     document.addEventListener(`mousemove`, onMouseMove);
//     document.addEventListener(`mouseup`, onMouseUp);
//   });

//   window.draggingLabel = {
//     onSuccess
//   };

// })();

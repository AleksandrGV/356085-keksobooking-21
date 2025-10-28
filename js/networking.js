'use strict';
// networking.js
(() => {
  // Глобальные переменные для хранения данных
  window.allOffers = []; // ВСЕ объявления из JSON
  window.filteredOffers = []; // Отфильтрованные для отображения

  // Безопасный логгер
  const safeLog = {
    error: (message, error) => {
      if (window.services && window.services.errorHandler) {
        window.services.errorHandler(message + (error ? `: ` + error : ``));
      }
    }
  };

  // Функция для фильтрации объявлений по близости к главному пину
  const filterOffersByLocation = (offers, mainPinX, mainPinY, radius = 150) => {
    return offers.filter((offer) => {
      if (!offer.location || typeof offer.location.x !== `number` || typeof offer.location.y !== `number`) {
        return false;
      }
      const distance = Math.sqrt(
          Math.pow(offer.location.x - mainPinX, 2) +
          Math.pow(offer.location.y - mainPinY, 2)
      );
      return distance <= radius;
    });
  };

  // Функция для получения ВСЕХ объявлений (для фильтров)
  const getAllOffers = () => {
    return window.allOffers;
  };

  // Функция для получения текущих отфильтрованных объявлений (для отображения)
  const getFilteredOffers = () => {
    return window.filteredOffers;
  };

  // НОВАЯ ФУНКЦИЯ: Поиск объявления по аватару
  const findOfferByAvatar = (avatar) => {
    if (!window.allOffers || window.allOffers.length === 0) {
      // console.warn('Данные объявлений еще не загружены');
      return null;
    }

    const foundOffer = window.allOffers.find((offer) =>
      offer.author.avatar === avatar
    );

    // if (!foundOffer) {
    // console.warn('Объявление не найдено для аватара:', avatar);
    // }

    return foundOffer || null;
  };

  // НОВАЯ ФУНКЦИЯ: Получение объявления по индексу
  const getOfferByIndex = (index) => {
    if (!window.allOffers || window.allOffers.length === 0) {
      return null;
    }
    return window.allOffers[index] || null;
  };

  // НОВАЯ ФУНКЦИЯ: Получение всех данных (для совместимости)
  const getOffersData = () => {
    return {offers: window.allOffers};
  };

  // НОВАЯ ФУНКЦИЯ: Проверка загрузки данных
  const isDataLoaded = () => {
    return window.allOffers.length > 0;
  };

  // Загрузка данных из JSON файла
  const loadFromJSON = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        const data = xhr.response;
        if (data && data.offers && data.offers.length > 0) {
          window.allOffers = data.offers; // Сохраняем ВСЕ данные
          // console.log('Загружено объявлений:', window.allOffers.length);

          // Получаем позицию главного пина
          const mainPin = document.querySelector(`.map__pin--main`);
          const mainPinX = parseInt(mainPin.style.left, 10) || 570;
          const mainPinY = parseInt(mainPin.style.top, 10) || 375;

          // Фильтруем по местоположению для первоначального отображения
          window.filteredOffers = filterOffersByLocation(window.allOffers, mainPinX, mainPinY);

          if (onSuccess) {
            onSuccess(window.filteredOffers);
          }
        } else {
          const errorMsg = `Нет данных в JSON файле`;
          // console.error(errorMsg);
          if (onError) {
            onError(errorMsg);
          }
        }
      } else {
        const errorMsg = `Ошибка загрузки JSON: ` + xhr.status;
        // console.error(errorMsg);
        if (onError) {
          onError(errorMsg);
        }
      }
    });

    xhr.addEventListener(`error`, () => {
      const errorMsg = `Ошибка сети при загрузке JSON`;
      // console.error(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
    });

    xhr.addEventListener(`timeout`, () => {
      const errorMsg = `Таймаут загрузки JSON`;
      // console.error(errorMsg);
      if (onError) {
        onError(errorMsg);
      }
    });

    xhr.timeout = 10000;
    xhr.open(`GET`, `data/offers.json`);
    xhr.send();
  };

  // Основная функция загрузки данных
  const load = (onSuccess, onError) => {
    loadFromJSON(onSuccess, onError);
  };

  // Функция обновления объявлений при перемещении пина
  // const updateOffersByPinPosition = (mainPinX, mainPinY, onSuccess) => {
  //   if (window.allOffers.length === 0) {
  //     // Если данные еще не загружены, загружаем их
  //     load((_data) => {
  //       // После загрузки фильтруем по новому положению
  //       window.filteredOffers = filterOffersByLocation(window.allOffers, mainPinX, mainPinY);
  //       if (onSuccess) {
  //         onSuccess(window.filteredOffers);
  //       }
  //     }, (error) => {
  //       safeLog.error(`Ошибка загрузки данных`, error);
  //     });
  //   } else {
  //     // Фильтруем существующие данные по новому положению
  //     window.filteredOffers = filterOffersByLocation(window.allOffers, mainPinX, mainPinY);
  //     if (onSuccess) {
  //       onSuccess(window.filteredOffers);
  //     }
  //   }
  // };

  // Функция обновления объявлений при перемещении пина
  const updateOffersByPinPosition = (mainPinX, mainPinY, onSuccess) => {
    // console.log(`Обновляем объявления для координат:`, mainPinX, mainPinY);

    // СБРАСЫВАЕМ ФИЛЬТРЫ ПЕРЕД ОБНОВЛЕНИЕМ ДАННЫХ
    if (window.filters && typeof window.filters.resetAllFilters === `function`) {
      window.filters.resetAllFilters();
    }
    // else {
    //   console.warn('Функция сброса фильтров не доступна');
    // }

    if (window.allOffers.length === 0) {
      // Если данные еще не загружены, загружаем их
      load((_data) => {
        // После загрузки фильтруем по новому положению
        window.filteredOffers = filterOffersByLocation(window.allOffers, mainPinX, mainPinY);
        if (onSuccess) {
          onSuccess(window.filteredOffers);
        }
      }, (error) => {
        safeLog.error(`Ошибка загрузки данных`, error);
      });
    } else {
      // Фильтруем существующие данные по новому положению
      window.filteredOffers = filterOffersByLocation(window.allOffers, mainPinX, mainPinY);
      if (onSuccess) {
        onSuccess(window.filteredOffers);
      }
    }
  };

  // Функция отправки формы (заглушка для локальной работы)
  const send = (formData, onSuccess, onError) => {
    try {
      // Симулируем отправку на сервер
      // formData используется для проверки валидности
      const isValid = formData && typeof formData === `object`;

      setTimeout(() => {
        if (onSuccess && isValid) {
          onSuccess();
        } else if (onError) {
          onError(`Неверные данные формы`);
        }
      }, 500);
    } catch (error) {
      if (onError) {
        onError(`Ошибка отправки данных: ` + error.message);
      }
    }
  };

  window.networking = {
    load,
    send,
    getAllOffers,
    getFilteredOffers,
    updateOffersByPinPosition,
    filterOffersByLocation,
    // НОВЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ С КАРТОЧКАМИ
    findOfferByAvatar,
    getOfferByIndex,
    getOffersData,
    isDataLoaded
  };

})();


// Первоначальный вариант когда данные получаем с сервера
// 'use strict';
// // networking.js
// (() => {

//   window.serverDatasets = [];

//   // Получение данных с сервера

//   const request = (method, url, onSuccess, onError, data = null) => {

//     if (window.serverDatasets.length && document.querySelector(`.map--faded`)) {
//       onSuccess(window.serverDatasets);
//     }

//     if (window.serverDatasets.length) {
//       return;
//     }

//     const xhr = new XMLHttpRequest();

//     xhr.responseType = `json`;

//     xhr.addEventListener(`load`, () => {

//       let error;

//       switch (xhr.status) {
//         case window.constants.RequestServerDataStatus.OK:
//           window.serverDatasets = xhr.response;
//           onSuccess(xhr.response);
//           break;

//         case window.constants.RequestServerDataStatus.REQUEST_FAILED:
//           error = `Ошибка запроса`;
//           break;
//         case window.constants.RequestServerDataStatus.USER_AUTHORIZATION_REQUIRED:
//           error = `Необходима авторизация пользователя`;
//           break;
//         case window.constants.RequestServerDataStatus.DATA_NOT_FOUND:
//           error = `Данные не найдены`;
//           break;

//         default:
//           error = `Статус ответа: : ` + xhr.status + ` ` + xhr.statusText;
//       }

//       if (error) {
//         onError(error);
//       }
//     });

//     xhr.addEventListener(`error`, () => {
//       onError(`Ошибка соединения, проверьте подключение к сети!`);
//     });

//     xhr.addEventListener(`timeout`, () => {
//       onError(`Длительное выполнение запроса ` + xhr.timeout + ` мс`);
//     });

//     xhr.timeout = window.constants.XHR_TIMEOUT;

//     xhr.open(method, url);

//     xhr.send(data);
//   };

//   const load = (onSuccess, onError) => {
//     request(window.constants.RequestMethod.GET, window.constants.RequestUrl.URL_LOAD, onSuccess, onError);
//   };

//   const send = (data, onSuccess, onError) => {
//     request(window.constants.RequestMethod.POST, window.constants.RequestUrl.URL_SEND, onSuccess, onError, data);
//   };

//   window.networking = {
//     request,
//     load,
//     send
//   };

// })();

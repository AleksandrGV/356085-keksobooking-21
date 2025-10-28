'use strict';

// advert-control.js
// Открытие карточки объявления при клике на пин

(() => {

  // Функция для выделения активного пина
  const updatePinClasses = (activePin) => {
    const activeClass = `map__pin--active`;
    const previousActivePin = window.constants.map.querySelector(`.${activeClass}`);

    // Убираем выделение с предыдущего активного пина
    if (previousActivePin) {
      previousActivePin.classList.remove(activeClass);
    }
    // Выделяем текущий активный пин
    activePin.classList.add(activeClass);
  };

  // Функция создания данных карточки на основе аватара
  const createCardDataFromAvatar = (avatar) => {
    // Пытаемся найти объявление в загруженных данных через networking
    if (window.networking && window.networking.isDataLoaded()) {
      const offerFromData = window.networking.findOfferByAvatar(avatar);

      if (offerFromData) {
        // console.log('Найдено объявление по аватару:', avatar, offerFromData);
        return offerFromData;
      }
      // else {
      // console.warn('Объявление не найдено по аватару в networking:', avatar);
      // }
    }
    // else {
    // console.warn('Данные в networking еще не загружены, используем шаблон');
    // }

    // ЗАПАСНОЙ ВАРИАНТ: шаблоны для демонстрации (только если данные не загружены)
    const avatarNumber = avatar.match(/user(\d+)\.png/);
    const userNum = avatarNumber ? parseInt(avatarNumber[1], 10) : 1;

    // Шаблоны объявлений для разных аватаров
    const cardTemplates = {
      1: {
        title: `Уютная квартира в центре Токио`,
        address: `570, 375`,
        price: 15000,
        type: `flat`,
        rooms: 2,
        guests: 4,
        checkin: `12:00`,
        checkout: `14:00`,
        features: [`wifi`, `parking`, `elevator`],
        description: `Прекрасная квартира в центре города с видом на парк`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`]
      },
      2: {
        title: `Комната в центре Сибуя`,
        address: `600, 400`,
        price: 8000,
        type: `room`,
        rooms: 1,
        guests: 2,
        checkin: `14:00`,
        checkout: `12:00`,
        features: [`wifi`, `kitchen`],
        description: `Уютная комната недалеко от станции Сибуя`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`]
      },
      3: {
        title: `Современный лофт в Синдзюку`,
        address: `500, 350`,
        price: 25000,
        type: `house`,
        rooms: 3,
        guests: 6,
        checkin: `15:00`,
        checkout: `11:00`,
        features: [`wifi`, `parking`, `dishwasher`, `elevator`],
        description: `Просторный лофт с высокими потолками`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`]
      },
      4: {
        title: `Бунгало у парка Йойоги`,
        address: `650, 320`,
        price: 12000,
        type: `bungalow`,
        rooms: 2,
        guests: 4,
        checkin: `16:00`,
        checkout: `10:00`,
        features: [`wifi`, `parking`, `conditioner`],
        description: `Уютное бунгало с выходом к парку Йоги`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`]
      },
      5: {
        title: `Дворец в традиционном стиле`,
        address: `700, 450`,
        price: 50000,
        type: `palace`,
        rooms: 1,
        guests: 2,
        checkin: `12:00`,
        checkout: `12:00`,
        features: [`wifi`, `conditioner`, `dishwasher`, `washer`, `elevator`, `conditioner`],
        description: `Роскошный дворец в традиционном японском стиле`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
      },
      6: {
        title: `Уютная квартира в центре`,
        address: `400, 300`,
        price: 50000,
        type: `house`,
        rooms: 5,
        guests: 10,
        checkin: `12:00`,
        checkout: `12:00`,
        features: [`wifi`, `dishwasher`, `washer`, `elevator`, `conditioner`],
        description: `Квартира в тихом районе города`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`]
      },
      7: {
        title: `Квартира с красивым видом из окна`,
        address: `600, 200`,
        price: 50000,
        type: `flat`,
        rooms: 1,
        guests: 1,
        checkin: `12:00`,
        checkout: `12:00`,
        features: [`wifi`, `washer`, `elevator`],
        description: `Квартира с развитой инфроструктурой`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`]
      },
      8: {
        title: `Квартира рядом с метро`,
        address: `800, 400`,
        price: 50000,
        type: `house`,
        rooms: 2,
        guests: 4,
        checkin: `12:00`,
        checkout: `12:00`,
        features: [`wifi`, `parking`, `dishwasher`, `washer`, `elevator`, `conditioner`],
        description: `Просторная квартира`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`]
      },
      9: {
        title: `Квартира для демостраций`,
        address: `900, 310`,
        price: 50000,
        type: `house`,
        rooms: 1,
        guest: 0,
        checkin: `12:00`,
        checkout: `12:00`,
        features: [`wifi`, `elevator`, `conditioner`],
        description: `Квартира с площадкой для детей`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`]
      }
    };

    // Используем шаблон для текущего пользователя или шаблон по умолчанию
    const template = cardTemplates[userNum] || cardTemplates[1];

    // Возвращаем структуру данных для карточки
    return {
      author: {avatar},
      offer: {
        title: template.title,
        address: template.address,
        price: template.price,
        type: template.type,
        rooms: template.rooms,
        guests: template.guests,
        checkin: template.checkin,
        checkout: template.checkout,
        features: template.features,
        description: template.description,
        photos: template.photos
      },
      location: {
        x: parseInt(template.address.split(`,`)[0], 10) || 0,
        y: parseInt(template.address.split(`,`)[1], 10) || 0
      }
    };
  };


  // Основная функция открытия карточки
  const onOpenCard = (openCard) => {
    // Находим пин, по которому кликнули (исключаем главный пин)
    const currentPin = openCard.target.closest(`.map__pin:not(.map__pin--main)`);

    // Закрываем предыдущую карточку если она открыта
    closeCard();

    if (currentPin) {
      // Получаем аватар из data-атрибута пина
      const avatarFromPin = currentPin.dataset.avatar;

      if (avatarFromPin) {
        // Выделяем активный пин
        updatePinClasses(currentPin);

        // Создаем данные карточки на основе аватара
        const cardData = createCardDataFromAvatar(avatarFromPin);
        // console.log('Создаем карточку с данными:', cardData);

        // Создаем и отображаем карточку
        if (window.advertCard && typeof window.advertCard.cloneCreate === `function`) {
          window.advertCard.cloneCreate(cardData);

          // Добавляем обработчики для закрытия карточки
          document.addEventListener(`keydown`, onPopupClose);
          const closeButton = document.querySelector(`.popup__close`);
          if (closeButton) {
            closeButton.addEventListener(`click`, onPopupClose);
          }
        } else {
          // console.error('window.advertCard.cloneCreate не доступен');
        }
      }
    }
  };

  // Функция закрытия карточки по ESC или клику
  const onPopupClose = (evt) => {
    if (evt.key === window.constants.NumberOnKeyboard.ESCAPE || evt.button === window.constants.MOUSE_BUTTON_NUMBER) {
      evt.preventDefault();
      closeCard();
    }
  };

  // Функция закрытия карточки
  const closeCard = () => {
    const popup = window.constants.map.querySelector(`.popup`);
    if (popup) {
      popup.remove();
    }

    // Убираем выделение с активного пина
    const activePin = window.constants.map.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }

    // Убираем обработчики закрытия
    document.removeEventListener(`keydown`, onPopupClose);
  };

  // Обработчики событий для открытия карточки
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
    closeCard
  };
})();


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
//       const avatarFromPin = currentPin.dataset.avatar;

//       if (avatarFromPin) {
//         updatePinClasses(currentPin);

//         // УПРОЩЕННОЕ РЕШЕНИЕ: Создаем базовую карточку на основе аватара
//         // Так как serverDatasets и filtersPins недоступны, создаем заглушку

//         const cardData = createCardDataFromAvatar(avatarFromPin);
//         console.log('Создаем карточку для аватара:', avatarFromPin);
//         window.advertCard.cloneCreate(cardData);
//       }
//     }
//   };

//   // Функция для создания данных карточки на основе аватара
//   const createCardDataFromAvatar = (avatar) => {
//     // Создаем разные объявления в зависимости от аватара
//     const avatarNumber = avatar.match(/user(\d+)\.png/);
//     const userNum = avatarNumber ? parseInt(avatarNumber[1]) : 1;

//     const cardTemplates = {
//       1: {
//         title: `Уютная квартира в центре Токио`,
//         type: `flat`,
//         price: 15000,
//         rooms: 2,
//         guests: 4,
//         features: [`wifi`, `parking`, `elevator`],
//         description: `Прекрасная квартира в центре города с видом на парк`
//       },
//       2: {
//         title: `Комната в центре Сибуя`,
//         type: `room`,
//         price: 8000,
//         rooms: 1,
//         guests: 2,
//         features: [`wifi`, `kitchen`],
//         description: `Уютная комната недалеко от станции Сибуя`
//       },
//       3: {
//         title: `Современный лофт в Синдзюку`,
//         type: `house`,
//         price: 25000,
//         rooms: 3,
//         guests: 6,
//         features: [`wifi`, `parking`, `dishwasher`, `elevator`],
//         description: `Просторный лофт с высокими потолками`
//       },
//       4: {
//         title: `Бунгало у парка Йойоги`,
//         type: `bungalow`,
//         price: 12000,
//         rooms: 2,
//         guests: 4,
//         features: [`wifi`, `parking`, `conditioner`],
//         description: `Уютное бунгало с выходом к парку Йойоги`
//       },
//       5: {
//         title: `Дворец в традиционном стиле`,
//         type: `palace`,
//         price: 50000,
//         rooms: 5,
//         guests: 10,
//         features: [`wifi`, `parking`, `dishwasher`, `washer`, `elevator`, `conditioner`],
//         description: `Роскошный дворец в традиционном японском стиле`
//       },
//       6: {
//         title: `Апартаменты у залива`,
//         type: `flat`,
//         price: 18000,
//         rooms: 2,
//         guests: 3,
//         features: [`wifi`, `parking`, `conditioner`, `washer`],
//         description: `Современные апартаменты с видом на залив`
//       },
//       7: {
//         title: `Студия в историческом районе`,
//         type: `flat`,
//         price: 9000,
//         rooms: 1,
//         guests: 2,
//         features: [`wifi`, `elevator`],
//         description: `Уютная студия в историческом районе Токио`
//       },
//       8: {
//         title: `Пентхаус с панорамным видом`,
//         type: `house`,
//         price: 35000,
//         rooms: 4,
//         guests: 8,
//         features: [`wifi`, `parking`, `conditioner`, `dishwasher`, `elevator`],
//         description: `Роскошный пентхаус с панорамным видом на город`
//       }
//     };

//     const template = cardTemplates[userNum] || cardTemplates[1];

//     return {
//       author: {
//         avatar: avatar
//       },
//       offer: {
//         title: template.title,
//         address: `Токио, Япония`,
//         price: template.price,
//         type: template.type,
//         rooms: template.rooms,
//         guests: template.guests,
//         checkin: `14:00`,
//         checkout: `12:00`,
//         features: template.features,
//         description: template.description,
//         photos: [`img/photos/1.jpg`]
//       },
//       location: { x: 0, y: 0 }
//     };
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

//   // Обработчики событий
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

//   const getCurrentPinsData = () => {
//     // Пробуем получить данные в порядке приоритета
//     if (window.filters && typeof window.filters.applyFilters === `function`) {
//       const filtered = window.filters.applyFilters();
//       if (filtered && filtered.length > 0) {
//         return filtered;
//       }
//     }

//     if (window.networking && typeof window.networking.getFilteredOffers === `function`) {
//       const filteredOffers = window.networking.getFilteredOffers();
//       if (filteredOffers && filteredOffers.length > 0) {
//         return filteredOffers;
//       }
//     }

//     if (window.allOffers && window.allOffers.length > 0) {
//       return window.allOffers;
//     }

//     // Без console
//     if (window.services && window.services.errorHandler) {
//       window.services.errorHandler(`Нет данных для отображения карточки`);
//     }

//     return [];
//   };

//   const onOpenCard = (openCard) => {
//     const currentPin = openCard.target.closest(`.map__pin:not(.map__pin--main)`);

//     if (!currentPin) {
//       return;
//     }
//     closeCard();

//     const indexPinClone = currentPin.dataset.indexPin;

//     if (indexPinClone === undefined) {
//       // Без console
//       if (window.services && window.services.errorHandler) {
//         window.services.errorHandler(`Индекс пина не найден`);
//       }
//       return;
//     }

//     updatePinClasses(currentPin);

//     const currentPins = getCurrentPinsData();
//     const index = parseInt(indexPinClone, 10);

//     // Проверяем, что advertCard существует
//     if (!window.advertCard) {
//       if (window.services && window.services.errorHandler) {
//         window.services.errorHandler(`window.advertCard не определен`);
//       }
//       return;
//     }

//     // Проверяем, что cloneCreate существует
//     if (typeof window.advertCard.cloneCreate !== `function`) {
//       if (window.services && window.services.errorHandler) {
//         window.services.errorHandler(`window.advertCard.cloneCreate не является функцией`);
//       }
//       return;
//     }

//     // Проверяем, что индекс существует в массиве
//     if (currentPins && currentPins.length > index && currentPins[index]) {
//       window.advertCard.cloneCreate(currentPins[index]);

//       document.addEventListener(`keydown`, onPopupClose);
//       const closeButton = document.querySelector(`.popup__close`);
//       if (closeButton) {
//         closeButton.addEventListener(`click`, onPopupClose);
//       }
//     } else {
//       // ЗАМЕНА console.error - вот эта строка
//       if (window.services && window.services.errorHandler) {
//         window.services.errorHandler(`Объявление с индексом ${index} не найдено`);
//       }
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

//     // Убираем активный класс с пина
//     const activePin = window.constants.map.querySelector(`.map__pin--active`);
//     if (activePin) {
//       activePin.classList.remove(`map__pin--active`);
//     }

//     // Убираем обработчики
//     document.removeEventListener(`keydown`, onPopupClose);
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

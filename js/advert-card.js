'use strict';

// advert-card.js
// Функция отрисовки карточки объявления

(() => {
  const ONE = 1;

  // Функция обновления features (удобств) в карточке
  const updateFeatures = (popup, cardData) => {
    const currentOfferFeatures = popup.querySelectorAll(`.popup__feature`);
    currentOfferFeatures.forEach((feature) => {
      // Извлекаем название фичи из класса
      const featureName = feature.className.slice(feature.className.lastIndexOf(`-`) + ONE, feature.className.length);
      // Удаляем фичу, если ее нет в данных объявления
      if (!cardData.offer.features.includes(featureName)) {
        feature.remove();
      }
    });
  };

  // Основная функция создания карточки
  const cloneCreate = (cardNew) => {
    // Берем шаблон карточки из HTML
    const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
    const cloneTemplateElementCard = document.createDocumentFragment();
    const cloneCardTemplate = cardTemplate.cloneNode(true);

    // ЗАПОЛНЯЕМ ДАННЫЕ КАРТОЧКИ:

    // 1. Аватар - берется из данных, гарантированно совпадает с пином
    cloneCardTemplate.querySelector(`.popup__avatar`).setAttribute(`src`, cardNew.author.avatar);

    // 2. Основная информация об объявлении
    cloneCardTemplate.querySelector(`.popup__title`).textContent = cardNew.offer.title;
    cloneCardTemplate.querySelector(`.popup__text--address`).textContent = cardNew.offer.address;
    cloneCardTemplate.querySelector(`.popup__text--price`).textContent = `${cardNew.offer.price}₽/ночь`;
    cloneCardTemplate.querySelector(`.popup__type`).textContent = cardNew.offer.type;
    cloneCardTemplate.querySelector(`.popup__text--capacity`).textContent = `${cardNew.offer.rooms} комнат(ы) для ${cardNew.offer.guests} гостей`;
    cloneCardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardNew.offer.checkin}, выезд до ${cardNew.offer.checkout}`;
    cloneCardTemplate.querySelector(`.popup__description`).textContent = cardNew.offer.description;

    // 3. Обновляем features (удобства)
    updateFeatures(cloneCardTemplate, cardNew);

    // 4. Обрабатываем фотографии жилья
    const containerCardPhotos = cloneCardTemplate.querySelector(`.popup__photos`);
    const homePhotoCard = window.clonedPhotos.getCreateHome(containerCardPhotos, cardNew.offer.photos);
    containerCardPhotos.replaceChild(homePhotoCard, containerCardPhotos.querySelector(`.popup__photo`));

    // Добавляем карточку в документ
    cloneTemplateElementCard.appendChild(cloneCardTemplate);

    // Размещаем карточку на карте перед блоком фильтров
    window.constants.map.insertBefore(cloneTemplateElementCard, window.constants.mapFilterContainer);
  };

  // Функция записи адреса в форму
  const writeDownAddress = (addressX, addressY) => {
    window.constants.inputAddress.value = `${addressX}, ${addressY}`;
  };

  // Инициализация адреса при загрузке страницы
  writeDownAddress(window.constants.mapPinMain.offsetLeft, window.constants.mapPinMain.offsetTop);

  window.advertCard = {
    cloneCreate,
    writeDownAddress
  };

})();



// 'use strict';

// // advert-card.js
// // Функция отрисовки карточки объявления

// (() => {
//   const ONE = 1;

//   const updateFeatures = (popup, cardData) => {
//     const currentOfferFeatures = popup.querySelectorAll(`.popup__feature`);
//     currentOfferFeatures.forEach((feature) => {
//       const featureName = feature.className.slice(feature.className.lastIndexOf(`-`) + ONE, feature.className.length);
//       if (!cardData.offer.features.includes(featureName)) {
//         feature.remove();
//       }
//     });
//   };

//   const cloneCreate = (cardNew) => {
//     const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
//     const cloneTemplateElementCard = document.createDocumentFragment();
//     const cloneCardTemplate = cardTemplate.cloneNode(true);

//     // ОТЛАДКА: Логируем аватар для проверки
//     console.log('Аватар в карточке:', cardNew.author.avatar);

//     // Получаем элемент аватара
//     const avatarImg = cloneCardTemplate.querySelector(`.popup__avatar`);

//     // Устанавливаем аватар с проверкой загрузки
//     avatarImg.setAttribute(`src`, cardNew.author.avatar);
//     avatarImg.onerror = function() {
//       console.error('Ошибка загрузки аватара в карточке:', cardNew.author.avatar);
//     };
//     avatarImg.onload = function() {
//       console.log('Аватар в карточке успешно загружен:', cardNew.author.avatar);
//     };

//     // Заполняем остальные поля карточки
//     cloneCardTemplate.querySelector(`.popup__title`).textContent = cardNew.offer.title;
//     cloneCardTemplate.querySelector(`.popup__text--address`).textContent = `${cardNew.offer.address}`;
//     cloneCardTemplate.querySelector(`.popup__text--price`).textContent = `${cardNew.offer.price}₽/ночь`;
//     cloneCardTemplate.querySelector(`.popup__type`).textContent = `${cardNew.offer.type}`;
//     cloneCardTemplate.querySelector(`.popup__text--capacity`).textContent = (`${cardNew.offer.rooms} комнат(ы) для ${cardNew.offer.guests} гостей`);
//     cloneCardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardNew.offer.checkin}, выезд до ${cardNew.offer.checkout}`;
//     cloneCardTemplate.querySelector(`.popup__description`).textContent = `${cardNew.offer.description}`;

//     // Обновляем features
//     updateFeatures(cloneCardTemplate, cardNew);

//     // Обрабатываем фотографии
//     const containerCardPhotos = cloneCardTemplate.querySelector(`.popup__photos`);
//     const homePhotoCard = window.clonedPhotos.getCreateHome(containerCardPhotos, cardNew.offer.photos);
//     containerCardPhotos.replaceChild(homePhotoCard, containerCardPhotos.querySelector(`.popup__photo`));

//     cloneTemplateElementCard.appendChild(cloneCardTemplate);

//     // Вставляем карточку перед фильтрами
//     window.constants.map.insertBefore(cloneTemplateElementCard, window.constants.mapFilterContainer);
//   };

//   const writeDownAddress = (addressX, addressY) => {
//     window.constants.inputAddress.value = (`${addressX}, ${addressY}`);
//   };

//   // Инициализация адреса при загрузке
//   writeDownAddress(window.constants.mapPinMain.offsetLeft, window.constants.mapPinMain.offsetTop);

//   window.advertCard = {
//     cloneCreate,
//     writeDownAddress
//   };

// })();




// 'use strict';

// // advert-card.js
// // Функция отрисовки карточки объявления

// (() => {

//   const ONE = 1;

//   const updateFeatures = (popup, cardData) => {
//     const currentOfferFeatures = popup.querySelectorAll(`.popup__feature`);
//     currentOfferFeatures.forEach((feature) => {
//       const featureName = feature.className.slice(feature.className.lastIndexOf(`-`) + ONE, feature.className.length);
//       if (!cardData.offer.features.includes(featureName)) {
//         feature.remove();
//       }
//     });
//   };

//   const cloneCreate = (cardNew) => {

//     const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

//     const cloneTemplateElementCard = document.createDocumentFragment();

//     const cloneCardTemplate = cardTemplate.cloneNode(true);

//     // Короткая запись
//     cloneCardTemplate.querySelector(`.popup__avatar`).setAttribute(`src`, `${cardNew.author.avatar}`);
//     cloneCardTemplate.querySelector(`.popup__title`).textContent = cardNew.offer.title;
//     cloneCardTemplate.querySelector(`.popup__text--address`).textContent = `${cardNew.offer.address}`;
//     cloneCardTemplate.querySelector(`.popup__text--price`).textContent = `${cardNew.offer.price}₽/ночь`;
//     cloneCardTemplate.querySelector(`.popup__type`).textContent = `${cardNew.offer.type}`;
//     cloneCardTemplate.querySelector(`.popup__text--capacity`).textContent = (`${cardNew.offer.rooms} комнат(ы) для ${cardNew.offer.guests} гостей`);
//     cloneCardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardNew.offer.checkin}, выезд до ${cardNew.offer.checkout}`;
//     cloneCardTemplate.querySelector(`.popup__features`).setAttribute(`li`, `${cardNew.offer.features}`);
//     cloneCardTemplate.querySelector(`.popup__description`).textContent = `${cardNew.offer.description}`;

//     updateFeatures(cloneCardTemplate, cardNew);

//     const containerCardPhotos = cloneCardTemplate.querySelector(`.popup__photos`);

//     const homePhotoCard = window.clonedPhotos.getCreateHome(containerCardPhotos, cardNew.offer.photos);

//     containerCardPhotos.replaceChild(homePhotoCard, containerCardPhotos.querySelector(`.popup__photo`));

//     cloneTemplateElementCard.appendChild(cloneCardTemplate);

//     // Вставляю карточку перед mapFilterContaine
//     window.constants.map.insertBefore(cloneTemplateElementCard, window.constants.mapFilterContainer);
//   };

//   const writeDownAddress = (addressX, addressY) => {
//     window.constants.inputAddress.value = (`${addressX}, ${addressY}`);
//   };

//   writeDownAddress(window.constants.mapPinMain.offsetLeft, window.constants.mapPinMain.offsetTop);

//   window.advertCard = {
//     cloneCreate,
//     writeDownAddress
//   };

// })();

'use strict';

// pin.js
// Функция отрисовки клонированных элементов Pin

(() => {
  const cloneRendering = (pinsClone) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const cloneTemplateElement = document.createDocumentFragment();

    // Проходим по всем объявлениям и создаем пины
    pinsClone.forEach((pinNew, index) => {
      const cloneElement = pinTemplate.cloneNode(true);
      const cloneImg = cloneElement.querySelector(`img`);

      // Устанавливаем позицию пина на карте
      cloneElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);

      // КРИТИЧЕСКИ ВАЖНО: Сохраняем аватар в data-атрибут пина
      // Это решает проблему несоответствия индексов после фильтрации
      cloneElement.dataset.avatar = pinNew.author.avatar;

      // Устанавливаем аватар для отображения на карте
      cloneImg.setAttribute(`src`, pinNew.author.avatar);
      cloneImg.setAttribute(`alt`, `Метка объявления`);

      // Добавляем пин в документ
      cloneTemplateElement.appendChild(cloneElement);
    });

    // Размещаем все пины на карте
    window.constants.mapPins.appendChild(cloneTemplateElement);
  };

  window.pin = {
    cloneRendering
  };

})();


// 'use strict';

// // pin.js
// // Функция отрисовки клонированных элементов Pin

// (() => {
//   const cloneRendering = (pinsClone) => {
//     const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
//     const cloneTemplateElement = document.createDocumentFragment();

//     pinsClone.forEach((pinNew, index) => {
//       const cloneElement = pinTemplate.cloneNode(true);
//       const cloneImg = cloneElement.querySelector(`img`);

//       // Устанавливаем координаты пина
//       cloneElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);

//       // Сохраняем индекс и аватар в data-атрибутах для последующего использования
//       cloneElement.dataset.indexPin = index;
//       cloneElement.dataset.avatar = pinNew.author.avatar; // ← КРИТИЧЕСКИ ВАЖНО: сохраняем аватар

//       // Устанавливаем аватар
//       cloneImg.setAttribute(`src`, pinNew.author.avatar);
//       cloneImg.setAttribute(`alt`, `Метка объявления`);

//       // Проверка загрузки изображения (для отладки)
//       cloneImg.onerror = function() {
//         console.error('Ошибка загрузки аватара на пине:', pinNew.author.avatar);
//       };

//       cloneImg.onload = function() {
//         console.log('Аватар на пине успешно загружен:', pinNew.author.avatar);
//       };

//       cloneTemplateElement.appendChild(cloneElement);
//     });

//     // Добавляем все пины на карту
//     window.constants.mapPins.appendChild(cloneTemplateElement);
//   };

//   window.pin = {
//     cloneRendering
//   };

// })();



// 'use strict';

// // pin.js
// // Функция отрисовки клонированных элементов Pin

// (() => {
//   const cloneRendering = (pinsClone) => {
//     const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
//     const cloneTemplateElement = document.createDocumentFragment();

//     // Очищаем предыдущие пины (кроме главного)
//     window.services.removePreviusPins();

//     pinsClone.forEach((pinNew, index) => {
//       const cloneElement = pinTemplate.cloneNode(true);
//       const cloneImg = cloneElement.querySelector(`img`);

//       cloneElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
//       cloneElement.dataset.indexPin = index; // Корректно присваиваем индекс
//       cloneImg.setAttribute(`src`, `${pinNew.author.avatar}`);
//       cloneImg.setAttribute(`alt`, `${pinNew.offer.title}`);

//       cloneTemplateElement.appendChild(cloneElement);
//     });

//     window.constants.mapPins.appendChild(cloneTemplateElement);
//   };

//   window.pin = {
//     cloneRendering
//   };

// })();

// 'use strict';
// // Код работавший с данными которые приходили с сервера
// // pin.js
// // Функция отрисовки клонированных элементов Pin

// (() => {
//   const cloneRendering = (pinsClone) => {
//     const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
//     const cloneTemplateElement = document.createDocumentFragment();
//     pinsClone.forEach((pinNew, index) => {
//       const cloneElement = pinTemplate.cloneNode(true);
//       const cloneImg = cloneElement.querySelector(`img`);
//       cloneElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
//       cloneElement.dataset.indexPin = index;
//       cloneImg.setAttribute(`src`, `${pinNew.author.avatar}`);
//       cloneTemplateElement.appendChild(cloneElement);
//     });
//     window.constants.mapPins.appendChild(cloneTemplateElement);
//   };

//   window.pin = {
//     cloneRendering
//   };

// })();

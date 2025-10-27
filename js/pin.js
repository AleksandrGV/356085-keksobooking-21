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

//       // Устанавливаем координаты
//       cloneElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
//       cloneElement.dataset.indexPin = index;

//       // ИСПРАВЛЕНИЕ: Проверяем и корректируем путь к аватару
//       let avatarPath = pinNew.author.avatar;

//       // Если путь не начинается с img/avatars/, добавляем префикс
//       if (!avatarPath.includes('img/avatars/')) {
//         avatarPath = `img/avatars/${avatarPath}`;
//       }

//       // Устанавливаем аватар
//       cloneImg.setAttribute(`src`, avatarPath);
//       cloneImg.setAttribute(`alt`, `Метка объявления`);

//       cloneTemplateElement.appendChild(cloneElement);
//     });

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

'use strict';
// Код работавший с данными которые приходили с сервера
// pin.js
// Функция отрисовки клонированных элементов Pin

(() => {
  const cloneRendering = (pinsClone) => {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const cloneTemplateElement = document.createDocumentFragment();
    pinsClone.forEach((pinNew, index) => {
      const cloneElement = pinTemplate.cloneNode(true);
      const cloneImg = cloneElement.querySelector(`img`);
      cloneElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
      cloneElement.dataset.indexPin = index;
      cloneImg.setAttribute(`src`, `${pinNew.author.avatar}`);
      cloneTemplateElement.appendChild(cloneElement);
    });
    window.constants.mapPins.appendChild(cloneTemplateElement);
  };

  window.pin = {
    cloneRendering
  };

})();

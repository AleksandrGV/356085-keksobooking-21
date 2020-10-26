'use strict';

window.main = {
  mockPinsData: window.services.getCreatePins
};


// Вызываю networking

(function () {
  const onError = function (message) {
    console.error(message);
  };

  const onSuccess = function (animals) {
    console.log(animals);
  };

  window.networking.loading(`https://21.javascript.pages.academy/keksobooking/data`, onSuccess, onError);
})();

// pin.js
// Функция отрисовки клонированных элементов Pin

(function () {
  // const renderingPins =
  window.networking.loading(function (pinsClone) {
    const templateElement = document.createDocumentFragment();

    pinsClone.forEach(function (pinNew, index) {
      const clonElement = window.constants.pinTemplate.cloneNode(true);
      const clonImg = window.constants.pinTemplate.querySelector(`img`);
      clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
      clonElement.dataset.indexPin = index;
      clonImg.setAttribute(`src`, `${pinNew.author.avatar}`);
      templateElement.appendChild(clonElement);
    });
    window.constants.mapPins.appendChild(templateElement);
  }, function () {});

  // window.pin = {
  //   renderingPins: renderingPins
  // };
})();

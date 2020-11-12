'use strict';

// pin.js
// Функция отрисовки клонированных элементов Pin

(function () {
  const cloneRenderingPins = function (pinsClone) {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const cloneTemplateElement = document.createDocumentFragment();
    pinsClone.forEach(function (pinNew, index) {
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
    cloneRenderingPins
  };

})();

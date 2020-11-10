'use strict';

// pin.js
// Функция отрисовки клонированных элементов Pin

(function () {
  const clonRenderingPins = function (pinsClone) {
    const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const clonTemplateElement = document.createDocumentFragment();

    pinsClone.forEach(function (pinNew, index) {
      const clonElement = pinTemplate.cloneNode(true);
      const clonImg = clonElement.querySelector(`img`);
      clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
      clonElement.dataset.indexPin = index;
      clonImg.setAttribute(`src`, `${pinNew.author.avatar}`);
      clonTemplateElement.appendChild(clonElement);
    });
    window.constants.mapPins.appendChild(clonTemplateElement);
  };

  window.pin = {
    clonRenderingPins
  };

})();

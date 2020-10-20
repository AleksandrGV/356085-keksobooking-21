'use strict';

// pin.js
// Функция отрисовки клонированных элементов Pin

(function () {
  const renderingPins = function (pinsClone) {
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
  };

  window.pin = {
    renderingPins: renderingPins
  };
})();

'use strict';

window.main = {
  mockPinsData: window.services.getCreatePins
};

// Перетаскивание метки

(function () {
  let onMouseMove;
  let onMouseUp;

  let limitField = {
    top: window.constants.mapPins.offsetTop,
    left: window.constants.mapPins.offsetLeft,
    bottom: window.constants.mapPins.offsetTop + window.constants.mapPins.offsetHeight - window.constants.mapPinMain.offsetHeight,
    right: Number(window.constants.mapPins.offsetLeft + window.constants.mapPins.offsetWidth)
  };

  window.constants.mapPinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {
      window.pageState.unlocksFormFields();
      window.advertCard.writeDownAddress(evt.x, evt.y);
      window.clonedPhotos.activatesRenderingSimilarAds();
    }

    // Находим начальные координаты
    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.constants.mapPinMain.offsetTop - shift.y + `px` >= limitField.top + `px` && window.constants.mapPinMain.offsetTop - shift.y + `px` <= limitField.bottom + `px`) {
        window.constants.mapPinMain.style.top = (window.constants.mapPinMain.offsetTop - shift.y) + `px`;
        console.log(`ВерхНиз`);
      }

      if (window.constants.mapPinMain.offsetLeft - shift.x + `px` >= limitField.left + `px` && window.constants.mapPinMain.offsetLeft - shift.x + `px` <= limitField.right + `px`) {
        window.constants.mapPinMain.style.left = (window.constants.mapPinMain.offsetLeft - shift.x) + `px`;
        console.log(`ЛевоПраво`);
      }
    };

    onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {

        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.constants.mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        window.constants.mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();

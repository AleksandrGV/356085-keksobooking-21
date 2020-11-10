'use strict';

// Перетаскивание метки

(function () {
  let onMouseMove;
  let onMouseUp;

  let limitField = {
    top: window.constants.mapPins.offsetTop,
    left: window.constants.mapPins.offsetLeft,
    bottom: window.constants.mapPins.offsetTop + window.constants.mapPins.offsetHeight - window.constants.mapPinMain.offsetHeight,
    right: window.constants.mapPins.offsetLeft + window.constants.mapPins.offsetWidth - window.constants.mapPinMain.offsetWidth
  };

  const onSuccess = function (data) {
    const activePin = data.slice(0, 5);
    window.pin.clonRenderingPins(activePin);
  };

  window.constants.mapPinMain.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();


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

      if (window.constants.mapPinMain.offsetTop - shift.y >= limitField.top && window.constants.mapPinMain.offsetTop - shift.y <= limitField.bottom) {
        window.constants.mapPinMain.style.top = (window.constants.mapPinMain.offsetTop - shift.y) + `px`;
      }

      if (window.constants.mapPinMain.offsetLeft - shift.x >= limitField.left && window.constants.mapPinMain.offsetLeft - shift.x <= limitField.right) {
        window.constants.mapPinMain.style.left = (window.constants.mapPinMain.offsetLeft - shift.x) + `px`;
      }
    };

    onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (evt.button === 0) {
        window.networking.load(onSuccess, window.services.errorHandler);
        window.pageState.unlocksFormFields();
        window.advertCard.writeDownAddress(evt.x, evt.y);
      }

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

  window.draggingLabel = {
    onSuccess
  };

})();

'use strict';

// Перетаскивание метки

(() => {

  const BoundingFieldHeight = {
    MIN: 130,
    MAX: 630
  };

  const limitField = {
    top: window.constants.mapPins.offsetTop + BoundingFieldHeight.MIN,
    left: window.constants.mapPins.offsetLeft,
    bottom: window.constants.mapPins.offsetTop + BoundingFieldHeight.MAX,
    right: window.constants.mapPins.offsetLeft + window.constants.mapPins.offsetWidth - window.constants.mapPinMain.offsetWidth
  };

  let onMouseMove;
  let onMouseUp;

  const onSuccess = (data) => {
    const activePin = data.slice(window.constants.RangeElements.MIN, window.constants.RangeElements.MAX);
    window.pin.cloneRendering(activePin);
  };

  window.constants.mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    if (evt.button !== window.constants.MOUSE_BUTTON_NUMBER) {
      return;
    }
    // Находим начальные координаты

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (moveEvt.target.closest(`.map__pins`)) {

        const vertical = window.constants.mapPinMain.offsetTop - shift.y;
        const horizontal = window.constants.mapPinMain.offsetLeft - shift.x;

        if (vertical >= limitField.top && vertical <= limitField.bottom) {
          window.constants.mapPinMain.style.top = `${vertical}` + `px`;
        }

        if (horizontal >= limitField.left && horizontal <= limitField.right) {
          window.constants.mapPinMain.style.left = `${horizontal}` + `px`;
        }
        window.advertCard.writeDownAddress(horizontal, vertical);
      } else {
        onMouseUp(evt);
      }
    };

    onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      window.networking.load(onSuccess, window.services.errorHandler);
      window.pageState.unlocksFormFields();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {

        const onClickPreventDefault = (clickEvt) => {
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

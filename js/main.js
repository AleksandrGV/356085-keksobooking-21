'use strict';

window.main = {
  mockPinsData: window.services.getCreatePins
};


// Вызываю networking

(function () {
  const onError = function (message) {
    console.error(message);
  };

  const onSuccess = function (data) {
    // console.log(window.pin.renderingPins(animals));
    window.constants.mapPinMain.addEventListener(`mousedown`, function (evt) {
      // console.log(data);
      if (evt.button === 0) {
        window.pin.renderingPins(data);
        // window.pageState.unlocksFormFields();
        // window.advertCard.writeDownAddress(evt.x, evt.y);
        // window.clonedPhotos.activatesRenderingSimilarAds();
      }
    });
  };

  // window.networking.loading(`https://21.javascript.pages.academy/keksobooking/unknownfile`, onSuccess, onError);

  window.networking.loading(`https://21.javascript.pages.academy/keksobooking/data`, onSuccess, onError);
})();


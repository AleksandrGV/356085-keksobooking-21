'use strict';

// constants.js
// Первыми объявляются константы написанные большими буквами

(() => {

  window.constants = {
    MOUSE_BUTTON_NUMBER: 0,
    DEBOUNCE_INTERVAL: 500,

    MARKER_X_MIN: 40,
    MARKER_X_MAX: 1180,
    MARKER_Y_MIN: 130,
    MARKER_Y_MAX: 630,

    NumberOnKeyboard: {
      ESCAPE: `Escape`,
      ENTER: `Enter`
    },

    RequestMethod: {
      GET: `GET`,
      POST: `POST`
    },

    RequestUrl: {
      URL_LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
      URL_SEND: `https://21.javascript.pages.academy/keksobooking`
    },

    RequestServerDataStatus: {
      OK: 200,
      REQUEST_FAILED: 400,
      USER_AUTHORIZATION_REQUIRED: 401,
      DATA_NOT_FOUND: 404
    },

    mapFilterContainer: document.querySelector(`.map__filters-container`),
    map: document.querySelector(`.map`),
    mapPins: document.querySelector(`.map__pins`),
    adForm: document.querySelector(`.ad-form`),
    adFormFieldsets: document.querySelectorAll(`fieldset`),
    formMapFilters: document.querySelectorAll(`.map__filter`),
    inputAddress: document.querySelector(`#address`),
    mapPinMain: document.querySelector(`.map__pin--main`),

    roomNumber: document.querySelector(`#room_number`),
    capacity: document.querySelector(`#capacity`),
    adFormSubmit: document.querySelector(`.ad-form__submit`),
    validationType: document.querySelector(`#type`),
    validationPrice: document.querySelector(`#price`),
    validationTimeIn: document.querySelector(`#timein`),
    validationTimeOut: document.querySelector(`#timeout`),

    xhrTimeout: 10000,
  };
})();

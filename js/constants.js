'use strict';

// constants.js
// Первыми объявляются константы написанные большими буквами

(function () {

  window.constants = {
    MOCK_BOOKING_DATA: 8,
    OFFER_TITLE: [`Уютная квартира в центре`, `Просторная квартира`,
      `Квартира с красивым видом из окна`, `Квартира с площадкой для детей`,
      `Теплая квартира`, `Квартира в тихом районе города`,
      `Квартира с развитой инфроструктурой`, `Квартира рядом с метро`],
    OFFER_TYPE: [`palace`, `flat`, `house`, `bungalow`],
    OFFER_CHECKIN_CHECKOUT: [`12:00`, `13:00`, `14:00`],
    OFFER_FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
    OFFER_PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],

    MARKER_X_MIN: 40,
    MARKER_X_MAX: 1180,
    MARKER_Y_MIN: 130,
    MARKER_Y_MAX: 630,

    map: document.querySelector(`.map`),
    mapPins: document.querySelector(`.map__pins`),
    adForm: document.querySelector(`.ad-form`),
    adFormFieldset: document.querySelectorAll(`fieldset`),
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
    pinTemplate: document.querySelector(`#pin`).content.querySelector(`.map__pin`),
    cardTemplate: document.querySelector(`#card`).content.querySelector(`.map__card`),

  };

})();

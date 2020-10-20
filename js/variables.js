'use strict';

// variables.js
// Первыми объявляются константы написанные большими буквами

(function () {

  const MOCK_BOOKING_DATA = 8;

  const offerTitle = [`Уютная квартира в центре`, `Просторная квартира`,
    `Квартира с красивым видом из окна`, `Квартира с площадкой для детей`,
    `Теплая квартира`, `Квартира в тихом районе города`,
    `Квартира с развитой инфроструктурой`, `Квартира рядом с метро`];
  const offerType = [`palace`, `flat`, `house`, `bungalow`];
  const offerCheckinCheckout = [`12:00`, `13:00`, `14:00`];
  const offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const offerPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];


  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = document.querySelectorAll(`fieldset`);
  const formMapFilters = document.querySelectorAll(`.map__filter`);
  const inputAddress = document.querySelector(`#address`);
  const mapPinMain = mapPins.querySelector(`.map__pin--main`);
  const roomNumber = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);
  const adFormSubmit = document.querySelector(`.ad-form__submit`);
  const validationType = document.querySelector(`#type`);
  const validationPrice = document.querySelector(`#price`);
  const validationTimeIn = document.querySelector(`#timein`);
  const validationTimeOut = document.querySelector(`#timeout`);

  // Template только для образца их нужно клонировать и взаимодействовать только с клонами

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  window.variables = {
    MOCK_BOOKING_DATA,
    offerTitle,
    offerType,
    offerCheckinCheckout,
    offerFeatures,
    offerPhotos,
    map,
    mapPins,
    adForm,
    adFormFieldset,
    formMapFilters,
    inputAddress,
    mapPinMain,
    roomNumber,
    capacity,
    adFormSubmit,
    validationType,
    validationPrice,
    validationTimeIn,
    validationTimeOut,
    pinTemplate,
    cardTemplate
  };

})();

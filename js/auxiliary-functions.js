'use strict';

// auxiliary-functions.js

(function () {
  // Функция получение случайного целого числа в заданном интервале, включительно
  const getRandomNumbers = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция создания и заполнения массива

  const getCreatePins = function () {
    const arrPins = [];
    for (let i = 0; i < window.MOCK_BOOKING_DATA; i++) {
      arrPins.push(window.getMockBookingData());
    }
    return arrPins;
  };

  // Функция создания массива для фото карточки

  const getRandomPhotos = function () {
    const photos = [];
    for (let i = 0; i < getRandomNumbers(1, 3); i++) {
      photos.push(window.variables.offerPhotos[(getRandomNumbers(0, 2))]);
    }
    return photos;
  };

  window.auxiliaryFunctions = {
    getRandomNumbers: getRandomNumbers(),
    getCreatePins: getCreatePins(),
    getRandomPhotos: getRandomPhotos()
  };
})();



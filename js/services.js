'use strict';

// services.js
// Функция получение случайного целого числа в заданном интервале, включительно
(function () {
  const getRandomNumbers = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция создания массива для фото карточки

  const getRandomPhotos = function () {
    const photos = [];
    for (let i = 0; i < getRandomNumbers(1, 3); i++) {
      photos.push(window.constants.OFFER_PHOTOS[(getRandomNumbers(0, 2))]);
    }
    return photos;
  };

  window.services = {
    getRandomNumbers: getRandomNumbers,
    getRandomPhotos: getRandomPhotos,
  };
})();


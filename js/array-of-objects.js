'use strict';

// auxiliary-functions.js
// Функция получение случайного целого числа в заданном интервале, включительно
(function () {
  const getRandomNumbers = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция создания и заполнения массива

  const getCreatePins = function () {
    const arrPins = [];
    for (let i = 0; i < window.MOCK_BOOKING_DATA; i++) {
      arrPins.push(getMockBookingData());
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

  // array-of-objects.js
  // Функция для создания массива из сгенерированных объектов

  const getMockBookingData = function () {
    const markerX = getRandomNumbers(0, 1400);
    const markerY = getRandomNumbers(130, 630);
    return {
      'author': {
        'avatar': `img/avatars/user0${getRandomNumbers(1, 8)}.png`
      },
      'offer': {
        'title': window.variables.offerTitle[(getRandomNumbers(0, 7))],
        'address': `${markerX}, ${markerY}`,
        'price': getRandomNumbers(500, 15000),
        'type': window.variables.offerType[(getRandomNumbers(0, 3))],
        'rooms': getRandomNumbers(1, 5),
        'quests': getRandomNumbers(1, 5),
        'checkin': window.variables.offerCheckinCheckout[(getRandomNumbers(0, 2))],
        'checkuot': window.variables.offerCheckinCheckout[(getRandomNumbers(0, 2))],
        'features': Array(getRandomNumbers(1, 4)).fill(window.variables.offerFeatures[getRandomNumbers(0, window.variables.offerFeatures.length - 1)]),
        'description': `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                        Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                        Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.`,
        'photos': getRandomPhotos()
      },
      'location': {
        'x': markerX,
        'y': markerY
      }
    };
  };

  window.arrayOfObjects = {
    getRandomNumbers: getRandomNumbers(),
    getCreatePins: getCreatePins(),
    getRandomPhotos: getRandomPhotos(),
    getMockBookingData: getMockBookingData()
  };
})();


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
    for (let i = 0; i < window.constants.MOCK_BOOKING_DATA; i++) {
      arrPins.push(getMockBookingData());
    }
    return arrPins;
  };

  // Функция создания массива для фото карточки

  const getRandomPhotos = function () {
    const photos = [];
    for (let i = 0; i < getRandomNumbers(1, 3); i++) {
      photos.push(window.constants.OFFER_PHOTOS[(getRandomNumbers(0, 2))]);
    }
    return photos;
  };

  // array-of-objects.js
  // Функция для создания массива из сгенерированных объектов

  const getMockBookingData = function () {
    const markerX = getRandomNumbers(40, 1180);
    const markerY = getRandomNumbers(130, 630);
    return {
      'author': {
        'avatar': `img/avatars/user0${getRandomNumbers(1, 8)}.png`
      },
      'offer': {
        'title': window.constants.OFFER_TITLE[(getRandomNumbers(0, 7))],
        'address': `${markerX}, ${markerY}`,
        'price': getRandomNumbers(500, 15000),
        'type': window.constants.OFFER_TYPE[(getRandomNumbers(0, 3))],
        'rooms': getRandomNumbers(1, 5),
        'quests': getRandomNumbers(1, 5),
        'checkin': window.constants.OFFER_CHECKIN_CHECKOUT[(getRandomNumbers(0, 2))],
        'checkuot': window.constants.OFFER_CHECKIN_CHECKOUT[(getRandomNumbers(0, 2))],
        'features': Array(getRandomNumbers(1, 4)).fill(window.constants.OFFER_FEATURES[getRandomNumbers(0, window.constants.OFFER_FEATURES.length - 1)]),
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

  window.services = {
    getRandomNumbers: getRandomNumbers(),
    getCreatePins: getCreatePins(),
    getRandomPhotos: getRandomPhotos(),
    getMockBookingData: getMockBookingData()
  };
})();


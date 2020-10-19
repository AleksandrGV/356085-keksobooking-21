'use strict';

// array-of-objects.js
// Функция для создания массива из сгенерированных объектов
(function () {
  const getMockBookingData = function () {
    const markerX = window.auxiliaryFunctions.getRandomNumbers(0, 1400);
    const markerY = window.auxiliaryFunctions.getRandomNumbers(130, 630);
    return {
      'author': {
        'avatar': `img/avatars/user0${window.auxiliaryFunctions.getRandomNumbers(1, 8)}.png`
      },
      'offer': {
        'title': window.offerTitle[(window.auxiliaryFunctions.getRandomNumbers(0, 7))],
        'address': `${markerX}, ${markerY}`,
        'price': window.auxiliaryFunctions.getRandomNumbers(500, 15000),
        'type': window.offerType[(window.auxiliaryFunctions.getRandomNumbers(0, 3))],
        'rooms': window.auxiliaryFunctions.getRandomNumbers(1, 5),
        'quests': window.auxiliaryFunctions.getRandomNumbers(1, 5),
        'checkin': window.offerCheckinCheckout[(window.auxiliaryFunctions.getRandomNumbers(0, 2))],
        'checkuot': window.offerCheckinCheckout[(window.auxiliaryFunctions.getRandomNumbers(0, 2))],
        'features': Array(window.getRandomNumbers(1, 4)).fill(window.offerFeatures[window.getRandomNumbers(0, window.offerFeatures.length - 1)]),
        'description': `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                        Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                        Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.`,
        'photos': window.auxiliaryFunctions.getRandomPhotos()
      },
      'location': {
        'x': markerX,
        'y': markerY
      }
    };
  };

  window.getMockBookingData = getMockBookingData();
})();


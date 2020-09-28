'use strict';

// 1

const offerTitle = [`Уютная квартира в центре`, `Просторная квартира`, `Квартира с красивым видом ио окна`, `Квартира с площадкой для детей`, `Теплая квартира`, `Квартира в тихом районе города`, `Квартира с развитой инфроструктурой`, `Квартира рядом с метро`];
const offerAddress = [`600`, `350`, `350`, `250`, `150`, `500`, `400`, `300`];
const offerType = [`palace`, `flat`, `house`, `bungalow`];
const offerCheckinCheckout = [`12:00`, `13:00`, `14:00`];
const offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const offerPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const MOCK_BOOKING_DATA = 8;

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const pinTemplate = document.querySelector(`#pin`).
content.querySelector(`.map__pin`);

const mapPins = document.querySelector(`.map__pins`);

const templateElement = document.createDocumentFragment();

const clonImg = pinTemplate.querySelector(`img`);

// Функция получение случайного целого числа в заданном интервале, включительно

const getRandomNumbers = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getMockBookingData = function () {
  return {
    'autor': {
      'avatar': `img/avatars/user ${getRandomNumbers(1, 8)} png`
    },
    'offer': {
      'title': offerTitle[(getRandomNumbers(0, 7))],
      'address': offerAddress[(getRandomNumbers(0, 7))],
      'price': getRandomNumbers(500, 5000),
      'type': offerType[(getRandomNumbers(0, 3))],
      'rooms': getRandomNumbers(0, 5),
      'quests': getRandomNumbers(0, 5),
      'checkin': offerCheckinCheckout[(getRandomNumbers(0, 2))],
      'checkuot': offerCheckinCheckout[(getRandomNumbers(0, 2))],
      'features': Array(getRandomNumbers(1, 4)).fill(offerFeatures[getRandomNumbers(0, offerFeatures.length - 1)]),
      'description': `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.`,
      'photos': Array(getRandomNumbers(1, 4)).fill(offerPhotos[getRandomNumbers(0, offerPhotos.length - 1)])
    },
    'location': {
      'x': getRandomNumbers(0, 1400),
      'y': getRandomNumbers(130, 630)
    }
  };
};

const mockPinsData = Array(MOCK_BOOKING_DATA).fill(getMockBookingData());


mockPinsData.forEach(function (element) {
  const clonElement = pinTemplate.cloneNode(true);
  templateElement.textContent = element;
  for (let i = 0; i < offerTitle.length; i++) {
    clonElement.children[0].textContent = offerTitle[i];
    mapPins.appendChild(clonElement);
    clonElement.setAttribute(`style`, `left: ${offerAddress[getRandomNumbers(0, 7)]}px; top: ${offerAddress[getRandomNumbers(0, 7)]}px`);
    clonImg.setAttribute(`src`, `img/avatars/user0${getRandomNumbers(1, 8)}.png`, `alt`, `${offerTitle[getRandomNumbers(0, 7)]}`);
  }
});


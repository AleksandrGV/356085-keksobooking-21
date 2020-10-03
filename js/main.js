'use strict';

// Первыми объявляются константы написанные большими буквами

const MOCK_BOOKING_DATA = 8;

const offerTitle = [`Уютная квартира в центре`, `Просторная квартира`, `Квартира с красивым видом из окна`, `Квартира с площадкой для детей`, `Теплая квартира`, `Квартира в тихом районе города`, `Квартира с развитой инфроструктурой`, `Квартира рядом с метро`];
// const offerAddress = [`600`, `350`, `350`, `250`, `150`, `500`, `400`, `300`];
const offerType = [`palace`, `flat`, `house`, `bungalow`];
const offerCheckinCheckout = [`12:00`, `13:00`, `14:00`];
const offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const offerPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];


const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

// Функция получение случайного целого числа в заданном интервале, включительно

const getRandomNumbers = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getMockBookingData = function () {
  const markerX = getRandomNumbers(0, 1400);
  const markerY = getRandomNumbers(130, 630);
  return {
    'autor': {
      'avatar': `img/avatars/user0${getRandomNumbers(1, 8)}.png`
    },
    'offer': {
      'title': offerTitle[(getRandomNumbers(0, 7))],
      'address': `${markerX}, ${markerY}`,
      'price': getRandomNumbers(500, 15000),
      'type': offerType[(getRandomNumbers(0, 3))],
      'rooms': getRandomNumbers(0, 5),
      'quests': getRandomNumbers(0, 5),
      'checkin': offerCheckinCheckout[(getRandomNumbers(0, 2))],
      'checkuot': offerCheckinCheckout[(getRandomNumbers(0, 2))],
      'features': Array(getRandomNumbers(1, 4)).fill(offerFeatures[getRandomNumbers(0, offerFeatures.length - 1)]),
      'description': `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                      Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                      Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.`,
      'photos': offerPhotos[(getRandomNumbers(0, 2))]
      // Array(getRandomNumbers(0, 2)).fill(offerPhotos[getRandomNumbers(0, offerPhotos.length - 1)])
    },
    'location': {
      'x': markerX,
      'y': markerY
    }
  };
};

// Функция создания и заполнения массива

const getCreatePins = function () {
  const arrPins = [];
  for (let i = 0; i < MOCK_BOOKING_DATA; i++) {
    arrPins.push(getMockBookingData());
  }
  return arrPins;
};

// Функция отрисовки клонированных элементов

const getRenderingPins = function (pinsClone) {
  const templateElement = document.createDocumentFragment();

  pinsClone.forEach(function (pinNew) {
    const clonElement = pinTemplate.cloneNode(true);
    const clonImg = pinTemplate.querySelector(`img`);
    clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
    clonImg.setAttribute(`src`, `${pinNew.autor.avatar}`);
    templateElement.appendChild(clonElement);
  });
  mapPins.appendChild(templateElement);
};

// Присваиваю константе значения функции создания и заполнения массива

const mockPinsData = getCreatePins();

getRenderingPins(mockPinsData);

map.classList.remove(`map--faded`);

// Функция отрисовки карточки module3-task2

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const createCard = function (cardNew) {
  const templateElementCard = document.createDocumentFragment();

  const mapFilterContainer = document.querySelector(`.map__filter-container`);
  const clonCardTemplate = cardTemplate.cloneNode(true);

  // Короткая запись

  cardTemplate.querySelector(`.popup__title`).textContent = cardNew.offer.title;
  cardTemplate.querySelector(`.popup__text--address`).textContent = `${cardNew.offer.address}`;
  cardTemplate.querySelector(`.popup__text--price`).textContent = `${cardNew.offer.price}₽/ночь`;
  cardTemplate.querySelector(`.popup__type`).textContent = `${cardNew.offer.type}`;
  cardTemplate.querySelector(`.popup__text--capacity`).textContent = (`${cardNew.offer.rooms} комнат(ы) для ${cardNew.offer.quests} гостей`);
  cardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardNew.offer.checkin}, выезд до ${cardNew.offer.checkuot}`;
  cardTemplate.querySelector(`.popup__features`).setAttribute(`li`, `${cardNew.offer.features}`);
  cardTemplate.querySelector(`.popup__description`).textContent = `${cardNew.offer.description}`;
  // cardTemplate.querySelector(`.popup__photos`).setAttribute(`src`, `${cardNew.offer.photos}`);

  templateElementCard.appendChild(clonCardTemplate);

  map.insertBefore(templateElementCard, mapFilterContainer);
};

createCard(mockPinsData[0]);


// Функция клонирования фото
const popupPhotos = cardTemplate.querySelector(`.popup__photos`); // нахожу класс popup__photos
const popupPhoto = cardTemplate.querySelector(`.popup__photo`); // класс popup__photo

const cardPhotos = function () {
  const templateElementCard = document.createDocumentFragment();
  const photosCard = [];
  // photosCard.forEach(function (photoCard) {
  for (let i = 0; i < photosCard.length; i++) {
    const clonePopupPhotos = popupPhoto.cloneNode(); // клонирую класс popup_photo
    clonePopupPhotos.children[0].textContent = photosCard[i];
    clonePopupPhotos.setAttribute(`src`, `${photosCard[i].offer.photos}`); // вствляю в класс popup__photo src и путь к фото
    // popupPhotos.setAttribute(`img`, clonePopupPhotos);
    // console.log(clonePopupPhotos);
    // popupPhotos.appendChild(clonPopupPhotos);
    // console.log(popupPhotos);
    popupPhotos.appendChild(clonePopupPhotos); // добавляю в обертку с классом popup__photos картинку с адресом
  }
  // });
  return templateElementCard.appendChild(popupPhotos);
  // return popupPhotos;
  // console.log(cardTemplate);
};

// console.log(cardPhotos());
cardPhotos(); // вызываю функцию

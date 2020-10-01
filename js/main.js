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
    // const popupTitle = cardTemplate.querySelector(`.popup__title`);
    clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
    clonImg.setAttribute(`src`, `${pinNew.autor.avatar}`);
    // popupTitle.textContent = `${pinNew.offer.title}`;
    templateElement.appendChild(clonElement);
    // console.log(popupTitle);
  });
  mapPins.appendChild(templateElement);
  // map.insertBefore(templateElement, mapFilterContainer);
};

// Присваиваю константе значения функции создания и заполнения массива

const mockPinsData = getCreatePins();

getRenderingPins(mockPinsData);

map.classList.remove(`map--faded`);

// Функция отрисовки карточки module3-task2

// На основе первого по порядку элемента из сгенерированного массива
// и шаблона #card создайте DOM-элемент объявления (карточка объявления), заполните его данными из объекта:

const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const getCreateCard = function (cardNew) {

  const templateElementCard = document.createDocumentFragment();
  // const mapFilterContainer = document.querySelector(`.map__filter-container`);

  // cardNew.forEach(function (cardNew[i]) {
  for (let i = 0; i < cardNew.length; i++) {
    const popupTitle = cardTemplate.querySelector(`.popup__title`);
    const popupTextAddress = cardTemplate.querySelector(`.popup__text--address`);
    const popupTextPrice = cardTemplate.querySelector(`.popup__text--price`);
    const popupType = cardTemplate.querySelector(`.popup__type`);
    const popupTextCapacity = cardTemplate.querySelector(`.popup__text--capacity`);
    const popupTextTime = cardTemplate.querySelector(`.popup__text--time`);
    const popupFeatures = cardTemplate.querySelector(`.popup__features`);
    const popupDescription = cardTemplate.querySelector(`.popup__description`);
    const popupPhotos = cardTemplate.querySelector(`.popup__photo`);
    // const popupAvatar = cardTemplate.querySelector(`.popup__avatar`);

    const clonCard = cardTemplate.cloneNode(true);

    popupTitle.textContent = `${cardNew[i].offer.title}`;
    popupTextAddress.textContent = `${cardNew[i].offer.address}`;
    popupTextPrice.textContent = `${cardNew[i].offer.price}₽/ночь`;
    popupType.textContent = `${cardNew[i].offer.type}`;
    popupTextCapacity.textContent = (`${cardNew[i].offer.rooms} комнат(ы) для ${cardNew[i].offer.quests} гостей`);
    popupTextTime.textContent = `Заезд после ${cardNew[i].offer.checkin}, выезд до ${cardNew[i].offer.checkuot}`;
    popupFeatures.setAttribute(`li`, `${cardNew[i].offer.features}`);
    popupDescription.textContent = `${cardNew[i].offer.description}`;
    popupPhotos.setAttribute(`src`, `${cardNew[i].offer.photos}`);
    templateElementCard.appendChild(clonCard);
    // popupAvatar.textContent = `${cardNew[i].autor.avatar}`;
    // console.log(popupPhotos);
  }
  // });
  map.appendChild(templateElementCard);
  // map.insertBefore(templateElementCard, mapFilterContainer);
};

getCreateCard(mockPinsData);

// console.log(getCreateCard(mockPinsData));

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
                      Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.`,
      'photos': Array(getRandomNumbers(1, 4)).fill(offerPhotos[getRandomNumbers(0, offerPhotos.length - 1)])
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

// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

// const mapFilterContainer = document.querySelector(`.map__filter-container`);
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
  // const parentLink = mapFilterContainer.parentNode;
  cardNew.forEach(function (cards) {
  const popupTitle = cardTemplate.querySelector(`.popup__title`);
  const popupTextPrice = cardTemplate.querySelector(`.popup__text--price`);
  const popupType = cardTemplate.querySelector(`.popup__type`);
  const popupTextCapacity = cardTemplate.querySelector(`.popup__text--capacity`);
  const popupTextTime = cardTemplate.querySelector(`.popup__text--time`);
  const popupFeatures = cardTemplate.querySelector(`.popup__features`);
  const popupDescription = cardTemplate.querySelector(`.popup__description`);
  const popupPhotos = cardTemplate.querySelector(`.popup__photos`);
  const popupAvatar = cardTemplate.querySelector(`.popup__avatar`);

    const clonCard = cardTemplate.cloneNode(true);
    // cardNew = cardTemplate.cloneNode(true);
    popupTitle.textContent = `${cards.offer.title}`;
    popupTextPrice.textContent = `${cards.offer.price}`;
    popupType.textContent = `${cards.offer.type}`;
    popupTextCapacity.textContent = `${cards.offer.capacity}`;
    popupTextTime.textContent = `${cards.offer.time}`;
    popupFeatures.textContent = `${cards.offer.features}`;
    popupDescription.textContent = `${cards.offer.description}`;
    popupPhotos.textContent = `${cards.offer.photos}`;
    popupAvatar.textContent = `${cards.offer.avatar}`;
    templateElementCard.appendChild(clonCard);
    console.log(templateElementCard);
  });
  // map.appendChild(templateElementCard);
  map.appendChild(templateElementCard);
};

getCreateCard(mockPinsData);

// console.log(getCreateCard(mockPinsData));

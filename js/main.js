'use strict';

// Первыми объявляются константы написанные большими буквами

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

// Template только для образца их нужно клонировать и взаимодействовать только с клонами

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

// Функция получение случайного целого числа в заданном интервале, включительно

const getRandomNumbers = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция создания и заполнения массива

const getCreatePins = function () {
  const arrPins = [];
  for (let i = 0; i < MOCK_BOOKING_DATA; i++) {
    arrPins.push(getMockBookingData());
  }
  return arrPins;
};

// Функция создания массива для фото карточки

const getRandomPhotos = function () {
  const photos = [];
  for (let i = 0; i < getRandomNumbers(1, 3); i++) {
    photos.push(offerPhotos[(getRandomNumbers(0, 2))]);
  }
  return photos;
};

// Функция для создания массива из сгенерированных объектов

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
      'rooms': getRandomNumbers(1, 5),
      'quests': getRandomNumbers(1, 5),
      'checkin': offerCheckinCheckout[(getRandomNumbers(0, 2))],
      'checkuot': offerCheckinCheckout[(getRandomNumbers(0, 2))],
      'features': Array(getRandomNumbers(1, 4)).fill(offerFeatures[getRandomNumbers(0, offerFeatures.length - 1)]),
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

// Функция отрисовки клонированных элементов

const renderingPins = function (pinsClone) {
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

renderingPins(mockPinsData);

// Функция отрисовки и клонирования фото

const getCreateHomePhoto = function (containerPhotoCard, photosCard) {
  const fragmentPhotosCard = document.createDocumentFragment();

  photosCard.forEach(function (photoCard) {
    const templatePopupPhoto = containerPhotoCard.querySelector(`.popup__photo`).cloneNode(true);
    templatePopupPhoto.setAttribute(`src`, photoCard);
    fragmentPhotosCard.appendChild(templatePopupPhoto);
  });
  return fragmentPhotosCard;
};

// Функция отрисовки карточки объявления

const createCard = function (cardNew) {

  const templateElementCard = document.createDocumentFragment();

  const mapFilterContainer = document.querySelector(`.map__filters-container`);
  const clonCardTemplate = cardTemplate.cloneNode(true);

  // Короткая запись

  clonCardTemplate.querySelector(`.popup__avatar`).setAttribute(`src`, `${cardNew.autor.avatar}`);
  clonCardTemplate.querySelector(`.popup__title`).textContent = cardNew.offer.title;
  clonCardTemplate.querySelector(`.popup__text--address`).textContent = `${cardNew.offer.address}`;
  clonCardTemplate.querySelector(`.popup__text--price`).textContent = `${cardNew.offer.price}₽/ночь`;
  clonCardTemplate.querySelector(`.popup__type`).textContent = `${cardNew.offer.type}`;
  clonCardTemplate.querySelector(`.popup__text--capacity`).textContent = (`${cardNew.offer.rooms} комнат(ы) для ${cardNew.offer.quests} гостей`);
  clonCardTemplate.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardNew.offer.checkin}, выезд до ${cardNew.offer.checkuot}`;
  clonCardTemplate.querySelector(`.popup__features`).setAttribute(`li`, `${cardNew.offer.features}`);
  clonCardTemplate.querySelector(`.popup__description`).textContent = `${cardNew.offer.description}`;

  const containerCardPhotos = clonCardTemplate.querySelector(`.popup__photos`);

  const homePhotoCard = getCreateHomePhoto(containerCardPhotos, cardNew.offer.photos);

  containerCardPhotos.replaceChild(homePhotoCard, containerCardPhotos.querySelector(`.popup__photo`));

  templateElementCard.appendChild(clonCardTemplate);

  // Вставляю карточку перед mapFilterContaine

  map.insertBefore(templateElementCard, mapFilterContainer);
};


// Функция активации похожих объявлений

const activatesRenderingSimilarAds = function () {
  renderingPins(mockPinsData);
};

activatesRenderingSimilarAds();

// Функция блокировки полей


const blocksForm = function () {
  adFormFieldset.forEach(function (formFieldset) {
    formFieldset.setAttribute(`disabled`, `disabled`);
  });
  formMapFilters.forEach(function (mapFilters) {
    mapFilters.setAttribute(`disabled`, `disabled`);
  });
};

blocksForm();

// Функция разблокировки полей

const unlocksFormFields = function () {
  adFormFieldset.forEach(function (itemFieldset) {
    itemFieldset.disabled = false;
  });
  formMapFilters.forEach(function (itemFilters) {
    itemFilters.disabled = false;
  });
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  createCard(mockPinsData[0]);
};

const writeDownAddress = function (addressX, addressY) {
  inputAddress.value = (`${addressX}, ${addressY}`);
};

// Перевод страницы в активное состояние левой кнопкой мыши

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    unlocksFormFields();
    writeDownAddress(evt.x, evt.y);
  }
});

// Перевод страницы в активный режим с клавиатуры

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    unlocksFormFields();
    writeDownAddress(`${mapPinMain.offsetLeft}, ${mapPinMain.offsetTop}`);
  }
});

// Валидация полей формы

const checksAdTitleConditions = function () {
  if (roomNumber.value > capacity.value) {
    roomNumber.setCustomValidity(`Комнат и спальных мест больше чем гостей`);
  } else if (roomNumber.value < capacity.value) {
    roomNumber.setCustomValidity(`Комнат и спальных мест меньше чем гостей`);
  } else if (roomNumber.valueMissin !== capacity.valueMissin) {
    roomNumber.setCustomValidity(`Укажите одинаковое количество комнат и гостей`);
  } else {
    roomNumber.setCustomValidity(``);
  }
};

// Обработчик событий для проверки валидации комнат и гостей

adFormSubmit.addEventListener(`click`, function () {
  checksAdTitleConditions();
});

// Открытие карточки объявления


const mapPin = mapPins.querySelectorAll(`.map__pin`);
const findIconsMap = function () {
  for (let i = 0; i < mapPin.length; i++) {
    if (mapPin[i] === true && mapPinMain === false) {
      createCard(mockPinsData[0]);
    }
    // const mapsPin = [i];

    // console.log(mapsPin);
  }
};

mapPins.addEventListener(`click`, function () {
  findIconsMap();
});


// Закрытие карточки объявления

const popupClose = cardTemplate.querySelector(`.popup__close`);

popupClose.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  // Не получаетсяя добавить класс
  cardTemplate.classList.add(`hidden`);
  // console.log(cardTemplate);
});

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
    'author': {
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

// Функция отрисовки клонированных элементов Pin

const renderingPins = function (pinsClone) {
  const templateElement = document.createDocumentFragment();

  pinsClone.forEach(function (pinNew, index) {
    const clonElement = pinTemplate.cloneNode(true);
    const clonImg = pinTemplate.querySelector(`img`);
    clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
    clonElement.dataset.indexPin = index;
    clonImg.setAttribute(`src`, `${pinNew.author.avatar}`);
    templateElement.appendChild(clonElement);
  });
  mapPins.appendChild(templateElement);
};

// Открытие карточки через делегирование (всплытие)

const onOpenCard = function (openCard) {
  const popup = map.querySelector(`.popup`);
  const mapPin = openCard.target.closest(`.map__pin`);
  popupClose(popup);
  if (mapPin) {
    const indexPinClone = mapPin.dataset.indexPin;
    if (indexPinClone) {
      createCard(mockPinsData[indexPinClone]);
    }
  }
};

mapPins.addEventListener(`click`, function (evt) {
  onOpenCard(evt);
});

// Временами не стабильно работает

mapPins.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    onOpenCard(evt);
  }
});

// Закрытие карточки объявления

const popupClose = function (popup) {
  if (popup) {
    popup.remove();
  }
};

document.addEventListener(`keydown`, function (evt) {
  const popup = map.querySelector(`.popup`);
  if (evt.key === `Escape`) {
    popupClose(popup);
  }
});

document.addEventListener(`mousedown`, function (evt) {
  const popup = map.querySelector(`.popup`);
  if (evt.button === 0) {
    popupClose(popup);
  }
});

// Присваиваю константе значения функции создания и заполнения массива

const mockPinsData = getCreatePins();

// renderingPins(mockPinsData);

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

// Функция активации похожих объявлений

const activatesRenderingSimilarAds = function () {
  renderingPins(mockPinsData);
};

// Функция отрисовки карточки объявления

const createCard = function (cardNew) {

  const templateElementCard = document.createDocumentFragment();

  const mapFilterContainer = document.querySelector(`.map__filters-container`);
  const clonCardTemplate = cardTemplate.cloneNode(true);

  // Короткая запись

  clonCardTemplate.querySelector(`.popup__avatar`).setAttribute(`src`, `${cardNew.author.avatar}`);
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

const writeDownAddress = function (addressX, addressY) {
  inputAddress.value = (`${addressX}, ${addressY}`);
};

writeDownAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);

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
  inputAddress.setAttribute(`disabled`, `disabled`);
};


// Перевод страницы в активное состояние левой кнопкой мыши

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    unlocksFormFields();
    writeDownAddress(evt.x, evt.y);
    activatesRenderingSimilarAds();
  }
});

// Перевод страницы в активный режим с клавиатуры

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    unlocksFormFields();
    writeDownAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
    activatesRenderingSimilarAds();
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

// Валидация полей карточки

const validationType = document.querySelector(`#type`).option;
const validationPrice = document.querySelector(`#price`);
const validationTimeIn = document.querySelector(`#timein`).option;
const validationTimeOut = document.querySelector(`#timeout`).option;

// Проверка типа жилья с мин. стоимостью

const validationCostTypicalHousing = function () {
  if (validationType.value.bungalow && validationPrice < 0) {
    validationType.setCustomValidity(`Минимальная стоимость аренды бунгало 0, введите 0 или больше.`);
  } else if (validationType.value.flat && validationPrice < 1000) {
    validationType.setCustomValidity(`Минимальная стоимасть аренды квартир 1000 рублей`);
  } else if (validationType.value.house && validationPrice < 5000) {
    validationType.setCustomValidity(`Минимальная стоимость аренды домов 5000 рублей`);
  } else if (validationType.value.palace && validationPrice < 10000) {
    validationType.setCustomValidity(`Минимальная стоимость аренды дворцов 10000 рублей`);
  } else {
    validationType.setCustomValidity(``);
  }
};

// Проверка соответствия времени вьезда и выезда

const comparisonCheckInCheckOutTimes = function () {
  if (validationTimeIn.value > validationTimeOut.value) {
    validationTimeIn.setCustomValidity(`Время заезда не соответствует времени выезда`);
  } else if (validationTimeIn.value < validationTimeOut.value) {
    validationTimeIn.setCustomValidity(`Время заезда не должно быть меньше времени выезда`);
  } else {
    validationTimeIn.setCustomValidity(``);
  }
};

// Обработчик событий для проверки валидации

adFormSubmit.addEventListener(`click`, function () {
  checksAdTitleConditions();
  validationCostTypicalHousing();
  comparisonCheckInCheckOutTimes();
});

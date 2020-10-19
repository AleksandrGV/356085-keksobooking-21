'use strict';

// variables.js
// Первыми объявляются константы написанные большими буквами

// const MOCK_BOOKING_DATA = 8;

// console.log(window.MOCK_BOOKING_DATA);

// const offerTitle = [`Уютная квартира в центре`, `Просторная квартира`,
//   `Квартира с красивым видом из окна`, `Квартира с площадкой для детей`,
//   `Теплая квартира`, `Квартира в тихом районе города`,
//   `Квартира с развитой инфроструктурой`, `Квартира рядом с метро`];
// const offerType = [`palace`, `flat`, `house`, `bungalow`];
// const offerCheckinCheckout = [`12:00`, `13:00`, `14:00`];
// const offerFeatures = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
// const offerPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
//   `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];


// const map = document.querySelector(`.map`);
// const mapPins = document.querySelector(`.map__pins`);
// const adForm = document.querySelector(`.ad-form`);
// const adFormFieldset = document.querySelectorAll(`fieldset`);
// const formMapFilters = document.querySelectorAll(`.map__filter`);
// const inputAddress = document.querySelector(`#address`);
// const mapPinMain = mapPins.querySelector(`.map__pin--main`);

// // Template только для образца их нужно клонировать и взаимодействовать только с клонами

// const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

// auxiliary-functions.js
// Функция получение случайного целого числа в заданном интервале, включительно

// const getRandomNumbers = function (min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// // Функция создания и заполнения массива

// const getCreatePins = function () {
//   const arrPins = [];
//   for (let i = 0; i < window.MOCK_BOOKING_DATA; i++) {
//     arrPins.push(getMockBookingData());
//   }
//   return arrPins;
// };

// // Функция создания массива для фото карточки

// const getRandomPhotos = function () {
//   const photos = [];
//   for (let i = 0; i < getRandomNumbers(1, 3); i++) {
//     photos.push(window.offerPhotos[(getRandomNumbers(0, 2))]);
//   }
//   return photos;
// };

// array-of-objects.js
// Функция для создания массива из сгенерированных объектов

// const getMockBookingData = function () {
//   const markerX = getRandomNumbers(0, 1400);
//   const markerY = getRandomNumbers(130, 630);
//   return {
//     'author': {
//       'avatar': `img/avatars/user0${getRandomNumbers(1, 8)}.png`
//     },
//     'offer': {
//       'title': window.offerTitle[(getRandomNumbers(0, 7))],
//       'address': `${markerX}, ${markerY}`,
//       'price': getRandomNumbers(500, 15000),
//       'type': window.offerType[(getRandomNumbers(0, 3))],
//       'rooms': getRandomNumbers(1, 5),
//       'quests': getRandomNumbers(1, 5),
//       'checkin': window.offerCheckinCheckout[(getRandomNumbers(0, 2))],
//       'checkuot': window.offerCheckinCheckout[(getRandomNumbers(0, 2))],
//       'features': Array(getRandomNumbers(1, 4)).fill(window.offerFeatures[getRandomNumbers(0, window.offerFeatures.length - 1)]),
//       'description': `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
//                       Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
//                       Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн.`,
//       'photos': getRandomPhotos()
//     },
//     'location': {
//       'x': markerX,
//       'y': markerY
//     }
//   };
// };

// // pin.js
// // Функция отрисовки клонированных элементов Pin

// const renderingPins = function (pinsClone) {
//   const templateElement = document.createDocumentFragment();

//   pinsClone.forEach(function (pinNew, index) {
//     const clonElement = window.pinTemplate.cloneNode(true);
//     const clonImg = window.pinTemplate.querySelector(`img`);
//     clonElement.setAttribute(`style`, `left: ${pinNew.location.x}px; top: ${pinNew.location.y}px`);
//     clonElement.dataset.indexPin = index;
//     clonImg.setAttribute(`src`, `${pinNew.author.avatar}`);
//     templateElement.appendChild(clonElement);
//   });
//   window.mapPins.appendChild(templateElement);
// };

// advert-control.js
// Открытие карточки через делегирование (всплытие)

const onOpenCard = function (openCard) {
  const popup = window.map.querySelector(`.popup`);
  const mapPin = openCard.target.closest(`.map__pin`);
  popupClose(popup);
  if (mapPin) {
    const indexPinClone = mapPin.dataset.indexPin;
    if (indexPinClone) {
      createCard(mockPinsData[indexPinClone]);
    }
  }
};

window.mapPins.addEventListener(`click`, function (evt) {
  onOpenCard(evt);
});

// Временами не стабильно работает

window.mapPins.addEventListener(`keydown`, function (evt) {
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
  const popup = window.map.querySelector(`.popup`);
  if (evt.key === `Escape`) {
    popupClose(popup);
  }
});

document.addEventListener(`mousedown`, function (evt) {
  const popup = window.map.querySelector(`.popup`);
  if (evt.button === 0) {
    popupClose(popup);
  }
});

// Присваиваю константе значения функции создания и заполнения массива

const mockPinsData = window.getCreatePins();

// cloned-photos.js
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
  window.renderingPins(mockPinsData);
};

// advert-card.js
// Функция отрисовки карточки объявления

const createCard = function (cardNew) {

  const templateElementCard = document.createDocumentFragment();

  const mapFilterContainer = document.querySelector(`.map__filters-container`);
  const clonCardTemplate = window.cardTemplate.cloneNode(true);

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

  window.map.insertBefore(templateElementCard, mapFilterContainer);
};

const writeDownAddress = function (addressX, addressY) {
  window.inputAddress.value = (`${addressX}, ${addressY}`);
};

writeDownAddress(window.mapPinMain.offsetLeft, window.mapPinMain.offsetTop);

// page-state.js
// Функция блокировки полей

const blocksForm = function () {
  window.adFormFieldset.forEach(function (formFieldset) {
    formFieldset.setAttribute(`disabled`, `disabled`);
  });
  window.formMapFilters.forEach(function (mapFilters) {
    mapFilters.setAttribute(`disabled`, `disabled`);
  });
};

blocksForm();

// Функция разблокировки полей

const unlocksFormFields = function () {
  window.adFormFieldset.forEach(function (itemFieldset) {
    itemFieldset.disabled = false;
  });
  window.formMapFilters.forEach(function (itemFilters) {
    itemFilters.disabled = false;
  });
  window.map.classList.remove(`map--faded`);
  window.adForm.classList.remove(`ad-form--disabled`);
  window.inputAddress.setAttribute(`disabled`, `disabled`);
};


// Перевод страницы в активное состояние левой кнопкой мыши

window.mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    unlocksFormFields();
    writeDownAddress(evt.x, evt.y);
    activatesRenderingSimilarAds();
  }
});

// Перевод страницы в активный режим с клавиатуры

window.mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    unlocksFormFields();
    writeDownAddress(window.mapPinMain.offsetLeft, window.mapPinMain.offsetTop);
    activatesRenderingSimilarAds();
  }
});

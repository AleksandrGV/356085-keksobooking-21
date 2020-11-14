'use strict';

// validation-form.js

const TypeValidation = {
  BUNGALOW: `bungalow`,
  FLAT: `flat`,
  HOUSE: `house`,
  PALACE: `palace`
};

const PriceValidation = {
  MIN_BUNGALOW: 0,
  MIN_FLAT: 1000,
  MIN_HOUSE: 5000,
  MIN_PALACE: 10000
};

// Валидация полей формы

const checksAdTitleConditions = () => {
  if (window.constants.roomNumber.value > window.constants.capacity.value) {
    window.constants.roomNumber.setCustomValidity(`Комнат и спальных мест больше чем гостей`);
  } else if (window.constants.roomNumber.value < window.constants.capacity.value) {
    window.constants.roomNumber.setCustomValidity(`Комнат и спальных мест меньше чем гостей`);
  } else if (window.constants.roomNumber.valueMissin !== window.constants.capacity.valueMissin) {
    window.constants.roomNumber.setCustomValidity(`Укажите одинаковое количество комнат и гостей`);
  } else {
    window.constants.roomNumber.setCustomValidity(``);
  }
};

// Валидация полей карточки
// Проверка типа жилья с мин. стоимостью

const сostTypicalHousing = () => {
  if (window.constants.validationType.value === TypeValidation.BUNGALOW && window.constants.validationPrice.value < PriceValidation.MIN_BUNGALOW) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды бунгало 0 рублей, введите 0 или больше.`);
  } else if (window.constants.validationType.value === TypeValidation.FLAT && window.constants.validationPrice.value < PriceValidation.MIN_FLAT) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды квартир 1000 рублей`);
  } else if (window.constants.validationType.value === TypeValidation.HOUSE && window.constants.validationPrice.value < PriceValidation.MIN_HOUSE) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды домов 5000 рублей`);
  } else if (window.constants.validationType.value === TypeValidation.PALACE && window.constants.validationPrice.value < PriceValidation.MIN_PALACE) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды дворцов 10000 рублей`);
  } else {
    window.constants.validationType.setCustomValidity(``);
  }
};

// Проверка соответствия времени вьезда и выезда

const comparisonCheckInCheckOutTimes = () => {
  if (window.constants.validationTimeIn.value > window.constants.validationTimeOut.value) {
    window.constants.validationTimeIn.setCustomValidity(`Время заезда не соответствует времени выезда`);
  } else if (window.constants.validationTimeIn.value < window.constants.validationTimeOut.value) {
    window.constants.validationTimeIn.setCustomValidity(`Время заезда не должно быть меньше времени выезда`);
  } else {
    window.constants.validationTimeIn.setCustomValidity(``);
  }
};

// Обработчик событий для проверки валидации

window.constants.adFormSubmit.addEventListener(`click`, () => {
  checksAdTitleConditions();
  сostTypicalHousing();
  comparisonCheckInCheckOutTimes();
});

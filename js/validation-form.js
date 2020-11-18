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

const ValidationValue = {
  ZERO: `0`,
  ONE: `1`,
  TWO: `2`,
  THREE: `3`,
  ONE_HUNDRED: `100`
};

// Валидация полей формы

const checksAdTitleConditions = () => {
  if (window.constants.roomNumber.value === ValidationValue.ONE_HUNDRED && window.constants.capacity.value !== ValidationValue.ZERO) {
    window.constants.capacity.setCustomValidity(`Комнаты не для гостей`);
  } else if (window.constants.roomNumber.value === ValidationValue.THREE && window.constants.capacity.value === ValidationValue.ZERO) {
    window.constants.capacity.setCustomValidity(`В комнатах можно разместить 1, 2 или 3 гостей`);
  } else if (window.constants.roomNumber.value === ValidationValue.TWO && (window.constants.capacity.value === ValidationValue.ZERO || window.constants.capacity.value === ValidationValue.THREE)) {
    window.constants.capacity.setCustomValidity(`В 2 комнатах можно разместить 1 или 2 гостей`);
  } else if (window.constants.roomNumber.value === ValidationValue.ONE && window.constants.capacity.value !== ValidationValue.ONE) {
    window.constants.capacity.setCustomValidity(`Одна комната только для одного гостя`);
  } else {
    window.constants.capacity.setCustomValidity(``);
  }
};

// Валидация полей карточки
// Проверка типа жилья с мин. стоимостью

const сostTypicalHousing = () => {
  if (window.constants.validationType.value === TypeValidation.BUNGALOW && !window.constants.validationPrice.value > PriceValidation.MIN_BUNGALOW) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды бунгало 0 рублей, введите 0 или больше.`);
    window.constants.validationPrice.placeholder = PriceValidation.MIN_BUNGALOW;
  } else if (window.constants.validationType.value === TypeValidation.FLAT && window.constants.validationPrice.value < PriceValidation.MIN_FLAT) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды квартир 1000 рублей`);
    window.constants.validationPrice.placeholder = PriceValidation.MIN_FLAT;
  } else if (window.constants.validationType.value === TypeValidation.HOUSE && window.constants.validationPrice.value < PriceValidation.MIN_HOUSE) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды домов 5000 рублей`);
    window.constants.validationPrice.placeholder = PriceValidation.MIN_HOUSE;
  } else if (window.constants.validationType.value === TypeValidation.PALACE && window.constants.validationPrice.value < PriceValidation.MIN_PALACE) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды дворцов 10000 рублей`);
    window.constants.validationPrice.placeholder = PriceValidation.MIN_PALACE;
  } else if (!window.constants.validationType.value) {
    window.constants.validationPrice.placeholder = PriceValidation.MIN_HOUSE;
  } else {
    window.constants.validationType.setCustomValidity(``);
  }
};

window.constants.validationType.addEventListener(`click`, () => {
  сostTypicalHousing();
});

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

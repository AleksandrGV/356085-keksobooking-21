'use strict';

// validation-form.js
// Валидация полей формы

const checksAdTitleConditions = function () {
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

const validationCostTypicalHousing = function () {
  if (window.constants.validationType.value === `bungalow` && window.constants.validationPrice.value < 0) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды бунгало 0 рублей, введите 0 или больше.`);
  } else if (window.constants.validationType.value === `flat` && window.constants.validationPrice.value < 1000) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды квартир 1000 рублей`);
  } else if (window.constants.validationType.value === `house` && window.constants.validationPrice.value < 5000) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды домов 5000 рублей`);
  } else if (window.constants.validationType.value === `palace` && window.constants.validationPrice.value < 10000) {
    window.constants.validationType.setCustomValidity(`Минимальная стоимость аренды дворцов 10000 рублей`);
  } else {
    window.constants.validationType.setCustomValidity(``);
  }
};

// Проверка соответствия времени вьезда и выезда

const comparisonCheckInCheckOutTimes = function () {
  if (window.constants.validationTimeIn.value > window.constants.validationTimeOut.value) {
    window.constants.validationTimeIn.setCustomValidity(`Время заезда не соответствует времени выезда`);
  } else if (window.constants.validationTimeIn.value < window.constants.validationTimeOut.value) {
    window.constants.validationTimeIn.setCustomValidity(`Время заезда не должно быть меньше времени выезда`);
  } else {
    window.constants.validationTimeIn.setCustomValidity(``);
  }
};

// Обработчик событий для проверки валидации

window.constants.adFormSubmit.addEventListener(`click`, function () {
  checksAdTitleConditions();
  validationCostTypicalHousing();
  comparisonCheckInCheckOutTimes();
});

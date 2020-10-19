'use strict';

// validation-form.js
// Валидация полей формы

const checksAdTitleConditions = function () {
  if (window.roomNumber.value > window.capacity.value) {
    window.roomNumber.setCustomValidity(`Комнат и спальных мест больше чем гостей`);
  } else if (window.roomNumber.value < window.capacity.value) {
    window.roomNumber.setCustomValidity(`Комнат и спальных мест меньше чем гостей`);
  } else if (window.roomNumber.valueMissin !== window.capacity.valueMissin) {
    window.roomNumber.setCustomValidity(`Укажите одинаковое количество комнат и гостей`);
  } else {
    window.roomNumber.setCustomValidity(``);
  }
};

// Валидация полей карточки
// Проверка типа жилья с мин. стоимостью

const validationCostTypicalHousing = function () {
  if (window.variables.validationType.value === `bungalow` && window.variables.validationPrice.value < 0) {
    window.variables.validationType.setCustomValidity(`Минимальная стоимость аренды бунгало 0 рублей, введите 0 или больше.`);
  } else if (window.variables.validationType.value === `flat` && window.variables.validationPrice.value < 1000) {
    window.variables.validationType.setCustomValidity(`Минимальная стоимость аренды квартир 1000 рублей`);
  } else if (window.variables.validationType.value === `house` && window.variables.validationPrice.value < 5000) {
    window.variables.validationType.setCustomValidity(`Минимальная стоимость аренды домов 5000 рублей`);
  } else if (window.variables.validationType.value === `palace` && window.variables.validationPrice.value < 10000) {
    window.variables.validationType.setCustomValidity(`Минимальная стоимость аренды дворцов 10000 рублей`);
  } else {
    window.variables.validationType.setCustomValidity(``);
  }
};

// Проверка соответствия времени вьезда и выезда

const comparisonCheckInCheckOutTimes = function () {
  if (window.variables.validationTimeIn.value > window.variables.validationTimeOut.value) {
    window.variables.validationTimeIn.setCustomValidity(`Время заезда не соответствует времени выезда`);
  } else if (window.variables.validationTimeIn.value < window.variables.validationTimeOut.value) {
    window.variables.validationTimeIn.setCustomValidity(`Время заезда не должно быть меньше времени выезда`);
  } else {
    window.variables.validationTimeIn.setCustomValidity(``);
  }
};

// Обработчик событий для проверки валидации

window.variables.adFormSubmit.addEventListener(`click`, function () {
  checksAdTitleConditions();
  validationCostTypicalHousing();
  comparisonCheckInCheckOutTimes();
});

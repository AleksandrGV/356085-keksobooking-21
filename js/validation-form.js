'use strict';

// validation-form.js

const PriceValidation = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

const ValidationValue = {
  ZERO: `0`,
  ONE: `1`,
  TWO: `2`,
  THREE: `3`,
  ONE_HUNDRED: `100`
};

const FieldElements = {
  ROOM_NUMBER: window.constants.adForm.querySelector(`#room_number`),
  CAPACITY: window.constants.adForm.querySelector(`#capacity`),
  HOUSE_TYPE: window.constants.adForm.querySelector(`#type`),
  PRICE: window.constants.adForm.querySelector(`#price`),
  TIME_IN: window.constants.adForm.querySelector(`#timein`),
  TIME_OUT: window.constants.adForm.querySelector(`#timeout`),
};

const checkValidityForm = () => {
  return Object.values(FieldElements).every((field) => {
    const isValid = field.checkValidity();
    field.style.boxShadow = isValid ? ` ` : `0 0 20px red`;
    return isValid;
  });
};

// Валидация по типу жилья и цены

const validateHousingType = () => {

  FieldElements.PRICE.placeholder = PriceValidation[FieldElements.HOUSE_TYPE.value.toUpperCase()];
  FieldElements.PRICE.setAttribute(`min`, PriceValidation[FieldElements.HOUSE_TYPE.value.toUpperCase()]);

  if (!FieldElements.HOUSE_TYPE.value) {
    FieldElements.PRICE.placeholder = PriceValidation.FLAT;
  }
};

// Фильтрация комнат и гостей

const checksAdTitleConditions = () => {
  if (FieldElements.ROOM_NUMBER.value === ValidationValue.ONE_HUNDRED && FieldElements.CAPACITY.value !== ValidationValue.ZERO) {
    FieldElements.CAPACITY.setCustomValidity(`Комнаты не для гостей`);
  } else if (FieldElements.ROOM_NUMBER.value === ValidationValue.THREE && FieldElements.CAPACITY.value === ValidationValue.ZERO) {
    FieldElements.CAPACITY.setCustomValidity(`В комнатах можно разместить 1, 2 или 3 гостей`);
  } else if (FieldElements.ROOM_NUMBER.value === ValidationValue.TWO && (FieldElements.CAPACITY.value === ValidationValue.ZERO || FieldElements.CAPACITY.value === ValidationValue.THREE)) {
    FieldElements.CAPACITY.setCustomValidity(`В 2 комнатах можно разместить 1 или 2 гостей`);
  } else if (FieldElements.ROOM_NUMBER.value === ValidationValue.ONE && FieldElements.CAPACITY.value !== ValidationValue.ONE) {
    FieldElements.CAPACITY.setCustomValidity(`Одна комната только для одного гостя`);
  } else {
    FieldElements.CAPACITY.setCustomValidity(``);
  }
};

// Проверка соответствия времени вьезда и выезда

const comparisonCheckInCheckOutTimes = () => {
  if (FieldElements.TIME_IN.value > FieldElements.TIME_OUT.value) {
    FieldElements.TIME_IN.setCustomValidity(`Время заезда не соответствует времени выезда`);
  } else if (FieldElements.TIME_IN.value < FieldElements.TIME_OUT.value) {
    FieldElements.TIME_IN.setCustomValidity(`Время заезда не должно быть меньше времени выезда`);
  } else {
    FieldElements.TIME_IN.setCustomValidity(``);
  }
};

// Обработчик событий для проверки валидации

window.constants.adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();

  validateHousingType();
  checksAdTitleConditions();
  comparisonCheckInCheckOutTimes();

  if (checkValidityForm()) {
    const data = new FormData(evt.target);

    window.networking.send(data, window.message.onSuccess, window.message.onError);
  }

});

[FieldElements.HOUSE_TYPE, FieldElements.PRICE].forEach((field) => {
  field.addEventListener(`input`, validateHousingType);
});

[FieldElements.TIME_IN, FieldElements.TIME_OUT].forEach((field) => {
  field.addEventListener(`change`, comparisonCheckInCheckOutTimes);
});
FieldElements.CAPACITY.addEventListener(`change`, checksAdTitleConditions);

FieldElements.ROOM_NUMBER.addEventListener(`change`, checksAdTitleConditions);

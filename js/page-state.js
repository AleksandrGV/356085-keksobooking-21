'use strict';

// page-state.js
// Функция блокировки полей

const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const adFormFieldset = document.querySelectorAll(`fieldset`);
const formMapFilters = document.querySelectorAll(`.map__filter`);
const inputAddress = document.querySelector(`#address`);
const mapPinMain = document.querySelector(`.map__pin--main`);
// const mapPinMain = mapPins.querySelector(`.map__pin--main`);

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

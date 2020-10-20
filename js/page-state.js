'use strict';

// page-state.js
// Функция блокировки полей

(function () {
  const blocksForm = function () {
    window.variables.adFormFieldset.forEach(function (formFieldset) {
      formFieldset.setAttribute(`disabled`, `disabled`);
    });
    window.variables.formMapFilters.forEach(function (mapFilters) {
      mapFilters.setAttribute(`disabled`, `disabled`);
    });
  };

  blocksForm();

  // Функция разблокировки полей

  const unlocksFormFields = function () {
    window.variables.adFormFieldset.forEach(function (itemFieldset) {
      itemFieldset.disabled = false;
    });
    window.variables.formMapFilters.forEach(function (itemFilters) {
      itemFilters.disabled = false;
    });
    window.variables.map.classList.remove(`map--faded`);
    window.variables.adForm.classList.remove(`ad-form--disabled`);
    window.variables.inputAddress.setAttribute(`disabled`, `disabled`);
  };


  // Перевод страницы в активное состояние левой кнопкой мыши

  window.variables.mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      unlocksFormFields();
      window.advertCard.writeDownAddress(evt.x, evt.y);
      window.advertCard.activatesRenderingSimilarAds();
    }
  });

  // Перевод страницы в активный режим с клавиатуры

  window.variables.mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      unlocksFormFields();
      window.advertCard.writeDownAddress(window.mapPinMain.offsetLeft, window.mapPinMain.offsetTop);
      window.advertCard.activatesRenderingSimilarAds();
    }
  });

  window.pageState = {
    blocksForm: blocksForm(),
    unlocksFormFields: unlocksFormFields(),
  };
})();

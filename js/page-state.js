'use strict';

// page-state.js
// Функция блокировки полей

(function () {
  const blocksForm = function () {
    window.constants.adFormFieldset.forEach(function (formFieldset) {
      formFieldset.setAttribute(`disabled`, `disabled`);
    });
    window.constants.formMapFilters.forEach(function (mapFilters) {
      mapFilters.setAttribute(`disabled`, `disabled`);
    });
  };

  // Функция разблокировки полей

  const unlocksFormFields = function () {
    window.constants.adFormFieldset.forEach(function (itemFieldset) {
      itemFieldset.disabled = false;
    });
    window.constants.formMapFilters.forEach(function (itemFilters) {
      itemFilters.disabled = false;
    });
    window.constants.map.classList.remove(`map--faded`);
    window.constants.adForm.classList.remove(`ad-form--disabled`);
    window.constants.inputAddress.setAttribute(`disabled`, `disabled`);
  };

  // Перевод страницы в активный режим с клавиатуры

  window.constants.mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      unlocksFormFields();
      window.clonedPhotos.activatesRenderingSimilarAds();
    }
  });

  window.pageState = {
    blocksForm: blocksForm,
    unlocksFormFields: unlocksFormFields,
  };
})();

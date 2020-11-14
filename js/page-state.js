'use strict';

// page-state.js
// Функция блокировки полей

(() => {
  const blocksForm = () => {
    window.constants.adFormFieldsets.forEach((formFieldset) => {
      formFieldset.setAttribute(`disabled`, `disabled`);
    });
    window.constants.formMapFilters.forEach((mapFilters) => {
      mapFilters.setAttribute(`disabled`, `disabled`);
    });
  };

  // Функция разблокировки полей
  const unlocksFormFields = () => {
    window.constants.adFormFieldsets.forEach((itemFieldset) => {
      itemFieldset.disabled = false;
    });
    window.constants.formMapFilters.forEach((itemFilters) => {
      itemFilters.disabled = false;
    });
    window.constants.map.classList.remove(`map--faded`);
    window.constants.adForm.classList.remove(`ad-form--disabled`);
    window.constants.inputAddress.setAttribute(`disabled`, `disabled`);
  };

  // Перевод страницы в активный режим с клавиатуры
  window.constants.mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === window.constants.NumberOnKeyboard.ENTER) {
      window.networking.load(window.draggingLabel.onSuccess, window.services.errorHandler);
      unlocksFormFields();
    }
  });

  window.pageState = {
    blocksForm,
    unlocksFormFields
  };

  blocksForm();
})();

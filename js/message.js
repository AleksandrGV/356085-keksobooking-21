"use strict";

(() => {

  // Скрыть окно загрузки

  const closePopup = (evt) => {
    evt.preventDefault();

    if (evt.key === `Escape` || evt.button === window.constants.MOUSE_BUTTON_NUMBER) {
      const successPopup = window.constants.map.querySelector(`.success`);
      const errorPopup = window.constants.map.querySelector(`.error`);

      if (successPopup) {
        successPopup.remove();
      } else if (errorPopup) {
        errorPopup.remove();
      }

      document.removeEventListener(`keydown`, closePopup);
      document.removeEventListener(`click`, closePopup);

    }
  };

  // Сообщение об успешной отправке

  const onSuccess = () => {
    const cloneTemplateSuccess = document.createDocumentFragment();
    const successTemplate = document.querySelector(`#success`)
    .content
    .cloneNode(true);

    cloneTemplateSuccess.appendChild(successTemplate);

    window.constants.map.insertBefore(cloneTemplateSuccess, window.constants.mapFilterContainer);

    document.addEventListener(`keydown`, closePopup);
    document.addEventListener(`click`, closePopup);

    window.reset.formClear();

  };

  // Сообщение с ошибкой отправки

  const onError = () => {
    const cloneTemplateError = document.createDocumentFragment();
    const errorTemplate = document.querySelector(`#error`)
    .content
    .cloneNode(true);

    cloneTemplateError.appendChild(errorTemplate);

    window.constants.map.insertBefore(cloneTemplateError, window.constants.mapFilterContainer);

    document.addEventListener(`keydown`, closePopup);
    document.addEventListener(`click`, closePopup);

    window.reset.formClear();
  };

  window.message = {
    onSuccess,
    onError
  };
})();


'use strict';

(() => {

  window.serverDatasets = [];

  // Получение данных с сервера

  const request = (method, url, onSuccess, onError, data = null) => {

    if (window.serverDatasets.length && document.querySelector(`.map--faded`)) {
      onSuccess(window.serverDatasets);
    }

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {

      let error;

      switch (xhr.status) {
        case window.constants.RequestServerDataStatus.OK:
          window.serverDatasets = xhr.response;
          onSuccess(xhr.response);
          break;

        case window.constants.RequestServerDataStatus.REQUEST_FAILED:
          error = `Ошибка запроса`;
          break;
        case window.constants.RequestServerDataStatus.USER_AUTHORIZATION_REQUIRED:
          error = `Необходима авторизация пользователя`;
          break;
        case window.constants.RequestServerDataStatus.DATA_NOT_FOUND:
          error = `Данные не найдены`;
          break;

        default:
          error = `Статус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка соединения, проверьте подключение к сети!`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Длительное выполнение запроса ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = window.constants.XHR_TIMEOUT;

    xhr.open(method, url);

    xhr.send(data);
  };

  const load = (onSuccess, onError) => {
    request(window.constants.RequestMethod.GET, window.constants.RequestUrl.URL_LOAD, onSuccess, onError);
  };

  const send = (data, onSuccess, onError) => {
    request(window.constants.RequestMethod.POST, window.constants.RequestUrl.URL_SEND, onSuccess, onError, data);
  };

  window.networking = {
    request,
    load,
    send
  };

})();

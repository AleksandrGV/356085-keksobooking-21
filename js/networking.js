'use strict';

(function () {

  window.serverDataset = [];

  // Получение данных с сервера

  const request = function (method, url, onSuccess, onError) {

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {

      let error;

      switch (xhr.status) {
        case window.constants.REQUEST_SERVER_DATA_STATUS.OK:
          window.serverDataset = xhr.response;
          onSuccess(xhr.response);
          break;

        case window.constants.REQUEST_SERVER_DATA_STATUS.REQUEST_FAILED:
          error = `Ошибка запроса`;
          break;
        case window.constants.REQUEST_SERVER_DATA_STATUS.USER_AUTHORIZATION_REQUIRED:
          error = `Необходима авторизация пользователя`;
          break;
        case window.constants.REQUEST_SERVER_DATA_STATUS.DATA_NOT_FOUND:
          error = `Данные не найдены`;
          break;

        default:
          error = `Статус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Ошибка соединения, проверьте подключение к сети!`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Длительное выполнение запроса ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = window.constants.xhrTimeout;

    xhr.open(method, url);

    xhr.send();
  };

  const load = function (onSuccess, onError) {
    request(window.constants.REQUEST_METHOD.GET, window.constants.REQUEST_URL.URL_LOAD, onSuccess, onError);
  };

  const send = function (onSuccess, onError) {
    request(window.constants.REQUEST_METHOD.POST, window.constants.REQUEST_URL.URL_SEND, onSuccess, onError);
  };

  function LoadSendArgumentFirst(argument) {
    return argument;
  }

  function LoadSendArgumentSecond(argument) {
    throw new Error(argument);
  }

  load(LoadSendArgumentFirst, LoadSendArgumentSecond);

  window.networking = {
    load: load,
    send: send,
  };

})();

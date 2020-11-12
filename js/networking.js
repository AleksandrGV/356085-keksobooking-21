'use strict';

(function () {

  window.serverDatasets = [];

  // Получение данных с сервера

  const request = function (method, url, onSuccess, onError) {

    // Проверка если данные с сервера получены выходим из функции

    if (window.serverDatasets.length) {
      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {

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
    request(window.constants.RequestMethod.GET, window.constants.RequestUrl.URL_LOAD, onSuccess, onError);
  };

  const send = function (onSuccess, onError) {
    request(window.constants.RequestMethod.POST, window.constants.RequestUrl.URL_SEND, onSuccess, onError);
  };

  window.networking = {
    request,
    load,
    send
  };

})();

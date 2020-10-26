'use strict';

(function () {

  // Получение данных с сервера
  const loading = function (url, onSuccess, onError) {

    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {

      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = `Ошибка запроса`;
          break;
        case 401:
          error = `Необходима авторизация пользователя`;
          break;
        case 404:
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

    xhr.timeout = 10000;

    xhr.open(`GET`, url);

    xhr.send();
  };

  window.networking = {
    loading: loading
  };
})();

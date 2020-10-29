'use strict';

window.main = {
  mockPinsData: window.services.getCreatePins,
};


// Вывод сообщения с ошибкой

const errorHandler = function (errorMessage) {
  let blockNode = document.createElement(`div`);
  blockNode.style = `display: flex; align-items: center; justify-content: center; min-height: 100px; z-index: 100; background-color: red; color: white`;
  blockNode.style.position = `absolute`;
  blockNode.style.left = 0;
  blockNode.style.right = 0;
  blockNode.style.fontSize = `34px`;

  blockNode.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, blockNode);
};

window.networking.load(window.networking.request, errorHandler);

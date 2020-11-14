'use strict';

// services.js
// Функция получение случайного целого числа в заданном интервале, включительно

(() => {
  const getRandomNumbers = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Вывод сообщения с ошибкой
  const errorHandler = (errorMessage) => {
    let blockNode = document.createElement(`div`);
    blockNode.style = `display: flex; align-items: center; justify-content: center; min-height: 100px; z-index: 100; background-color: red; color: white`;
    blockNode.style.position = `absolute`;
    blockNode.style.left = 0;
    blockNode.style.right = 0;
    blockNode.style.fontSize = `34px`;

    blockNode.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, blockNode);
  };

  const removePreviusPins = () => {
    const previusPins = window.constants.mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    for (const prevPin of previusPins) {
      prevPin.remove();
    }
  };

  window.services = {
    getRandomNumbers,
    removePreviusPins,
    errorHandler
  };
})();


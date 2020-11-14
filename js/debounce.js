'use strict';

(() => {

  window.debounce = function (cb) {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

})();

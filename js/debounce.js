'use strict';

(() => {

  window.debounce = (cb) => {
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

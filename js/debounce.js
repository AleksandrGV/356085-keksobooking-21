'use strict';

(function () {

  window.debounce = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

})();

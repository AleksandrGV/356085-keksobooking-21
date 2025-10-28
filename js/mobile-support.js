'use strict';

// mobile-support.js - поддержка мобильных устройств и сенсорных экранов
(() => {

  // Проверка на мобильное устройство
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  };

  // Проверка на сенсорный экран
  const isTouchDevice = () => {
    return `ontouchstart` in window ||
           navigator.maxTouchPoints > 0 ||
           navigator.msMaxTouchPoints > 0;
  };

  // Адаптация обработчиков для пинов (тап вместо клика)
  const setupTouchPins = () => {
    const mapPins = window.constants.mapPins;

    if (isTouchDevice()) {
      // Убираем hover эффекты на мобильных
      document.documentElement.classList.add(`touch-device`);

      // Добавляем touch события для пинов
      mapPins.addEventListener(`touchstart`, onTouchStart, {passive: true});
      mapPins.addEventListener(`touchend`, onTouchEnd, {passive: true});

      // console.log(`Touch events настроены для пинов`);
    }
  };

  // Обработчик начала касания
  const onTouchStart = (evt) => {
    const pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    if (pin) {
      // Добавляем визуальную обратную связь
      pin.classList.add(`map__pin--touched`);
    }
  };

  // Обработчик окончания касания
  const onTouchEnd = (evt) => {
    const pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);

    // Убираем визуальную обратную связь
    document.querySelectorAll(`.map__pin--touched`).forEach((touchedPin) => {
      touchedPin.classList.remove(`map__pin--touched`);
    });

    if (pin) {
      // Предотвращаем двойное срабатывание (click + touch)
      evt.preventDefault();

      // Эмулируем клик для открытия карточки
      setTimeout(() => {
        if (window.advertControl && typeof window.advertControl.onOpenCard === `function`) {
          window.advertControl.onOpenCard({target: pin});
        }
      }, 50);
    }
  };

  // Адаптация главного пина для touch
  const setupMainPinTouch = () => {
    const mainPin = document.querySelector(`.map__pin--main`);

    if (mainPin && isTouchDevice()) {
      mainPin.addEventListener(`touchstart`, onMainPinTouchStart, {passive: true});
      mainPin.addEventListener(`touchmove`, onMainPinTouchMove, {passive: false});
      mainPin.addEventListener(`touchend`, onMainPinTouchEnd, {passive: true});
    }
  };

  // Убираем неиспользуемые переменные deltaX и deltaY
  const onMainPinTouchStart = (evt) => {
    // Добавляем визуальную обратную связь
    evt.currentTarget.classList.add(`map__pin--dragging`);
  };

  const onMainPinTouchMove = (evt) => {
    evt.preventDefault(); // Предотвращаем скролл страницы

    const touch = evt.touches[0];

    // Обновляем позицию пина через существующие функции
    if (window.mainPin && typeof window.mainPin.onMouseMove === `function`) {
      // Создаем искусственное mouse событие для совместимости
      const moveEvent = new MouseEvent(`mousemove`, {
        clientX: touch.clientX,
        clientY: touch.clientY,
        bubbles: true
      });
      window.mainPin.onMouseMove(moveEvent);
    } else if (window.networking && typeof window.networking.updateOffersByPinPosition === `function`) {
      // Альтернативный способ: обновляем позицию напрямую
      const mainPin = evt.currentTarget;
      const mainPinX = parseInt(mainPin.style.left, 10) || 0;
      const mainPinY = parseInt(mainPin.style.top, 10) || 0;

      window.networking.updateOffersByPinPosition(mainPinX, mainPinY, (filteredOffers) => {
        if (window.pins && typeof window.pins.update === `function`) {
          window.pins.update(filteredOffers);
        }
      });
    }
  };

  const onMainPinTouchEnd = (evt) => {
    evt.currentTarget.classList.remove(`map__pin--dragging`);

    // Активируем карту если она не активна
    if (window.mainPin && typeof window.mainPin.onMouseUp === `function`) {
      // Создаем искусственное mouse событие
      const mouseUpEvent = new MouseEvent(`mouseup`, {
        bubbles: true
      });
      window.mainPin.onMouseUp(mouseUpEvent);
    }
  };

  // Адаптация карточек для мобильных
  const setupMobileCards = () => {
    if (!isMobileDevice()) {
      return;
    }
    // Добавляем класс для мобильных стилей
    document.documentElement.classList.add(`mobile-device`);

    // Увеличиваем тап-зоны для маленьких элементов
    const smallElements = document.querySelectorAll(`.popup__close, .feature__image`);
    smallElements.forEach((element) => {
      element.style.minWidth = `44px`;
      element.style.minHeight = `44px`;
    });

    // Добавляем обработчик для закрытия карточки по тапу вне её области
    document.addEventListener(`touchstart`, (evt) => {
      const popup = document.querySelector(`.popup`);
      const closeBtn = document.querySelector(`.popup__close`);

      if (popup && !popup.contains(evt.target) && evt.target !== closeBtn) {
        if (window.advertControl && typeof window.advertControl.closeCard === `function`) {
          window.advertControl.closeCard();
        }
      }
    }, {passive: true});
  };

  // Оптимизация для медленных соединений
  const optimizeForMobile = () => {
    if (!isMobileDevice()) {
      return;
    }
    // Ленивая загрузка изображений
    const images = document.querySelectorAll(`img[data-src]`);

    if (`IntersectionObserver` in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute(`data-src`);
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback для браузеров без IntersectionObserver
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute(`data-src`);
      });
    }
  };

  // Предотвращение масштабирования при дабл-тапе
  const preventDoubleTapZoom = () => {
    if (!isMobileDevice()) {
      return;
    }
    let lastTouchEnd = 0;
    document.addEventListener(`touchend`, (evt) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        evt.preventDefault();
      }
      lastTouchEnd = now;
    }, {passive: false});
  };

  // Улучшение скролла на мобильных
  const improveMobileScroll = () => {
    if (!isMobileDevice()) {
      return;
    }
    // Добавляем CSS класс для улучшения скролла
    const style = document.createElement(`style`);
    style.textContent = `
      .mobile-device .popup {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
      }
    `;
    document.head.appendChild(style);
  };

  // Инициализация всех мобильных функций
  const initMobileSupport = () => {
    if (isTouchDevice()) {
      // console.log(`Инициализация поддержки сенсорных устройств`);

      setupTouchPins();
      setupMainPinTouch();
      setupMobileCards();
      optimizeForMobile();
      preventDoubleTapZoom();
      improveMobileScroll();

      // Добавляем вибрацию при взаимодействии (если доступно)
      if (navigator.vibrate) {
        document.addEventListener(`touchstart`, () => {
          navigator.vibrate(10);
        }, {once: true});
      }
    }
  };

  // Запуск при полной загрузке DOM
  if (document.readyState === `loading`) {
    document.addEventListener(`DOMContentLoaded`, initMobileSupport);
  } else {
    initMobileSupport();
  }

  window.mobileSupport = {
    isMobileDevice,
    isTouchDevice,
    initMobileSupport
  };
})();

'use strict';

// cloned-photos.js
// Функция отрисовки и клонирования фото

(function () {
  const getCreateHomePhoto = function (containerPhotoCard, photosCard) {
    const fragmentPhotosCard = document.createDocumentFragment();

    photosCard.forEach(function (photoCard) {
      const templatePopupPhoto = containerPhotoCard.querySelector(`.popup__photo`).cloneNode(true);
      templatePopupPhoto.setAttribute(`src`, photoCard);
      fragmentPhotosCard.appendChild(templatePopupPhoto);
    });
    return fragmentPhotosCard;
  };

  window.clonedPhotos = {
    getCreateHomePhoto: getCreateHomePhoto
  };
})();

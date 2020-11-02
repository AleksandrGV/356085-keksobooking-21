'use strict';

// Сортировка

(function () {
  const housingType = document.querySelector(`#housing-type`);

  // const HOUSING_TYPE = [
  //   {
  //     palace: `Дворец`,
  //     flat: `Квартира`,
  //     house: `Дом`,
  //     bungalow: `Бунгало`
  //   }
  // ];
  // const housingPrice = document.querySelector(`#housing-price`);
  // const housingRooms = document.querySelector(`#housing-rooms`);
  // const housingGuests = document.querySelector(`#housing-guests`);
  // const mapFeatures = document.querySelector(`.map__features`);

  // const wifi = mapFeatures.querySelector(`.map__features--wifi`);
  // const dishwasher = mapFeatures.querySelector(`.map__feature--dishwasher`);
  // const parking = mapFeatures.querySelector(`.map__feature--parking`);
  // const washer = mapFeatures.querySelector(`.map__feature--washer`);
  // const elevator = mapFeatures.querySelector(`.map__feature--elevator`);
  // const conditioner = mapFeatures.querySelector(`.map__feature--conditioner`);
  let receivedPins = [];

  const updatePins = function () {

    const getfilterPins = receivedPins.filter(function (receivedPin) {
      return receivedPin.value === receivedPins.offer.type;
    });
    window.pin.renderingPins(getfilterPins);
  };


  housingType.onchange = function () {
    window.serverDataset.forEach(function (dataset) {
      receivedPins = dataset;
    });
    if (housingType.value === `palace`) {
      receivedPins.offer.type = `palace`;
    } else if (housingType.value === `flat`) {
      receivedPins.offer.type = `flat`;
    } else if (housingType.value === `house`) {
      receivedPins.offer.type = `house`;
    } else if (housingType.value === `bungalow`) {
      receivedPins.offer.type = `bungalow`;
    } else {
      updatePins();
    }
    // return this.value;
    // console.log(this.value);
    return receivedPins.offer.type;
    // console.log(receivedPins.offer.type);
  };

  //
  // // let typeHousing;
  // // let priceHousing;
  // // let roomsHousing;
  // getRankPin = function () {
  //   let afterSort = 0;

  //   if (housingType.value === `palace`) {
  //     afterSort += 2;
  //     console.log(1);
  //   }
  // };

  // getRankPin();
})();

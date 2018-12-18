'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;
  var HUNDREDTH_PART = 0.01;

  var uploadElement = window.upload;
  var util = window.util;
  var scaleElement = uploadElement.querySelector('.scale');
  var scaleSmaller = scaleElement.querySelector('.scale__control--smaller');
  var scaleBigger = scaleElement.querySelector('.scale__control--bigger');
  var scaleValue = scaleElement.querySelector('.scale__control--value');
  var photoPreview = uploadElement.querySelector('.img-upload__preview');

  var reducePhoto = function (evt) {
    if (parseInt(scaleValue.value, 10) > MIN_SCALE) {
      evt.preventDefault();
      var newScale = parseInt(scaleValue.value, 10) - SCALE_STEP;
      scaleValue.value = newScale + '%';
      photoPreview.style.transform = 'scale(' + newScale * HUNDREDTH_PART + ')';
    }
  };

  var increasePhoto = function (evt) {
    if (parseInt(scaleValue.value, 10) < MAX_SCALE) {
      evt.preventDefault();
      var newScale = parseInt(scaleValue.value, 10) + SCALE_STEP;
      scaleValue.value = newScale + '%';
      photoPreview.style.transform = 'scale(' + newScale * HUNDREDTH_PART + ')';
    }
  };

  var changeScale = function (button, evt) {
    switch (button) {
      case scaleSmaller:
        reducePhoto(evt);
        break;
      case scaleBigger:
        increasePhoto(evt);
        break;
    }
  };

  scaleElement.addEventListener('click', function (evt) {
    var target = evt.target;
    changeScale(target, evt);
  });

  scaleElement.addEventListener('keydown', function (evt) {
    if (util.isEnterEvent(evt)) {
      evt.preventDefault();
      var target = evt.target;
      changeScale(target, evt);
    }
  });

  window.scale = {
    photoPreview: photoPreview,
    value: scaleValue,
    HUNDREDTH_PART: HUNDREDTH_PART,
    MAX_SCALE: MAX_SCALE
  };
}
)();

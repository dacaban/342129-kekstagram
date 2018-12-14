'use strict';

(function () {
  var MAX_EFFECT = 3;
  var MAX_VALUE = 100;

  var scaleModule = window.scale;
  var scalePhotoPreview = scaleModule.photoPreview;
  var scaleValue = scaleModule.scaleValue;
  var uploadElement = window.upload;
  var effectsElement = uploadElement.querySelector('.effects');
  var effectsInput = effectsElement.querySelectorAll('.effects__radio');
  var effectsPreviews = effectsElement.querySelectorAll('.effects__preview');
  var effectsLevelElement = uploadElement.querySelector('.effect-level');
  var effectsLine = effectsLevelElement.querySelector('.effect-level__line');
  var effectsLevelInput = effectsLevelElement.querySelector('.effect-level__value');
  var effectsPin = effectsLevelElement.querySelector('.effect-level__pin');
  var effectsDepth = effectsLevelElement.querySelector('.effect-level__depth');
  var hashtagInput = uploadElement.querySelector('.text__hashtags');
  var descriptionTextarea = uploadElement.querySelector('.text__description');

  var getEffectsList = function () {
    var effects = {};
    for (var i = 0; i < effectsInput.length; i++) {
      effects[effectsInput[i].id.split('-').pop()] = effectsPreviews[i].classList[1];
    }
    return effects;
  };

  var effectsMap = getEffectsList();

  var cleanAttributes = function (element) {
    element.removeAttribute('style');
    if (element.classList.length > 1) {
      element.classList.remove(element.classList[1]);
    }
  };

  var setEffect = function (preview, origin) {
    var effectKey = preview.id.split('-').pop();
    origin.classList.add(effectsMap[effectKey]);
    if (effectKey === 'none') {
      effectsLevelElement.classList.add('hidden');
    } else {
      effectsLevelElement.classList.remove('hidden');
    }
  };

  var getPercents = function (coord) {
    return Math.round(coord * 100 / effectsLine.offsetWidth);
  };

  var isCursorOnLeft = function (cursorPosition, min) {
    return (cursorPosition < min);
  };

  var isCursorOnRight = function (cursorPosition, max) {
    return (cursorPosition > max);
  };

  var getValueInLimit = function (evt, value, min, max) {
    if (value < min || isCursorOnLeft(evt.clientX, effectsLine.getBoundingClientRect().left)) {
      return min;
    }
    if (value > max || isCursorOnRight(evt.clientX, effectsLine.getBoundingClientRect().right)) {
      return max;
    }
    return value;
  };

  var setCoord = function (evt, shift) {
    return getValueInLimit(evt, effectsPin.offsetLeft - shift, 0, effectsLine.offsetWidth);
  };

  var chooseEffectValue = function (coord) {
    var newValue = getPercents(coord);
    var blurAndHeatValue = Math.round(MAX_EFFECT * newValue) * scaleModule.HUNDREDTH_PART;
    var effectClass = scaleModule.photoPreview.classList[1];
    switch (effectClass) {
      case effectsMap.chrome:
        scaleModule.photoPreview.style.filter = 'grayscale(' + (newValue * scaleModule.HUNDREDTH_PART) + ')';
        break;
      case effectsMap.sepia:
        scaleModule.photoPreview.style.filter = 'sepia(' + (newValue * scaleModule.HUNDREDTH_PART) + ')';
        break;
      case effectsMap.marvin:
        scaleModule.photoPreview.style.filter = 'invert(' + newValue + '%)';
        break;
      case effectsMap.phobos:
        scaleModule.photoPreview.style.filter = 'blur(' + blurAndHeatValue + 'px)';
        break;
      case effectsMap.heat:
        scaleModule.photoPreview.style.filter = 'brightness(' + blurAndHeatValue + ')';
        break;
    }
  };

  var resetEffect = function () {
    effectsLevelInput.value = MAX_VALUE;
    effectsPin.style.left = (effectsLine.offsetWidth) + 'px';
    effectsDepth.style.width = (effectsLine.offsetWidth) + 'px';
    scaleValue.value = window.scale.MAX_SCALE + '%';
  };

  var resetSettings = function () {
    resetEffect();
    cleanAttributes(scalePhotoPreview);
    effectsInput[0].setAttribute('checked', '');
    effectsLevelElement.classList.add('hidden');
    hashtagInput.value = '';
    descriptionTextarea.value = '';
  };

  effectsElement.addEventListener('click', function (evt) {
    var target = evt.target;
    cleanAttributes(scalePhotoPreview);
    resetEffect();
    setEffect(target, scalePhotoPreview);
  });

  effectsPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordX = evt.clientX;
    var onMouseMove = function (moveEvt) {
      if (
        !isCursorOnLeft(moveEvt.clientX, effectsLine.getBoundingClientRect().left)
        || !isCursorOnRight(moveEvt.clientX, effectsLine.getBoundingClientRect().right)
      ) {
        moveEvt.preventDefault();
        var shift = startCoordX - moveEvt.clientX;
        startCoordX = moveEvt.clientX;
        var newCoord = setCoord(moveEvt, shift);
        effectsPin.style.left = newCoord + 'px';
        effectsDepth.style.width = newCoord + 'px';
        chooseEffectValue(newCoord);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      effectsLevelInput.value = getPercents(effectsPin.offsetLeft);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.effects = {
    resetSettings: resetSettings,
    hashtagInput: hashtagInput,
    descriptionTextarea: descriptionTextarea
  };
}
)();

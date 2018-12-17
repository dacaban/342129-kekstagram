'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var body = document.querySelector('body');

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var cleanElement = function (element, classRemove) {
    if (element.children.length > 0) {
      for (var i = element.children.length - 1; i >= 0; i--) {
        if (element.children[i].classList.contains(classRemove)) {
          element.removeChild(element.children[i]);
        }
      }
    }
  };

  var openPopup = function (popup) {
    popup.classList.remove('hidden');
    body.classList.add('modal-open');
  };

  var closePopup = function (popup) {
    popup.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  var isPopupOpen = function (popup) {
    return !popup.classList.contains('hidden');
  };


  var isEscEvent = function (evt) {
    return (evt.keyCode === ESC_KEYCODE);
  };

  var isEnterEvent = function (evt) {
    return (evt.keyCode === ENTER_KEYCODE);
  };

  window.util = {
    getRandomInt: getRandomInt,
    cleanElement: cleanElement,
    openPopup: openPopup,
    closePopup: closePopup,
    isPopupOpen: isPopupOpen,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
}
)();

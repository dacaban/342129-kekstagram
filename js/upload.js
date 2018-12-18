'use strict';

(function () {
  var util = window.util;
  var uploadInput = window.render.picturesElement.querySelector('#upload-file');
  var uploadElement = document.querySelector('.img-upload__overlay');
  var uploadClose = uploadElement.querySelector('.img-upload__cancel');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessageElement = successTemplate.cloneNode(true);
  var successCloseElement = successMessageElement.querySelector('.success__button');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessageElement = errorTemplate.cloneNode(true);
  var errorCloseElement = errorMessageElement.querySelectorAll('.error__button');
  var main = document.querySelector('main');

  var openTemplate = function (template) {
    template.classList.remove('visually-hidden');
  };

  var closeTemplate = function (template) {
    template.classList.add('visually-hidden');
    return true;
  };

  var onEscDown = function (evt) {
    if (
      util.isPopupOpen(uploadElement)
      && util.isEscEvent(evt)
      && document.activeElement !== window.effects.hashtagInput
      && document.activeElement !== window.effects.descriptionTextarea
    ) {
      window.effects.resetSettings();
      util.closePopup(uploadElement);
      document.removeEventListener('keydown', onEscDown);
    }
  };

  var closeModal = function (evt) {
    if (util.isEscEvent(evt)) {
      closeTemplate(successMessageElement.classList.contains('visually-hidden') ? errorMessageElement : successMessageElement);
      document.removeEventListener('keydown', closeModal);
    }
  };

  successMessageElement.classList.add('visually-hidden');
  main.appendChild(successMessageElement);
  errorMessageElement.classList.add('visually-hidden');
  main.appendChild(errorMessageElement);

  uploadInput.addEventListener('change', function () {
    util.openPopup(uploadElement);
    document.addEventListener('keydown', onEscDown);
  });

  uploadClose.addEventListener('click', function () {
    window.effects.resetSettings();
    util.closePopup(uploadElement);
  });

  successCloseElement.addEventListener('click', function () {
    closeTemplate(successMessageElement);
  });

  successMessageElement.addEventListener('click', function (evt) {
    var content = successMessageElement.querySelector('.success__inner');
    var target = evt.target;
    if (target !== content && target.parentNode !== content) {
      closeTemplate(successMessageElement);
    }
  });

  for (var i = 0; i < errorCloseElement.length; i++) {
    errorCloseElement[i].addEventListener('click', function () {
      closeTemplate(errorMessageElement);
    });
  }

  errorMessageElement.addEventListener('click', function (evt) {
    var content = errorMessageElement.querySelector('.error__inner');
    var target = evt.target;
    if (target !== content && target.parentNode !== content) {
      closeTemplate(errorMessageElement);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (util.isEscEvent(evt)) {
      closeTemplate(errorMessageElement);
    }
  });

  var successHandler = function () {
    window.effects.resetSettings();
    util.closePopup(uploadElement);
    openTemplate(successMessageElement);
    document.addEventListener('keydown', closeModal);
  };

  var errorHandler = function () {
    window.effects.resetSettings();
    util.closePopup(uploadElement);
    openTemplate(errorMessageElement);
    document.addEventListener('keydown', closeModal);
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

  window.upload = {
    modal: uploadElement,
    input: uploadInput
  };
}
)();

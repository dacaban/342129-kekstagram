'use strict';

(function () {
  var util = window.util;
  var uploadInput = window.pictures.picturesElement.querySelector('#upload-file');
  var uploadElement = document.querySelector('.img-upload__overlay');
  var uploadClose = uploadElement.querySelector('.img-upload__cancel');
  var hashtagInput = uploadElement.querySelector('.text__hashtags');
  var descriptionTextarea = uploadElement.querySelector('.text__description');

  uploadInput.addEventListener('change', function () {
    util.openPopup(uploadElement);
  });

  uploadClose.addEventListener('click', function () {
    util.closePopup(uploadElement);
  });

  document.addEventListener('keydown', function (evt) {
    if (
      util.isPopupOpen(uploadElement)
      && util.isEscEvent(evt)
      && document.activeElement !== hashtagInput
      && document.activeElement !== descriptionTextarea
    ) {
      util.closePopup(uploadElement);
    }
  });

  window.upload = {
    uploadElement: uploadElement,
    hashtagInput: hashtagInput
  };
}
)();

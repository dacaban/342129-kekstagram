'use strict';

(function () {
  var HASHTAGS_MAX = 5;
  var HASHTAGS_LENGTH_MAX = 20;

  var hashtagInput = window.upload.hashtagInput;

  var isCountCorrect = function (hashtags) {
    return (hashtags.length <= HASHTAGS_MAX);
  };

  var isLengthHashCorrect = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length > HASHTAGS_LENGTH_MAX) {
        return false;
      }
    }

    return true;
  };

  var isAllHash = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].charAt(0) !== '#') {
        return false;
      }
    }

    return true;
  };

  var isNotOnlyHash = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length === 1) {
        return false;
      }
    }

    return true;
  };

  var isHashtagsDifferent = function (hashtags) {
    var comparableHashtags = hashtags.map(function (hashtag) {
      return hashtag.toLowerCase();
    });
    for (var i = 0; i < comparableHashtags.length - 1; i++) {
      if (comparableHashtags.indexOf(comparableHashtags[i], i + 1) > -1) {
        return false;
      }
    }

    return true;
  };

  var isHashtagsHasSpace = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].slice(1).search('#') > 0) {
        return false;
      }
    }

    return true;
  };

  var setValidation = function (value) {
    if (!isCountCorrect(value)) {
      hashtagInput.setCustomValidity('Можно добавить не больше 5-ти хеш-тегов');
    } else if (!isLengthHashCorrect(value)) {
      hashtagInput.setCustomValidity('Длина хеш-тега не должна превосходить 20-ти символов, включая #');
    } else if (!isAllHash(value)) {
      hashtagInput.setCustomValidity('Хеш-тег должен начинаться со знака #');
    } else if (!isNotOnlyHash(value)) {
      hashtagInput.setCustomValidity('Хеш-тег не может содержать только знак #');
    } else if (!isHashtagsDifferent(value)) {
      hashtagInput.setCustomValidity('Нельзя использовать 2 одинаковых хеш-тега');
    } else if (!isHashtagsHasSpace(value)) {
      hashtagInput.setCustomValidity('Хеш-теги должны быть разделены пробелами');
    } else {
      hashtagInput.setCustomValidity('');
    }
  };

  hashtagInput.addEventListener('input', function () {
    if (!hashtagInput.value) {
      var hashtags = hashtagInput.value.split(' ');
      setValidation(hashtags);
    } else {
      hashtagInput.setCustomValidity('');
    }
  });
})();

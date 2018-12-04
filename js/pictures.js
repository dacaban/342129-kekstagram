'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 6;
var FIRST_AVATAR_INDEX = 1;
var LAST_AVATAR_INDEX = 6;
var PHOTOS = 25;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var SCALE_STEP = 25;
var HUNDREDTH_PART = 0.01;
var HASHTAGS_MAX = 5;
var HASHTAGS_LENGTH_MAX = 20;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateCommentsList = function (number) {
  var commentsList = [];
  for (var i = 0; i < number; i++) {
    commentsList[i] = COMMENTS[getRandomInt(0, COMMENTS.length)];
  }
  return commentsList;
};

var generatePhoto = function (i) {
  var photoNumber = i + 1;
  return {
    url: 'photos/' + photoNumber + '.jpg',
    likes: getRandomInt(LIKES_MIN, LIKES_MAX),
    comments: generateCommentsList(getRandomInt(COMMENTS_MIN, COMMENTS_MAX)),
    description: DESCRIPTION[getRandomInt(0, DESCRIPTION.length)],
    id: i
  };
};

var usersPhotos = [];
for (var i = 0; i < PHOTOS; i++) {
  usersPhotos[i] = generatePhoto(i);
}

var picturesElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (userPhoto) {
  var userPhotoClone = pictureTemplate.cloneNode(true);
  userPhotoClone.querySelector('.picture__img').src = userPhoto.url;
  userPhotoClone.querySelector('.picture__img').id = userPhoto.id;
  userPhotoClone.querySelector('.picture__likes').textContent = userPhoto.likes;
  userPhotoClone.querySelector('.picture__comments').textContent = userPhoto.comments.length;
  return userPhotoClone;
};


var fragmentPhotos = document.createDocumentFragment();
for (i = 0; i < usersPhotos.length; i++) {
  fragmentPhotos.appendChild(renderPhoto(usersPhotos[i]));
}
picturesElement.appendChild(fragmentPhotos);

var bigPictureElement = document.querySelector('.big-picture');
var pictureCommentList = bigPictureElement.querySelector('.social__comments');
var pictureComment = pictureCommentList.querySelector('.social__comment');
var commentInput = bigPictureElement.querySelector('.social__footer-text');

var renderComment = function (comment) {
  var pictureCommentsClone = pictureComment.cloneNode(true);
  pictureCommentsClone.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(FIRST_AVATAR_INDEX, LAST_AVATAR_INDEX) + '.svg';
  pictureCommentsClone.querySelector('.social__text').textContent = comment;
  return pictureCommentsClone;
};


var cleanElement = function (element) {
  if (element.children.length > 0) {
    for (i = element.children.length - 1; i >= 0; i--) {
      element.removeChild(element.children[i]);
    }
  }
};

var body = document.querySelector('body');
var isPopupOpen = function (popap) {
  return !popap.classList.contains('hidden');
};
var openPopup = function (popup) {
  popup.classList.remove('hidden');
  body.classList.add('modal-open');
};

var closePopup = function (popup) {
  popup.classList.add('hidden');
  body.classList.remove('modal-open');
};


var isEscEvent = function (evt) {
  return (evt.keyCode === ESC_KEYCODE);
};

var isEnterEvent = function (evt) {
  return (evt.keyCode === ENTER_KEYCODE);
};

var bigPictureOpen = function (photo) {
  cleanElement(pictureCommentList);
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;

  var fragmentComments = document.createDocumentFragment();
  for (var j = 0; j < photo.comments.length; j++) {
    fragmentComments.appendChild(renderComment(photo.comments[j]));
  }

  pictureCommentList.appendChild(fragmentComments);

  openPopup(bigPictureElement);
};

picturesElement.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('picture__img')) {
    bigPictureOpen(usersPhotos[target.id]);
  }
});

picturesElement.addEventListener('keydown', function (evt) {
  var target = evt.target;
  if ((isEnterEvent(evt)) && (target.classList.contains('picture'))) {
    bigPictureOpen(usersPhotos[target.querySelector('.picture__img').id]);
  }
});

var bigPictureClose = bigPictureElement.querySelector('.big-picture__cancel');

bigPictureClose.addEventListener('click', function () {
  closePopup(bigPictureElement);
});

document.addEventListener('keydown', function (evt) {
  if ((isPopupOpen(bigPictureElement)) && (isEscEvent(evt)) && (document.activeElement !== commentInput)) {
    closePopup(bigPictureElement);
  }
});

var commentsLoader = bigPictureElement.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');

var uploadInput = picturesElement.querySelector('#upload-file');
var uploadElement = document.querySelector('.img-upload__overlay');
var uploadClose = uploadElement.querySelector('.img-upload__cancel');
var hashtagInput = uploadElement.querySelector('.text__hashtags');
var descriptionTextarea = uploadElement.querySelector('.text__description');

uploadInput.addEventListener('change', function () {
  openPopup(uploadElement);
});

uploadClose.addEventListener('click', function () {
  closePopup(uploadElement);
});

document.addEventListener('keydown', function (evt) {
  if ((isPopupOpen(uploadElement)) && (isEscEvent(evt)) && (document.activeElement !== hashtagInput) && (document.activeElement !== descriptionTextarea)) {
    closePopup(uploadElement);
  }
});

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

scaleElement.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target === scaleSmaller) {
    reducePhoto(evt);
  } else if (target === scaleBigger) {
    increasePhoto(evt);
  }
});

scaleElement.addEventListener('keydown', function (evt) {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    var target = evt.target;
    if (target === scaleSmaller) {
      reducePhoto(evt);
    } else if (target === scaleBigger) {
      increasePhoto(evt);
    }
  }
});

var effectsElement = uploadElement.querySelector('.effects');
var effectsInput = effectsElement.querySelectorAll('.effects__radio');
var effectsPreviews = effectsElement.querySelectorAll('.effects__preview');

var effects = {};
for (i = 0; i < effectsInput.length; i++) {
  effects[effectsInput[i].id] = effectsPreviews[i].classList[1];
}

effectsElement.addEventListener('click', function (evt) {
  var target = evt.target;
  if (photoPreview.classList.length > 1) {
    var photoClass = photoPreview.classList[1];
    photoPreview.classList.remove(photoClass);
  }
  photoPreview.classList.add(effects[target.id]);
});

var isCountCorrect = function (array) {
  return (array.length <= HASHTAGS_MAX);
};

var isLagthHashCorrect = function (array) {
  var flag = true;
  for (i = 0; i < array.length; i++) {
    if (array[i].length > HASHTAGS_LENGTH_MAX) {
      flag = false;
      break;
    }
  }
  return flag;
};

var isAllHash = function (array) {
  var flag = true;
  for (i = 0; i < array.length; i++) {
    if (array[i].charAt(0) !== '#') {
      flag = false;
      break;
    }
  }
  return flag;
};

var isNotOnlyHash = function (array) {
  var flag = true;
  for (i = 0; i < array.length; i++) {
    if (array[i].length === 1) {
      flag = false;
      break;
    }
  }
  return flag;
};

var isHastagsDifferent = function (array) {
  var flag = true;
  for (i = 0; i < array.length - 1; i++) {
    for (var j = i + 1; j < array.length; j++) {
      if (array[i].toLowerCase() === array[j].toLowerCase()) {
        flag = false;
        break;
      }
    }
  }
  return flag;
};

var isHashtagsHasSpace = function (array) {
  var flag = true;
  for (i = 0; i < array.length; i++) {
    if (array[i].slice(1).search('#') > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

hashtagInput.addEventListener('input', function () {
  if (hashtagInput.value !== '') {
    var hashtags = hashtagInput.value.split(' ');
    if (!isCountCorrect(hashtags)) {
      hashtagInput.setCustomValidity('Можно добавить не больше 5-ти хеш-тегов');
    } else if (!isLagthHashCorrect(hashtags)) {
      hashtagInput.setCustomValidity('Длина хеш-тега не должна превосходить 20-ти символов, включая #');
    } else if (!isAllHash(hashtags)) {
      hashtagInput.setCustomValidity('Хеш-тег должен начинаться со знака #');
    } else if (!isNotOnlyHash(hashtags)) {
      hashtagInput.setCustomValidity('Хеш-тег не может содержать только знак #');
    } else if (!isHastagsDifferent(hashtags)) {
      hashtagInput.setCustomValidity('Нельзя использовать 2 одинаковых хеш-тега');
    } else if (!isHashtagsHasSpace(hashtags)) {
      hashtagInput.setCustomValidity('Хеш-теги должны быть разделены пробелами');
    } else {
      hashtagInput.setCustomValidity('');
    }
  } else {
    hashtagInput.setCustomValidity('');
  }
});

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

  bigPictureElement.classList.remove('hidden');
};

picturesElement.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.classList.contains('picture__img')) {
    bigPictureOpen(usersPhotos[target.id]);
  }
});

picturesElement.addEventListener('keydown', function (evt) {
  var target = evt.target;
  if ((evt.keyCode === ENTER_KEYCODE) && (target.classList.contains('picture'))) {
    bigPictureOpen(usersPhotos[target.querySelector('.picture__img').id]);
  }
});

var bigPictureClose = bigPictureElement.querySelector('.big-picture__cancel');
bigPictureClose.addEventListener('click', function () {
  bigPictureElement.classList.add('hidden');
});

var commentsLoader = bigPictureElement.querySelector('.comments-loader');
commentsLoader.classList.add('visually-hidden');


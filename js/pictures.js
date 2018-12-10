'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 1;
  var COMMENTS_MAX = 6;
  var PHOTOS = 25;

  var util = window.util;
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var generateCommentsList = function (count) {
    var commentsList = [];
    for (var i = 0; i < count; i++) {
      commentsList[i] = COMMENTS[util.getRandomInt(0, COMMENTS.length)];
    }
    return commentsList;
  };

  var generatePhoto = function (index) {
    var photoNumber = index + 1;
    return {
      url: 'photos/' + photoNumber + '.jpg',
      likes: util.getRandomInt(LIKES_MIN, LIKES_MAX),
      comments: generateCommentsList(util.getRandomInt(COMMENTS_MIN, COMMENTS_MAX)),
      description: DESCRIPTION[util.getRandomInt(0, DESCRIPTION.length)],
      id: index
    };
  };

  var usersPhotos = [];
  for (var i = 0; i < PHOTOS; i++) {
    usersPhotos[i] = generatePhoto(i);
  }

  var renderPhoto = function (userPhoto) {
    var userPhotoClone = pictureTemplate.cloneNode(true);
    userPhotoClone.querySelector('.picture__img').src = userPhoto.url;
    userPhotoClone.querySelector('.picture__img').id = userPhoto.id;
    userPhotoClone.querySelector('.picture__likes').textContent = userPhoto.likes.toString();
    userPhotoClone.querySelector('.picture__comments').textContent = userPhoto.comments.length.toString();
    return userPhotoClone;
  };


  var fragmentPhotos = document.createDocumentFragment();
  for (i = 0; i < usersPhotos.length; i++) {
    fragmentPhotos.appendChild(renderPhoto(usersPhotos[i]));
  }
  picturesElement.appendChild(fragmentPhotos);

  window.pictures = {
    picturesElement: picturesElement,
    usersPhotos: usersPhotos
  };
})();

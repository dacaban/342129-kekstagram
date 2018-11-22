'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

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
  return {
    url: 'photos/' + i + '.jpg',
    likes: getRandomInt(15, 200),
    comments: generateCommentsList(getRandomInt(1, 6)),
    description: DESCRIPTION[getRandomInt(0, DESCRIPTION.length)]
  };
};

var usersPhotos = [];
for (var i = 0; i < 25; i++) {
  usersPhotos[i] = generatePhoto(i + 1);
}

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (userPhoto) {
  var userPhotoElement = pictureTemplate.cloneNode(true);
  userPhotoElement.querySelector('.picture__img').src = userPhoto.url;
  userPhotoElement.querySelector('.picture__likes').textContent = userPhoto.likes;
  userPhotoElement.querySelector('.picture__comments').textContent = userPhoto.comments.length;
  return userPhotoElement;
};


var fragment = document.createDocumentFragment();
for (i = 0; i < usersPhotos.length; i++) {
  fragment.appendChild(renderPhoto(usersPhotos[i]));
}



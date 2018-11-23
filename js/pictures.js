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

var picturesElement = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (userPhoto) {
  var userPhotoClone = pictureTemplate.cloneNode(true);
  userPhotoClone.querySelector('.picture__img').src = userPhoto.url;
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
  pictureCommentsClone.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 6) + '.svg';
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

cleanElement(pictureCommentList);

bigPictureElement.classList.remove('hidden');
bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = usersPhotos[0].url;
bigPictureElement.querySelector('.likes-count').textContent = usersPhotos[0].likes;
bigPictureElement.querySelector('.comments-count').textContent = usersPhotos[0].comments.length;
bigPictureElement.querySelector('.social__caption').textContent = usersPhotos[0].description;

var fragmentComments = document.createDocumentFragment();
for (i = 0; i < usersPhotos[0].comments.length; i++) {
  fragmentComments.appendChild(renderComment(usersPhotos[0].comments[i]));
}

pictureCommentList.appendChild(fragmentComments);

var commentCount = bigPictureElement.querySelector('.social__comment-count');
var commentsLoader = bigPictureElement.querySelector('.comments-loader');
commentCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');


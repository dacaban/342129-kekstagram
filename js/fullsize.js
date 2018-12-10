'use strict';

(function () {
  var FIRST_AVATAR_INDEX = 1;
  var LAST_AVATAR_INDEX = 6;

  var util = window.util;
  var bigPictureElement = document.querySelector('.big-picture');
  var pictureCommentList = bigPictureElement.querySelector('.social__comments');
  var pictureComment = pictureCommentList.querySelector('.social__comment');
  var commentInput = bigPictureElement.querySelector('.social__footer-text');

  var renderComment = function (comment) {
    var pictureCommentsClone = pictureComment.cloneNode(true);
    pictureCommentsClone.querySelector('.social__picture').src =
      'img/avatar-'
      + util.getRandomInt(FIRST_AVATAR_INDEX, LAST_AVATAR_INDEX)
      + '.svg';
    pictureCommentsClone.querySelector('.social__text').textContent = comment;
    return pictureCommentsClone;
  };


  var bigPictureOpen = function (photo) {
    util.cleanElement(pictureCommentList);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;

    var fragmentComments = document.createDocumentFragment();
    for (var j = 0; j < photo.comments.length; j++) {
      fragmentComments.appendChild(renderComment(photo.comments[j]));
    }

    pictureCommentList.appendChild(fragmentComments);

    util.openPopup(bigPictureElement);
  };

  window.pictures.picturesElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture__img')) {
      bigPictureOpen(window.pictures.usersPhotos[target.id]);
    }
  });

  window.pictures.picturesElement.addEventListener('keydown', function (evt) {
    var target = evt.target;
    if ((util.isEnterEvent(evt)) && (target.classList.contains('picture'))) {
      bigPictureOpen(window.pictures.usersPhotos[target.querySelector('.picture__img').id]);
    }
  });

  var bigPictureClose = bigPictureElement.querySelector('.big-picture__cancel');

  bigPictureClose.addEventListener('click', function () {
    util.closePopup(bigPictureElement);
  });

  document.addEventListener('keydown', function (evt) {
    if (
      util.isPopupOpen(bigPictureElement)
      && util.isEscEvent(evt)
      && document.activeElement !== commentInput
    ) {
      util.closePopup(bigPictureElement);
    }
  });

  var commentsLoader = bigPictureElement.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');
}
)();
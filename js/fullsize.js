'use strict';

(function () {
  var util = window.util;
  var bigPictureElement = document.querySelector('.big-picture');
  var pictureCommentList = bigPictureElement.querySelector('.social__comments');
  var pictureComment = pictureCommentList.querySelector('.social__comment');
  var commentInput = bigPictureElement.querySelector('.social__footer-text');
  var commentsLoader = document.querySelector('.comments-loader');

  var renderComment = function (comment) {
    var pictureCommentsClone = pictureComment.cloneNode(true);
    pictureCommentsClone.querySelector('.social__picture').src = comment.avatar.toString();
    pictureCommentsClone.querySelector('.social__text').textContent = comment.message;
    return pictureCommentsClone;
  };


  var bigPictureOpen = function (photo) {
    util.cleanElement(pictureCommentList, 'social__comment');
    window.comments.initComments(photo);
    bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPictureElement.querySelector('.likes-count').textContent = photo.likes.toString();
    bigPictureElement.querySelector('.social__caption').textContent = photo.description;
    bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length.toString();
    window.comments.goToNextPage();

    util.openPopup(bigPictureElement);
  };

  commentsLoader.addEventListener('click', function () {
    window.comments.goToNextPage();
  });

  window.render.picturesElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('picture__img')) {
      bigPictureOpen(window.pictures.getPhotos()[target.id]);
    }
  });

  window.render.picturesElement.addEventListener('keydown', function (evt) {
    var target = evt.target;
    if ((util.isEnterEvent(evt)) && (target.classList.contains('picture'))) {
      bigPictureOpen(window.pictures.getPhotos()[target.querySelector('.picture__img').id]);
    }
  });

  var bigPictureClose = bigPictureElement.querySelector('.big-picture__cancel');

  bigPictureClose.addEventListener('click', function () {
    util.closePopup(bigPictureElement);
    window.comments.clearComments();
  });

  document.addEventListener('keydown', function (evt) {
    if (
      util.isPopupOpen(bigPictureElement)
      && util.isEscEvent(evt)
      && document.activeElement !== commentInput
    ) {
      util.closePopup(bigPictureElement);
      window.comments.clearComments();
    }
  });

  window.fullsize = {
    renderComment: renderComment
  };
}
)();

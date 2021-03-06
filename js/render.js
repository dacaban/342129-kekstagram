'use strict';
(function () {
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var renderPhoto = function (userPhoto) {
    var userPhotoClone = pictureTemplate.cloneNode(true);
    userPhotoClone.querySelector('.picture__img').src = userPhoto.url;
    userPhotoClone.querySelector('.picture__img').id = userPhoto.id;
    userPhotoClone.querySelector('.picture__likes').textContent = userPhoto.likes.toString();
    userPhotoClone.querySelector('.picture__comments').textContent = userPhoto.comments.length.toString();
    return userPhotoClone;
  };

  window.render = {
    picturesElement: picturesElement,
    createPhoto: function (data) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(renderPhoto(data[i]));
      }
      picturesElement.appendChild(fragment);
    }
  };
})();

'use strict';

(function () {
  var filtersElement = document.querySelector('.img-filters');
  var activeButton = filtersElement.querySelectorAll('.img-filters__button--active');
  var picturesElement = document.querySelector('.pictures');

  var getActiveButtonId = function (target) {
    if (target.classList.contains('img-filters__button')) {
      activeButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
      activeButton = target;
    }
    return target.id;
  };

  var comparator = function (left, right) {
    return right - left;
  };

  // TODO: это вроде как коллбэки, но называются не как коллбэки. Может ли коллбэк возвращать значение?
  var getNewPhotos = function (photos) {
    var newPhotos = [];
    var randomIndex;
    var newElem;
    for (var i = 0; i < 10; i++) {
      randomIndex = window.util.getRandomInt(0, photos.length - 1);
      newElem = photos[randomIndex];
      if (newPhotos.indexOf(newElem) === -1) {
        newPhotos.push(newElem);
      } else {
        i--; // TODO: чет стремная фигня
      }
    }
    return newPhotos;
  };

  var getDiscussedPhotos = function (photos) {
    var discussedPhotos = photos.slice();
    discussedPhotos.sort(function (left, right) {
      var diff = comparator(left.comments.length, right.comments.length);
      if (!diff) {
        return comparator(left.likes, right.likes);
      }
      return diff;
    });

    return discussedPhotos;
  };

  var updatePhotos = function (cb) {
    var newPhotosList = cb(window.pictures.getPhotos());
    window.util.cleanElement(picturesElement, 'picture');
    window.render.render(newPhotosList);
  };

  filtersElement.addEventListener('click', function (evt) {
    var target = evt.target;
    var id = getActiveButtonId(target);
    switch (id) {
      case 'filter-popular':
        updatePhotos(window.pictures.getPhotos);
        break;
      case 'filter-new':
        updatePhotos(getNewPhotos);
        break;
      case 'filter-discussed':
        updatePhotos(getDiscussedPhotos);
        break;
    }
  });

  window.filters = filtersElement;
})();

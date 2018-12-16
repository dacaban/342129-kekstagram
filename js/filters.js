'use strict';

(function () {
  var NEW_PHOTOS_COUNT = 10;
  var filtersElement = document.querySelector('.img-filters');
  var activeButton = filtersElement.querySelector('.img-filters__button--active');
  var picturesElement = document.querySelector('.pictures');

  var getActiveButtonId = function (target) {
    if (target.classList.contains('img-filters__button')) {
      activeButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
      activeButton = target;
    }
    return target.id;
  };

  var shuffle = function (arr) {
    var currentIndex = arr.length;
    var randomIndex;
    var temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
  };

  var comparator = function (left, right) {
    return right - left;
  };

  var getNewPhotos = function (photos) {
    var newPhotos = photos.slice();
    shuffle(newPhotos);
    return newPhotos.slice(0, NEW_PHOTOS_COUNT);
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

  var onPhotosUpdate = function (filter) {
    var initialPhotos = window.pictures.getPhotos();
    var newPhotosList = [];
    switch (filter) {
      case 'filter-popular':
        newPhotosList = initialPhotos;
        break;
      case 'filter-new':
        newPhotosList = getNewPhotos(initialPhotos);
        break;
      case 'filter-discussed':
        newPhotosList = getDiscussedPhotos(initialPhotos);
        break;
    }
    window.util.cleanElement(picturesElement, 'picture');
    window.render.render(newPhotosList);
  };

  filtersElement.addEventListener('click', function (evt) {
    var target = evt.target;
    var id = getActiveButtonId(target);
    window.debounce(onPhotosUpdate.bind(evt, id));
  });

  window.filters = filtersElement;
})();

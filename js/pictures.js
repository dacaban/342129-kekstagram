'use strict';

(function () {
  var usersPhotos = [];

  var successHandler = function (data) {
    usersPhotos = data;
    usersPhotos.forEach(function (item, i) {
      item.id = i;
    });
    window.render.createPhoto(usersPhotos);
    window.filters.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('load-error');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  var getPhotos = function () {
    return usersPhotos;
  };

  window.pictures = {
    getPhotos: getPhotos
  };
})();

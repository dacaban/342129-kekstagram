'use strict';

(function () {
  var usersPhotos = [];

  var successHandler = function (data) {
    usersPhotos = data;
    for (var i = 0; i < usersPhotos.length; i++) {
      usersPhotos[i].id = i;
    }
    window.render(usersPhotos);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '15px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.getPhotos = function () {
    return usersPhotos;
  };
})();

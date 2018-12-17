'use strict';

(function () {
  var COMMENTS_PORTION = 5;

  var pictureCommentList = document.querySelector('.social__comments');
  var commentsLoader = document.querySelector('.comments-loader');
  var currentCountComments = document.querySelector('.current-count');

  window.comments = {
    currentPage: 0,
    initComments: function (photo) {
      this.comments = photo.comments;
    },
    getCommentsCount: function () {
      return this.comments.length;
    },
    getCurrentCommentsCount: function () {
      return (this.currentPage - 1) * COMMENTS_PORTION;
    },
    setLoaderHidden: function () {
      commentsLoader.classList.add('visually-hidden');
    },
    setLoaderVisible: function () {
      commentsLoader.classList.remove('visually-hidden');
    },
    isPageLast: function () {
      return this.currentPage * COMMENTS_PORTION >= this.getCommentsCount();
    },

    getPagesBorders: function () {
      var start = this.getCurrentCommentsCount();
      var end = start + COMMENTS_PORTION;
      if (this.getCommentsCount() - this.getCurrentCommentsCount() < COMMENTS_PORTION) {
        end = start + this.getCommentsCount() - this.getCurrentCommentsCount();
      }
      return {
        start: start,
        end: end
      };
    },

    renderPage: function () {
      var borders = this.getPagesBorders();
      var fragmentComments = document.createDocumentFragment();
      for (var i = borders.start; i < borders.end; i++) {
        fragmentComments.appendChild(window.fullsize.renderComment(this.comments[i]));
      }
      pictureCommentList.appendChild(fragmentComments);
      currentCountComments.textContent = borders.end.toString();
      if (this.isPageLast()) {
        this.setLoaderHidden();
      }
    },

    goToNextPage: function () {
      this.currentPage++;
      this.renderPage();
    },
    clearComments: function () {
      this.currentPage = 0;
      this.comments = [];
      this.setLoaderVisible();
    }
  };
})();

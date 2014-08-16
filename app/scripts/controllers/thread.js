'use strict';

/**
 * @ngdoc function
 * @name rtfmApp.controller:ThreadCtrl
 * @description
 * # ThreadCtrl
 * Controller of the rtfmApp
 */
angular.module('rtfmApp')
  .controller('ThreadCtrl', function ($scope, threadRef, commentsRef) {
      var thread = threadRef.$asObject();

      thread.$bindTo($scope, 'thread');

      $scope.comments = commentsRef.$asArray();

      $scope.addComment = function () {
          if ($scope.comment) {
              $scope.comments.$add({
                  username: $scope.username,
                  comment: $scope.comment,
                  timestamp: Date.now()
              });
          }
      };
  });

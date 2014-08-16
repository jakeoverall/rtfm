'use strict';

/**
 * @ngdoc function
 * @name rtfmApp.controller:ThreadctrlCtrl
 * @description
 * # ThreadctrlCtrl
 * Controller of the rtfmApp
 */
angular.module('rtfmApp')
  .controller('ThreadsCtrl', function ($scope, threadsRef) {
      $scope.threads = threadsRef.$asArray();

      $scope.addThread = function () {
          if ($scope.newThreadTitle) {
              $scope.threads.$add({ name: $scope.newThreadTitle, username: $scope.username });
              $scope.newThreadTitle = '';
          }
      };

  });

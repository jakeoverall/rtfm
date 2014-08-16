'use strict';

/**
 * @ngdoc function
 * @name rtfmApp.controller:SecureCtrl
 * @description
 * # SecureCtrl
 * Controller of the rtfmApp
 */
angular.module('rtfmApp')
  .controller('SecureCtrl', function ($scope, username, $state) {
        if (!username || username === 'undefined') {
            $state.go('login');
        }
      $scope.username = username;
  });

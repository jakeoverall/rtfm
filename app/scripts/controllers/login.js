'use strict';

/**
 * @ngdoc function
 * @name rtfmApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the rtfmApp
 */
angular.module('rtfmApp')
  .controller('LoginCtrl', function ($scope, $state, AuthService) {

      $scope.register = function () {
          AuthService.register($scope.registerUsername, $scope.registerPassword);
      };

      $scope.logMeIn = function() {
          AuthService.logIn($scope.username, $scope.password).then(function() {
              $state.go('secure.threads');
          });
      };
  });
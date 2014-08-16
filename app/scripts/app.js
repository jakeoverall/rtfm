'use strict';

/**
 * @ngdoc overview
 * @name rtfmApp
 * @description
 * # rtfmApp
 *
 * Main module of the application.
 */
angular
  .module('rtfmApp', ['firebase', 'ui.router', 'restangular'])
  .config(function ($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/threads');

      $stateProvider
          .state('login', {
              url: '/login',
              templateUrl: '/app/views/login.html',
              controller: 'LoginCtrl'
          })
          .state('secure', {
              abstract: true,
              template: '<div ui-view></div>',
              controller: 'SecureCtrl',
              resolve: {
                  'username': function (AuthService) {
                      return AuthService.getUser();
                  }
              }
          })
          .state('secure.threads', {
              url: '/threads',
              templateUrl: '/app/views/threads.html',
              controller: 'ThreadsCtrl',
              resolve: {
                  threadsRef: function (ThreadService) {
                      return ThreadService.getThreads();
                  }
              }
          })
        .state('secure.thread', {
            url: '/thread/:threadId',
            templateUrl: '/app/views/thread.html',
            controller: 'ThreadCtrl',
            resolve: {
                threadRef: function (ThreadService, $stateParams) {
                    return ThreadService.getThread($stateParams.threadId);
                },
                commentsRef: function (ThreadService, $stateParams) {
                    return ThreadService.getComments($stateParams.threadId);
                }
            }
        }).state('secure.logout', {
            url: '/login',
            templateUrl: '/app/views/login.html',
            controller: 'LoginCtrl',
            resolve: {
                logout: function (AuthService) {
                    AuthService.logOut();
                }
            }
        });

  });

'use strict';

angular.module('rtfmApp')
  .service('ThreadService', function threadService(EnvironmentService, $firebase) {
      var firebaseUrl = EnvironmentService.getEnv().firebase;

      return {
          getThreads: function () {
              return $firebase(new Firebase(firebaseUrl + '/threads'));
          },
          getThread: function (id) {
              return $firebase(new Firebase(firebaseUrl + '/threads/' + id));
          },
          getComments: function (id) {
              return $firebase(new Firebase(firebaseUrl + '/threads/' + id + '/comments'));
          }
      };

  });

'use strict';

angular.module('rtfmApp')
  .service('AuthService', function AuthService($q, $firebase, $firebaseSimpleLogin, EnvironmentService, Restangular) {

      var firebaseEndpoint = EnvironmentService.getEnv().firebase;
      var firebase = new Firebase(firebaseEndpoint);
      var firebaseSimpleLogin = $firebaseSimpleLogin(firebase);

      var
        getUser = function (userId) {
            var userObject,
              promise;

            if (userId) {
                var userObject = $firebase(new Firebase(firebaseEndpoint + '/users/' + userId)).$asObject();

                /*
                 * Protect against the case where a user is logged in yet has deleted her email address.
                 * This function effectively resets the user's email to the email that she used to register if the user or
                 * her email were somehow deleted.
                 *
                 * We may want this reset function to be a bit more elaborate in the future if we determine that more user
                 * attributes are essential to the application and should at least receive defaults.
                */
                userObject.$loaded().then(function (user) {
                    if (!user || !user.email) {
                        firebaseSimpleLogin.$getCurrentUser().then(function (currentUser) {
                            userObject.email = currentUser.email;
                            userObject.$save();
                        });
                    }
                });

            } else {
                promise = firebaseSimpleLogin.$getCurrentUser();

                promise.then(function (currentUser) {
                    if (currentUser) {
                        Restangular.setDefaultHeaders({ "Authorization": currentUser.firebaseAuthToken });
                    }
                });

            }

            return userObject || promise;

        },
        getResolvedPromise = function (resolution) {
            var deferred = $q.defer();
            deferred.resolve(resolution);
            return deferred.promise;
        };


      return {
          getUser: getUser,

          logIn: function (email, password) {
              return firebaseSimpleLogin.$login('password', {
                  email: email,
                  password: password,
                  rememberMe: true // Override default session length (browser session) to be 30 days.
              });
          },

          register: function (email, password) {
              var deferred = $q.defer();

              firebaseSimpleLogin.$createUser(email, password).then(function (user) {
                  // Create our own custom user object to house the user's data
                  var userObject = $firebase(new Firebase(firebaseEndpoint + '/users/' + user.id)).$asObject();
                  userObject.email = user.email;
                  userObject.$save().then(deferred.resolve, deferred.reject);

              }, deferred.reject);

              return deferred.promise;
          },

          logOut: function () {
              return getResolvedPromise(firebaseSimpleLogin.$logout());
          },

          resetPassword: function (email) {
              var deferred = $q.defer();

              // firebaseSimpleLogin.$resetPassword has not yet been implemented in angularfire. We're going it alone.
              var auth = new FirebaseSimpleLogin(firebase, function (err, user) {
                  console.log('err, user', err, user);
              });
              auth.sendPasswordResetEmail(email, function (err, success) {
                  if (err) {
                      deferred.reject(err);
                  } else {
                      deferred.resolve(success);
                  }
              });

              return deferred.promise;
          },

          changePassword: firebaseSimpleLogin.$changePassword
      };
  });
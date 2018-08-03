'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function ($scope, $location, LoginService, $window) {

    $scope.submit = function () {
      $scope.error = null;

      LoginService.login($scope.name).then(function (response) {
        console.log(response);
        if (response.success) {
          if (response.user.password === $scope.password) {
            $window.localStorage.setItem('heroes-user', JSON.stringify(response.user));            
            $location.path('/dashboard');
          } else {
            $scope.error = "Senha incorreta";
          }

        } else {
          $scope.error = "usuario não existe";
        }

      });


      return false;
    }

  });

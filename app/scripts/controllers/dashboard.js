'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function ($scope, $state, $window, Heroes, HeroesService) {

    $scope.$state = $state;
    $scope.heroes = Heroes;

    $scope.user = JSON.parse($window.localStorage.getItem('heroes-user'));
    $scope.novoHeroe = {
      fk_user: JSON.parse($window.localStorage.getItem('heroes-user')).id
    };


    $scope.criarHeroe = function () {      
      HeroesService.postHeroes($scope.novoHeroe).then(function (response) {
        $scope.heroes.push(response);
      });
    };

    $scope.deletaHeroe = function (heroeId) {
      HeroesService.deleteHeroe(heroeId).then(function (response) {

        var remFile = $scope.heroes.findIndex(function (item) {
          return item.id === heroeId;
        });

        $scope.heroes.splice(remFile, 1);         
      });
    };

    $scope.updateHeroe = function (heroe) {
      HeroesService.putHeroe(heroe).then(function (response) {
               
      });
    };

    $scope.logout = function () {
      $window.localStorage.removeItem('heroes-user');
      $state.go('login');
    };


      $scope.edit = function(heroe){
        $scope.novoHeroe = heroe;
      };
  });

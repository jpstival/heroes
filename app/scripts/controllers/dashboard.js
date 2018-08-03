'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state,$window, Heroes, HeroesService) {

    $scope.$state = $state;  
    $scope.heroes = Heroes;
      
    $scope.user = JSON.parse($window.localStorage.getItem('heroes-user'));
    $scope.novoHeroe = {
      fk_user: JSON.parse($window.localStorage.getItem('heroes-user')).id
    };


    $scope.criarHeroe = function(){   
      
      console.log($scope.novoHeroe);
      HeroesService.postHeroes($scope.novoHeroe).then(function(response){
        console.log(response);
      })
    }

    $scope.logout = function(){
      $window.localStorage.removeItem('heroes-user');
      $state.go('login');
    };

  });

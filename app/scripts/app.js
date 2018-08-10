'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('yapp', [
    'ui.router',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl',
          resolve:{
            verifyLogin : function($window, $state){                          
              if(!JSON.parse($window.localStorage.getItem('heroes-user'))){              
                return $state.go('login');
              }
            },
            Heroes: function(HeroesService){
              return HeroesService.getHeroes().then(function(heroes){
                return heroes;
              });
            }
          }
        })
          .state('heroes', {
            url: '/heroes',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/heroes.html'
          })
          .state('powers', {
            url: '/powers',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html'
          });

  });

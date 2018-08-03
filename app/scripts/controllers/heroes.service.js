(function () {
  'use strict';


  angular
    .module('yapp')
    .service('HeroesService', HeroesService);

  function HeroesService($http, $window) {

    var service = {
      getHeroes: getHeroes,
      postHeroes: postHeroes
    };

    return service;


    function getHeroes() {
      return $http.get('http://localhost:3000/heroes/' + JSON.parse($window.localStorage.getItem('heroes-user')).id).then(function (response) {
        return response.data;
      });
    }

    function postHeroes(novoHeroe) {
      var data = {

        name: "string",
        nameheroe: "string",
        editora: "string",
        fk_user: 2

      };
      return $http.post('http://localhost:3000/heroes', data).then(function (response) {
        return response.data;
      });
    }
  }

})();

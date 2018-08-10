(function () {
  'use strict';


  angular
    .module('yapp')
    .service('HeroesService', HeroesService);

  function HeroesService($http, $window) {

    var service = {
      getHeroes: getHeroes,
      postHeroes: postHeroes,
      deleteHeroe : deleteHeroe,
      putHeroe : putHeroe 
    };

    return service;

    function putHeroe(heroe){

      return $http.put('/heroes/' + heroe.id, heroe ).then(function (response) {
        console.log("SREVICE", response);
        return response.data;
      });

    }

    function deleteHeroe(heroeId){
      return $http.delete('/heroes/' + heroeId).then(function (response) {
        console.log("SREVICE", response);
        return response.data;
      });
    }

    function getHeroes() {
      return $http.get('/heroes/' + JSON.parse($window.localStorage.getItem('heroes-user')).id).then(function (response) {
        return response.data;
      });
    }

    function postHeroes(novoHeroe) {
      
      return $http.post('/heroes', novoHeroe).then(function (response) {
        return response.data;
      });
    }
  }

})();

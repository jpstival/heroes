(function () {
    'use strict';
  
  
    angular
      .module('yapp')
      .service('PoderesService', PoderesService);
  
    function PoderesService($http, $window) {
  
      var PoderService = {
        getHeroes: getHeroes,
        postPoderes: postPoderes,
        deletePoder : deletePoder,
        // putHeroe : putHeroe 
      };
  
      return PoderService;
  
    //   function putHeroe(heroe){
  
    //     var novoheroe = {
    //       name: heroe.name,
    //       nameheroe: heroe.nameheroe,
    //       editora: heroe.editora,  
    //       link:heroe.link
    //     }
        
    //     return $http.put('/heroes/' + heroe.id, novoheroe ).then(function (response) {
    //       console.log("SREVICE", response);
    //       return response.data;
    //     });
  
    //   }
  
      function deletePoder(PoderId){
        return $http.delete('/powers/' + PoderId).then(function (response) {
          console.log("SREVICE", response);
          return response.data;
        });
      }
  
      function getHeroes() {
        return $http.get('/heroes/' + JSON.parse($window.localStorage.getItem('heroes-user')).id).then(function (response) {
          return response.data;
        });
      }
  
      function postPoderes(novoPoder) {
        
        return $http.post('/powers', novoPoder).then(function (response) {
          
          return response.data;
        });
      }
    }
  
  })();
  
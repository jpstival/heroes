(function () {
  'use strict';


  angular
    .module('yapp')
    .service('LoginService', LoginService);

  function LoginService($http) {

    var service = {
        login : login
    };

    return service;


    function login(name){
        return $http.get('/users/' + name).then(function(response){            
            return response.data;
        });


    }
  }

})();

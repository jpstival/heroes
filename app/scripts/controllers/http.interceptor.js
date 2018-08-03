(function () {

    'use strict';

    angular
        .module('yapp')
        .config(CoreInterception);


    function CoreInterception($httpProvider) {

        $httpProvider.interceptors.push(function () {
            return {
                'request': function (config) {                                        
                    if (config.url.substring(0, 1) === '/') {
                        
                        config.url = 'http://localhost:3000' +  config.url;                        
                        
                    }   

                    return config;
                }
            };
        });

    }
})();
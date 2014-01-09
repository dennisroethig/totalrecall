'use strict';

angular.module('totalrecallApp', [
    'ngResource',
    'ngRoute'
])
    
.config(function ($routeProvider) {
    
    $routeProvider

        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });


});
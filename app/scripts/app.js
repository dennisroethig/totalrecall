'use strict';

angular.module('totalrecallApp', [
    'ngResource',
    'ngRoute'
])
    
.config(function ($routeProvider) {
    
    $routeProvider

        .when('/play', {
            templateUrl: 'views/game.html',
            controller: 'GameCtrl'
        })

        .when('/new', {
            templateUrl: 'views/newGame.html',
            controller: 'NewGameCtrl'
        })

        .otherwise({
            redirectTo: '/new'
        });


});
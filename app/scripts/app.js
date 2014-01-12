'use strict';

/*
 *  Total Recall Application
 *  - Create application
 *  - Router configuration
*/

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

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
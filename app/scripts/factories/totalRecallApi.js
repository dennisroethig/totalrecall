'use strict';

angular.module('totalrecallApp')

    .factory('TotalRecallApi', function ($http, $q) {
        
        var domain = 'http://totalrecall.99cluster.com',
            gameId;

        return {

            startGame: function (name, email) {

                var deferred = $q.defer();

                $http({

                    method: 'POST',

                    // TODO: Check for alternatives
                    // Thanks to Safari blocking CORS redirects, we need to use a CORS proxy to get that submit going...

                    // url: domain + '/games/',

                    url: 'http://cors-anywhere.herokuapp.com/totalrecall.99cluster.com/games/',

                    data: 'name=' + name + '&email=' + email,

                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }

                })

                .success(function(response) {

                    var cards = [],
                        width = response.width,
                        height = response.height;

                    for (var i = 0; i < height; i++) {

                        for (var j = 0; j < width; j++) {

                            cards.push({
                                x: j,
                                y: i,
                                resolved: false,
                                icon: ''
                            });

                        }

                    }

                    gameId = response.id;

                    deferred.resolve({
                        gameId: gameId,
                        cards: cards
                    });

                });

                return deferred.promise;

            },

            guess: function (x, y) {

                var deferred = $q.defer();

                $http({

                    method: 'GET',

                    url: domain + '/games/' + gameId + '/cards/' + x + ',' + y,


                }).success(function(response) {

                    deferred.resolve(response);

                });

                return deferred.promise;

            }

        };
    });




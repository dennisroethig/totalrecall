'use strict';

/*  
 *  Total Recall API
 *  - Provides controller with API service to 'totalrecall.99cluster.com'
 *
 *  - startGame(name, email)
 *  - - CORS proxy (http://cors-anywhere.herokuapp.com/) is used to get Safari and
 *  - - Mobile Safari working. Current browser implementation is not working with
 *  - - current server setup.
 *  
 *  - endGame(remainingCards)
 *
 *  - guess(x, y)
 */

angular.module('totalrecallApp')

    .factory('TotalRecallApi', function ($http, $q) {
        
        var domain = 'http://totalrecall.99cluster.com',
            gameId;

        return {

            startGame: function (name, email) {

                var deferred = $q.defer();

                $http({

                    method: 'POST',

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

            endGame: function (remainingCards) {

                var deferred = $q.defer(),
                    postData = '';

                remainingCards.forEach(function (card, key) {
                    postData += 'x' + (key+1) + '=' + card.x + '&';
                    postData += 'y' + (key+1) + '=' + card.y + '&';
                });

                $http({
                    method: 'POST',
                    url: domain + '/games/' + gameId + '/end',
                    data: postData.slice(0, - 1),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(response) {

                    deferred.resolve(response);

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




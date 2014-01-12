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
        
        // Set API domain
        var domain = 'http://totalrecall.99cluster.com',
            gameId;

        return {

            // START GAME REQUEST
            startGame: function (name, email) {

                var deferred = $q.defer();

                // POST request with name & email as data
                $http({

                    method: 'POST',

                    // CORS workaround
                    // url: domain + '/games/',
                    url: 'http://cors-anywhere.herokuapp.com/totalrecall.99cluster.com/games/',

                    data: 'name=' + name + '&email=' + email,

                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }

                })

                // Success callback
                .success(function(response) {

                    var cards = [],
                        width = response.width,
                        height = response.height;

                    // Create card model from response and push to array
                    for (var y = 0; y < height; y++) {
                        for (var x = 0; x < width; x++) {

                            cards.push({
                                x: x,
                                y: y,
                                matched: false,
                                icon: ''
                            });

                        }
                    }

                    // Share gameId across different requests
                    gameId = response.id;

                    // Provide promise with data: gameId & cards array
                    deferred.resolve({
                        name: name,
                        email: email,
                        gameId: gameId,
                        cards: cards
                    });

                });

                // Return promise to calling function
                return deferred.promise;

            },

            // END GAME REQUEST
            endGame: function (remainingCards) {

                var deferred = $q.defer(),
                    postData = '';

                // Provide request data as string
                remainingCards.forEach(function (card, key) {
                    postData += 'x' + (key+1) + '=' + card.x + '&';
                    postData += 'y' + (key+1) + '=' + card.y + '&';
                });

                // POST request using remaining cards coordinates
                $http({
                    method: 'POST',
                    url: domain + '/games/' + gameId + '/end',
                    data: postData.slice(0, - 1),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })

                // Success callback
                .success(function(response) {

                    // Provide promise with data
                    deferred.resolve(response);

                });

                // Return promise to calling function
                return deferred.promise;

            },

            // MAKE GUESS REQUEST
            guess: function (x, y) {

                var deferred = $q.defer();

                // GET request for a single caard using card coordinates
                $http({

                    method: 'GET',

                    url: domain + '/games/' + gameId + '/cards/' + x + ',' + y,

                }).success(function(response) {

                    // Provide promise with data
                    deferred.resolve(response);

                });

                // Return promise to calling function
                return deferred.promise;

            }

        };
        
    });




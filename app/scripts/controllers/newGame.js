'use strict';

/*  
 *  New Game Controller
 *  - Start a new Game
 *  - Assign name and email from inputs
 *  - Submit to API and receive game information
 */

angular.module('totalrecallApp')

    .controller('NewGameCtrl', function ($scope, $rootScope, $location, TotalRecallApi, GameInfo, Highscores) {

        // SCOPE VARIABLES
        $scope.userName = '';
        $scope.userEmail = '';

        // Set initial Highscores
        $scope.highscores = Highscores.get();

        // LISTEN FOR 'NEW GAME' CLICK
        $scope.startGame = function () {

            // Get name & email from templates
            var name = $scope.userName,
                email = $scope.userEmail,
                request;

            // Make errors vissible when user tried to submit invalid data
            $scope.submitted = true;

            // name && email is filled out, request new game
            if (name && email) {

                // Trigger Overlay with 'Loading...'
                $rootScope.$broadcast('overlay:show', {
                    title: 'Loading...'
                });

                // API class
                request = TotalRecallApi.startGame(name, email);

                // Promise
                request.then(function (response) {

                    // Assign game data to provider object
                    GameInfo.data = response;

                    // Redirect to play page
                    $location.path('/play');

                    // Trigger 'overlay:hide' event
                    $rootScope.$broadcast('overlay:hide', {});

                });

            }

        };


    });
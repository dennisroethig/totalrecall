'use strict';

/*  
 *  New Game Controller
 *  - Start a new Game
 *  - Assign name and email from inputs
 *  - Submit to API and receive game information
 */

angular.module('totalrecallApp')

    .controller('NewGameCtrl', function ($scope, $rootScope, $location, TotalRecallApi, GameInfo) {

        $scope.userName = 'dennis';
        $scope.userEmail = 'roethig.dennis@gmail.com';

        $scope.startGame = function () {

            var name = $scope.userName,
                email = $scope.userEmail,
                request;

            $rootScope.$broadcast('overlay:show', {
                title: 'Loading...',
                // text: 'Overlay text text text text text text',
                // cta: {
                //     text: 'button text',
                //     className: 'primary',
                //     event: 'overlay:hide'
                // }
            });

            if (name && email) {

                request = TotalRecallApi.startGame(name, email);

                request.then(function (response) {

                    GameInfo.data = {
                        gameId: response.gameId,
                        cards: response.cards
                    };

                    $location.path('/play');
                    $rootScope.$broadcast('overlay:hide', {});

                });

            }

        };


    });
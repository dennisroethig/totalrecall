'use strict';

angular.module('totalrecallApp')

    .controller('NewGameCtrl', function ($scope, $location, TotalRecallApi, GameInfo) {

        $scope.userName = 'dennis';
        $scope.userEmail = 'roethig.dennis@gmail.com';

        $scope.startGame = function () {

            var name = $scope.userName,
                email = $scope.userEmail,
                request;

            if (name && email) {

                request = TotalRecallApi.startGame(name, email);

                request.then(function (response) {

                    console.log('');
                    console.log('----- GAME STARTED - ' + response.cards.length+ ' cards -----');
                    console.log('>>>', name, email);
                    console.log('>>>', response.gameId);

                    GameInfo.data = {
                        gameId: response.gameId,
                        cards: response.cards
                    };

                    $location.path('/play');

                });

            }

        };


    });
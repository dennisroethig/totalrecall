'use strict';

angular.module('totalrecallApp')

    .controller('GameCtrl', function ($scope, $location, $http, TotalRecallApi, Icons, GameInfo, Timer) {

        var gameUrl = 'http://totalrecall.99cluster.com',
            currentStep = 0,
            currentCards = [],
            gameId;

        $scope.gameData = GameInfo.data;

        if (!$scope.gameData) {
            $location.path('/new');
            return;
        }
        
        $scope.level = 1;
        $scope.solved = 0;
        $scope.timerProgress = 0;
        $scope.guessCount = 0;
        $scope.cards = $scope.gameData.cards;
        $scope.pointsTotal = 10000;

        gameId = $scope.gameData.gameId;

        Timer.start($scope);


        $scope.$watch('guessCount', function () {

            if ($scope.guessCount > 0) {
                $scope.pointsTotal = $scope.pointsTotal - 100;
            }

        });

        $scope.$watch('solved' , function () {

            var remainingCards,
                postData;

            remainingCards = $scope.cards.filter(function( obj ) {
                return obj.resolved === false;
            });

            if (remainingCards.length === 2) {

                postData = 'x1=' + remainingCards[0].x;
                postData += '&y1=' + remainingCards[0].y;
                postData += '&x2=' + remainingCards[1].x;
                postData += '&y2=' + remainingCards[1].y;

                $http({
                    method: 'POST',
                    url: gameUrl + '/games/' + gameId + '/end',
                    data: postData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(response, status) {

                    console.log(response, status);

                    // TODO: SHOW ALL CARDS

                    // TODO: SHOW WIN MESSAGE

                }).error(function(response, status) {

                    console.log(response, status);

                    // TODO: SHOW CONNECTION ERROR

                });

            }

        });

        $scope.checkCard = function (card) {

            if (!card.resolved) {

                if (currentStep < 2) {

                    currentStep++;
                    makeGuess(card);

                } else if (currentCards.length) {

                    currentCards[0].state = '';
                    currentCards[1].state = '';
                    currentCards = [];
                    currentStep = 1;
                    makeGuess(card);

                } else {

                    currentStep = 1;
                    makeGuess(card);

                }

            }

        };


        function makeGuess(card) {

            card.loading = true;

            var request = TotalRecallApi.guess(card.x, card.y);

            request.then(function (response) {

                card.state = 'flipped';
                card.value = response;
                card.icon = Icons[card.value];
                card.loading = false;
                currentCards.push(card);

                if (currentCards[1] && currentCards[0].value === currentCards[1].value) {
                    $scope.solved++;
                    currentCards[0].resolved = true;
                    currentCards[1].resolved = true;
                    currentCards[0].state = 'solved';
                    currentCards[1].state = 'solved';
                    currentCards = [];

                    $scope.level++;
                    Timer.reset($scope);

                } else if (currentCards[1] && currentCards[0].value !== currentCards[1].value) {

                    $scope.guessCount++;

                }

            });

        }

    });













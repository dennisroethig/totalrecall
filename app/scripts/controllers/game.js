'use strict';

angular.module('totalrecallApp')

    .controller('GameCtrl', function ($scope, $rootScope, $location, $http, TotalRecallApi, Icons, GameInfo, Timer) {

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
        $scope.score = 10000;

        gameId = $scope.gameData.gameId;

        Timer.start($scope);


        $scope.$watch('guessCount', function () {

            if ($scope.guessCount > 0) {
                $scope.score = $scope.score - 100;
            }

        });

        $scope.$watch('solved' , function () {

            var postData = '',
                remainingCards;

            remainingCards = $scope.cards.filter(function( obj ) {
                return obj.resolved === false;
            });

            if (remainingCards.length === 2) {

                remainingCards.forEach(function (card, key) {
                    card.state = 'solved';
                    card.resolved = true;
                    postData += 'x' + (key+1) + '=' + card.x + '&';
                    postData += 'y' + (key+1) + '=' + card.y + '&';
                });

                $http({
                    method: 'POST',
                    url: gameUrl + '/games/' + gameId + '/end',
                    data: postData.slice(0, - 1),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).success(function(response, status) {

                    $rootScope.$broadcast('overlay:show', {
                        title: response.message,
                        text: 'Your score: ' + $scope.score,
                        cta: {
                            text: 'Start again',
                            event: 'game:new'
                        }
                    });

                });

            }

        });

        $scope.checkCard = function (card) {

            console.log('currentStep', currentStep);

            if (!card.resolved && !card.flipped) {

                card.flipped = true;

                if (currentStep < 2) {

                    currentStep++;
                    makeGuess(card);

                } else if (currentCards.length) {


                    for (var i = 0; i < currentCards.length; i++) {
                        currentCards[i].state = '';
                        currentCards[i].flipped = false;
                    }

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













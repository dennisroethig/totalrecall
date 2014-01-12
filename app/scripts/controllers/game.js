'use strict';

/*
 *  Game Controller
 *  - Controls the game page
 *  - Recieves data from 'New Game' page (Game Data Provider)
 *  - Starts new game, when game data is avilable
 *  - See detailed documentation inside controller
*/

angular.module('totalrecallApp')

    .controller('GameCtrl', function ($scope, $rootScope, $location, $http, TotalRecallApi, Icons, GameInfo, Timer) {


        // LOCAL VARIABLES
        var cards = {
            loading: false,
            visible: [],
            remaining: []
        };


        // SCOPE VARIABLES

        // Get game info from GameInfo Provider
        $scope.gameData = GameInfo.data;

        // Set initial level to 1
        $scope.level = 1;

        // Set inital Score to 10000
        $scope.score = 10000;

        // Set matched counter to 0
        $scope.matched = 0;

        // Set guesses counter to 0
        $scope.guesses = 0;

        // Set initial cards (scope) to empty
        $scope.cards = [];


        // START GAME
        startGame();


        // LISTEN TO 'GAME OVER' EVENT IF TIME RUNS OUT
        $scope.$on('game:over', function(event) {

            endGame();

        });


        // WATCH GUESS COUNT TO UPDATE SCORE
        $scope.$watch('guesses', function () {

            // Decrease score if at least on guess was made
            if ($scope.guesses > 0) {
                $scope.score = $scope.score - 100;
            }

        });

        // WATCH MATCHED COUNT TO CHECK IF ALL CARDS ARE MATCHED
        $scope.$watch('matched' , function () {

            // Get remaining (not matched) cards
            cards.remaining = $scope.cards.filter(function(card) {
                return !card.matched;
            });

            // If only two card remain => game over
            if (cards.remaining.length === 2) {
                endGame();
            }

        });


        // LISTEN TO CARD-CLICK
        $scope.checkCard = function (card) {

            // If there is no pending request, allow card to be checked
            if (!cards.loading) {

                // If two unmatched cards are already visible, hide them 
                if (cards.visible.length === 2) {

                    // Reset visible cards
                    cards.visible.forEach(function (card, index) {
                        card.state = '';
                    });

                    // Clear visible cards array
                    cards.visible.length = 0;

                }

                // Set cards.loading to prevent further request while guessing
                cards.loading = true;

                // Push card to visible array
                cards.visible.push(card);

                // Make guess (to API)
                makeGuess(card);

            }

        };


        // START GAME
        function startGame() {

            // If Game data is available start game, if not, redirect to 'New Game' page
            if ($scope.gameData) {
                
                // Start timer
                Timer.start($scope);

                // Fill cards (scope) with available cards (displayed in template)
                $scope.cards = $scope.gameData.cards;

            } else {

                $location.path('/new');
                return;

            }

        }

        // END GAME
        function endGame() {

            // API call
            var request = TotalRecallApi.endGame(cards.remaining);
            
            // Promise
            request.then(function (response) {
                
                var message,
                    imageSrc;

                // Stop timer
                Timer.stop();

                // Create Win/Lost message from server response
                if (response.success) {
                    message = 'Your score: ' + $scope.score;
                    imageSrc = 'images/total_recall.jpg';
                } else {
                    message = null;
                    imageSrc = 'images/total_recall_2012.jpg';

                }

                // Trigger Overlay event to Overlay Controller to show 'Game Over' message
                $rootScope.$broadcast('overlay:show', {
                    title: response.message,
                    text: message,
                    image: imageSrc,
                    cta: {
                        text: 'Start again',
                        event: 'game:new'
                    }
                });

            });

        }

        // MAKE GUESS
        function makeGuess(card) {

            // API call
            var request = TotalRecallApi.guess(card.x, card.y);

            // Set card to 'loading'
            card.loading = true;

            // Promise
            request.then(function (response) {

                // Set state to 'flipped' (used in templates to create flipped-class)
                card.state = 'flipped';

                // Set value of card (a, b, c, ...)
                card.value = response;

                // Set icon-class using Icons provider
                card.icon = Icons[card.value];

                // Set card to not 'loading'
                card.loading = false;

                // If two cards are visible compare their values
                if (cards.visible.length === 2) {

                    // If values match go to next level and mark cards as matched, if not increase guess count
                    if (cards.visible[0].value === cards.visible[1].value) {
                        nextLevel();
                    } else {
                        $scope.guesses++;
                    }

                }

                // Set cards.loading to false to allow the next card click
                cards.loading = false;

            });

        }

        // GO TO NEXT LEVEL
        function nextLevel() {

            // Update scope (matched count && Level)
            $scope.matched++;
            $scope.level++;

            // Set matched cards to matched
            cards.visible.forEach(function (card, index) {
                card.state = 'matched';
                card.matched = true;
            });

            // Clear visible cards array
            cards.visible.length = 0;

            // Reset timer for next Level
            Timer.reset($scope);

        }

    });













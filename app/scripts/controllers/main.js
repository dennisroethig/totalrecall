'use strict';

angular.module('totalrecallApp')

    .controller('MainCtrl', function ($scope, $http) {

        var gameUrl = 'http://totalrecall.99cluster.com',
            currentStep = 0,
            currentCards = [],
            icons = [],
            total;

        icons.a = 'fa-dribbble';
        icons.b = 'fa-html5';
        icons.c = 'fa-twitter';
        icons.d = 'fa-android';
        icons.e = 'fa-dropbox';
        icons.f = 'fa-windows';
        icons.g = 'fa-apple';
        icons.h = 'fa-github';
        icons.i = 'fa-css3';
        icons.j = 'fa-instagram';
        icons.k = 'fa-linux';
        icons.l = 'fa-stack-exchange';
        icons.m = 'fa-pinterest';
        icons.n = 'fa-bitbucket';
        icons.o = 'fa-skype';


        $scope.solved = 0;
        $scope.guessCount = 0;
        $scope.cards = [];
        
        $scope.$watch('solved' , function () {

            var remainingCards,
                postData;

            remainingCards = $scope.cards.filter(function( obj ) {
                return obj.resolved === false;
            });

            console.log('test', remainingCards.length, remainingCards);

            if (remainingCards.length === 2) {

                postData = 'x1=' + remainingCards[0].x;
                postData += '&y1=' + remainingCards[0].y;
                postData += '&x2=' + remainingCards[1].x;
                postData += '&y2=' + remainingCards[1].y;

                $http({
                    method: 'POST',
                    url: gameUrl + '/games/' + $scope.gameId + '/end',
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



        $scope.doSubmit = function () {

            

            $http({

                method: 'POST',

                url: gameUrl + '/games/',

                // TODO: GET NAME AND EMAIL FROM FORM
                data: 'name=dennis&email=roethig.dennis@gmail.com',

                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            })

            .success(function(response, status) {
                
                console.log(response, status);

                // TODO: REFACTOR

                var width = response.width,
                    height = response.height;

                $scope.gameId = response.id;

                total = width * height;

                for (var i = 0; i < height; i++) {

                    for (var j = 0; j < width; j++) {

                        $scope.cards.push({
                            x: j,
                            y: i,
                            resolved: false,
                            icon: ''
                        });

                    }

                }
                
            })

            .error(function(response, status) {
                
                console.log(response, status);

                // TODO: SHOW CONNECTION ERROR

            });


        };


        $scope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };


        function makeGuess(card) {

            $http({
                method: 'GET',
                url: gameUrl + '/games/' + $scope.gameId + '/cards/' + card.x + ',' + card.y,
            }).success(function(response, status) {
                
                console.log(response, status);

                card.status = 'visible';
                card.value = response;
                card.icon = icons[card.value];
                currentCards.push(card);

                if (currentCards[1] && currentCards[0].value === currentCards[1].value) {
                    $scope.solved++;
                    currentCards[0].resolved = true;
                    currentCards[1].resolved = true;
                    currentCards[0].status = 'solved';
                    currentCards[1].status = 'solved';
                    currentCards = [];
                } else if (currentCards[1] && currentCards[0].value !== currentCards[1].value) {

                    $scope.guessCount++;

                }

                    
            });

        }

        $scope.check = function (card) {

            // TODO: REFACTOR

            console.log('currentStep', currentStep);
            

            if (card.resolved) {
                return;
            }


            if (currentStep < 2) {
                
                currentStep++;
                makeGuess(card);
                

            } else if (currentCards.length) {

                currentCards[0].status = '';
                currentCards[1].status = '';
                currentCards = [];
                currentStep = 1;
                makeGuess(card);

            } else {

                currentStep = 1;
                makeGuess(card);

            }


        };



    });

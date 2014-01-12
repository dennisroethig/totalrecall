'use strict';

/*
 *  Timer
 *  - Start Timer when games start
 *  - Reset Timer if next card match is found before time runs out
 *  - Speed increases with increasing game level
 *  - If time runs out, 'game:over' event will be triggered
*/

angular.module('totalrecallApp')
    
    .factory('Timer', function ($rootScope) {
        
        var interval = 1000,
            timer;

        return {

            start: function (scope) {

                // reset progress on start
                scope.timerProgress = 0;

                // create new timer
                timer = setInterval(function () {
                    
                    // if progress is not complete (100%), increase progress
                    if (scope.timerProgress < 100) {

                        scope.timerProgress += scope.level/2;

                        if (scope.timerProgress > 100) {
                            scope.timerProgress = 100;
                        }

                    }

                    // if progress is complete, end game
                    else {

                        clearInterval(timer);
                        $rootScope.$broadcast('game:over', {});

                    }

                    // apply changes to scope to make them visible
                    scope.$apply();

                }, interval);

            },

            reset: function (scope) {

                // clear current timer
                clearInterval(timer);

                // start a new timer
                this.start(scope);

            }


        };
    });
'use strict';

/*
    Start and reset Timer, to control Level activities
*/

angular.module('totalrecallApp')
    
    .factory('Timer', function () {
        
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

                    // if progress is complete, reset progress and deduct points
                    else {
                        scope.timerProgress = 0;
                        scope.level++;
                        scope.pointsTotal = scope.pointsTotal - 1000;
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
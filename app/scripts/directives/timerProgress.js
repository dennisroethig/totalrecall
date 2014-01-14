'use strict';

/*
 *  Timer Progress Directive
 *  - Displays timer progress bar with specific width as soon as 'scope.timerProgress' changes
*/

angular.module('totalrecallApp')
    
    .directive('timerProgress', function() {
        
        return function(scope, element, attrs) {
            
            scope.$watch('timerProgress', function(value) {
                element.html('<div class="timer__progress" style="width:' + value + '%;"></div>');
            });

        };

    });
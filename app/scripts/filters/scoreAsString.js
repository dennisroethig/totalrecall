'use strict';

/*
 *  Score Filter
 *  - Provide Score as String
 *  - Format: '10000', '07199', '00250', ...
*/

angular.module('totalrecallApp').filter('scoreAsString', function () {
    return function (number) {

        // If no number is provided return
        if (!number) { return; }

        // Create array from string and check for missing digits
        var asArray = number.toString().split(''),
            missing = 5 - asArray.length;

        // If digits are missing, attach '0' in front to keep 5 digits
        if (missing) {

            for (var i = 0; i < missing; i++) {
                asArray.unshift('0');
            }

        }

        // Return adjsuted array as string
        return asArray.join('');

    };
});
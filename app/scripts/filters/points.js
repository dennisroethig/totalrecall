'use strict';

angular.module('totalrecallApp').filter('points', function () {
    return function (number) {

        if (!number) { return; }

        var asArray = number.toString().split(''),
            missing = 5 - asArray.length;

        if (missing) {

            asArray = asArray;

            for (var i = 0; i < missing; i++) {
                asArray.unshift('0');
            }

        }

        return asArray.join('');

    };
});
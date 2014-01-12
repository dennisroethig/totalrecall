'use strict';

/*
 *  Highscores Provider
 *  - Provide highscores from localStorage if available
*/

angular.module('totalrecallApp')
    
    .factory('Highscores', function () {


        return {

            // get available highscores
            get: function () {

                return JSON.parse(localStorage.getItem('totalRecall.highscores'));

            },

            // set a new score into available highscores
            set: function (newScore) {

                var highscores = JSON.parse(localStorage.getItem('totalRecall.highscores')) || [];

                highscores.push(newScore);

                localStorage.setItem('totalRecall.highscores', JSON.stringify(highscores));

                return true;

            }

        };

    });
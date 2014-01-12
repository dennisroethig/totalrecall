'use strict';

/*  
 *  Overlay Controller
 *  - Show and hide overlay
 *  - Assign broadcasted content to overlay elements
 *  -- Title: content.title
 *  -- Text: content.text
 *  -- Call to action: content.cta
 *  --- Text: content.cta.text
 *  --- ClassName: content.cta.className
 *  --- Event: content.cta.event
 */

angular.module('totalrecallApp')

    .controller('OverlayCtrl', function ($scope, $rootScope, $location) {

        // LISTEN TO 'OVERLAY:SHOW' EVENT
        $scope.$on('overlay:show', function(event, content) {

            showOverlay(content);

        });

        // LISTEN TO 'OVERLAY:HIDE' EVENT
        $scope.$on('overlay:hide', function(event, content) {

            // Hide overlay
            hideOverlay();

        });


        // LISTEN TO 'GAME:NEW' EVENT
        $scope.$on('game:new', function(event, content) {

            // Hide overlay
            hideOverlay();

            // Redirect to 'New Game' page
            $location.path('/new');

        });


        // LISTEN TO CALL-TO-ACTION CLICK FROM OVERLAY
        $scope.ctaClicked = function (broadcastEvent) {

            // Trigger broadcast event assigned to overlay button
            $rootScope.$broadcast(broadcastEvent, {});

        };


        // SHOW OVERLAY
        function showOverlay(content) {
            $scope.title = content.title;
            $scope.text = content.text;
            $scope.cta = content.cta;
            $scope.className = 'overlay--visible';
        }

        // HIDE OVERLAY
        function hideOverlay() {
            $scope.title = null;
            $scope.text = null;
            $scope.cta = null;
            $scope.className = '';
        }

    });
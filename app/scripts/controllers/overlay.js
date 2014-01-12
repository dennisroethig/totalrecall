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

        $scope.$on('overlay:show', function(event, content) {

            showOverlay(content);

        });

        $scope.$on('overlay:hide', function(event, content) {

            hideOverlay();

        });

        $scope.$on('game:new', function(event, content) {

            hideOverlay();
            $location.path('/new');

        });

        $scope.ctaClicked = function (broadcastEvent) {

            $rootScope.$broadcast(broadcastEvent, {});

        };

        function showOverlay(content) {
            $scope.title = content.title;
            $scope.text = content.text;
            $scope.cta = content.cta;
            $scope.className = 'overlay--visible';
        }

        function hideOverlay() {
            $scope.title = null;
            $scope.text = null;
            $scope.cta = null;
            $scope.className = '';
        }

    });
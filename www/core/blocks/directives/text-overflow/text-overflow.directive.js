angular.module('directives.module')
    .directive('textOverflow', function() {
        return {
            restrict: 'EA',
            templateUrl: "core/blocks/directives/text-overflow/text-overflow.directive.html",
            transclude: true,
            scope: {
                tags: '='
            },
            controller: function($scope, $element) {
                $scope.height = $element.prop('offsetHeight');
                $scope.width = $element.prop('offsetWidth');
                console.log($scope.tags, $scope.height, $scope.width);
            }
        };
    });
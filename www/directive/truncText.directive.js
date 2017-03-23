;(function () {
    angular.module('directive.truncText', [])
        .directive('truncText', truncText);

    truncText.$inject = ['$filter'];

    function truncText($filter) {
        return {
            restrict: 'AE',
            scope: {
                limit: '@',
                moreText: '@',
                text: '='
            },
            template: '<p class="text" ng-click="changeLimit()">{{text | limitTo: localLimit}}</p><p style="color: #ccc; text-align: center;" ng-click="changeLimit()" ng-show="text.length > localLimit && localLimit == limit"> {{moreText}} </p>',
            link: function (scope) {

                scope.localLimit = scope.limit;

                scope.changeLimit = function () {
                    if(scope.localLimit == Infinity) {
                        scope.localLimit = scope.limit;
                    } else {
                        scope.localLimit = Infinity;
                    }
                }
            }
        };
    }
})();

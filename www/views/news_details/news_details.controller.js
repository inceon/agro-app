/**
 * Controller for viewing a news details
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('NewsDetails', NewsDetails);

    NewsDetails.$inject = ['$rootScope', '$state'];

    function NewsDetails($rootScope, $state) {
        var vm = this;
        vm.data = {
            header: 'Новітня технологія збору пшениці',
            date: new Date(),
            img: 'img/cm_5Wvf1VuE.jpg',
            text: 'За морфологічними особливостями види пшениці об\'єднують у дві групи: пшениці справжні, або голозерні і полб\'яні, або плівчасті. Плівчасті, на відміну від голозерних, утворюють ламкий колос, який у достиглому стані при легкому надавлюванні ламається на окремі колоски з зерном разом із члениками стрижня. При обмолочуванні голозерних пшениць у бункер комбайна надходить зерно без лусок.'
        }
    }
})();

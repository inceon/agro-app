(function () {
    "use strict";

    angular
        .module('app')
        .controller('Profile', Profile);

    Profile.$inject = ['$rootScope', 'toastr', 'user', 'files'];

    function Profile($rootScope, toastr, user, files) {

        var vm = this;

        user.me()
            .then(function (res) {
                vm.data = res;
            });
        vm.save = save;

        function save() {
            if (vm.data.password && vm.data.password != vm.data.rpassword) {
                toastr.error('Паролі не однакові');
            } else if (vm.file) {
                files.upload(vm.file)
                    .then(function (res) {
                        vm.data.photo = res.url;
                        user.save(vm.data)
                            .then(function (res) {
                                console.log(res);
                            })
                    })
            } else {
                user.save(vm.data)
                    .then(function (res) {
                        console.log(res);
                    })
            }

        }

    }
})();

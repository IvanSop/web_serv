angular.module('myApp').controller('homepageController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {

            $scope.isAdmin = AuthService.isAdmin();
            
            $scope.getCurrentUsername = function () {

                AuthService.getUserStatus()
                    .then(function (user) {
                        $scope.username = user.data.status.username;
                    });

            };
            $scope.getCurrentUsername();
            
        }]);
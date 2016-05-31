angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

        
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          //console.log("SUCCESS login");
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          //console.log("FAILURE login");
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {
      
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          //console.log("SUCCESS register");
          $location.path('/');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          //console.log("FAILURE register");

          $scope.error = true;
          $scope.errorMessage = AuthService.getErrMsg();//"Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

angular.module('myApp').controller('projectController',
  ['$scope', '$http', '$timeout', 'AuthService', 
  function($scope, $http, $timeout, AuthService) {

    $scope.isAdmin = AuthService.isAdmin();
    $scope.idSelectedItem = null;
    $scope.setSelected = function (idSelectedItem) {
      console.log(idSelectedItem)
      $scope.idSelectedItem = idSelectedItem;
    };



    $scope.allProjects = [];

    $scope.getAllProjects = function () {
      $http.post("/getAllProjects")
      .then(function(response) {
        $scope.allProjects = response.data.data;
        //
      },function(response) {
        //
      }); 
    }
      
    $scope.getAllProjects();

    $scope.createProject = function () {
      console.log($scope.project);
      $timeout(function() { $scope.showMessage = false; }, 1000);
      $http.post("/createProject", $scope.project)
      .then(function(response) {
        $scope.allProjects.push(angular.copy($scope.project));
        $scope.status = response.data.ret;
        $scope.showMessage = true;
        console.log(response.data.ret);
      },function(response) {
        $scope.status = response.data.err;
        $scope.showMessage = true;
        console.log("err");
      });
    };
}]);
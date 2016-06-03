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
  ['$scope', '$http', '$timeout', 'AuthService', '$filter',
  function($scope, $http, $timeout, AuthService, $filter) {

    $scope.userToAdd = "";
    $scope.addUser = function () {
        $scope.selectedProject.assigned_members.push($scope.userToAdd);
    }
    // select and show details of project
    $scope.showDetails = function(name) {
      var found = $filter('filter')($scope.allProjects, {name: name}, true);
      if (found.length) {
             $scope.selectedProject = found[0];
             // make a copy, when we want to edit it
             $scope.selectedProjectNew = angular.copy($scope.selectedProject);
             //console.log($scope.selectedProject);
      } else {
             $scope.selectedProject = 'Not found';
      }
    }

    // removes user from list of assigned members on project
    $scope.removeUser = function(list, user) {
      list.splice(list.indexOf(user), 1);
    }

    // check if user is admin, used not to show certain content
    $scope.isAdmin = AuthService.isAdmin();
    
    // for selecting project in list, makes it red
    $scope.idSelectedItem = null;
    $scope.setSelected = function (idSelectedItem) {
      //console.log(idSelectedItem)
      $scope.idSelectedItem = idSelectedItem;
    };

    $scope.editClick = function() {

      //console.log($scope.allUsers);
      console.log($scope.allProjects);
      console.log("Old obj: ", $scope.selectedProject);

      $scope.selectedProject.name = $scope.selectedProjectNew.name;
      
      //console.log("New obj: ", $scope.selectedProjectNew);
    }



    $scope.allProjects = [];
    $scope.allUsers = [];

    // gettin all projects from API FIXME add check for admin, user shoulntd know this
    $scope.getAllProjects = function () {
      $http.post("/getAllProjects")
      .then(function(response) {
        $scope.allProjects = response.data.data;
        //
        //console.log($scope.allProjects);
      },function(response) {
        //
      }); 
    }
     
    // gets all users from api, FIXME add check for admin, user shoulntd know this 
    $scope.getAllUsers = function () {
      $http.post("/getAllUsers")
      .then(function(response) {
        $scope.allUsers = response.data.data;
       
      })
    }

     // call get all projects on load  
    $scope.getAllProjects();
    $scope.getAllUsers();
    
    // create new project, add it to list and send it to server also
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
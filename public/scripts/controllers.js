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

    // this is for adding user as member on project
    $scope.userToAdd = "";
    // now its generic add elemnt to array
    $scope.addUser = function (array, element) {
        //$scope.selectedProject.assigned_members.push($scope.userToAdd);
        // add if that user exists
        var found = $filter('filter')($scope.allUsers, {username: element}, true);
        // add only if its not already added
        if (array.indexOf(element) == -1 && found.length) {
          array.push(element);
        }
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

    // removes item from list, is used for removing users from project and for removing projects
    $scope.removeFromList = function(list, user) {
      list.splice(list.indexOf(user), 1);
    }

    // check if user is admin, used not to show certain content
    $scope.isAdmin = AuthService.isAdmin();
    
    // for selecting project in list, makes it red, FIXME: when name is changed, it dissapears
    $scope.idSelectedItem = null;
    $scope.setSelected = function (idSelectedItem) {
      //console.log(idSelectedItem)
      $scope.idSelectedItem = idSelectedItem;
    };

    // called on edit btn click, will also send data to server FIXME
    $scope.editClick = function() {
      $scope.selectedProject.name = $scope.selectedProjectNew.name;
      //console.log($scope.selectedProject)
      $http.post("/updateProject", {project: $scope.selectedProject})
      .then(function(response) {
        console.log("then: ", response.data.data);
      },
      function(response) {
        console.log("errpr", response.data.data);
      })
    }

    $scope.deleteProject = function() {
        $http.post("/deleteProject", {project: $scope.selectedProject})
        .then(function(response) {
          // remove from local list
          $scope.removeFromList($scope.allProjects, $scope.selectedProject);
          $scope.selectedProject = undefined;
        },
        function(response) {

        });
        
    }


    // these are objects, not strings
    $scope.allProjects = [];
    // aslo objects
    $scope.allUsers = [];

    // gettin all projects from API FIXME add check for admin, user shoulntd know this, there should be separate function that gets only projects where user is assigned
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

     // call get all projects and users on load  
    $scope.getAllProjects();
    $scope.getAllUsers();
    
    // create new project, add it to list and send it to server 
    $scope.createProject = function () {
      $timeout(function() { $scope.showMessage = false; }, 1000);
      $http.post("/createProject", $scope.project)
      .then(function(response) {
        // add to local list
        $scope.project.assigned_members = [];
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
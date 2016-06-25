angular.module('myApp').controller('projectController',
    ['$scope', '$http', '$timeout', 'AuthService', '$filter', 'ProjectService',
        function ($scope, $http, $timeout, AuthService, $filter, ProjectService) {

            var self = this;

            // this is for adding user as member on project
            self.userToAdd = "";
            // now its generic add elemnt to array
            self.addUser = function (array, element) {
                //$scope.selectedProject.assigned_members.push($scope.userToAdd);
                // add if that user exists
                var found = $filter('filter')(self.allUsers, {username: element}, true);
                // add only if its not already added
                if (array.indexOf(element) == -1 && found.length) {
                    array.push(element);
                }
            }
            // select and show details of project
            self.showDetails = function (name) {
                // good way to find objects in array by property
                var found = $filter('filter')(self.allProjects, {name: name}, true);
                if (found.length) {
                    self.selectedProject = found[0];
                    console.log(self.selectedProject);
                    // make a copy, when we want to edit it
                    self.selectedProjectNew = angular.copy(self.selectedProject);
                    //console.log($scope.selectedProject);
                } else {
                    self.selectedProject = 'Not found';
                }
            }

            // removes item from list, is used for removing users from project and for removing projects
            self.removeFromList = function (list, user) {
                list.splice(list.indexOf(user), 1);
            }

            // check if user is admin, used not to show certain content
            self.isAdmin = AuthService.isAdmin();

            // for selecting project in list, makes it red, FIXME: when name is changed, it dissapears
            self.idSelectedItem = null;
            self.setSelected = function (idSelectedItem) {
                //console.log(idSelectedItem)
                self.idSelectedItem = idSelectedItem;
            };

            // called on edit btn click, FIXME: no check if new project name already exists TODO: show something like success msg or err on callback
            // this could be called whenever a change is made so you dont have to click 'edit' btn to send changes to server, TODO
            self.editClick = function () {
                self.selectedProject.name = self.selectedProjectNew.name;
                console.log("sel proj - ", self.selectedProject);
                ProjectService.editProject(self.selectedProject)
                    .then(function (response) {
                        console.log(response);
                    }, function (response) {
                        console.log(response);
                    });
            }
            
            self.confirmDeletion = function () {
                if (confirm('Are you sure you want to delete selected project?')) {
                    self.deleteProject();
                } else {
                }
            }

            self.deleteProject = function () {
                ProjectService.deleteProject(self.selectedProject)
                    .then(function (response) {
                        self.selectedProject = undefined;
                        console.log(response);
                        //self.allProjects.splice(self.allProjects.indexOf(response), 1)
                    }, function (response) {
                        console.log("err removing project");
                    });

            }

            // these are objects
            self.allProjects = [];

            // aslo objects
            self.allUsers = [];

            // call get all projects and users on load
            ProjectService.getAllProjects()
                .then(function (response) {
                    self.allProjects = ProjectService.getAllProjectList();
                    //self.allProjects = ProjectService.allProjectList;
                    //angular.copy(ProjectService.getAllProjectList(), self.allProjects)
                    //console.log(ProjectService.getAllProjectList());
                }, function (response) {
                    // on failure
                });

            AuthService.getAllUsers()
                .then(function (response) {
                    self.allUsers = response;
                }, function (response) {
                    // on failure
                });


            // create new project, add it to list and send it to server
            self.createProject = function () {
                // timeout for error message
                $timeout(function () {
                    self.showMessage = false;
                }, 1000);

                // sending it to api
                // this $scope.project is just string, sloppy, additional stuff is created in service
                console.log(self.project);
                ProjectService.createProject(self.project)
                    .then(function (response) {
                        self.status = "Project created";
                        self.showMessage = true;
                        console.log("kontorler");
                        console.log(self.allProjects);
                    }, function (response) {
                        self.status = response;
                        self.showMessage = true;
                    })
            };
        }]);
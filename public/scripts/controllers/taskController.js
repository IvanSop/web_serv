angular.module('myApp').controller('taskController',
    ['$scope', '$http', '$timeout', 'AuthService', '$filter', 'ProjectService', 'TaskService', 'CommentService',
        function ($scope, $http, $timeout, AuthService, $filter, ProjectService, TaskService, CommentService) {
            var self = this;

            self.init = function () {

                self.allProjects = []
                self.selectedId = 'undefined';
                self.allTaskStatuses = [];
                self.allTaskPriorities = [];
                self.allUsers = [];
                self.task = {};
                self.task.creator = 'asdff';
                
                self.commentFormVisible = false;
                
                self.me = {}

                self.allTasks = [];
                
                self.isAdmin = AuthService.isAdmin()

                // for coloring selected task
                self.idSelectedItem = null;

                AuthService.getUserStatus()
                    .then(function (data) {
                        self.task.creator = data.data.status.username;
                        self.me = data.data.status.username;
                        console.log(data.data.status);
                    }, function (data) {

                    })



                ProjectService.getAllProjects()
                    .then(function(response) {
                        self.allProjects = ProjectService.getAllProjectList();
                    }, function (response) {
                        
                    });
                
                
                TaskService.getTaskStatusOptions()
                    .then(function (response) {
                        console.log("ff");
                        self.allTaskStatuses = response;
                    }, function (response) {
                        console.log("task statuses related error: ", response);
                    });
                TaskService.getTaskPriorityOptions()
                    .then(function (response) {
                        self.allTaskPriorities = response;
                    }, function (response) {
                        console.log('error');
                    })
                AuthService.getAllUsers()
                    .then(function (response) {
                        self.allUsers = response;
                    }, function (response) {
                        // on failure
                    });

                TaskService.getAllTasks()
                    .then(function (response) {
                        self.allTasks = TaskService.getAllTaskList();
                        console.log(self.allTasks);
                    }, function (response) {
                        console.log("get all tasks error in controller");
                    })


            }
            self.init();


            self.newClick = function () {
                self.task = {}
                self.task.creator = angular.copy(self.me)
            }

            // for coloring selected task
            self.setSelected = function (idSelectedItem) {
                //console.log(idSelectedItem)
                self.idSelectedItem = idSelectedItem;
            };



            self.createTask = function () {
               TaskService.createTask(angular.copy(self.task))
                   .then(function(response) {
                       console.log("created successfully");
                       self.task = {}
                       self.task.creator = angular.copy(self.me)
                   }, function(response) {
                       console.log("fail");
                   })
            }

            self.showDetails = function (id) {

                var found = $filter('filter')(self.allTasks, {_id: id}, true);
                if (found.length) {
                    self.selectedTask = found[0]
                    self.selectedId = self.selectedTask._id;
                    //console.log(self.selectedTask);
                    self.task = self.selectedTask
                } else {
                    self.selectedTask = '';
                }
            }
            
            self.editTask = function () {
                self.selectedTask = self.task;
                TaskService.editTask(self.selectedTask)
                    .then(function (response) {
                        console.log(response);
                    }, function (response) {
                        console.log(response);
                    })
            }
            
            self.deleteTask = function () {
                TaskService.deleteTask(self.selectedTask)
                    .then(function (response) {
                        self.selectedTask = 'undefined';
                    })
            }
                

            self.partlyEdit = function () {
                self.selectedTask = self.task;
                TaskService.partlyEdit(self.selectedTask)
                    .then(function (response) {
                        console.log(response);
                    }, function (response) {
                        console.log(response);
                    })
            }

            self.showCommentForm = function () {
                self.commentFormVisible = !self.commentFormVisible;
               
            }


        }]);
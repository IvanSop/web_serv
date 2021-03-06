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
                        self.me = data.data.status;
                        console.log(data.data.status);
                    }, function (data) {

                    })


                ProjectService.getAllProjects()
                    .then(function (response) {
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
                        self.allUsers2 = angular.copy(self.allUsers);
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

            self.filterUsers = function () {
                if (self.completeSelectedProject != undefined) {
                    self.allUsers2 = self.allUsers.filter(function (p) {
                        return self.completeSelectedProject.assigned_members.indexOf(p.username) !== -1;
                    });
                }
            };


            self.idToObjProj = function (currId) {
                var found = $filter('filter')(self.allProjects, {_id: currId}, true);
                if (found.length) {
                    self.completeSelectedProject = found[0];
                    console.log(self.completeSelectedProject);
                } else {
                    self.completeSelectedProject = undefined;
                }
            }
            // clears selected project in drop down list when creating new project, just model that is needed for filtering ..
            self.clearProj = function () {
                self.completeSelectedProject = undefined;
            }


            // show only task for project on which user participates
            self.filteredTasks = function () {
                if (self.allTasks !== undefined) {
                    return self.allTasks.filter(function (p) {
                        return self.me.projects.indexOf(p.project) !== -1;
                    });
                }
            };

            self.newClick = function () {
                self.task = {}
                self.task.creator = angular.copy(self.me.username)
            }

            // for coloring selected task
            self.setSelected = function (idSelectedItem) {
                //console.log(idSelectedItem)
                self.idSelectedItem = idSelectedItem;
            };


            self.createTask = function () {
                if (self.task.project == '' || self.task.project == undefined) {
                    console.log("empty");
                    return;
                }
                TaskService.createTask(angular.copy(self.task))
                    .then(function (response) {
                        console.log("created successfully");
                        self.task = {}
                        self.task.creator = angular.copy(self.me.username)
                    }, function (response) {
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

            self.confirmDeletion = function () {
                if (confirm('Are you sure you want to delete selected task?')) {
                    self.deleteTask();
                } else {
                }
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
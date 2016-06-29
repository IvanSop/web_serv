/**
 * Created by Ivan on 28-Jun-16.
 */
angular.module('myApp').controller('reportController',
    ['$scope', '$http', '$timeout', 'AuthService', '$filter', 'CommentService', 'ProjectService', 'TaskService',
        function ($scope, $http, $timeout, AuthService, $filter, CommentService, ProjectService, TaskService) {
            var self = this;

            self.selectedProject = {};
            self.tasks = {};

            //self.labels = [];
            //self.series = [];
            //self.data = [
            //    []
            //];

            self.col = {
                "colours": [{ // default
                    "fillColor": "rgba(224, 0, 0, 1.0)",
                    "strokeColor": "rgba(207,0,3,1)",
                    "pointColor": "rgba(220,0,0,1)",
                    "pointStrokeColor": "#fff",
                    "pointHighlightFill": "#fff",
                    "pointHighlightStroke": "rgba(151,187,205,1.0)"
                }]
            }

            // self.options = {
            //     title: {
            //         display: true,
            //         text: 'Custom Chart Title'
            //     }
            // }
            self.options = {
                options: {
                    title: {
                        display: true,
                        text: "Percentage of done tasks for users"
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                max: 1,
                                min: 0,
                                stepSize: 0.5
                            }
                        }]
                    }
                }
            }

            var taskCount = 0;

            ProjectService.getAllProjects()
                .then(function (response) {
                    self.allProjects = ProjectService.getAllProjectList();
                    // if (self.allProjects.length > 0) {
                    //     self.selectedProject = self.allProjects[0];
                    // }
                }, function (response) {
                    // on failure
                });

            self.getTasksAndMembers = function () {
                TaskService.getAllTasks()
                    .then(function (response) {
                        self.tasks = TaskService.getAllTaskList();
                        // these are now filtered all tasks for project in combobox
                        self.tasks = self.tasks.filter(function (p) {
                            return self.selectedProject._id.indexOf(p.project) !== -1;
                        });
                        //console.log(self.tasks);
                        taskCount = self.tasks.length;
                        var members = self.selectedProject.assigned_members
                        //console.log(taskCount);
                        //console.log(self.selectedProject.assigned_members);
                        var membersObj = [];
                        for (var member in members) {
                            var membObj = {};
                            membObj.name = members[member];
                            membObj.completeTasks = [];
                            for (var task in self.tasks) {
                                //console.log(self.tasks[task]);
                                if (self.tasks[task].target == members[member] && self.tasks[task].status == 'done') {
                                    console.log("aa");
                                    membObj.completeTasks.push(self.tasks[task]);
                                }
                            }
                            membersObj.push(membObj);

                        }
                        // data for chart
                        self.labels = [];
                        self.data = [];
                        var innerData = [];
                        for (var i = 0; i < membersObj.length; i++) {
                            self.labels.push(membersObj[i].name);
                            innerData.push((membersObj[i].completeTasks.length / taskCount));

                            console.log("data ", innerData);
                            console.log("taskCount ", taskCount);
                            console.log("--- ", membersObj[i].completeTasks.length);
                        }
                        self.data.push(innerData)
                        console.log(membersObj);

                    })
            }

        }]);
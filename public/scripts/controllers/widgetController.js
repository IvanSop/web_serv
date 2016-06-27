/**
 * Created by Ivan on 27-Jun-16.
 */
angular.module('myApp').controller('widgetController',
    ['$scope', '$http', '$timeout', 'AuthService', '$filter', 'ProjectService', 'TaskService', 'CommentService',
        function ($scope, $http, $timeout, AuthService, $filter, ProjectService, TaskService, CommentService) {

            var self = this;
                       
            
            TaskService.getAllTasks()
                .then(function (response) {
                    self.allTasks = TaskService.getAllTaskList();
                    console.log(self.allTasks);
                }, function (response) {
                    console.log("get all tasks error in controller");
                })
            
            self.isAdmin = AuthService.isAdmin();
            
            
        }]);
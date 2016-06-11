/**
 * Created by Ivan on 10-Jun-16.
 */
angular.module('myApp').factory('TaskService',
    ['$q', '$timeout', '$http', 'AuthService', 'ProjectService',
        function ($q, $timeout, $http) {
            var allTasks = [];

            return ({
                getTaskStatusOptions: getTaskStatusOptions,
                getTaskPriorityOptions: getTaskPriorityOptions
            });

            function getTaskStatusOptions() {
                var promise = $http.get("/getTaskStatusOptions")
                    .then(function (response) {
                        //console.log(response.data.list);
                        return response.data.list;
                    }, function (response) {
                        console.log("failed to fetch task options: ", response.data);
                    });
                return promise;
            }
            
            function getTaskPriorityOptions() {
                var promise = $http.get('/getTaskPriorityOptions')
                    .then(function (response) {
                        return response.data.list
                    }, function(response) {
                        console.log("failed to fetch priority options: ", response.data);
                    });
                return promise;
            }

        }]);
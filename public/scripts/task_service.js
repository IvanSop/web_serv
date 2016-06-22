/**
 * Created by Ivan on 10-Jun-16.
 */
angular.module('myApp').factory('TaskService',
    ['$q', '$timeout', '$http', 'AuthService', 'ProjectService',
        function ($q, $timeout, $http) {
            var allTaskList = [];

            return ({
                getTaskStatusOptions: getTaskStatusOptions,
                getTaskPriorityOptions: getTaskPriorityOptions,
                createTask: createTask,
                getAllTasks: getAllTasks,
                getAllTaskList: getAllTaskList,
                editTask: editTask,
                deleteTask: deleteTask,
                partlyEdit: partlyEdit
            });

            function getAllTaskList() {
                return allTaskList;
            }


            function getAllTasks() {
                var promise = $http.post("/getAllTasks")
                    .then(function (response) {
                        allTaskList = response.data.data
                        return response.data.data;
                    }, function (response) {
                        console.log("get all tasks error");
                    })
                return promise;
            }


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
                    }, function (response) {
                        console.log("failed to fetch priority options: ", response.data);
                    });
                return promise;
            }

            function createTask(task) {
                var promise = $http.post('/createTask', {task: task})
                    .then(function (response) {
                        allTaskList.push(response.data.data);
                        return response.data.data;
                    }, function (response) {
                        console.log('error creating task ', response.data);
                    });
                return promise;
            }

            function editTask(task) {
                var promise = $http.post('/editTask', {task: task})
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        return response.data.data;
                    })
                return promise;

            }
            
            function partlyEdit(task) {
                var promise = $http.post('/partlyEdit', {task : task})
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        return response.data.data;
                    })
                return promise;
            }
            
            function deleteTask(task) {
                var promise = $http.post('/deleteTask', {task: task})
                    .then(function (response) {

                        for (var i=0; i<allTaskList.length; i++) {
                            if (allTaskList[i]._id == response.data.data._id) {
                                allTaskList.splice(i, 1);
                                break;
                            }
                        }

                        //allTaskList.splice(allTaskList.indexOf(response.data.data), 1);
                        return response.data.data;
                    }, function (response) {
                        return response.data.data;
                    })
                return promise;
            }

        }]);
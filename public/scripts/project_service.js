angular.module('myApp').factory('ProjectService',
    ['$q', '$timeout', '$http', 'AuthService',
        function ($q, $timeout, $http) {

            var allProjectList = [];
            
            return ({
                getAllProjects: getAllProjects,
                createProject: createProject,
                editProject: editProject,
                deleteProject: deleteProject,
                getAllProjectList: getAllProjectList
            });
            // removes item form list
            function removeFromList(list, element) {
                list.splice(list.indexOf(element), 1);
            }
            // deletes project from local list
            function deleteProjectLocal(project) {
                removeFromList(allProjectList, project);
            }


            function getAllProjectList() {
                return allProjectList;
            }

            // gets all projects from API, // FIXME add check for admin, user shoulntd know this, there should be separate function that gets only projects where user is assigned
            function getAllProjects() {
                var promise = $http.post("/getAllProjects")
                    .then(function (response) {
                        allProjectList = response.data.data;
                        return response.data.data;

                    }, function (response) {
                        // failure
                    });
                return promise;
            }

            // adds it to local list, these Local functions should always be called on api callback
            function createProjectLocal(project, id) {
                project.assigned_members = [];
                project._id = id;
                var proj_copy;
                proj_copy = angular.copy(project)
                allProjectList.push(proj_copy);
            }
            
            
            function createProject(project) {
                var promise = $http.post("/createProject", project)
                    .then(function (response) {
                        createProjectLocal(project, response.data.ret._id);
                        // I guess it syncs controller scope automatically because allProjectList is referenced there 
                        return response.data.ret;
                    }, function (response) {
                        return response.data.ret;
                    });
                return promise;
            }

            function editProject(project) {
                var promise = $http.post("/updateProject", {project: project})
                    .then(function (response) {
                        return response.data.data;
                    }, function (response) {
                        return response.data.data;
                    });
                return promise;
            }

            function deleteProject(project) {
                var promise = $http.post("/deleteProject", {project: project})
                    .then(function (response) {
                        deleteProjectLocal(project);
                        return response.data.data;
                    }, function (response) {
                        return response.data.data;
                    });
                return promise;
            }

        }]);
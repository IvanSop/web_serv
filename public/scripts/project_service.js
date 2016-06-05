angular.module('myApp').factory('ProjectService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

  	return ({
  		getAllProjects: getAllProjects,
  		createProject: createProject,
  		editProject: editProject,
  		deleteProject: deleteProject
  	});

  	// gets all projects from API, // FIXME add check for admin, user shoulntd know this, there should be separate function that gets only projects where user is assigned
  	function getAllProjects() {
  		var promise = $http.post("/getAllProjects")
      	.then(function(response) {
         return response.data.data;

      },function(response) {
        // failure
      }); 
      	return promise;
  	}

  	function createProject(project) {
  		var promise = $http.post("/createProject", project)
      	.then(function(response) {
        	return response.data.ret;
       	},function(response) {
        	return response.data.ret;
      	});
      	return promise;
  	}

  	 function editProject(project) {
  		var promise = $http.post("/updateProject", {project: project})
      	.then(function(response) {
        	return response.data.data;
       	},function(response) {
        	return response.data.data;
      	});
      	return promise;
  	}

  	function deleteProject(project) {
  		 var promise = $http.post("/deleteProject", {project: project})
      	.then(function(response) {
        	return response.data.data;
       	},function(response) {
        	return response.data.data;
      	});
      	return promise;
      }

  }]);
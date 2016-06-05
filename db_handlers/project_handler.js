var Project = require('../models/project');

module.exports = {  
	getAllProjects: function(callback) {
	  	Project.find({}, function(err, data) {
	    	callback({"data": data});
	  	})
	},
	updateProject: function(project, callback) {
		//console.log(project);
		Project.findOneAndUpdate({_id: project._id}, {$set: {name: project.name, assigned_members: project.assigned_members}}, function(err, data) {
			callback({"data": data});
		});
		
	},
	deleteProject: function(project, callback) {
		Project.findOneAndRemove({_id: project._id}, function(err, data) {
			callback({"data": data});
		})
	},
	projectExists: function(project, callback) {
		Project.findOne({name: project}, function(err, data) {
			callback(data);
		})
	}
}
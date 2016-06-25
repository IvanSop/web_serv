var Project = require('../models/project');
var User = require('../models/user');

module.exports = {  
	getAllProjects: function(callback) {
	  	Project.find({}, function(err, data) {
	    	callback({"data": data});
	  	})
	},
	updateProject: function(project, callback) {
		//console.log(project);
		Project.findOneAndUpdate({_id: project._id}, {$set: {name: project.name, assigned_members: project.assigned_members}}, function(err, data) {
			User.update({username: { $in: project.assigned_members}},{$push: {projects: project._id}},{multi: true},  function (err, data2) {
				console.log('dasdsadsadas');
				callback({"data": data});
			})
			//for (var i = 0; i < project.assigned_members.length; i++) {
				//console.log("i = ", i);
				// User.findOneAndUpdate({username: project.assigned_members[i]}, {$push: {projects: project._id}}, function (err, data2) {
				// 	console.log("a keronja");
				// 	console.log("i = ", i);
				// 	console.log("members array: ", project.assigned_members);
				// 	console.log("length", project.assigned_members.length);
				// 	if (i == project.assigned_members.length-1) {
				// 		console.log("KERONJA");
				// 		callback({"data": data});
				// 	}
				// })
			//}
			//callback({"data": data});
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
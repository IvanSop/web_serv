var Project = require('../models/project');

module.exports = {  
	getAllProjects: function(callback) {
	  	Project.find({}, function(err, data) {
	    	callback({"data": data});
	  	})
	}
}
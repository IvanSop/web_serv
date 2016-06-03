var User = require('../models/user');

module.exports = {  
	getAllUsers: function(callback) {
		User.find({}, function(err, data) {
    	    console.log(data)
    	    callback({"data": data });
  		})
	}
}
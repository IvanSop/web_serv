var mongoose = require('mongoose');

var User = new mongoose.Schema({
    username: String,
	password: String,
	type: Number, // 0 regular, 1 admin
	
})

module.exports = mongoose.model('User', User);
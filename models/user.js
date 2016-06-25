var mongoose = require('mongoose');
var Project = require('../models/project');

var User = new mongoose.Schema({
    username: String,
	password: String,
	projects: [{type: mongoose.Schema.Types.ObjectId, ref:'Project'}],
	type: Number, // 0 regular, 1 admin
	
})

module.exports = mongoose.model('User', User);
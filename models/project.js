var mongoose = require('mongoose');

// one of these 3 should work
//var User = require('user'); 
//var User = require('../models/user');
var User = require('../models/user');


var Project = new mongoose.Schema({
	assigned_members: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}], // 
	name: String
	
});

module.exports = mongoose.model('Project', Project);
var mongoose = require('mongoose');

// one of these 3 should work
//var User = require('user'); 
//var User = require('../models/user');
var User = require('../models/user');


var Project = new mongoose.Schema({
	assigned_members: [{type: String, ref:'User'}], // FIXME better objectID ?
	name: String
	
});

module.exports = mongoose.model('Project', Project);
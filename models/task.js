var mongoose = require('mongoose');

// one of these 3 should work
//var User = require('user'); 
var User = require('../models/user');
var Project = require('../models/project');
var Comment = require('../models/comment');


var Task = new mongoose.Schema({
	project: {type: String, ref:'Project'},
	title: String,
	description: String,
	priority: String,
	status: String,
	creator: {type: String, ref:'User'},
	target: {type: String, ref:'User'},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
})

module.exports = mongoose.model('Task', Task);
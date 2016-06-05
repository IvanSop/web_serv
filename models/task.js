var mongoose = require('mongoose');

// one of these 3 should work
//var User = require('user'); 
//var User = require('../models/user');
var User = mongoose.model('user');
var Project = mongoose.model('project');
// one of these 3 should work
//var Comment = require('comment'); 
//var Comment = require('../models/comment');
//=>var Comment = mongoose.model('comment');


var Task = new mongoose.Schema({
	project: {type: String, ref:'Project'},
	name: String,
	number: Number,
	text: String,
	issuer: {type: String, ref:'User'},
	target: {type: String, ref:'User'}
})

module.exports = mongoose.model('Task', Task);
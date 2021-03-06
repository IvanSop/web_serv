var mongoose = require('mongoose');

// one of these 3 should work
//var User = require('user'); 
var User = require('../models/user');
//var User = mongoose.model('user');
var Task =  require('../models/task')

var Comment = new mongoose.Schema({
	parent: {type: mongoose.Schema.Types.ObjectId, ref:'Task'},
	author: {type: String, ref:'User'}, // or just string
	text: String,
	timestamp: String 
});

module.exports = mongoose.model('Comment', Comment);
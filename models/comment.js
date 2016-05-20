var mongoose = require('mongoose');

// one of these 3 should work
//var User = require('user'); 
//var User = require('../models/user');
var User = mongoose.model('user');


var Comment = new mongoose.Schema({
	posted_by: {type: mongoose.Schema.Types.ObjectId, ref:'User'}, // or just string
	text: String,
	timestamp: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Comment', Comment);
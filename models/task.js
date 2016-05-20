var mongoose = require('mongoose');

// one of these 3 should work
//var User = require('user'); 
//var User = require('../models/user');
var User = mongoose.model('user');

// one of these 3 should work
//var Comment = require('comment'); 
//var Comment = require('../models/comment');
var Comment = mongoose.model('comment');


//var Task = new mongoose.Schema({
	//belongs_to_project: {type: mongoose.Schema.Types.ObjectId, ref:'?'}
//})
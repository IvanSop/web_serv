var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var path = require('path');



// var isAuthenticated = function (req, res, next) {
// 	// if user is authenticated in the session, call the next() to call the next request handler 
// 	// Passport adds this method to request object. A middleware is allowed to add properties to
// 	// request and response objects
// 	if (req.isAuthenticated())
// 		return next();
// 	// if the user is not authenticated then redirect him to the login page
// 	res.redirect('/');
// }



module.exports = function(passport){

	
	/* GET login page. */
 router.get('/', function(req, res) {
     	// Display the Login page with any flash message, if any
     	console.log("get /", __dirname);
     	
     	//res.status(200).send("5456465");
     	res.sendFile(path.join(__dirname, '../views', 'index.html'));
     	//res.render('index.ejs');
 });





	return router;
}






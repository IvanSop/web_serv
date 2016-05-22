var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var path = require('path');



var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}



module.exports = function(passport){

	
	/* GET login page. */
 router.get('/', function(req, res) {
     	// Display the Login page with any flash message, if any
     	//console.log("get /", __dirname);
     	//res.status(200).send("5456465");
     	res.sendFile(path.join(__dirname, '../views', 'index.html'));
     	//res.render('index.ejs');
 });


router.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login scuccessful!'
      });
    });
  })(req, res, next);
});

	/* GET Registration Page */
router.get('/register', function(req, res){
	console.log("get /register");
	//res.render('register',{message: req.flash('message')});
});

	/* Handle Registration POST */
router.post('/register', passport.authenticate('signup', {
	successRedirect: '/home',
	failureRedirect: '/register',
	failureFlash : true  
}));

	/* GET Home Page */
router.get('/home', isAuthenticated, function(req, res){
	console.log("get /home");
	//res.render('home', { user: req.user });
});

	/* Handle Logout */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});





	return router;
}





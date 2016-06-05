var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var path = require('path');
var Project = require('../models/project');
var ProjectHandler = require('../db_handlers/project_handler');
var UserHandler = require('../db_handlers/user_handler');
var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

  if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.status(403).json({
    err: "Forbidden!!"
  });
}

var isAdmin = function (req, res, next) {
  if (req.user.type == 1) {
    return next();
  }
  res.status(403).json({
    err: "Forbidden!!"
  });
}

// strips everything except username and type from user (dont want to send hash to client)
var stripUser = function(user) {
  var strippedUser = {};
  strippedUser.username = user.username;
  strippedUser.type = user.type;
  return strippedUser;
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
      console.log("Stripped user");
      console.log(stripUser(user));
      res.status(200).json({
        status: stripUser(user)
      });
      //console.log("LOGIN _______");
      //console.log(user);
    });
  })(req, res, next);
});


router.post('/register', function(req, res, next) {
  passport.authenticate('signup', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: 'User already exists?'
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

// router.post('/register', function(req, res, next) {
//   console.log("Ssssss");
//   passport.authenticate('signup', function(err, user, info) {
//     console.log("MARS");
//   })
// })

// router.post('/register', passport.authenticate('signup', {
//   successRedirect: '/',
//   failureRedirect: '/register',
//   failureFlash : true  
// }));


	/* Handle Logout */
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// send user status, false if not logged in, object of user if logged in
router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  // console.log("req.user ===============");
  // console.log(req.user.type);
  res.status(200).json({
    status: stripUser(req.user)
  });
});

// creates project and saves it to db
router.post('/createProject',isAuthenticated, isAdmin, function(req,res) {
  console.log("/createProject");
  //console.log(req.body);
  ProjectHandler.projectExists(req.body.name, function(data) {
    // if exists
    if (data) {
      res.status(406).json({
        ret: "Project with that name already exists"
      })
      return;
    }

  var proj = new Project();
  proj.name = req.body.name;
  proj.assigned_members = [];
  proj.save(function(err, data) {
    if (err) {
    res.status(500).json({
      ret: "not OK"
    })  
      return console.error(err);
    }
    res.status(200).json({
      ret: "OK"
    })
    console.log("OL");
  })
});



  })



// gets all projects from database FIXME: put isAdmin also?
router.post('/getAllProjects',isAuthenticated, function(req,res) {
  console.log("/getAllProjects");
  ProjectHandler.getAllProjects(function(data){
    console.log(data);
    res.send(data);
  })

  // Project.find({}, function(err, data) {
  //   res.send({"data" : data});
  // }) 
});

// gets all users, will be needed when admin wants to add someone to project
router.post('/getAllUsers', isAuthenticated, isAdmin, function(req, res) {
  console.log("/getAllUsers");
  UserHandler.getAllUsers(function(data) {
    res.send(data);
  });
});


// edit a project
router.post('/updateProject', isAuthenticated, isAdmin, function(req, res) {
  console.log("/updateProject");
  console.log(req.body.project)
  ProjectHandler.updateProject(req.body.project, function(data) {
    console.log(data)
    res.send(data);
  })
})

//delete project
router.post('/deleteProject', isAuthenticated, isAdmin, function(req, res) {
  console.log("/deleteProject");
  ProjectHandler.deleteProject(req.body.project, function(data) {
    console.log(data);
    res.send(data);
  })
})

	return router;
}






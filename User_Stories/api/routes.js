var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Admin = require('./controllers/AdminController');


//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);
router.get('/users/viewMyInfo/:username',User.viewMyInfo);
router.get('/admins', Admin.getAdmins);

//exporting routes to the project
module.exports = router;

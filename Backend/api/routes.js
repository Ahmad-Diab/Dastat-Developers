var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var viewCinemas = require('./controllers/CinemasController'); 


//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);

//viewCinemas routes
router.get('/viewCinemas',viewCinemas.ViewCinemas);

//exporting routes to the project
module.exports = router;


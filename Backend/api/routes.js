var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
<<<<<<< HEAD
<<<<<<< HEAD
var Cinema = require('./controllers/CinemasController');
=======
=======
>>>>>>> a72c3123a0932f9ad5e157ff0f2b9eb2d1d17040
var viewCinemas = require('./controllers/CinemasController'); 

>>>>>>> a72c3123a0932f9ad5e157ff0f2b9eb2d1d17040

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!
router.get('/users', User.getUsers);

<<<<<<< HEAD
<<<<<<< HEAD
router.get('/filterByLocation/:location', Cinema.filterByLocation);
router.get('/filterByHall/:hallNumber', Cinema.filterByHalls);

=======
//viewCinemas routes
router.get('/viewCinemas',viewCinemas.ViewCinemas);
>>>>>>> a72c3123a0932f9ad5e157ff0f2b9eb2d1d17040
=======
//viewCinemas routes
router.get('/viewCinemas',viewCinemas.ViewCinemas);
>>>>>>> a72c3123a0932f9ad5e157ff0f2b9eb2d1d17040

//exporting routes to the project
module.exports = router;


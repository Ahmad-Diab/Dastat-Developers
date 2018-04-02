var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var UserBooking = require('./Controllers/UserBookingController');

var Cinema = require('./controllers/CinemasController');




//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!
router.get('/users', User.getUsers);

router.get('/filterByLocation/:location', Cinema.filterByLocation);
router.get('/viewCinema/:cinema',Cinema.viewCinema);
router.get('/filterByHall/:hallNumber', Cinema.filterByHalls);


//viewCinemas routes
router.get('/viewCinemas',Cinema.ViewCinemas);


router.post('/test', User.test);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);

//exporting routes to the project
module.exports = router;


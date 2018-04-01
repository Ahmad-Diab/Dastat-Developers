var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var UserBooking = require('./controllers/UserBookingController');
var User = require('./controllers/UserController'),
    UserBooking = require('./Controllers/UserBookingController');


//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);
router.get('/userBooking/getParties/:cinemaName/:movieName/:date', UserBooking.getParties);

// router.get('/userBooking/getParties/:cinemaName/:movieName/:date', UserBooking.getParties);

//-------------------------------User Booking Routes---------------------------------
//TODO Authentication before booking
router.post('/userBooking/makeReservation',UserBooking.makeReservation());


//exporting routes to the project
module.exports = router;

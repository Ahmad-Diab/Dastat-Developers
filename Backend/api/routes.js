var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController'),
    UserBooking = require('./controllers/UserBookingController');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);
router.get('/userBooking/getParties/:cinemaName/:movieName/:date', UserBooking.getParties);


//-------------------------------User Booking Routes---------------------------------
//TODO Authentication before booking
router.get('/userBooking/getParties/:cinemaName/:movieName/:date', UserBooking.getParties);
router.post('/userBooking/makeReservation',UserBooking.makeReservation);
router.post('/userBooking/usePromoCode', UserBooking.usePromoCode);

router.get('/userBooking/getCurrentMoviesForCinema/:cinema_location/:cinema_name', UserBooking.getCurrentMoviesForCinema);
router.get('/userBooking/getUpcomingMoviesForCinema/:cinema_location/:cinema_name', UserBooking.getUpcomingMoviesForCinema);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);
router.get('/userBooking/getUpcomingMovies/', UserBooking.getUpcomingMovies);



router.post('/test', User.test);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);

//exporting routes to the project
module.exports = router;

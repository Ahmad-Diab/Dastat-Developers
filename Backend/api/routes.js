var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Seat = require('./controllers/SeatController');
var UserBooking = require('./Controllers/UserBookingController');

//please add only routers here, if you need to call a function require its class
//DON'T IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);

//-------------------------------User Booking Routes---------------------------------
//TODO Authentication before booking
router.post('/userBooking/makeReservation',UserBooking.makeReservation);
router.post('/userBooking/usePromoCode', UserBooking.usePromoCode);
router.get('/userBooking/getBookings/:username', UserBooking.getBookings);

//-------------------------------User fetching Routes--------------------------------
router.get('/userBooking/getCinemasForThatMovie/:movie_id', UserBooking.getCinemasForThatMovie);
router.get('/userBooking/getCurrentMoviesForCinema/:cinema_location/:cinema_name', UserBooking.getCurrentMoviesForCinema);
router.get('/userBooking/getUpcomingMoviesForCinema/:cinema_location/:cinema_name', UserBooking.getUpcomingMoviesForCinema);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);
router.get('/userBooking/getUpcomingMovies/', UserBooking.getUpcomingMovies);
router.get('/userBooking/getParties/:cinemaName/:movieName/:date', UserBooking.getParties);


router.post('/test', User.test);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);

//SEAT ROUTES
router.get('/layout/encoding', Seat.getSeats);

//exporting routes to the project
module.exports = router;

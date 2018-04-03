var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Search = require('./controllers/SearchController');
var UserBooking = require('./controllers/UserBookingController');
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


router.get('/userBooking/getBookings/:username', UserBooking.getBookings);



router.post('/test', User.test);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);


//----------------------------------------------------Search routes--------------------------------------------//
router.get('/search/:searchKeyWord', Search.searchByKeyWord);

//exporting routes to the project


router.get('/viewMovies',Search.viewMovies);
router.get('/viewMovies3',Search.viewMovies3);
router.get('/viewMovies2',Search.viewMovies2);
router.get('/viewMovies1',Search.viewMovies1);
router.get('/viewMovies0',Search.viewMovies0);
router.get('/viewCinemas',Search.viewCinemas);
router.get('/getTopMovies',Search.getTopMovies);


module.exports = router;
var express = require('express');
var router = express.Router();

//Schema Controllers
<<<<<<< HEAD
var User = require('./controllers/UserController');
var Search = require('./controllers/SearchController');
<<<<<<< HEAD
=======
var User = require('./controllers/UserController'),
    UserBooking = require('./controllers/UserBookingController');
>>>>>>> master
=======
var UserBooking = require('./Controllers/UserBookingController');
>>>>>>> bcf5e230ec0119e16ba7dbe9fff56c9aa5d027e2

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);
router.get('/userBooking/getParties/:cinemaName/:movieName/:date', UserBooking.getParties);

<<<<<<< HEAD

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



<<<<<<< HEAD

//----------------------------------------------------Search routes--------------------------------------------//
router.get('/search/:searchKeyWord', Search.searchByKeyWord);
=======
router.post('/test', User.test);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);
>>>>>>> master
=======

//----------------------------------------------------Search routes--------------------------------------------//
router.get('/search/:searchKeyword', Search.searchByKeyword);
router.post('/test', User.test);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);
>>>>>>> bcf5e230ec0119e16ba7dbe9fff56c9aa5d027e2

//exporting routes to the project
module.exports = router;

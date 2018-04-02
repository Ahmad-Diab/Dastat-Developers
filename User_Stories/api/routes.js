var express = require('express');
var router = express.Router();

//Schema Controllers
<<<<<<< HEAD:Backend/api/routes.js
var User = require('./controllers/UserController'),
    UserBooking = require('./controllers/UserBookingController');
=======
var User = require('./controllers/UserController');
var Admin = require('./controllers/AdminController');

>>>>>>> ba637be435b587e95b8df98b879beb5c86218719:User_Stories/api/routes.js

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!
router.get('/users', User.getUsers);
<<<<<<< HEAD:Backend/api/routes.js
router.get('/users/viewMyInfo/',User.viewMyInfo);
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

=======
router.get('/users/viewMyInfo/:username',User.viewMyInfo);
router.get('/admins', Admin.getAdmins);
router.post('/users/editUsers/:username', User.editUsers);
>>>>>>> ba637be435b587e95b8df98b879beb5c86218719:User_Stories/api/routes.js
//exporting routes to the project
module.exports = router;

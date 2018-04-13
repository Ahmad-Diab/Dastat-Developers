var express = require('express');
var router = express.Router();

//Schema Controllers

//-------- USER ---------
var User = require('./controllers/UserController');
var Seat = require('./controllers/SeatController');
var UserBooking = require('./controllers/UserBookingController');
var Authentication = require('./controllers/Authentication');
var Search = require('./controllers/SearchController');
var Movie = require('./controllers/MovieController');
var Actor = require('./controllers/ActorController');
var viewCinemas = require('./controllers/CinemasController');
var Cinema = require('./controllers/CinemasController');

//----------- Admin ---------------
var AdminHalls = require('./controllers/AdminHallsController');

//please add only routers here, if you need to call a function require its class
//DON'T IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);

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



router.get('/filterByLocation/:location/:is3D/:is4D', Cinema.filterByLocation);
router.get('/filterByHall/:hallNumber', Cinema.filterByHalls);
router.get('/viewCinema/:cinema/:loc',Cinema.viewCinema,Cinema.moviesInCinema);
router.get('/viewCinema/:cinema/:loc/allMovies',Cinema.moviesInCinema);
router.get('/viewCinema/DistinctLocations',Cinema.DistinctLocation);

//viewCinemas routes
router.get('/viewCinemas',Cinema.ViewCinemas);
var User = require('./controllers/UserController');
var Movie = require('./controllers/MovieController')
var UserBooking = require('./controllers/UserBookingController');
var Actor = require('./controllers/ActorController');
//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!


//------------------------USERS ROUTES-------------------------------
router.get('/users', User.getUsers);

router.get('/users/viewMyInfo', User.viewMyInfo);

router.post('/users/editUsers/:username', User.editProfile);
//-----------------------ACTOR ROUTES-------------------------------
router.post('/actors/:actor', Actor.getActors);

//------------------------MOVIES ROUTES------------------------------
router.get('/movies/feature',Movie.getMovies);

router.get('/movies/highrate',Movie.getMoviesHighRatings);
router.get('/movies/lowrate',Movie.getMoviesLowRatings);

router.get('/movies/latest',Movie.getMoviesLastestDate);
router.get('/movies/oldest',Movie.getMoviesOldesttDate);

router.get('/movies/Action',Movie.getMoviesAction);
router.get('/movies/Adventure',Movie.getMoviesAdventure);
router.get('/movies/Comedy',Movie.getMoviesComedy);
router.get('/movies/Drama',Movie.getMoviesDrama);
router.get('/movies/Horror',Movie.getMoviesHorror);
router.get('/movies/Thriller',Movie.getMoviesThriller);
router.get('/movies/Bio',Movie.getMoviesBiography);

//-------------------------------User Booking Routes---------------------------------
//TODO Authentication before booking
router.post('/userBooking/makeReservation',UserBooking.makeReservation);
router.post('/userBooking/usePromoCode', UserBooking.usePromoCode);

//-------------------------------User fetching Routes--------------------------------
router.get('/userBooking/getCinemasForThatMovie/:movie_id', UserBooking.getCinemasForThatMovie);
router.get('/userBooking/getCurrentMoviesForCinema/:cinema_location/:cinema_name', UserBooking.getCurrentMoviesForCinema);
router.get('/userBooking/getUpcomingMoviesForCinema/:cinema_location/:cinema_name', UserBooking.getUpcomingMoviesForCinema);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);
router.get('/userBooking/getUpcomingMovies/', UserBooking.getUpcomingMovies);
router.get('/userBooking/getParties/:cinemaLocation/:cinemaName/:movieName/:date', UserBooking.getParties);
router.get('/userBooking/getBookings/:username', UserBooking.getBookings);
router.get('/movies/:movie_id',Movie.getMovieInfo);

router.post('/login', Authentication.authenticate);
router.post('/verify', Authentication.verify);
//----------------------------------------------------Search routes--------------------------------------------//
router.get('/search/:searchKeyword', Search.searchByKeyword);


router.post('/register', Authentication.Register);
// router.post('/test', User.test);

//viewCinemas routes


//SEAT ROUTES
router.get('/layout/encoding', Seat.getSeats);

//exporting routes to the project


router.get('/viewMovies',Search.viewMovies);
router.get('/viewMovies3',Search.viewMovies3);
router.get('/viewMovies2',Search.viewMovies2);
router.get('/viewMovies1',Search.viewMovies1);
router.get('/viewMovies0',Search.viewMovies0);
router.get('/viewCinemas',Search.viewCinemas);
router.get('/getTopMovies',Search.getTopMovies);

//-----------------------------------------------Admin ROUTES----------------------

//-------------------------------------------Halls Routes-----------------------------

router.get('/admin/getHallsForThatCinema/:cinema_name/:cinema_location' , AdminHalls.getHallsForThatCinema);

module.exports = router;

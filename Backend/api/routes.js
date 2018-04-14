/*
          -------------------------------ADMIN SYSTEM ROUTES ARE DOWN BELOW----------------------------------------------
 */


var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Seat = require('./controllers/SeatController');
var UserBooking = require('./controllers/UserBookingController');
var Authentication = require('./controllers/Authentication');
var Search = require('./controllers/SearchController');
var Movie = require('./controllers/MovieController');
var Actor = require('./controllers/ActorController');
var viewCinemas = require('./controllers/CinemasController');
var Cinema = require('./controllers/CinemasController');
var MyMovies = require('./controllers/MyMoviesController');
var adminTicket = require('./controllers/AdminTicketController');
var Admin = require('./controllers/MyAdminsController');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);

//---------------------------------------------------User Booking Routes--------------------------------------//
router.get('/userBooking/getParties/:cinemaLocation/:cinemaName/:movieName/:date', UserBooking.getParties);
router.post('/userBooking/makeReservation',UserBooking.makeReservation);
router.post('/userBooking/usePromoCode', UserBooking.usePromoCode);

//----------------------------------------------------User Fetching routes------------------------------------//
router.get('/userBooking/getCinemasForThatMovie/:movie_id', UserBooking.getCinemasForThatMovie);
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
router.get('/movies/:movie_id',Movie.getMovieInfo);

//----------------------------------------------------User Info routes----------------------------------------//
router.get('/users', User.getUsers);
router.get('/users/viewMyInfo', User.viewMyInfo);
router.post('/users/editUsers/:username', User.editProfile);

//----------------------------------------------------Actor routes--------------------------------------------//
router.post('/actors/:actor', Actor.getActors);

//----------------------------------------------------Movie Getters routes------------------------------------//
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

//----------------------------------------------------Authentication routes------------------------------------//
router.post('/login', Authentication.authenticate);
router.post('/verify', Authentication.verify);
router.post('/register', Authentication.Register);

//----------------------------------------------------Search routes--------------------------------------------//
router.get('/search/:searchKeyword', Search.searchByKeyword);

//----------------------------------------------------Seating routes--------------------------------------------//
router.get('/layout/encoding', Seat.getSeats);

//----------------------------------------------------Viewing routes--------------------------------------------//
router.get('/viewCinemas',Cinema.ViewCinemas);
router.get('/viewMovies',Search.viewMovies);
router.get('/viewMovies3',Search.viewMovies3);
router.get('/viewMovies2',Search.viewMovies2);
router.get('/viewMovies1',Search.viewMovies1);
router.get('/viewMovies0',Search.viewMovies0);
router.get('/viewCinemas',Search.viewCinemas);
router.get('/getTopMovies',Search.getTopMovies);



/* 
-----------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
---------------------                                                        ------------------------------------------------------
---------------------        A D M I N. S Y S T E M. R O U T E S . JS        ------------------------------------------------------
---------------------                                                        ------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
*/

//-------------AS AN ADMIN I CAN ADD MOVIES ----------------
router.post('/addMovies',MyMovies.addMovie);



//-----------AS AN ADMIN I CAN VIEW MY REQUESTS------------
router.get('/requests/:admin_requested',MyMovies.viewMyRequests);
//-----------AS AN ADMIN I CAN VIEW ALL REQUESTS------------
router.get('/requests',MyMovies.viewRequests);
//--------AS AN ADMIN I CAN VIEW ALL MOVIES------------------
router.get('/viewMovie/viewAllMovies',MyMovies.getMovies);
//--------AS AN ADMIN I CAN VIEW A SINGLE MOVIE--------------
router.get('/viewMovie/:movie_id',MyMovies.viewSingleMovie);



router.post('/requests/:movie_id',MyMovies.EditMyRequests);


module.exports = router;




























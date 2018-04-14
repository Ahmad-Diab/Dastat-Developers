let express = require('express'),
    router = express.Router();

//Schema Controllers
let User = require('./controllers/UserController'),
    Seat = require('./controllers/SeatController'),
    UserBooking = require('./controllers/UserBookingController'),
    Authentication = require('./controllers/Authentication'),
    Search = require('./controllers/SearchController'),
    Movie = require('./controllers/MovieController'),
    Actor = require('./controllers/ActorController'),
    Cinema = require('./controllers/CinemasController'),
    adminTicket = require('./controllers/AdminTicketController');
    Admin = require('./controllers/MyAdminsController');

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


/***********************************************************************
************************************************************************
************************************************************************
************************************************************************
***************************** ADMIN ROUTES *****************************
************************************************************************
************************************************************************
************************************************************************
************************************************************************/

//------------------------------ MyAdmins routes --------------------------------//

//--------------------------------------------AdminTicket Interactions Routes---------------------------------//
router.get('/tickets/viewTicketInfo', adminTicket.viewTicketInfo);
router.post('/tickets/verifyUnpaidTicket', adminTicket.verifyUnpaidTicket);































module.exports = router;
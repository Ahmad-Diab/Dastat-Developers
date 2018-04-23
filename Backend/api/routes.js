/*
          -------------------------------ADMIN SYSTEM ROUTES ARE DOWN BELOW----------------------------------------------
 */
    
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
var Cinema = require('./controllers/CinemasController');
var Halls = require('./controllers/HallsController');

//----------- Admin ---------------
var AdminHalls = require('./controllers/AdminHallsController');

var MyMovies = require('./controllers/MyMoviesController');
var AuthenticationAdmin = require('./controllers/AuthenticatoinAdmin');
var Authorization = require("./Authorization");
var adminTicket = require('./controllers/AdminTicketController');
var Admin = require('./controllers/MyAdminsController');
var MoviesInHalls = require('./controllers/MoviesInHallsController');
var AdminHalls = require('./controllers/AdminHallsController');
var Promocodes = require('./controllers/PromocodesController');
var AddCinema = require('./controllers/MyCinemas');
var editCinema = require('./controllers/MyCinemas');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/authtest',Authorization.Verify("1000"),(req,res)=>{
    return res.status(200).json({
        err: null,
        msg: 'ok',
        data: null
      });
});



//---------------------------------------------------User Booking Routes--------------------------------------//
router.get('/userBooking/getParties/:cinemaLocation/:cinemaName/:movieName/:date', UserBooking.getParties);
router.get('/userBooking/getParties/:cinemaName/:movieName/:date', UserBooking.getParties);
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
router.get('/movies/id/:movie_id',Movie.getMovieInfo);

//----------------------------------------------------User Info routes----------------------------------------//
router.get('/users', User.getUsers);

//------------------------USERS ROUTES-------------------------------
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
router.get('/layout/minified', Seat.minifiedLayout);
router.get('/layout/all', Seat.getAllLayouts);
router.post('/layout/add', Seat.addLayout);
router.post('/layout/update', Seat.updateLayout);
router.post('/layout/delete', Seat.deleteLayout);
router.get('/layout/:id', Seat.getLayout);
//----------------------------------------------------Viewing routes--------------------------------------------//
router.get('/viewCinemas',Cinema.ViewCinemas);
router.get('/viewMovies',Search.viewMovies);
router.get('/viewMovies3',Search.viewMovies3);
router.get('/viewMovies2',Search.viewMovies2);
router.get('/viewMovies1',Search.viewMovies1);
router.get('/viewMovies0',Search.viewMovies0);
router.get('/getTopMovies',Search.getTopMovies);

//-----------------------------------------------Admin ROUTES----------------------

//-------------------------------------------Halls Routes-----------------------------

router.get('/admin/adminHalls/getHallsForThatCinema/:cinema_name/:cinema_location' , AdminHalls.getHallsForThatCinema);
router.patch('/admin/adminHalls/assignMovieToHall', AdminHalls.assignMovieToHall);
router.delete('/admin/adminHalls/deleteMovieFromHall', AdminHalls.deleteMovieFromHall);
router.get('/admin/adminHalls/viewMoviesInHall/:username/:cinema_name/:cinema_location/:hall_number', AdminHalls.viewMoviesInHall);



/* 
-----------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
---------------------                                                        ------------------------------------------------------
---------------------        A D M I N. S Y S T E M. R O U T E S . JS        ------------------------------------------------------
---------------------                                                        ------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
*/


//--------------------------------------Admin login------------------------------------------------------//
router.post('/adminlogin', AuthenticationAdmin.login);

//------------------------------ MyAdmins routes ----------------------------------//
router.get('/users', User.getUsers);


//--------------------------------------------AdminTicket Interactions Routes---------------------------------//
router.get('/tickets/viewTicketInfo', adminTicket.viewTicketInfo);
router.patch('/tickets/verifyUnpaidTicket', Authorization.Verify('1111'), adminTicket.verifyUnpaidTicket);
router.get('/tickets/viewPartiesForThatMovie', adminTicket.viewPartiesOfThatMovie);
router.post('/tickets/makeReservationAsAdmin', Authorization.Verify('1111'), UserBooking.makeReservation);
router.delete('/tickets/cancelReservation', adminTicket.cancelReservation);


//-------------AS AN ADMIN I CAN ADD Requests ----------------
router.post('/addRequests/:admin_requested',MyMovies.addRequests);

//-----------AS AN ADMIN I CAN ADD MOVIES ---------------------
router.post('/addMovies/:admin_requested',MyMovies.addMovies);

//-----------AS AN ADMIN I CAN VIEW MY REQUESTS------------
router.get('/requests/:admin_requested',MyMovies.viewMyRequests);

//-----------AS AN ADMIN I CAN VIEW ALL REQUESTS------------
router.get('/requests',MyMovies.viewRequests);

//--------AS AN ADMIN I CAN VIEW ALL MOVIES------------------
router.get('/viewMovie/viewAllMovies',MyMovies.getMovies);

//--------AS AN ADMIN I CAN VIEW A SINGLE MOVIE--------------
router.get('/viewMovie/:movie_id',MyMovies.viewSingleMovie);

//--------AS AN ADMIN I CAN EDIT MY REQUESTS--------------
router.post('/requests/:movie_id',MyMovies.EditMyRequests);

//--------AS AN ADMIN I CAN EDIT MOVIES--------------
router.post('/requests/:movie_id',MyMovies.EditMovies);

//--------AS AN ADMIN I CAN DELETE MY REQUESTS--------------
router.delete('/requests/:movie_id',MyMovies.DeleteMyRequests);

//--------AS AN ADMIN I CAN DELETE MOVIES--------------
router.delete('/requests/:movie_id',MyMovies.DeleteMovies);

//--------AS AN ADMIN I CAN View A SINGLE MOVIE REQUEST--------------

router.get('/viewMovieRequest/:movie_id',MyMovies.ViewMovieRequest);

//--------AS AN ADMIN I CAN REJECT A SINGLE MOVIE REQUEST--------------
router.get('/RejectMovieRequest/:movie_id',MyMovies.RejectMovieRequest);

//--------AS AN ADMIN I CAN Accept A SINGLE MOVIE REQUEST--------------
router.get('/AcceptMovieRequest/:movie_id',MyMovies.AcceptMovieRequest);

//-------HALLS CRUD OPERATIONS ROUTES---------//
router.get("/halls/all", Halls.getAllHalls);
router.get("/halls/vies", Halls.getHall);
router.post("/halls/add", Halls.addHall);
router.post("/halls/update", Halls.updateHall);
router.post("/halls/deleteHall", Halls.deleteHall);
//--------AS AN ADMIN I CAN View MOVIES IN MY HALLS--------------
router.get('/MoviesInHalls/getAlltMoviesInCinemaForAdmin/:cinema_location/:cinema_name',MoviesInHalls.getAlltMoviesInCinemaForAdmin);
router.get('/MoviesInHalls/viewCinemasForAdminUser/:username', MoviesInHalls.viewCinemasForAdminUser);
router.get('/MoviesInHalls/getHallsForThatCinema/:cinema_name/:cinema_location' , MoviesInHalls.getHallsForThatCinema);
router.get('/MoviesInHalls/getFinalOutput/:movie_id/:movie_id/:cinema_name/:cinema_location' , MoviesInHalls.getFinalOutput);

//--------------------------------Promocode routes------------------------------------------------------------//

router.get('/promocodes', Authorization.Verify('1000'),Promocodes.viewPromocodes);
router.post('/promocodes/edit', Authorization.Verify('1000'), Promocodes.editPromocode);
router.get('/promocodes/viewPromocodesAndCinemas', Authorization.Verify('1000'),Promocodes.viewPromocodesAndCinemas);
router.get('/promocodes/:promocode', Authorization.Verify('1000'),Promocodes.getPromocode);
router.get('/promocodes/filter/promocode/:promocode', Authorization.Verify('1000'), Promocodes.filterPromocode);
router.get('/promocodes/filter/cinema/:cinema' ,  Authorization.Verify('1000') , Promocodes.filterCinema);
router.post('/promocodes/assignPromocodes', Authorization.Verify('1000') , Promocodes.assignPromocodeToCinema);
router.post('/promocodes/addPromocode', Authorization.Verify('1000') , Promocodes.addPromocode);
router.post('/promocodes/deletePromocode/:promocode', Authorization.Verify('1000') , Promocodes.deletePromocode);


//////////////////////////////////////////////////// ADMIN ROUTES ////////////////////////////////////////////////////




////////////////////////////////////////////////// MyCinemas ROUTES //////////////////////////////////////////////////
//As an Admin i can add cinema 

router.get('/adminsearch/:searchKeyword', Search.searchByKeyword);
router.get('/adminviewCinemas',Cinema.ViewCinemas);
router.post('/addCinema', AddCinema.addCinema);
router.patch('/Cinemas/editCinema/:location/:name',(req,res,next)=>{console.log("hiii");next()}, editCinema.editCinema); 

// ------------- As an Admin I can Delete a Cinema ----------------
router.get('/mycinemas/delete/:cinema/:owner',editCinema.deleteCinemaForAdmin);


//exporting routes to the project
module.exports = router;





















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

//----------- Admin ---------------
var AdminHalls = require('./controllers/AdminHallsController');

var MyMovies = require('./controllers/MyMoviesController');
var MyMovies = require('./controllers/MyMoviesController');

//----------- Admin ---------------
var AuthenticationAdmin = require('./controllers/AuthenticatoinAdmin');
var Authorization = require("./Authorization");
var adminTicket = require('./controllers/AdminTicketController');
var Admin = require('./controllers/MyAdminsController');
var MoviesInHalls = require('./controllers/MoviesInHallsController');
var AdminHalls = require('./controllers/AdminHallsController');
var Promocodes = require('./controllers/PromocodesController');
var MyCinemas = require('./controllers/MyCinemas');

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
router.post('/users/editProfile/:username', User.editProfile);



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


//--------------------------------------Admin login------------------------------------------------------//
router.post('/adminlogin', AuthenticationAdmin.login);

//router.post('/admin/login', Admin.authenticate);

//------------------------------ MyAdmins routes --------------------------------//
//router.get('/users',Authorization.Verify_App_Owner, User.getUsers);
//------------------------------ MyAdmins routes ----------------------------------//

router.post('/addBookingUsher',  Authorization.Verify('1101'), Admin.deleteBookingUsher);

router.get('/viewBookingUshers', Authorization.Verify('0101'), Admin.viewBookingUshers);
router.get('/getBookingUshers', Authorization.Verify('0101'), Admin.getBookingUshers);
router.post('/getBookingUsher', Authorization.Verify('0101'), Admin.getBookingUsher);
router.post('/editBookingUsher', Authorization.Verify('1101'), Admin.editBookingUsher);
router.post('/deleteBookingUsher', Authorization.Verify('1101'), Admin.deleteBookingUsher);

router.get('/viewBranchManagers', Authorization.Verify('1100'), Admin.viewBranchManagers);
router.get('/getBranchManagers', Authorization.Verify('1100'), Admin.getBranchManagers);
router.post('/getBranchManager', Authorization.Verify('1100'), Admin.getBranchManager);
router.post('/editBranchManager', Authorization.Verify('1100'), Admin.editBranchManager);
router.post('/deleteBranchManager', Authorization.Verify('1100'), Admin.deleteBranchManager);

router.get('/viewCinemaOwners', Authorization.Verify('1000'), Admin.viewCinemaOwners);
router.get('/getCinemaOwners', Authorization.Verify('1000'), Admin.getCinemaOwners);
router.post('/getCinemaOwner', Authorization.Verify('1000'), Admin.getCinemaOwner);
router.post('/editCinemaOwner', Authorization.Verify('1000'), Admin.editCinemaOwner);
router.post('/deleteCinemaOwner', Authorization.Verify('1000'), Admin.deleteCinemaOwner);

router.post('/getAdmin', Authorization.Verify('0101'), Admin.getAdmin);
router.get('/viewAdmins', Authorization.Verify('1000'), Admin.getAdmins);
router.get('/getAdmins', Authorization.Verify('1000'), Admin.viewAdmins);
//--------------------------------------------AdminTicket Interactions Routes---------------------------------//
router.get('/tickets/viewTicketInfo', adminTicket.viewTicketInfo);
router.patch('/tickets/verifyUnpaidTicket', Authorization.Verify('1111'), adminTicket.verifyUnpaidTicket);
router.get('/tickets/viewPartiesForThatMovie', adminTicket.viewPartiesOfThatMovie);
router.post('/tickets/makeReservationAsAdmin', Authorization.Verify('1111'), UserBooking.makeReservation);
router.delete('/tickets/cancelReservation', adminTicket.cancelReservation);

//-------------------------------------------Halls Routes-----------------------------

router.get('/admin/adminHalls/getHallsForThatCinema/:cinema_name/:cinema_location' , AdminHalls.getHallsForThatCinema);
router.post('/admin/adminHalls/assignMovieToHall', Authorization.Verify('1101') ,AdminHalls.assignMovieToHall);
router.post('/admin/adminHalls/deleteMovieFromHall', Authorization.Verify('1101') , AdminHalls.deleteMovieFromHall);
router.get('/admin/adminHalls/viewMoviesInHalls/:username/:cinema_name/:cinema_location', AdminHalls.viewMoviesInHalls);
router.get('/admin/adminHalls/viewCinemasForAdminUser/:username', AdminHalls.viewCinemasForAdminUser);
router.get('/admin/getAlltMoviesInCinemaForAdmin/:cinema_location/:cinema_name', AdminHalls.getAlltMoviesInCinemaForAdmin);





//[App Owner][Cinema Owner][Booking Usher][Branch Manager]

//-------------AS AN ADMIN I CAN ADD Requests ----------------
router.post('/addRequests/:admin_requested',Authorization.Verify("0101"),MyMovies.addRequests);

//-----------AS AN ADMIN I CAN ADD MOVIES ---------------------
router.post('/addMovies',Authorization.Verify("1000"),MyMovies.addMovies);

//-----------AS AN ADMIN I CAN VIEW ALL REQUESTS------------
router.get('/requests/AllSHOW',Authorization.Verify("1000"),MyMovies.viewRequests);
//-----------AS AN ADMIN I CAN VIEW MY REQUESTS------------
router.get('/requests/:admin_requested',Authorization.Verify("0101"),MyMovies.viewMyRequests);

//--------AS AN ADMIN I CAN VIEW ALL MOVIES------------------
router.get('/viewMovie/viewAllMovies',MyMovies.getMovies);

//--------AS AN ADMIN I CAN VIEW A SINGLE MOVIE--------------
router.get('/viewMovie/:movie_id',MyMovies.viewSingleMovie);

//--------AS AN ADMIN I CAN EDIT MY REQUESTS--------------
router.post('/requests/edit/:movie_id',Authorization.Verify("0101"),MyMovies.EditMyRequests);

//--------AS AN ADMIN I CAN EDIT MOVIES--------------
router.post('/movie/edit/:movie_id',Authorization.Verify("1000"),MyMovies.EditMovies);

//--------AS AN ADMIN I CAN DELETE MY REQUESTS--------------
router.post('/requests/delete/:movie_id',Authorization.Verify("0101"),MyMovies.DeleteMyRequests);

//--------AS AN ADMIN I CAN DELETE MOVIES--------------
router.post('/movie/delete/:movie_id',Authorization.Verify("1000"),MyMovies.DeleteMovies);

//--------AS AN ADMIN I CAN View A SINGLE MOVIE REQUEST--------------

router.get('/viewMovieRequest/:movie_id',MyMovies.ViewMovieRequest);

//--------AS AN ADMIN I CAN REJECT A SINGLE MOVIE REQUEST--------------
router.post('/RejectMovieRequest/:movie_id',Authorization.Verify("1000"),MyMovies.RejectMovieRequest);

//--------AS AN ADMIN I CAN Accept A SINGLE MOVIE REQUEST--------------
router.post('/AcceptMovieRequest/:movie_id',Authorization.Verify("1000"),MyMovies.AcceptMovieRequest);

//--------AS AN ADMIN I CAN View MOVIES IN MY HALLS--------------
router.get('/MoviesInHalls/getAlltMoviesInCinemaForAdmin/:cinema_location/:cinema_name',MoviesInHalls.getAlltMoviesInCinemaForAdmin);
router.get('/MoviesInHalls/viewCinemasForAdminUser/:username', MoviesInHalls.viewCinemasForAdminUser);
router.get('/MoviesInHalls/getHallsForThatCinema/:cinema_name/:cinema_location' , MoviesInHalls.getHallsForThatCinema);
router.get('/MoviesInHalls/getFinalOutput/:movie_id/:movie_id/:cinema_name/:cinema_location' , MoviesInHalls.getFinalOutput);

//--------------------------------Promocode routes------------------------------------------------------------//

router.get('/promocodes', Authorization.Verify('1000'),Promocodes.viewPromocodes);
router.post('/promocodes/edit', Authorization.Verify('1000'), Promocodes.editPromocode);
router.get('/promocodes/viewPromocodesAndCinemas', Authorization.Verify('1110'),Promocodes.viewPromocodesAndCinemas);
router.get('/promocodes/:promocode', Authorization.Verify('1000'),Promocodes.getPromocode);
router.get('/promocodes/filter/promocode/:promocode', Authorization.Verify('1000'), Promocodes.filterPromocode);
router.get('/promocodes/filter/cinema/:cinema' ,  Authorization.Verify('1000') , Promocodes.filterCinema);
router.post('/promocodes/assignPromocodes', Authorization.Verify('1000') , Promocodes.assignPromocodeToCinema);
router.post('/promocodes/addPromocode', Authorization.Verify('1000') , Promocodes.addPromocode);
router.post('/promocodes/deletePromocode/:promocode', Authorization.Verify('1000') , Promocodes.deletePromocode);













//////////////////////////////////////////////////// ADMIN ROUTES ////////////////////////////////////////////////////




////////////////////////////////////////////////// MyCinemas ROUTES //////////////////////////////////////////////////
//As an Admin i can add cinema 

router.get('/adminsearch/:searchKeyword',Authorization.Verify("1100") ,Search.searchByKeyword);
router.get('/adminviewCinemas',Authorization.Verify("1100"),Cinema.ViewCinemas);
router.post('/addCinema',Authorization.Verify("1100") , MyCinemas.addCinema);
router.post('/Cinemas/editCinema/:location/:name',Authorization.Verify("1100") , MyCinemas.editCinema); 
router.get('/mycinemas/delete/:location/:name',Authorization.Verify("1100") ,MyCinemas.deleteCinemaForAdmin);

// ------------- As an Admin I can Delete a Cinema ----------------








//exporting routes to the project
module.exports = router;

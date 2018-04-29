let express = require('express'),
    router = express.Router();

// TODO function to add admins by app owner
// TODO function admins add other low level admins
// TODO app owner should view booking ushers

//--------- USER ------------------
let User = require('./controllers/UserController'),
    Seat = require('./controllers/SeatController'),
    UserBooking = require('./controllers/UserBookingController'),
    Authentication = require('./controllers/Authentication'),
    Search = require('./controllers/SearchController'),
    Movie = require('./controllers/MovieController'),
    Actor = require('./controllers/ActorController'),
    Cinema = require('./controllers/CinemasController');

//----------- Admin ---------------
let MyMovies = require('./controllers/MyMoviesController'),
    Halls = require('./controllers/HallsController'),
    AuthenticationAdmin = require('./controllers/AuthenticatoinAdmin'),
    Authorization = require("./Authorization"),
    adminTicket = require('./controllers/AdminTicketController'),
    Admin = require('./controllers/MyAdminsController'),
    MoviesInHalls = require('./controllers/MoviesInHallsController'),
    AdminHalls = require('./controllers/AdminHallsController'),
    Promocodes = require('./controllers/PromocodesController'),
    MyCinemas = require('./controllers/MyCinemas');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/authtest',Authorization.Verify("1000"),(req,res)=>{
    return res.status(200).json({
        err: null,
        msg: 'ok',
        data: null
      });
});

//----------------------------------------------------Authentication routes------------------------------------//
router.post('/login', Authentication.authenticate);
router.post('/verify', Authentication.verify);
router.post('/register', Authentication.Register);


//---------------------------------------------------User Booking Routes--------------------------------------//
router.post('/userBooking/makeReservation',UserBooking.makeReservation);

// TODO -- DELETE THIS COMMENT -- CHANGED ONES -> DOWN BELLOW
router.get('/userBooking/getBookings/:username/:start/:end', UserBooking.getBookings);

router.get('/userBooking/getPartiesInSpecificCinema/:cinema_location/:cinema_name/:movie_id/:date',
    UserBooking.getPartiesOfThatMovieInSpecificCinema);
router.get('/userBooking/getAllParties/:movie_id/:date', UserBooking.getAllPartiesForThatMovie);
router.post('/userBooking/usePromoCode', UserBooking.usePromoCode);

//----------------------------------------------------User Fetching routes------------------------------------//
router.get('/userBooking/getCinemasForThatMovie/:movie_id', UserBooking.getCinemasForThatMovie);
router.get('/userBooking/getCurrentMoviesForCinema/:cinema_location/:cinema_name',
    UserBooking.getCurrentMoviesForCinema);
router.get('/userBooking/getUpcomingMoviesForCinema/:cinema_location/:cinema_name',
    UserBooking.getUpcomingMoviesForCinema);
router.get('/userBooking/getCurrentMovies/', UserBooking.getCurrentMovies);
router.get('/userBooking/getUpcomingMovies/', UserBooking.getUpcomingMovies);
router.get('/filterByLocation/:location/:is3D/:is4D', Cinema.filterByLocation);
router.get('/filterByHall/:hallNumber', Cinema.filterByHalls);
router.get('/viewCinema/:cinema/:loc',Cinema.viewCinema,Cinema.moviesInCinema);
router.get('/viewCinema/:cinema/:loc/allMovies',Cinema.moviesInCinema);
router.get('/viewCinema/DistinctLocations',Cinema.DistinctLocation);
router.get('/movies/id/:movie_id',Movie.getMovieInfo);

//----------------------------------------------------User Info routes----------------------------------------//
router.get('/users', User.getUsers);

//-----------------------------------------------------USERS ROUTES------------------------------------------//
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

/* 
-----------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
---------------------                                                        ------------------------------------------------------
---------------------        A D M I N. S Y S T E M. R O U T E S . JS        ------------------------------------------------------
---------------------                                                        ------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------------------
*/

// VERIFY OUTLINE => [App Owner][Cinema Owner][Booking Usher][Branch Manager] Ex. Verify("1111")


//--------------------------------------Admin login------------------------------------------------------//
router.post('/adminlogin', AuthenticationAdmin.login);

//router.post('/admin/login', Admin.authenticate);
//router.get('/users',Authorization.Verify_App_Owner, User.getUsers);

//-----------------------------------------------------Halls Routes---------------------------------------------//

router.get('/admin/adminHalls/getHallsForThatCinema/:cinema_name/:cinema_location' , AdminHalls.getHallsForThatCinema);
router.patch('/admin/adminHalls/assignMovieToHall', AdminHalls.assignMovieToHall);
router.delete('/admin/adminHalls/deleteMovieFromHall', AdminHalls.deleteMovieFromHall);
router.get('/admin/adminHalls/getMoviesInHallsForCinemaForAdmin/' , AdminHalls.getMoviesInHallsForCinemaForAdmin);
router.get('/admin/adminHalls/viewMoviesInHall/:username/:cinema_name/:cinema_location/:hall_number', AdminHalls.viewMoviesInHalls);



router.post('/addBookingUsher',  Authorization.Verify('1101'), Admin.deleteBookingUsher);

router.get('/viewBookingUshers', Authorization.Verify('1101'), Admin.viewBookingUshers);
router.get('/getBookingUshers', Authorization.Verify('1101'), Admin.getBookingUshers);
router.post('/getBookingUsher', Authorization.Verify('1101'), Admin.getBookingUsher);
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

//-------HALLS CRUD OPERATIONS ROUTES---------//
router.get("/halls/all", Halls.getAllHalls);
router.get("/halls/view", Halls.getHall);
router.post("/halls/add", Halls.addHall);
router.post("/halls/update", Halls.updateHall);
router.post("/halls/deleteHall", Halls.deleteHall);
router.get("/cinema/location/min", Seat.distinctLocations);
router.get("/cinema/names/min", Seat.getCinemaName);
//--------AS AN ADMIN I CAN View MOVIES IN MY HALLS--------------
router.get('/MoviesInHalls/cinemaMovies/:cinema_location/:cinema_name',MoviesInHalls.cinemaMovies);
router.get('/MoviesInHalls/cinemaHalls/:cinema_name/:cinema_location' , MoviesInHalls.cinemaHalls);
router.get('/MoviesInHalls/getMovieAndHallData/:movie_id/:movie_id/:cinema_name/:cinema_location' , MoviesInHalls.getMovieAndHallData);

//--------------------------------Promocode routes------------------------------------------------------------//

router.get('/promocodes', Authorization.Verify('1000'),Promocodes.viewPromocodes);
router.post('/promocodes/edit', Authorization.Verify('1000'), Promocodes.editPromocode);
router.get('/promocodes/viewPromocodesAndCinemas', Authorization.Verify('1111'),Promocodes.viewPromocodesAndCinemas);
router.get('/promocodes/:promocode', Authorization.Verify('1000'),Promocodes.getPromocode);
router.get('/promocodes/filter/promocode/:promocode', Authorization.Verify('1000'), Promocodes.filterPromocode);
router.get('/promocodes/filter/cinema/:cinema' ,  Authorization.Verify('1000') , Promocodes.filterCinema);
router.post('/promocodes/assignPromocodes', Authorization.Verify('1000') , Promocodes.assignPromocodeToCinema);
router.post('/promocodes/addPromocode', Authorization.Verify('1000') , Promocodes.addPromocode);
router.post('/promocodes/deletePromocode/:promocode', Authorization.Verify('1000') , Promocodes.deletePromocode);


//////////////////////////////////////////////////// ADMIN ROUTES ////////////////////////////////////////////////////




////////////////////////////////////////////////// MyCinemas ROUTES //////////////////////////////////////////////////
//As an Admin i can add cinema
//TODO What is up with that ?!
//router.patch('/Cinemas/editCinema/:location/:name',(req,res,next)=>{console.log("hiii");next()}, MyCinemas.editCinema);

// ------------- As an Admin I can Delete a Cinema ----------------
//router.get('/mycinemas/delete/:cinema/:owner',MyCinemas.deleteCinemaForAdmin);


router.get('/adminSearch/:searchKeyword',Authorization.Verify("1100") ,Search.searchByKeyword);
router.get('/adminViewCinemas',Authorization.Verify("1100"),Cinema.ViewCinemas);

// TODO -- DELETE THIS COMMENT -- CHANGED ONES -> DOWN BELLOW
router.post('/myCinemas/addCinema',Authorization.Verify("1100") , MyCinemas.addCinema);
router.patch('/myCinemas/editCinema/:cinema_name/:cinema_location',Authorization.Verify("1100") , MyCinemas.editCinema);
router.delete('/myCinemas/deleteCinema/:cinema_name/:cinema_location',Authorization.Verify("1100") ,MyCinemas.deleteCinema);

//exporting routes to the project
module.exports = router;

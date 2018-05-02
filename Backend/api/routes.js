let express = require('express'),
    router = express.Router();

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
    //MoviesInHalls = require('./controllers/MoviesInHallsController'),
    AdminHalls = require('./controllers/AdminHallsController'),
    Promocodes = require('./controllers/PromocodesController'),
    MyCinemas = require('./controllers/MyCinemas'),
    Dashboard = require('./controllers/DashboardController');

//----------------------------------------------------Authentication routes------------------------------------//
router.get('/authTest', Authorization.Verify("1000"), (req, res) => {
    return res.status(200).json({
        err: null,
        msg: 'ok',
        data: null
    });
});

router.post('/login', Authentication.authenticate);
router.post('/verify', Authentication.verify);
router.post('/register', Authentication.Register);

//---------------------------------------------------User Booking Routes--------------------------------------//
router.post('/userBooking/makeReservation', UserBooking.makeReservation);

// TODO -- DELETE THIS COMMENT -- CHANGED ONES -> DOWN BELLOW
router.get('/userBooking/getBookings/:username/:start/:limit', UserBooking.getBookings);

router.get('/userBooking/getPartiesInSpecificCinema/:cinema_location/:cinema_name/:movie_id/:date',
    UserBooking.getPartiesOfThatMovieInSpecificCinema);
router.get('/userBooking/getAllParties/:movie_id/', UserBooking.getAllPartiesForThatMovie);
router.post('/userBooking/usePromoCode', UserBooking.usePromoCode);

//----------------------------------------------------Seating routes--------------------------------------------//
router.get('/layout/encoding', Seat.getSeats);
router.get('/layout/minified', Seat.minifiedLayout);
router.get('/layout/all', Seat.getAllLayouts);
router.post('/layout/add', Seat.addLayout);
router.post('/layout/update', Seat.updateLayout);
router.post('/layout/delete', Seat.deleteLayout);
router.get('/layout/:id', Seat.getLayout);

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
router.get('/viewCinema/:cinema/:loc', Cinema.viewCinema, Cinema.moviesInCinema);
router.get('/viewCinema/:cinema/:loc/allMovies', Cinema.moviesInCinema);
router.get('/viewCinema/DistinctLocations', Cinema.DistinctLocation);
router.get('/movies/id/:movie_id', Movie.getMovieInfo);

//----------------------------------------------------User Info routes----------------------------------------//
router.get('/users', User.getUsers);

//-----------------------------------------------------USERS ROUTES------------------------------------------//
router.get('/users/viewMyInfo', User.viewMyInfo);
router.post('/users/editProfile/:username', User.editProfile);

//----------------------------------------------------Actor routes--------------------------------------------//
router.get('/actors/:name', Actor.getActors);

//----------------------------------------------------Movie Getters routes------------------------------------//
router.get('/movies/getMoviesWithFilters/', Movie.getMoviesWithFilters);

//----------------------------------------------------Search routes--------------------------------------------//
router.get('/search/:searchKeyword', Search.searchByKeyword);

//----------------------------------------------------Viewing routes--------------------------------------------//
router.get('/viewCinemas', Cinema.ViewCinemas);
router.get('/viewMovies', Search.viewMovies);
router.get('/viewMovies3', Search.viewMovies3);
router.get('/viewMovies2', Search.viewMovies2);
router.get('/viewMovies1', Search.viewMovies1);
router.get('/viewMovies0', Search.viewMovies0);
router.get('/getTopMovies', Search.getTopMovies);

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

//-----------------------------------------------------Dashboard Routes---------------------------------------//
router.get('/dashboard/getAdminCount', Dashboard.getAdminCount);
router.get('/dashboard/getCinemaOwnerCount', Dashboard.getCinemaOwnerCount);
router.get('/dashboard/getBranchManagerCount', Dashboard.getBranchManagerCount);
router.get('/dashboard/getBookingUsherCount', Dashboard.getBookingUsherCount);
router.get('/dashboard/getCinemaCount', Dashboard.getCinemaCount);
router.get('/dashboard/getCinemasInRegionsCount', Dashboard.getCinemasInReginsCount);
router.get('/dashboard/getMoviesPlayedCount', Dashboard.getMoviesPlayedCount);
router.get('/dashboard/getTicketsCount', Dashboard.getTicketsCount);
router.get('/dashboard/getTicketsInRegionsCount', Dashboard.getTicketsInRegionsCount);
router.get('/dashboard/getUsersCount', Dashboard.getUsersCount);
router.get('/dashboard/getPaidTicketsCount', Dashboard.getPaidTicketsCount);
router.get('/dashboard/getUnpaidTicketsCount', Dashboard.getUnpaidTicketsCount);
router.get('/dashboard/getTop10ReservedMovies', Dashboard.getTop10ReservedMovies);
router.get('/dashboard/getTopReservedMovie', Dashboard.getTopReservedMovie);

//-----------------------------------------------------Halls Routes---------------------------------------------//
router.get('/admin/adminHalls/getHallsForThatCinema/:cinema_name/:cinema_location', AdminHalls.getHallsForThatCinema);
router.patch('/admin/adminHalls/assignMovieToHall', AdminHalls.assignMovieToHall);
router.delete('/admin/adminHalls/deleteMovieFromHall', AdminHalls.deleteMovieFromHall);
router.get('/admin/adminHalls/getMoviesInHallsForCinemaForAdmin/', AdminHalls.getMoviesInHallsForCinemaForAdmin);
router.get('/admin/adminHalls/viewMoviesInHall/:username/:cinema_name/:cinema_location/:hall_number', AdminHalls.viewMoviesInHalls);

//-------------------------------------------------Admins Profile Routes----------------------------------------//
router.post('/addBookingUsher', Authorization.Verify('1101'), Admin.addBookingUsher);
router.get('/getBookingUshers', Authorization.Verify('1101'), Admin.getBookingUshers);
router.post('/editBookingUsher', Authorization.Verify('1101'), Admin.editBookingUsher);
router.post('/deleteBookingUsher', Authorization.Verify('1101'), Admin.deleteBookingUsher);

router.post('/addBranchManager', Authorization.Verify('1100'), Admin.addBranchManager);
router.get('/getBranchManagers', Authorization.Verify('1100'), Admin.getBranchManagers);
router.post('/editBranchManager', Authorization.Verify('1100'), Admin.editBranchManager);
router.post('/deleteBranchManager', Authorization.Verify('1100'), Admin.deleteBranchManager);

router.post('/addBranchManager', Authorization.Verify('1000'), Admin.addCinemaOwner);
router.get('/getCinemaOwners', Authorization.Verify('1000'), Admin.getCinemaOwners);
router.post('/editCinemaOwner', Authorization.Verify('1000'), Admin.editCinemaOwner);
router.post('/deleteCinemaOwner', Authorization.Verify('1000'), Admin.deleteCinemaOwner);
router.get('/viewAdmins', Authorization.Verify('1000'), Admin.getAdmins);

//------------------------------------------AdminTicket Interactions Routes---------------------------------//
router.get('/tickets/viewTicketInfo', Authorization.Verify('1111'), adminTicket.viewTicketInfo);
router.patch('/tickets/verifyUnpaidTicket', Authorization.Verify('1111'), adminTicket.verifyUnpaidTicket);
router.get('/tickets/viewPartiesForThatMovie', Authorization.Verify('1111'), adminTicket.viewPartiesOfThatMovie);
router.post('/tickets/makeReservationAsAdmin', Authorization.Verify('1111'), adminTicket.makeReservationAsAdmin);
router.delete('/tickets/cancelReservation/:reservation_id', Authorization.Verify('1101'), adminTicket.cancelReservation);

//-------------------------------------------Halls Routes-----------------------------

router.get('/admin/adminHalls/getHallsForThatCinema/:cinema_name/:cinema_location', AdminHalls.getHallsForThatCinema);
router.post('/admin/adminHalls/assignMovieToHall', Authorization.Verify('1101'), AdminHalls.assignMovieToHall);
router.post('/admin/adminHalls/deleteMovieFromHall', Authorization.Verify('1101'), AdminHalls.deleteMovieFromHall);
router.get('/admin/adminHalls/viewMoviesInHalls/:username/:cinema_name/:cinema_location', AdminHalls.viewMoviesInHalls);
router.get('/admin/adminHalls/viewCinemasForAdminUser/:username', AdminHalls.viewCinemasForAdminUser);
router.get('/admin/getAlltMoviesInCinemaForAdmin/:cinema_location/:cinema_name', AdminHalls.getAlltMoviesInCinemaForAdmin);

//------------------------------------Movies & Requests Routes---------------------------
router.post('/addRequests/:admin_requested', Authorization.Verify("0101"), MyMovies.addRequests);
router.post('/requests/edit/:movie_id', Authorization.Verify("0101"), MyMovies.EditMyRequests);
router.post('/requests/delete/:movie_id', Authorization.Verify("0101"), MyMovies.DeleteMyRequests);
router.get('/requests/:admin_requested', Authorization.Verify("0101"), MyMovies.viewMyRequests);
router.get('/requests/AllSHOW', Authorization.Verify("1000"), MyMovies.viewRequests);
router.get('/viewMovie/viewAllMovies', MyMovies.getMovies);
router.get('/viewMovie/:movie_id', MyMovies.viewSingleMovie);
router.post('/addMovies', Authorization.Verify("1000"), MyMovies.addMovies);
router.post('/movie/edit/:movie_id', Authorization.Verify("1000"), MyMovies.EditMovies);
router.post('/movie/delete/:movie_id', Authorization.Verify("1000"), MyMovies.DeleteMovies);
router.get('/viewMovieRequest/:movie_id', MyMovies.ViewMovieRequest);
router.post('/RejectMovieRequest/:movie_id', Authorization.Verify("1000"), MyMovies.RejectMovieRequest);
router.post('/AcceptMovieRequest/:movie_id', Authorization.Verify("1000"), MyMovies.AcceptMovieRequest);

//-------HALLS CRUD OPERATIONS ROUTES---------//
router.get("/halls/all", Halls.getAllHalls);
router.get("/halls/view", Halls.getHall);
router.post("/halls/add", Halls.addHall);
router.post("/halls/update", Halls.updateHall);
router.post("/halls/deleteHall", Halls.deleteHall);
router.get("/cinema/location/min", Seat.distinctLocations);
router.get("/cinema/names/min", Seat.getCinemaName);

//--------AS AN ADMIN I CAN View MOVIES IN MY HALLS--------------
//router.get('/MoviesInHalls/cinemaMovies/:cinema_location/:cinema_name', MoviesInHalls.cinemaMovies);
//router.get('/MoviesInHalls/cinemaHalls/:cinema_name/:cinema_location', MoviesInHalls.cinemaHalls);
//router.get('/MoviesInHalls/getMovieAndHallData/:movie_id/:movie_id/:cinema_name/:cinema_location',
//    MoviesInHalls.getMovieAndHallData);

//--------------------------------Promocode routes------------------------------------------------------------//
router.get('/promocodes', Authorization.Verify('1000'), Promocodes.viewPromocodes);
router.post('/promocodes/edit', Authorization.Verify('1000'), Promocodes.editPromocode);
router.get('/promocodes/viewPromocodesAndCinemas', Authorization.Verify('1111'), Promocodes.viewPromocodesAndCinemas);
router.get('/promocodes/:promocode', Authorization.Verify('1000'), Promocodes.getPromocode);
router.get('/promocodes/filter/promocode/:promocode', Authorization.Verify('1000'), Promocodes.filterPromocode);
router.get('/promocodes/filter/cinema/:cinema', Authorization.Verify('1000'), Promocodes.filterCinema);
router.post('/promocodes/assignPromocodes', Authorization.Verify('1000'), Promocodes.assignPromocodeToCinema);
router.post('/promocodes/addPromocode', Authorization.Verify('1000'), Promocodes.addPromocode);
router.post('/promocodes/deletePromocode/:promocode', Authorization.Verify('1000'), Promocodes.deletePromocode);

////////////////////////////////////////////////// MyCinemas ROUTES //////////////////////////////////////////////////
router.get('/adminSearch/:searchKeyword', Authorization.Verify("1100"), Search.searchByKeyword);

// TODO -- DELETE THIS COMMENT -- CHANGED ONES -> DOWN BELLOW
router.get('/myCinemas/viewCinemas', Authorization.Verify("1100"), MyCinemas.viewCinemas);
router.post('/myCinemas/addCinema', Authorization.Verify("0100"), MyCinemas.addCinema);
router.patch('/myCinemas/editCinema/:name/:location', Authorization.Verify("0100"), MyCinemas.editCinema);
router.delete('/myCinemas/deleteCinema/:name/:location', Authorization.Verify("0100"), MyCinemas.deleteCinema);

//exporting routes to the project
module.exports = router;

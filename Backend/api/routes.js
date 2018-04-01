var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Movie = require('./controllers/MovieController')

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!


//------------------------USERS ROUTES-------------------------------
router.get('/users', User.getUsers);





//------------------------MOVIES ROUTES------------------------------

router.get('/movies',Movie.getMovies);

router.get('/movies',Movie.getMoviesHighRatings);
router.get('/movies',Movie.getMoviesLowRatings);

router.get('/movies',Movie.getMoviesLastestDate);
router.get('/movies',Movie.getMoviesOldesttDate);

router.get('/movies',Movie.getMoviesAction);
router.get('/movies',Movie.getMoviesAdventure);
router.get('/movies',Movie.getMoviesComedy);
router.get('/movies',Movie.getMoviesDrama);
router.get('/movies',Movie.getMoviesHorror);
router.get('/movies',Movie.getMoviesThriller);
router.get('/movies',Movie.getMoviesBiography); 
















//exporting routes to the project
module.exports = router;

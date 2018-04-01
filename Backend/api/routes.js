var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Movie = require('./controllers/MovieController');
var Actor = require('./controllers/ActorController');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!


//------------------------USERS ROUTES-------------------------------
router.get('/users', User.getUsers);







//-----------------------ACTOR ROUTES-------------------------------

router.post('/actors/:actor', Actor.getActors);






//------------------------MOVIES ROUTES------------------------------

router.get('/movies',Movie.getMovies);

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
















//exporting routes to the project
module.exports = router;

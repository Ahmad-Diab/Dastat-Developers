var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Movie = require('./controllers/MovieController')

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!


//------------------------USERS ROUTES-------------------------------
router.get('/users', User.getUsers);

<<<<<<< HEAD




//------------------------MOVIES ROUTES------------------------------


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















=======
router.post('/test', User.test);
>>>>>>> 7d7fb693d707cb3acbd98993e2a12fe6b731c8d7

//exporting routes to the project
module.exports = router;

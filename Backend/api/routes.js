var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Search = require('./controllers/SearchController');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);


//----------------------------------------------------Search routes--------------------------------------------//
router.get('/search/:searchKeyWord', Search.searchByKeyWord);

//exporting routes to the project
module.exports = router;


router.get('viewMovies',Search.viewMovies);
router.get('viewMovies3',Search.viewMovies3);
router.get('viewMovies2',Search.viewMovies2);
router.get('viewMovies1',Search.viewMovies1);
router.get('viewMovies0',Search.viewMovies0);
router.get('viewCinemas',Search.viewCinemas);
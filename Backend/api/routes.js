var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Search = require('./controllers/SearchController');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);


//----------------------------------------------------Search routes--------------------------------------------//
<<<<<<< HEAD
router.get('/search/:searchKeyWord', Search.searchByKeyWord);
=======
router.get('/search', Search.searchByKeyWord);
>>>>>>> bfb7af009cf59a25d13ff1a33fd97c60cd54de97

//exporting routes to the project
module.exports = router;

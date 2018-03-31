var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Search = require('./controllers/SearchController');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);


//----------------------------------------------------Search routes--------------------------------------------//
router.get('/search', Search.searchByKeyWord);

//exporting routes to the project
module.exports = router;

var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');
var Register = require('./controllers/Authentication');

//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);
console.log("wslt l hna ");
router.post('/register', Register.Register);
router.post('/test',function(req, res, next){
console.log(req.body);
});
console.log("hna l2a");
//exporting routes to the project
module.exports = router;

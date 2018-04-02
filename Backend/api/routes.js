var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController');


//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);

router.post('/test', User.test);

router.post('/auth', User.authenticate);


router.route('/auth/forgot_password')
    .get( User.render_forgot_password_template)
    .post(User.forgot_password);


//exporting routes to the project
module.exports = router;

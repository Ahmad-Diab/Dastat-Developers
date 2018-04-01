var express = require('express');
var router = express.Router();

//Schema Controllers
var User = require('./controllers/UserController'),
    UserBooking = require('./Controllers/UserBookingController');


//please add only routers here, if you need to call a function require its class
//DONT IMPLEMENT CONTROLLER FUNCTION HERE!!

router.get('/users', User.getUsers);

//-------------------------------User Booking Routes---------------------------------
//TODO Authentication before booking
router.post('/userBooking/makeReservation',UserBooking.makeReservation());


//exporting routes to the project
module.exports = router;

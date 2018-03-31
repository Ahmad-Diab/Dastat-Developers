/**
 * A Controller, having the functions to handle ordinary user booking process.
 */
var database = require('../config/db-connection');

/**
 *  A function to show parties to ordinary user based on his/her choice of
 *  Movie, Cinema, as well as Date (Day).
 * @param req
 * @param res
 * @param next
 */
module.exports.getParties = function(req, res, next){
    //TODO Get parties of movies just chosen according to chosen day
};

/**
 * A function to handle making the reservation of (one or more) tickets
 * to a movie in a cinema at the end of the booking process.
 * @param req
 * @param res
 * @param next
 */
module.exports.makeReservation = function(req, res, next){
    //TODO Make a reservation based on all data need for reservation.
};

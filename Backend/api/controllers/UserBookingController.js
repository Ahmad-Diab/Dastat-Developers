/**
 * A Controller, having the functions to handle ordinary user booking process.
 */
var database = require('../config/db-connection'),
    moment = require('moment'),
    Validations = require('../utils/validations');

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
    //TODO Assure valid values
    //TODO User-name validation needs to be done!
    var username = req.params.username,
        cinema_name = req.params.cinema_name,
        cinema_location = req.params.cinema_location,
        party_datetime = req.params.date_time,
        hall = req.params.hall,
        payment = req.params.payment,
        tickets = req.params.tickets;

    if(!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }

    if(!cinema_name || !cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema data is required.',
            data: null
        });
    }

    if(!party_datetime || !hall) {
        return res.status(422).json({
            err: null,
            msg: 'Party data is required.',
            data: null
        });
    }

    if(!tickets || !payment) {
        return res.status(422).json({
            err: null,
            msg: 'Tickets data is required.',
            data: null
        });
    }

    if(!Validations.isBoolean(payment) || !Validations.isDate(party_datetime) ||
        !Validations.isNumber(hall)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    for( var i = 0; i< req.tickets.length; i++) {
        var seatNum = req.tickets[i];

        //TODO seatNum type validation

        var sqlInsertionIntoTicket =
            'INSERT INTO Tickets VALUES' +
            '(username, payment, seat_number, data_time, hall, cinema_location, cinema_name)' +
            '('+username+','+payment+','+seatNum+','+party_datetime+','+hall+','+
            cinema_location+','+cinema_name+');';

        database.query(sqlInsertionIntoTicket, function (error, results) {
            if(error){
                return next(error);
            }

            res.status(200).json({
                err: null,
                msg: 'Booking Request has been completed successfully.',
                data: req
            });
        });
    }

};

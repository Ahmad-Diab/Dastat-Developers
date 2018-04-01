/**
 * A Controller, having the functions to handle ordinary user booking process.
 */
var database = require('../config/db-connection'),
    Validations = require('../utils/validations');


/**
 *  A function to show parties to ordinary user based on his/her choice of
 *  Movie, Cinema, as well as Date (Day).
 * @param req
 * @param res
 * @param next
 */
module.exports.getParties = function(req, res){
    //TODO Get parties of movies just chosen according to chosen day
    var cinemaName = req.params.cinemaName,
        movieName = req.params.movieName;
        date = req.params.date;
    var query = "SELECT h.cinema_name , m.title,h.hall_number , p.date_time , h.number_of_seats FROM Halls h JOIN Parties p ON h.hall_number = p.hall JOIN Movies m ON m.movie_id = h.movie WHERE h.cinema_name = ? AND h.movie = ? AND DATE(p.date_time) = ?";

        database.query(query,[cinemaName,movieName,date],function (err, result, fields) {
            if (err) throw err;
            return res.send(result);
          });
};


/**
 * A function to handle making the reservation of (one or more) tickets
 * to a movie in a cinema at the end of the booking process.
 * @param req
 * @param res
 * @param next
 */
module.exports.makeReservation = function(req, res, next){
    //COMPLETED Make a reservation based on all data need for reservation.
    //TODO User-name validation needs to be done!
    var username = req.body['username'],
        cinema_name = req.body['cinema_name'],
        cinema_location = req.body['cinema_location'],
        party_datetime = req.body['date_time'],
        hall = req.body['hall'],
        payment = req.body['payment'],
        tickets = req.body['tickets'];

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

    for( var i = 0; i< tickets.length; i++) {
        var seatNum = tickets[i];

        //TODO seatNum type validation

        var sqlInsertionIntoTicket =
            'INSERT INTO Tickets VALUES' +
            '(username, payment, seat_number, data_time, hall, cinema_location, cinema_name)' +
            '('+username+','+payment+','+seatNum+','+party_datetime+','+hall+','+
            cinema_location+','+cinema_name+');';

        database.query(sqlInsertionIntoTicket, function (error) {
            if(error){
                return next(error);
            }

            res.status(200).json({
                err: null,
                msg: 'Booking Request has been completed successfully.',
                data: req.body
            });
        });
    }


};

module.exports.getCurrentMovies = function(req, res, next){

    var currentDate = new Date();
    var currentDay = currentDate.getDay;
    console.log(currentDate);
    var sqlSelectionFromMovies = 'SELECT release_date FROM movies';

    database.query(sqlSelectionFromMovies, function (error, results) {
        if(error){
            return next(error);
        }

        res.status(200).json({
            err: null,
            msg: 'Movies Successfully Retrieved',
            data: results
        });

    });
};

module.exports.getCurrentMoviesForCinema = function(req, res, next){

    var cinemaName = req.params.cinema_name;
    var cinemaLocation = req.params.cinema_location;

    if(!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Name is required.',
            data: null
        });
    }

    var sqlSelection = 'SELECT * FROM movies m , movies_in_cinemas mc  WHERE mc.cinema_name = ? AND mc.cinema_location = ? AND mc.movie = m.movie_id';

    database.query(sqlSelection, [cinemaName , cinemaLocation], function (error, results) {
        if(error){
            return next(error);
        }

        res.status(200).json({
            err: null,
            msg: 'Movies Successfully Retrieved',
            data: results
        });

    });
};

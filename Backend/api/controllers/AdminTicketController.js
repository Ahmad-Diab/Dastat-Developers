/**
 * A Controller containing all functions, which may relate to the Admin and Cinema Tickets Interactions.
 */
let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

/**
 * A function to verify an unpaid ticket
 * @param req, reservation_id, and adminUsername
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.verifyUnpaidTicket = function (req, res, next) {

    let adminUsername = req.body['username'],
        reservation_id = req.body['reservation_id'];

    if (!Validations.isString(adminUsername))
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });

    // Null Checkers
    if (!adminUsername) {
        return res.status(422).json({
            err: null,
            msg: 'Admin username is required.',
            data: null
        });
    }
    if (!reservation_id) {
        return res.status(422).json({
            err: null,
            msg: 'Reservation id is required.',
            data: null
        });
    }

    if (!Validations.isNumber(reservation_id)) {
        return res.status(422).json({
            err: null,
            msg: 'reservation_id must be of correct type (number).',
            data: null
        });
    }

    let sqlQuery = "UPDATE tickets SET payment = 1 WHERE reservation_id = ?;";

    database.query(sqlQuery, reservation_id, function (error, results) {
        if (error) {
            return next(error);
        }

        if (results.changedRows) {
            console.log('ticket verified');
            res.status(200).json({
                err: null,
                msg: 'Ticket has been verified successfully.',
                data: results
            });
        } else {
            res.status(404).json({
                err: null,
                msg: 'There is no ticket with this reservation_id.',
                data: null
            });
        }

    });

};
/**
 * Function to return all parties in all halls for a movie
 * @param req
 * @param res
 * @returns {*}
 */
module.exports.viewPartiesOfThatMovie = function (req, res) {

    let admin_username = req.queries['username'],
        cinema_name = req.queries['cinema_name'],
        cinema_location = req.queries['cinema_location'],
        movie_id = req.queries['movie_id'];

    // Null Checkers
    console.log('I am in viewParties');
    if (!admin_username) {
        return res.status(422).json({
            err: null,
            msg: 'Admin username is required.',
            data: null
        });
    }

    if (!cinema_name || !cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema data is required.',
            data: null
        });
    }

    if (!movie_id) {
        return res.status(422).json({
            err: null,
            msg: 'movie_id is required',
            data: null
        });
    }

    console.log('I passed all null checkers');

    // Validations of correct types
    if (!Validations.isString(cinema_name) ||
        !Validations.isString(cinema_location) ||
        !Validations.isNumber(movie_id) || !Validations.isString(admin_username)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    console.log('I passed all validations');

    let query = 'SELECT * FROM halls h JOIN parties p ON h.hall_number = p.hall AND h.cinema_location = p.cinema_location AND h.cinema_name = p.cinema_name'
        + ' WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = ?';

    database.query(query, [cinema_name, cinema_location, movie_id], function (err, result) {

        console.log("query is executed");
        if (err) throw err;

        console.log("no errors in query");
        if (!result.length) {

            res.status(404).json({
                err: null,
                msg: 'No parties for this movie',
                data: null
            });

        } else {

            res.status(200).json({
                err: null,
                msg: 'Parties Successfully Retrieved',
                data: result
            });

        }
    });

};

/**
 * A function to view client's ticket info
 * @param req, reservation_id, and adminUsername
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.viewTicketInfo = function (req, res, next) {

    let adminUsername = req.queries['username'],
        reservation_id = req.queries['reservation_id'];
    console.log(adminUsername);
    console.log(reservation_id);
    // Null Checkers
    if (!adminUsername) {
        return res.status(422).json({
            err: null,
            msg: 'Admin username is required.',
            data: null
        });
    }

    if (!reservation_id) {
        return res.status(422).json({
            err: null,
            msg: 'reservation_id is required.',
            data: null
        });
    }

    if (!Validations.isNumber(reservation_id)) {
        return res.status(422).json({
            err: null,
            msg: 'reservation_id must be of correct type (number).',
            data: null
        });
    }

    if (!Validations.isString(adminUsername)) {
        return res.status(422).json({
            err: null,
            msg: 'reservation_id must be of correct type (number).',
            data: null
        });
    }

    let sqlQuery = "SELECT * FROM tickets T INNER JOIN movies M ON  T.movie_id = M.movie_id WHERE T.reservation_id = ?;";

    database.query(sqlQuery, reservation_id, function (error, results) {
        if (error) {
            return next(error);
        }
        if (results.length)
            res.status(200).json({
                err: null,
                msg: 'Tickets data retrieved successfully.',
                data: results[0]
            });
        else
            res.status(404).json({
                err: null,
                msg: 'Tickets data not found.',
                data: null
            });

    });


};

/**
 * A function to cancel a ticket reservation by an admin user
 * @param req, id of reservation in headers
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.cancelReservation = function (req, res, next) {
    let id = req.queries['reservation_id'];

    if (isNaN(id)) return res.status(400).send({ //making sure it is a number, and returning an error if it is not
        "error": "Entered id not an integer",
        "msg": null,
        "data": null
    });
    database.query('SELECT * FROM tickets WHERE reservation_id = ?', [id], function (error, results, fields) { //making sure a ticket with this id exists in the database, and returning an error if it does not
        if (results.length == 0) return res.status(404).send({
            "error": "Ticket does not exist",
            "msg": null,
            "data": null
        });
        else {
            database.query('DELETE FROM tickets WHERE reservation_id = ?', [id], function (error, result) { //deleting the ticket
                if (error) return next(error);
                return res.status(200).send({
                    "error": null,
                    "msg": "Deletion Success",
                    "data": null
                });
            });
        }
    });
};

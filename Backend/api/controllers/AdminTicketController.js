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
module.exports.verifyUnpaidTicket = function(req, res, next){
    // TODO Check user is admin

    let adminUsername = req.body['username'],
        reservation_id = req.body['reservation_id'];

    // Null Checkers
    if(!adminUsername) {
        return res.status(422).json({
            err: null,
            msg: 'Admin username is required.',
            data: null
        });
    }
    if(!reservation_id) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema data is required.',
            data: null
        });
    }

    if(!Validations.isNumber(reservation_id)) {
        return res.status(422).json({
            err: null,
            msg: 'reservation_id must be of correct type (number).',
            data: null
        });
    }

    let sqlQuery = "UPDATE Tickets SET payment = 1 WHERE reservation_id = ?;";

    database.query(sqlQuery,reservation_id, function (error, results) {
        if (error) {
            return next(error);
        }

        res.status(200).json({
            err: null,
            msg: 'Ticket has been verified successfully.',
            data: results
        });

    });

};

/**
 * A function to view client's ticket info
 * @param req, reservation_id, and adminUsername
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.viewTicketInfo = function(req, res, next){
    // TODO Check user is admin

    let adminUsername = req.headers['username'],
        reservation_id = req.headers['reservation_id'];

    // Null Checkers
    if(!adminUsername) {
        return res.status(422).json({
            err: null,
            msg: 'Admin username is required.',
            data: null
        });
    }

    if(!reservation_id) {
        return res.status(422).json({
            err: null,
            msg: 'reservation_id is required.',
            data: null
        });
    }

    if(!Validations.isNumber(reservation_id)) {
        return res.status(422).json({
            err: null,
            msg: 'reservation_id must be of correct type (number).',
            data: null
        });
    }

    let sqlQuery = "SELECT * FROM Tickets WHERE reservation_id = ?;";

    database.query(sqlQuery,reservation_id, function (error, results) {
        if (error) {
            return next(error);
        }
        if(results.length)
            res.status(200).json({
                err: null,
                msg: 'Tickets data retrieved successfully.',
                data: results
            });
        else
            res.status(404).json({
                err: null,
                msg: 'Tickets data not found.',
                data: results
            });

    });


};

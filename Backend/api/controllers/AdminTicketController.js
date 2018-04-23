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

    let sqlQuery = "UPDATE tickets SET payment = 1 WHERE reservation_id = ?;";

    database.query(sqlQuery,reservation_id, function (error, results) {
        if (error) {
            return next(error);
        }
        if (results.changedRows) {
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

    let sqlQuery = "SELECT * FROM tickets T INNER JOIN movies M ON  T.movie_id = M.movie_id WHERE T.reservation_id = ?;";

    database.query(sqlQuery,reservation_id, function (error, results) {
        if (error) {
            return next(error);
        }
        if(results.length)
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
 * A function to book a ticket for offline user by an admin user
 * @param req, required data for
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.makeReservationByAdmin = function(req, res, next){
    console.log("I am here to test if I am reaching here");
    return require('UserBookingController').makeReservation(req, res, next);

};


/**
 * A function to cancel a ticket reservation by an admin user
 * @param req, required data for
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.cancelReservation = function(req, res, next){
  var id = req.body.id; //reservation_id
  if (isNaN(id)) return res.status(400).send({ //making sure it is a number, and returning an error if it is not
    "error": "Entered id not an integer",
    "msg": null,
    "data": null
  });
  database.query('SELECT * FROM tickets WHERE reservation_id = ?', [id], function(error, results, fields){ //making sure a ticket with this id exists in the database, and returning an error if it does not
    if(results.length == 0) return res.status(404).send({
      "error": "Ticket does not exist",
      "msg": null,
      "data": null
    });
    else {
    database.query('DELETE FROM tickets WHERE reservation_id = ?', [id], function(error, result){ //deleting the ticket
      if(error) return next(error);
      return res.status(200).send({
        "error": null,
        "msg": "Deletion Success",
        "data": null
      });
    });
  }
  });
};

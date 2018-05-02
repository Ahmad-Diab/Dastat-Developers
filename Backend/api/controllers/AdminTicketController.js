/**
 * A Controller containing all functions, which may relate to the Admin and Cinema Tickets Interactions.
 */
let database = require('../config/db-connection'),
    Validations = require('../utils/validations'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken');


/**
 * @param req, required data for processing the request of making the reservation
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.makeReservationAsAdmin = function (req, res, next) {

    let tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({
            err: null,
            msg: 'You must log in first.',
            data: null
        });
    }

    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];
    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: null,
                msg: 'Must be a user of the system',
                data: null
            });
        }

        let admin_username = authData.username;

        if (!admin_username) {
            return res.status(401).json({
                err: null,
                msg: 'You must log in first.',
                data: null
            });
        }
        let cinema_name = req.body['cinema_name'],
            cinema_location = req.body['cinema_location'],
            party_date = req.body['date'],
            party_time = req.body['time'],
            hall = req.body['hall'],
            movie = req.body['movie'],
            payment = req.body['payment'],
            tickets = req.body['tickets'],
            tickets_price = req.body['price'],
            numOfTickets = tickets.length,
            comment = req.body['comment'];

        // Null Checkers
        if (!cinema_name || !cinema_location) {
            return res.status(422).json({
                err: null,
                msg: 'cinema_name & cinema_location are required.',
                data: null
            });
        }

        let username = cinema_name.trim(' ').toLowerCase() + '_' + cinema_location.trim(' ').toLowerCase();

        if (!party_date || !party_time) {
            return res.status(422).json({
                err: null,
                msg: 'party_data & party_time are required.',
                data: null
            });
        }
        if (!hall || !movie) {
            return res.status(422).json({
                err: null,
                msg: 'Party hall and movie are required.',
                data: null
            });
        }
        if (!tickets || !tickets_price) {
            return res.status(422).json({
                err: null,
                msg: 'Tickets data is required.',
                data: null
            });
        }

        // Validations of correct types
        if (!Validations.isBoolean(payment) ||
            !Validations.isNumber(hall) ||
            !Validations.isNumber(tickets_price)) {
            return res.status(422).json({
                err: null,
                msg: 'Provided data must be in valid types.',
                data: null
            });
        }

        // Verify that movie exists in hall
        // Verify that hall exists in Cinema, and retrieve movie
        let checkForMembershipQuery = 'SELECT admin FROM admins_cinemas WHERE admin = ? AND cinema_name = ? AND cinema_location = ?',
            membershipData = [admin_username, name, location];
        database.query(checkForMembershipQuery, membershipData, function (err, results) {
            if (err) return next(err);

            if (!results.length) {
                return res.status(401).send({
                    err: null,
                    msg: "Not member of this cinema",
                    data: null
                });
            }

            database.query('SELECT movie FROM halls WHERE hall_number = ? AND cinema_location = ? AND cinema_name = ?',
                [hall, cinema_location, cinema_name], function (error, results) {
                    if (error) {
                        return next(error);
                    }

                    if (!results || !results.length || results[0].movie !== movie) {
                        return res.status(404).send({
                            err: null,
                            msg: "The assigned hall does not exist.",
                            data: null
                        });
                    }

                    let values = [];
                    for (let i = 0; i < numOfTickets; i++) {
                        let seatNum = tickets[i];
                        let ticket_details = [username, payment, seatNum, party_date, party_time, hall, cinema_location, cinema_name,
                            tickets_price, movie, comment];
                        values.push(ticket_details);
                    }

                    let sqlQuery = 'INSERT INTO tickets (user,payment,seat_number,date,time,hall,cinema_location,cinema_name,price,movie_id,comment) VALUES ?';
                    database.query(sqlQuery, [values], function (error, results) {
                        if (error) {
                            return next(error);
                        }

                        res.status(200).json({
                            err: null,
                            msg: 'Booking Request has been completed successfully.',
                            data: results
                        });

                    });
                });

        });

    });

};

/**
 * A function to verify an unpaid ticket
 * @param req, reservation_id, and adminUsername
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.verifyUnpaidTicket = function (req, res, next) {

    let tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({
            err: null,
            msg: 'You must log in first',
            data: null
        });
    }

    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];

    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: null,
                msg: 'Must be a user of the system',
                data: null
            });
        }

        let adminUsername = authData.username,
            reservation_id = req.body['reservation_id'];

        // Null Checkers
        if (!adminUsername) {
            return res.status(401).json({
                err: null,
                msg: 'You must log in first.',
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

        let checkForMembershipQuery = 'SELECT a.admin FROM admins_cinemas a JOIN tickets t ON a.cinema_name = t.cinema_name AND a.cinema_location = t.cinema_location WHERE a.admin = ? AND t.reservation_id = ?',
            membershipData = [adminUsername, reservation_id];
        database.query(checkForMembershipQuery, membershipData, function (err, results) {
            if (err) return next(err);

            if (!results.length && adminUsername !== 'app') {
                return res.status(404).send({
                    err: null,
                    msg: "Ticket does not exist or not member of same cinema.",
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
        });

    });


};

/**
 * Function to return all parties in all halls for a movie in
 * specific cinema
 * @param req, cinema_name, cinema_location and movie_id in query
 * @param res
 * @returns {*}
 */
module.exports.viewPartiesOfThatMovie = function (req, res) {

    let cinema_name = req.query['cinema_name'],
        cinema_location = req.query['cinema_location'],
        movie_id = req.query['movie_id'];

    // Null Checkers
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

    // Validations of correct types
    if (!Validations.isString(cinema_name) ||
        !Validations.isString(cinema_location) ||
        !Validations.isNumber(movie_id)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    let query = 'SELECT * FROM halls h JOIN parties p ON h.hall_number = p.hall AND h.cinema_location = p.cinema_location AND h.cinema_name = p.cinema_name'
        + ' WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = ?';

    database.query(query, [cinema_name, cinema_location, movie_id], function (err, result) {

        if (err) throw err;

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
 * @param req, reservation_id, and username in query
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.viewTicketInfo = function (req, res, next) {
    let tokenHeader = req.headers['authorization'];

    if (!tokenHeader) {
        return res.status(401).json({
            err: null,
            msg: 'You must log in first.',
            data: null
        });
    }

    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];

    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: null,
                msg: 'Must be a user of the system',
                data: null
            });
        }

        let adminUsername = authData.username,
            reservation_id = req.query['reservation_id'];

        // Null Checkers
        if (!adminUsername) {
            return res.status(401).json({
                err: null,
                msg: 'You must log in first.',
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

        let sqlQuery = (adminUsername === 'app')?
            "SELECT * FROM tickets t WHERE t.reservation_id = ?;" :
            "SELECT * FROM tickets T INNER JOIN movies M ON  T.movie_id = M.movie_id INNER JOIN admins_cinemas A ON A.cinema_name = T.cinema_name AND A.cinema_location = T.cinema_location  WHERE A.admin = ? AND T.reservation_id = ?;";
        let sqlData = (adminUsername === 'app')? [reservation_id] : [adminUsername, reservation_id];
        database.query(sqlQuery, sqlData, function (error, results) {
            if (error) {
                return next(error);
            }

            if (!results.length) {
                res.status(404).json({
                    err: null,
                    msg: 'Tickets data not found.',
                    data: null
                });
            } else {
                res.status(200).json({
                    err: null,
                    msg: 'Tickets data retrieved successfully.',
                    data: results[0]
                });
            }


        });

    });
};

/**
 * @param req, id of reservation in query
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.cancelReservation = function (req, res, next) {
    let tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({
            err: null,
            msg: 'You must log in first',
            data: null
        });
    }

    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: null,
                msg: 'Must be a user of the system',
                data: null
            });
        }

        let adminUsername = authData.username,
            id = req.params['reservation_id'];

        if (isNaN(id)) {
            return res.status(400).send({ //making sure it is a number, and returning an error if it is not
                "error": "Entered id not an integer.",
                "msg": null,
                "data": null
            });
        }

        let checkForMembershipQuery = 'SELECT a.admin FROM admins_cinemas a JOIN tickets t ON a.cinema_name = t.cinema_name AND a.cinema_location = t.cinema_location WHERE a.admin = ? AND t.reservation_id = ?',
            membershipData = [adminUsername, id];
        let sqlQuery = (adminUsername === 'app')?
            "SELECT * FROM tickets t WHERE t.reservation_id = ?;" : checkForMembershipQuery;
        let sqlData = (adminUsername === 'app')? [id] : membershipData;
        database.query(sqlQuery, sqlData, function (err, results) {
            if (err) return next(err);

            if (!results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "Ticket does not exist or not member of same cinema.",
                    data: null
                });
            } else {
                database.query('DELETE FROM tickets WHERE reservation_id = ?', [id], function (error, result) { //deleting the ticket
                    if (error) return next(error);
                    return res.status(200).send({
                        "error": null,
                        "msg": "Ticket is canceled successfully.",
                        "data": result
                    });
                });
            }
        });
    });
};

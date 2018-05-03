/**
 * A Controller, having the functions to handle ordinary user booking process.
 */
let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

/**
 * @param req, movie_id of a movie in params
 * @param res, data of all cinemas which have the movie available
 */
module.exports.getCinemasForThatMovie = function (req, res) {
    let movie_id = req.params['movie_id'];

    if (!movie_id) {
        return res.status(422).json({
            err: null,
            msg: 'movie_id is required.',
            data: null
        });
    }

    let sql = "SELECT C.* FROM cinemas C , halls H WHERE C.name = H.cinema_name AND C.location = H.cinema_location AND H.movie = ?";
    database.query(sql, [movie_id], function (err, result) {
        if (err) throw err;
        //return res.send(result);
        if (!result.length) {
            res.status(200).json({
                err: null,
                msg: 'No cinemas show this movie',
                data: result
            });
        } else {
            res.status(200).json({
                err: null,
                msg: 'Cinemas Successfully Retrieved',
                data: result
            });

        }
    });
};


/**
 *  Show parties of a movie for a period of 5 days in specific cinema.
 * @param req, cinema_name, cinema_location, movie_id, date in params
 * @param res
 */
module.exports.getPartiesOfThatMovieInSpecificCinema = function (req, res) {
    let cinemaName = req.params['cinema_name'],
        cinemaLocation = req.params['cinema_location'],
        movie_id = req.params['movie_id'],
        date = req.params['date'];

    if (!cinemaName || !cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'cinema_name, and cinema_location are required required.',
            data: null
        });
    }

    if (!movie_id) {
        return res.status(422).json({
            err: null,
            msg: 'movie_id is required.',
            data: null
        });
    }

    if (!date) {
        return res.status(422).json({
            err: null,
            msg: 'Party data (date) is required.',
            data: null
        });
    }

    // Validations of correct types
    if (!Validations.isString(cinemaName) ||
        !Validations.isString(cinemaLocation) ||
        !Validations.isNumber(movie_id) ||
        !Validations.isDate(date)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    //let query = 'SELECT h.cinema_location, h.cinema_name, h.hall_number, h.type, h.number_of_seats, h.movie, p.date_time, m.title, DATE_FORMAT(p.date_time, "%H:%i") AS time FROM Halls h JOIN Parties p ON h.hall_number = p.hall AND h.cinema_location = p.cinema_location AND h.cinema_name = p.cinema_name JOIN Movies m ON h.movie = m.movie_id'
    //+' WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = ? AND DATE(p.date_time) < DATE_ADD(CURRENT_DATE, INTERVAL 4 DAY) AND DATE(p.date_time) > DATE_ADD(CURRENT_DATE, INTERVAL -1 DAY)';
    //+' WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = ? AND DATE(p.date_time) = ?';

    let query =
        'SELECT * ' +
        'FROM halls h JOIN parties p ON h.hall_number = p.hall AND h.cinema_location = p.cinema_location AND h.cinema_name = p.cinema_name ' +
        'WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = ? AND DATE(p.date) = ? AND DATE(p.date) BETWEEN DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY) AND CURRENT_DATE AND p.time > CURRENT_TIME';

    database.query(query, [cinemaName, cinemaLocation, movie_id, date], function (err, result) {

        if (err) throw err;

        if (!result.length) {
            res.status(404).json({
                err: null,
                msg: 'No upcoming parties for this movie in this cinema at this date',
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
 *  Show parties of a movie for a period of 5 days in all Cinemas.
 * @param req, movie_id, and date in params
 * @param res
 */
module.exports.getAllPartiesForThatMovie = function (req, res) {
    let movie_id = req.params['movie_id'];

    if (!movie_id) {
        return res.status(422).json({
            err: null,
            msg: 'movie_id is required.',
            data: null
        });
    }

    // Validations of correct types
    if (!Validations.isNumber(movie_id)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    let query =
        'SELECT * ' +
        'FROM halls h JOIN parties p ON h.hall_number = p.hall ' +
        'WHERE h.movie = ? AND DATE(p.date) BETWEEN DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY) AND CURRENT_DATE AND p.time > CURRENT_TIME';

    database.query(query, [movie_id], function (err, result) {

        if (err) throw err;

        if (!result.length) {
            res.status(404).json({
                err: null,
                msg: 'No upcoming parties for this movie in this cinema at this date',
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
 * A function to handle making the reservation of (one or more) tickets
 * to a movie in a cinema at the end of the booking process.
 * @param req, required data for processing the request of making the reservation
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.makeReservation = function (req, res, next) {

    let username = req.body['username'],
        cinema_name = req.body['cinema_name'],
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
    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'username is required.',
            data: null
        });
    }
    if (!cinema_name || !cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'cinema_name & cinema_location are required.',
            data: null
        });
    }
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

};

module.exports.getCurrentMovies = function (req, res, next) {

    let currentDate = new Date();

    let sqlSelectionFromMovies = 'SELECT * FROM movies WHERE release_date <= ?';
    database.query(sqlSelectionFromMovies, [currentDate], function (error, results) {
        if (error) {
            return next(error);
        }

        if (!results.length) {

            res.status(404).json({
                err: null,
                msg: 'No current movies available',
                data: results
            });

        }
        else {

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

    });
};

module.exports.getUpcomingMovies = function (req, res, next) {

    let currentDate = new Date();

    let sqlSelectionFromMovies = 'SELECT * FROM movies WHERE release_date > ?';
    database.query(sqlSelectionFromMovies, [currentDate], function (error, results) {
        if (error) {
            return next(error);
        }

        if (!results.length) {

            res.status(404).json({
                err: null,
                msg: 'No Upcoming movies available',
                data: results
            });
        } else {
            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });
        }

        res.status(200).json({
            err: null,
            msg: 'Movies Successfully Retrieved',
            data: results
        });

    });
};
/**
 *
 * @params req, username in params
 * @params res, next
 */
module.exports.getBookings = function (req, res, next) {
    let username = req.params['username'],
        start = req.params['start'],
        limit = req.params['limit'];

    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }

    let limitNotEnteredMsg = !(!start || !limit) ? "" : " - No limits have been entered.";

    let queryForCount = "Select count(*) as TotalCount from tickets WHERE user = ?";
    database.query(queryForCount, [username] ,function (err, rows) {
        if (err)
            return err;

        let startNum, limitNum;
        let totalCount = rows[0]['TotalCount'];
        if (start === '' || limit === '' ||
            !start || !limit) {
            // In case no limits entered, send just few.
            startNum = 0;
            limitNum = 10;
        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let sqlBookings = 'SELECT tickets.* ,movies.title FROM tickets INNER JOIN movies ON tickets.movie_id=movies.movie_id WHERE user=? ORDER BY reservation_id DESC limit ? OFFSET ?';
        let userAndLimitData = [username, limitNum, startNum];
        //let sqlBookings = 'SELECT tickets.reservation_id,tickets.seat_number,tickets.date,time,tickets.hall,tickets.cinema_location,tickets.cinema_name,movies.title FROM tickets INNER JOIN movies ON tickets.movie_id=movies.movie_id WHERE user=?';
        database.query(sqlBookings, userAndLimitData, function (error, results) {
            if (error) {
                return next(error);
            }

            res.status(200).json({
                err: null,
                msg: 'Bookings Successfully Retrieved' + limitNotEnteredMsg,
                data: {"results" : results,
                "totalCount": totalCount}
            });
        });
    });
};

/**
 *
 * @param req, cinema_name, and cinema_location in params
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.getCurrentMoviesForCinema = function (req, res, next) {

    let cinemaName = req.params.cinema_name,
        cinemaLocation = req.params.cinema_location;
    //currentDate = new Date();

    if (!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Name is required.',
            data: null
        });
    }

    if (!cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Location is required.',
            data: null
        });
    }

    let sqlSelection = 'SELECT m.* FROM movies m , halls h WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = m.movie_id';

    database.query(sqlSelection, [cinemaName, cinemaLocation], function (error, results) {
        if (error) {
            return next(error);
        }

        if (!results.length) {

            res.status(404).json({
                err: null,
                msg: 'No current movies Available.',
                data: results
            });

        }
        else {

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved.',
                data: results
            });

        }

    });
};

/**
 *
 * @param req, cinema_name, and cinema_location in params
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.getUpcomingMoviesForCinema = function (req, res, next) {

    let cinemaName = req.params.cinema_name,
        cinemaLocation = req.params.cinema_location,
        currentDate = new Date();

    if (!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Name is required.',
            data: null
        });
    }

    if (!cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Location is required.',
            data: null
        });
    }

    let sqlSelection = 'SELECT * FROM movies m , movies_in_cinemas mc  WHERE mc.cinema_name = ? AND mc.cinema_location = ? AND mc.movie = m.movie_id' +
        'AND m.release_date > ?';

    database.query(sqlSelection, [cinemaName, cinemaLocation, currentDate], function (error, results) {
        if (error) {
            return next(error);
        }

        if (!results.length) {

            res.status(404).json({
                err: null,
                msg: 'No Upcoming Movies Available.',
                data: null
            });

        }
        else {

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

    });
};

/**
 *
 * @param req, oldPrice: price, promocode:code, cinemaName:name, cinemaLocation:location in body
 * @param res
 * @param next
 */
module.exports.usePromoCode = function (req, res, next) {
    let oldPrice = req.body.price,
        promocode = req.body.code,
        cinemaName = req.body.name,
        cinemaLocation = req.body.location;

    database.query('SELECT promocode FROM Promocodes_Cinemas WHERE promocode = ? AND cinema_name = ? AND cinema_location = ?',
        [promocode, cinemaName, cinemaLocation], function (error, results) {
            if (error) return next(error);

            if (!results.length) {
                return res.status(404).send({
                    "error": "This cinema does not have this promocode",
                    "msg": null,
                    "data": null
                });
            }

            if (results.length !== 1) {
                return res.status(404).send({
                    "error": "Error in database",
                    "msg": null,
                    "data": null
                });
            }

            database.query('SELECT promocode, type, value FROM Promocodes WHERE promocode = ?', [promocode], function (error, results) {
                let type = results[0].type,
                    value = results[0].value;

                if (type === "percentage") {

                    let newPrice = oldPrice - (oldPrice * parseFloat(value) / 100);

                    res.status(200).send({
                        "error": null,
                        "msg": "Promocode success",
                        "data": {
                            "price": newPrice,
                            "description": value + " percent has been deducted from the original price."
                        }
                    });

                } else if (type === "amount") {

                    let newPrice = oldPrice - value;
                    if (newPrice < 0) {
                        newPrice = 0;
                        res.status(200).send({
                            "error": null,
                            "msg": "Promocode success",
                            "data": {
                                "price": newPrice,
                                "description": "The discount is larger than the original price, so new price is 0."
                            }
                        });
                    }

                    res.status(200).send({
                        "error": null,
                        "msg": "Promocode success",
                        "data": {
                            "price": newPrice,
                            "description": value + " EGP has been deducted from the original price."
                        }
                    });
                } else {

                    res.status(200).send({
                        "error": null,
                        "msg": "Promocode success",
                        "data": {
                            "price": oldPrice,
                            "description": value
                        }
                    });
                }
            });
        })
};

//Trying to make a unified example
paginationExample = function (req, res) {

    let table = req.body['table_name'],
        start = req.body.start,
        limit = req.body.limit;

    // To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from ??";
    query = database.format(query, table);

    database.query(query, function (err, rows) {
        if (err) {
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if (start === '' || limit === '') {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let query = "Select * from ?? ORDER BY created_at DESC limit ? OFFSET ?";
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = ["users", limitNum, startNum];
        query = database.format(query, table);
        database.query(query, function (err, rest) {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    "Total Count": totalCount,
                    "data": rest
                });
            }
        });
    });
};
/**
 * A Controller, having the functions to handle admin user processes.
 */
let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

/**
 * A function to show the halls of the requested cinema
 *
 * @param req, data of a cinema
 * @param res, data of all halls which are available in this cinema
 */
module.exports.getHallsForThatCinema = function (req, res) {

    console.log("Entered getHallsForThatCinema");

    let pagination = true, // boolean for checking if the user entered limits for pagination or not
        errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        cinema_name = req.params['cinema_name'],
        cinema_location = req.params['cinema_location'];

    if (!cinema_name) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name is required.',
            data: null
        });
    }

    if (!cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location is required.',
            data: null
        });
    }

// To calculate Total Count use MySQL count function
    let query = 'Select count(*) as TotalCount FROM halls h LEFT JOIN movies m ON m.movie_id = h.movie WHERE h.cinema_name = ? AND h.cinema_location = ?';

    //query = database.format(query);    
    database.query(query, [cinema_name, cinema_location], function (err, rows) {

        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if (!totalCount) {
            return res.status(200).json({
                err: null,
                msg: 'No Halls available',
                data: null
            });
        }
        if (start === '' || limit === '' || !start || !limit) {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            errMsg = "No Limits were provided";
            console.log("No limits");

        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        query = 'select DISTINCT * FROM halls h LEFT JOIN movies m ON m.movie_id = h.movie WHERE h.cinema_name = ? AND h.cinema_location = ? limit ? OFFSET ?';
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [cinema_name, cinema_location, limitNum, startNum];

        database.query(query, table, function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Halls have been successfully retrieved"
                });
            }
        });
    });

    // var sql = 'SELECT * FROM halls h LEFT JOIN movies m ON m.movie_id = h.movie WHERE h.cinema_name = ? AND h.cinema_location = ?';

    // database.query(sql,[cinema_name , cinema_location],function (err, result) {
    //     if (err) throw err;
    //     //return res.send(result);
    //     if(result.length == 0){

    //         res.status(200).json({
    //             err: null,
    //             msg: 'No halls in this cinema',
    //             data: result
    //         });

    //     }
    //     else{

    //         res.status(200).json({
    //             err: null,
    //             msg: 'Halls Successfully Retrieved',
    //             data: result
    //         });

    //     }
    // });
};
// TODO membership
/**
 * @param req, required data for processing the request of assigning a movie to a hall
 * @param res, results of changes on the halls table in database
 * @param next, next middleware to handle errors
 */
module.exports.assignMovieToHall = function (req, res, next) {

    console.log("Entered assignMovieToHall");

    let username = req.body['username'],
        cinema_name = req.body['cinema_name'],
        cinema_location = req.body['cinema_location'],
        hall_number = req.body['hall_number'],
        movie_id = req.body['movie_id'];

    // Null Checkers
    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
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
    if (!hall_number || !movie_id) {
        return res.status(422).json({
            err: null,
            msg: 'Party hall and movie are required.',
            data: null
        });
    }

    // Validations of correct types
    if (!Validations.isNumber(hall_number) || !Validations.isNumber(movie_id)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    database.query('SELECT * FROM admins a , admins_cinemas ac WHERE a.username = ? AND a.username = ac.admin ' +
        'AND ac.cinema_name = ? AND ac.cinema_location = ? AND (a.type = ? OR a.type = ? OR a.type = ?)',
        [username, cinema_name, cinema_location, 'App Owner', 'Cinema Owner', 'Branch Manager'], function (error, results) {
            if (error) {
                return next(error);
            }

            if (!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "This Admin user does NOT have authority to do this action or he is not in this cinema.",
                    data: null
                });
            }

            // Verify that movie exists in Cinema
            database.query('SELECT * FROM movies_in_cinemas c  WHERE c.cinema_name = ? AND c.cinema_location = ? AND c.movie = ?',
                [cinema_name, cinema_location, movie_id], function (error, results) {
                    if (error) {
                        return next(error);
                    }
                    console.log(results + "This Movie is not assigned");
                    if (!results || !results.length) {
                        return res.status(404).json({
                            err: null,
                            msg: "The assigned movie does not exist in this cinema.",
                            data: null
                        });
                    }
                    // Verify that hall exists in Cinema
                    database.query('SELECT movie FROM halls WHERE hall_number = ? AND cinema_location = ? AND cinema_name = ?',
                        [hall_number, cinema_location, cinema_name], function (error, results) {
                            if (error) {
                                return next(error);
                            }
                            console.log(results);
                            if (!results || !results.length) {
                                return res.status(404).json({
                                    err: null,
                                    msg: "The assigned hall does not exist.",
                                    data: null
                                });
                            }

                            let sqlQuery = 'UPDATE halls SET movie = ? WHERE halls.cinema_name = ? AND halls.cinema_location = ? AND halls.hall_number = ?';
                            database.query(sqlQuery, [movie_id, cinema_name, cinema_location, hall_number], function (error, results) {
                                if (error) {
                                    return next(error);
                                }

                                return res.status(200).json({
                                    err: null,
                                    msg: 'Movie number ' + movie_id + ' has been successfully Assigned to hall ' + hall_number,
                                    data: results
                                });

                            });
                        });
                });
        });


};

/**
 * @param req, required data for processing the request of deleting a movie from a hall
 * @param res, results of changes on the halls table in database
 * @param next, next middleware to handle errors
 */
module.exports.deleteMovieFromHall = function (req, res, next) {
    console.log("Entered deleteMovieFromHall");

    let username = req.body['username'],
        cinema_name = req.body['cinema_name'],
        cinema_location = req.body['cinema_location'],
        hall_number = req.body['hall_number'],
        movie_id = req.body['movie_id'];

    // Null Checkers
    //console.log(username+" "+cinema_name+" "+cinema_location+" "+hall_number+" "+movie_id)
    //console.log(req.body);

    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
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
    if (!hall_number) {
        return res.status(422).json({
            err: null,
            msg: 'Party hall number is required.',
            data: null
        });
    }

    // Validations of correct types
    if (!Validations.isNumber(hall_number) || !Validations.isNumber(movie_id)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    //Verify That this admin user is Branch Manager , Cinema Owner or App Owner
    database.query('SELECT * FROM admins a , admins_cinemas ac WHERE a.username = ? AND a.username = ac.admin ' +
        'AND ac.cinema_name = ? AND ac.cinema_location = ? AND (a.type = ? OR a.type = ? OR a.type = ?)',
        [username, cinema_name, cinema_location, 'App Owner', 'Cinema Owner', 'Branch Manager'], function (error, results) {
            if (error) {
                return next(error);
            }
            console.log(results);
            if (!results || !results.length) {
                return res.status(404).json({
                    err: null,
                    msg: "This Admin user does NOT have authority to do this action or he is not in this cinema.",
                    data: null
                });
            }
            // Verify that hall exists in Cinema
            database.query('SELECT movie FROM Halls WHERE hall_number = ? AND cinema_location = ? AND cinema_name = ?',
                [hall_number, cinema_location, cinema_name], function (error, results) {
                    if (error) {
                        return next(error);
                    }
                    console.log(results);
                    if (!results || !results.length) {
                        return res.status(404).json({
                            err: null,
                            msg: "The assigned hall does not exist.",
                            data: null
                        });
                    }

                    let sqlQuery = 'UPDATE halls SET movie = ? WHERE halls.cinema_name = ? AND halls.cinema_location = ? AND halls.hall_number = ?';
                    database.query(sqlQuery, [null, cinema_name, cinema_location, hall_number], function (error, results) {
                        if (error) {
                            return next(error);
                        }

                        return res.status(200).json({
                            err: null,
                            msg: 'Movie number ' + movie_id + ' has been successfully Deleted From hall ' + hall_number,
                            data: results
                        });

                    });

                });
        });
};

module.exports.getMoviesInHallsForCinemaForAdmin = function (req, res, next) {

    let pagination = true, // boolean for checking if the user entered limits for pagination or not
        errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        cinema_name = req.params['cinema_name'],
        cinema_location = req.params['cinema_location'];

    if (!cinema_name) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name is required.',
            data: null
        });
    }

    if (!cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location is required.',
            data: null
        });
    }

    // To calculate Total Count use MySQL count function
    let query = 'Select count(*) as TotalCount FROM movies m , halls h  WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = m.movie_id';
    database.query(query, cinema_name, cinema_location, function (err, rows) {

        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if (!totalCount) {

            return res.status(200).json({
                err: null,
                msg: 'No Halls available',
                data: null
            });

        }
        if (start === '' || limit === '' || !start || !limit) {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            errMsg = "No Limits were provided";
            console.log("No limits");

        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let query = 'select DISTINCT * FROM movies m , halls h  WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = m.movie_id limit ? OFFSET ?';
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [cinema_name, cinema_location, limitNum, startNum];
        database.query(query, table, function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Halls have been successfully retrieved"
                });
            }
        });
    });
};


/**
 * @param req, required data for viewing movies in a hall
 * @param res, results of all movies in this hall
 * @param next
 */
module.exports.viewMoviesInHalls = function (req, res, next) {

    console.log("Entered viewMoviesInHalls");

    let pagination = true, // boolean for checking if the user entered limits for pagination or not
        errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        cinema_name = req.params['cinema_name'],
        cinema_location = req.params['cinema_location'],
        username = req.params['username'];
    limit = " limit ? OFFSET ?";

    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }
    if (!cinema_name) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name is required.',
            data: null
        });
    }
    if (!cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location is required.',
            data: null
        });
    }

    // Validations of correct types
    if (!Validations.isString(cinema_name)) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name data type invalid.',
            data: null
        });
    }
    if (!Validations.isString(cinema_location)) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location data type invalid.',
            data: null
        });
    }

    // To calculate Total Count use MySQL count function
    let query = 'Select count(*) as TotalCount from movies m Join halls h on m.movie_id = h.movie where h.cinema_name = ? AND h.cinema_location = ?';
    database.query(query, cinema_name, cinema_location, function (err, rows) {

        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if (!totalCount) {

            return res.status(200).json({
                err: null,
                msg: 'No Halls available',
                data: null
            });

        }
        if (start === '' || limit === '' || !start || !limit) {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            limit = "";
            errMsg = "No Limits were provided";
            console.log("No limits");

        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let query = 'select DISTINCT * from movies m Join halls h on m.movie_id = h.movie where h.cinema_name = ? AND h.cinema_location = ? ';
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [cinema_name, cinema_location];
        database.query(query, table, function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Halls have been successfully retrieved"
                });
            }
        });
    });
};

// TODO is it used?
/**
 * A function to return the cinemas that this user related to
 *
 * @param req, required data for viewing cinemas for that user
 * @param res, results of all cinemas that user works in
 * @param next
 */
module.exports.viewCinemasForAdminUser = function (req, res, next) {

    let username = req.params.username;

    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }

    // Validations of correct types
    if (!Validations.isString(username)) {
        return res.status(422).json({
            err: null,
            msg: 'Invalid data types.',
            data: null
        });
    }

    //Verify That this admin user is Branch Manager , Cinema Owner or App Owner
    database.query('SELECT ac.cinema_location , ac.cinema_name FROM admins a , admins_cinemas ac WHERE a.username = ? AND a.username = ac.admin',
        [username], function (error, result) {
            if (error) throw next(error);
            //return res.send(result);
            console.log(result);
            if (!result.length) {

                res.status(200).json({
                    err: null,
                    msg: 'You are not assigned to any cinema',
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

module.exports.getAlltMoviesInCinemaForAdmin = function (req, res, next) {

    let cinemaName = req.params.cinema_name,
        cinemaLocation = req.params.cinema_location;

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

    let sqlSelection = 'SELECT m.* FROM movies m , movies_in_cinemas h  WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = m.movie_id';
    database.query(sqlSelection, [cinemaName, cinemaLocation], function (error, results) {
        if (error) {
            return next(error);
        }

        if (!results.length) {

            res.status(200).json({
                err: null,
                msg: 'No current movies Available.',
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




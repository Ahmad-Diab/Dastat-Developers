/**
 * A Controller, having the functions to handle admin user processes.
 */
var database = require('../config/db-connection'),
    Validations = require('../utils/validations');

/**
 * A function to show the halls of the requested cinema
 *
 * @param req, data of a cinema
 * @param res, data of all halls which are available in thisc cinema
 */

module.exports.getHallsForThatCinema = function(req, res){
    var cinema_name = req.params['cinema_name'];
    var cinema_location = req.params['cinema_location'];

    if(!cinema_name) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name is required.',
            data: null
        });
    }

    if(!cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location is required.',
            data: null
        });
    }

    var sql = "SELECT h.* FROM cinemas c , halls h WHERE c.name = h.cinema_name AND c.location = h.cinema_location AND c.name = ? AND c.location = ?";

    database.query(sql,[cinema_name , cinema_location],function (err, result) {
        if (err) throw err;
        //return res.send(result);
        if(result.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No halls in this cinema',
                data: result
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Halls Successfully Retrieved',
                data: result
            });

        }
    });
};


/**
 * A function to handle assigining a movie to a hall
 * 
 * @param req, required data for processing the request of assigning a movie to a hall
 * @param res, results of changes on the halls table in database
 * @param next, next middleware to handle errors
 */
module.exports.assignMovieToHall = function(req, res, next){
    // COMPLETED Make a reservation based on all data need for reservation.
    // TODO User-name validation needs to be done!

    var username = req.body['username'],
        cinema_name = req.body['cinema_name'],
        cinema_location = req.body['cinema_location'],
        hall_number = req.body['hall_number'],
        movie_id = req.body['movie_id'];
        
    // Null Checkers
    console.log(username+" "+cinema_name+" "+cinema_location+" "+hall_number+" "+movie_id)
    console.log(req.body);
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
    if(!hall_number || !movie_id) {
        return res.status(422).json({
            err: null,
            msg: 'Party hall and movie are required.',
            data: null
        });
    }

    // Validations of correct types
    if(!Validations.isNumber(hall_number) || !Validations.isNumber(movie_id)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    //Verify That this admin user is Branch Manager , Cinema Owner or App Owner

    database.query('SELECT * FROM admins a , admins_cinemas ac WHERE a.username = ? AND a.username = ac.admin '+
    'AND ac.cinema_name = ? AND ac.cinema_location = ? AND (a.type = ? OR a.type = ? OR a.type = ?)',
        [username, cinema_name, cinema_location, 'App Owner', 'Cinema Owner', 'Branch Manager'],function (error, results) {
            if (error) {
                return next(error);
            }
            console.log(results);
            if(!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "This Admin user does NOT have authority to do this action or he is not in this cinema.",
                    data: null
                });
            }
    });

    // Verify that movie exists in Cinema

    database.query('SELECT m.* FROM movies m , movies_in_cinemas c  WHERE c.cinema_name = ? AND c.cinema_location = ? '+
    'AND m.movie_id = c.movie AND m.movie_id = ? AND ( m.feature = 2 OR m.feature = 3 )',
        [cinema_name, cinema_location, movie_id],function (error, results) {
            if (error) {
                return next(error);
            }
            console.log(results);
            if(!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "The assigned movie does not exist in this cinema.",
                    data: null
                });
            }
    });

    // Verify that hall exists in Cinema
    
    database.query('SELECT movie FROM Halls WHERE hall_number = ? AND cinema_location = ? AND cinema_name = ?',
        [hall_number, cinema_location, cinema_name],function (error, results) {
            if (error) {
                return next(error);
            }
            console.log(results);
            if(!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "The assigned hall does not exist.",
                    data: null
                });
            }
    });


    var sqlQuery = 'UPDATE halls SET movie = ? WHERE halls.cinema_name = ? AND halls.cinema_location = ? AND halls.hall_number = ?';

    database.query(sqlQuery,[movie_id, cinema_name, cinema_location, hall_number], function (error, results) {
        if (error) {
            return next(error);
        }

        return res.status(200).json({
            err: null,
            msg: 'Movie number '+movie_id+' has been successfully Assigned to hall '+hall_number,
            data: results
        });

    });

};

/**
 * A function to handle assigining a movie to a hall
 * 
 * @param req, required data for processing the request of deleting a movie from a hall
 * @param res, results of changes on the halls table in database
 * @param next, next middleware to handle errors
 */
module.exports.deleteMovieFromHall = function(req, res, next){
    // COMPLETED delete the assigned movie of the requested hall.
    // COMPLETED User-name validation needs to be done!

    var username = req.body['username'],
        cinema_name = req.body['cinema_name'],
        cinema_location = req.body['cinema_location'],
        hall_number = req.body['hall_number'],
        movie_id = req.body['movie_id'];
        
    // Null Checkers
    console.log(username+" "+cinema_name+" "+cinema_location+" "+hall_number+" "+movie_id)
    console.log(req.body);

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
    if(!hall_number) {
        return res.status(422).json({
            err: null,
            msg: 'Party hall number is required.',
            data: null
        });
    }

    // Validations of correct types
    if(!Validations.isNumber(hall_number) || !Validations.isNumber(movie_id)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    //Verify That this admin user is Branch Manager , Cinema Owner or App Owner

    database.query('SELECT * FROM admins a , admins_cinemas ac WHERE a.username = ? AND a.username = ac.admin '+
    'AND ac.cinema_name = ? AND ac.cinema_location = ? AND (a.type = ? OR a.type = ? OR a.type = ?)',
        [username, cinema_name, cinema_location, 'App Owner', 'Cinema Owner', 'Branch Manager'],function (error, results) {
            if (error) {
                return next(error);
            }
            console.log(results);
            if(!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "This Admin user does NOT have authority to do this action or he is not in this cinema.",
                    data: null
                });
            }
    });

    /*
    // Verify that movie exists in Cinema

    database.query('SELECT m.* FROM movies m , movies_in_cinemas c  WHERE c.cinema_name = ? AND c.cinema_location = ? '+
    'AND m.movie_id = c.movie AND m.movie_id = ? AND ( m.feature = 2 OR m.feature = 3 )',
        [cinema_name, cinema_location, movie_id],function (error, results) {
            if (error) {
                return next(error);
            }
            console.log(results);
            if(!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "The assigned movie does not exist in this cinema.",
                    data: null
                });
            }
    });
*/
    // Verify that hall exists in Cinema
    
    database.query('SELECT movie FROM Halls WHERE hall_number = ? AND cinema_location = ? AND cinema_name = ?',
        [hall_number, cinema_location, cinema_name],function (error, results) {
            if (error) {
                return next(error);
            }
            console.log(results);
            if(!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "The assigned hall does not exist.",
                    data: null
                });
            }
    });


    var sqlQuery = 'UPDATE halls SET movie = ? WHERE halls.cinema_name = ? AND halls.cinema_location = ? AND halls.hall_number = ?';

    database.query(sqlQuery,[null, cinema_name, cinema_location, hall_number], function (error, results) {
        if (error) {
            return next(error);
        }

        return res.status(200).json({
            err: null,
            msg: 'Movie number '+movie_id+' has been successfully Deleted From hall '+hall_number,
            data: results
        });

    });



};




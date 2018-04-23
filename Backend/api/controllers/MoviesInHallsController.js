var database = require('../config/db-connection'),
Validations = require('../utils/validations');


/**
 * A function to show the halls of the requested cinema
 *
 * @param req, data of a cinema
 * @param res, data of all halls which are available in this cinema
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

    var sql = 'SELECT * FROM halls h LEFT JOIN movies m ON m.movie_id = h.movie WHERE h.cinema_name = ? AND h.cinema_location = ?';

    database.query(sql,[cinema_name , cinema_location],function (err, result) {
        if (err) throw err;
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
 * A function to return the cinemas that this user related to
 * 
 * @param req, required data for viewing cinemas for that user
 * @param res, results of all cinemas that user works in
 * @param next
 */
module.exports.viewCinemasForAdminUser = function(req, res, next){
    
    var username = req.params.username;
        
    // Null Checkers
    console.log(username);
    console.log(req.body);

    if(!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }
   
  
    // Validations of correct types
    if(!Validations.isString(username)) {
        return res.status(422).json({
            err: null,
            msg: 'Invalid data types.',
            data: null
        });
    }


    database.query('SELECT ac.cinema_location , ac.cinema_name FROM admins a , admins_cinemas ac WHERE a.username = ? AND a.username = ac.admin',
        [username],function (error, result) {
            if (error) throw error;
            if(result.length == 0){
    
                res.status(200).json({
                    err: null,
                    msg: 'You are not assigned to any cinema',
                    data: result
                });
    
            }
            else{
    
                res.status(200).json({
                    err: null,
                    msg: 'Cinemas Successfully Retrieved',
                    data: result
                });
    
            }
    });

};



module.exports.getAlltMoviesInCinemaForAdmin = function(req, res, next){

    var cinemaName = req.params.cinema_name;
    var cinemaLocation = req.params.cinema_location;

    if(!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Name is required.',
            data: null
        });
    }

    if(!cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Location is required.',
            data: null
        });
    }

    var sqlSelection = 'SELECT m.* FROM movies m , movies_in_cinemas h  WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = m.movie_id';

    database.query(sqlSelection, [cinemaName , cinemaLocation], function (error, results) {
        if(error){
            return next(error);
        }

        if(results.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No current movies Availiable.',
                data: results
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

    });
  };



module.exports.getFinalOutput = function(req, res, next){

    var cinemaName = req.params.cinema_name;
    var cinemaLocation = req.params.cinema_location;
    var movieID = req.params.movie_id;

    if(!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Name is required.',
            data: null
        });
    }

    if(!cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Location is required.',
            data: null
        });
    }

    if(!movieID) {
        return res.status(422).json({
            err: null,
            msg: 'Movie ID is required.',
            data: null
        });
    }
    var sqlSelection = 'SELECT * FROM movies m, halls h where m.movie_id = ? AND h.movie = ? AND h.cinema_name = ? AND h.cinema_location = ?';

    database.query(sqlSelection, [movieID, movieID, cinemaName , cinemaLocation], function (error, results) {
        if(error){
            return next(error);
        }

        if(results.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No current movies Availiable.',
                data: results
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

    });
  };


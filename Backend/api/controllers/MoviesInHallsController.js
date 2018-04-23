var database = require('../config/db-connection'),
Validations = require('../utils/validations');

//method to retireve all information of selected movie and hall to send in cookie
module.exports.getMovieAndHallData = function(req, res, next){

    var cinemaName = req.params.cinema_name;
    var cinemaLocation = req.params.cinema_location;
    var movieID = req.params.movie_id;

    //check if cinema name wasn't provided
    if(!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name is required.',
            data: null
        });
    }
    //check if cinema location wasn't provided
    if(!cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location is required.',
            data: null
        });
    }
    //check if cinema movie id wasn't provided
    if(!movieID) {
        return res.status(422).json({
            err: null,
            msg: 'Movie ID is required.',
            data: null
        });
    }

    //SQL query to select from tables movies and halls the needed information
    database.query('SELECT * FROM movies m, halls h where m.movie_id = ? AND h.movie = ? AND h.cinema_name = ? AND h.cinema_location = ?', [movieID, movieID, cinemaName , cinemaLocation], function (error, results) {
        if(error){
            return next(error);
        }
        //if an empty result was returned
        if(results.length == 0){
            res.status(200).json({
                err: null,
                msg: 'No current movies Availiable.',
                data: results
            });

        }
        //else
        else{
            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

    });
  };





/**
 * Method gets halls for specified cinema
 *
 * @param req, data of a cinema
 * @param res, data of cinema  halls
 */
module.exports.cinemaHalls = function(req, res){
    var cinema_name = req.params['cinema_name'];
    var cinema_location = req.params['cinema_location'];
    //check if cinema name wasn't provided
    if(!cinema_name) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name is required.',
            data: null
        });
    }
    //check if cinema location wasn't provided
    if(!cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location is required.',
            data: null
        });
    }
    //SQL query to select from table halls the needed information
    database.query('SELECT * FROM halls h LEFT JOIN movies m ON m.movie_id = h.movie WHERE h.cinema_name = ? AND h.cinema_location = ?',[cinema_name , cinema_location],function (err, result) {
        if (err) throw err;
        //if an empty result was returned
        if(result.length == 0){
            res.status(200).json({
                err: null,
                msg: 'Cinema has no halls',
                data: result
            });
        }
        else{
            res.status(200).json({
                err: null,
                msg: 'Halls successfully retrieved',
                data: result
            });
        }
    });
};


// method that retrieves all movies currently screening in selected cinema
module.exports.cinemaMovies = function(req, res, next){

    var cinemaName = req.params.cinema_name;
    var cinemaLocation = req.params.cinema_location;

    //check if cinema name wasn't provided
    if(!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name is required.',
            data: null
        });
    }

    //check if cinema location wasn't provided
    if(!cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location is required.',
            data: null
        });
    }
    //SQL query to select from tables movies and movies_in_cinemas the needed information
    database.query('SELECT * FROM movies m , movies_in_cinemas mc  WHERE h.cinema_name = ? AND mc.cinema_location = ? AND mc.movie = m.movie_id', [cinemaName , cinemaLocation], function (error, results) {
        if(error){
            return next(error);
        }
         //if an empty result was returned
        if(results.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No movies availiable in cinema',
                data: results
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Movies successfully retrieved',
                data: results
            });

        }

    });
  };



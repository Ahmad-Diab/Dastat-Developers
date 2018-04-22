var database = require('../config/db-connection');



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
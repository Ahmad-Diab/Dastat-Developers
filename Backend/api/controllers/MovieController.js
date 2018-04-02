var database = require('../config/db-connection');

//Movie Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

module.exports.getMovieInfo = function(req, res, next){

    database.query('SELECT movie_id,title,duration,genre,description,imagePath,cast,year,feature,release_date, rating FROM movies WHERE movies.status= "ACCEPTED" AND movies.movie_id = ?', [req.params.movie_id], function (error, results, fields) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Info succussfully retreived",
        data : results
      });
    });
}
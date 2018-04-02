var database = require('../config/db-connection');

//Movie Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

module.exports.getMovieInfo = function(req, res, next){
    database.query('SELECT * FROM movies where movies.movie_id = movie_id', function (error, results, fields) {
      if(error) return next(error);
      return res.send(results);
    });
  }
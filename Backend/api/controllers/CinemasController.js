var database = require('../config/db-connection');


//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


//filter cinemas according to location
module.exports.filterByLocation = function(req, res, next){
    var location = req.params.location;
    var is3D = req.params.is3D;
    var is4D = req.params.is4D;
    if(location == 'All'){
      database.query('SELECT * FROM cinemas WHERE is3D = ? and is4D = ?',[is3D,is4D], function (error, results, fields) {
        if(error) return next(error);
        return res.send(results);
      });
    }
    else{
  database.query('SELECT * FROM cinemas WHERE location LIKE ? and is3D = ? and is4D = ?',[location,is3D,is4D], function (error, results, fields) {
    if(error) return next(error);
    return res.send(results);
  });
}
}


  //filter cinemas according to number of halls
module.exports.filterByHalls = function(req, res, next){
    var hallNumber = req.params.hallNumber;
    database.query('SELECT * FROM cinemas WHERE number_of_halls LIKE ?',[hallNumber], function (error, results, fields) {
      if(error) return next(error);
      return res.send(results);
    });
  }
  



module.exports.ViewCinemas = function(req, res, next){
    database.query('SELECT * FROM cinemas', function (error, results, fields) {
      if(error){
        return next(error);
      }
      return res.send(results);
    });
  }

  module.exports.viewCinema = function(req,res,next){
    var cinema = req.params.cinema;
    var loc = req.params.loc;
    
    var q = "SELECT * FROM cinemas WHERE cinemas.name = ? and cinemas.location = ?";
    database.query(q,[cinema,loc], function(error, results, fields){
      
      if(error) return next(error);
      return res.send(results[0]);
    }); 
  }
  //View movies in cinema
  module.exports.moviesInCinema = function(req, res, next){
    var cinema = req.params.cinema;
    var loc = req.params.loc;
    database.query('SELECT * FROM movies m INNER JOIN movies_in_cinemas x on m.movie_id = x.movie WHERE x.cinema_name = ? AND x.cinema_location = ? ', [cinema,loc],function (error, results, fields) {
      if(error){
        return next(error);
      }
      return res.send(results);
    });
  }
  module.exports.DistinctLocation = function(req, res, next){
    database.query('SELECT DISTINCT location FROM cinemas',function (error, results, fields) {
      if(error){
        return next(error);
      }
      return res.send(results);
    });
  }
    

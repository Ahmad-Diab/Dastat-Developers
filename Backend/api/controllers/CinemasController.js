var database = require('../config/db-connection');



module.exports.ViewCinemas = function(req, res, next){
    database.query('SELECT * FROM cinemas', function (error, results, fields) {
      if(error){
          console.log("gfh");
        return next(error);
      }
      return res.send(results);
    });
  }

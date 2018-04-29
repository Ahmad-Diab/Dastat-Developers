
var database = require('../config/db-connection');

//Actor Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.getActors = function(req, res, next){
    database.query('SELECT * FROM actors WHERE name = ?', [req.params.name], function (error, results, fields) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Info succussfully retreived",
        data : results
      });
    });

}

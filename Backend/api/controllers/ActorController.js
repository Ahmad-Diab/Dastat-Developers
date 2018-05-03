
let database = require('../config/db-connection');

module.exports.getActors = function(req, res, next){
    database.query('SELECT * FROM actors WHERE name = ?', [req.params.name], function (error, results) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Info successfully retrieved",
        data : results
      });
    });
};

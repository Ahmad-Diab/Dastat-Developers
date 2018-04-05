
var database = require('../config/db-connection');

//Actor Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.getActors = function(req, res, next){
    var actor = req.params.actor;
    database.query('SELECT * FROM actors WHERE name = ?', [actor], function (error, results, fields) {
      if(error) return next(error);
      return res.send(results);
    });


}

var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports
// use this fel table & row names ` we "''" fel variables when querying the tables
  

module.exports.viewMyInfo = function(req, res, next){
  var username = req.params.username;
  var query = "SELECT * FROM Users WHERE username = ?";
  database.query(query,[username],function (error,results, fields) {
    if(error) return next(error);
    console.log(results);
    return res.send(results);
  });
}


module.exports.getUsers = function(req, res, next){
  
  database.query('SELECT * FROM Users', function (error, results, fields) {
    if(error) return next(error);
    return res.send(results);
  });
}

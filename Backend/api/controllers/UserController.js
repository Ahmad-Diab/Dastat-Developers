var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

module.exports.viewMyInfo = function(req, res, next){
  var username = req.query.username;
  var query = "SELECT * FROM Users WHERE username = ?";
  database.query(query,[username],function (error,results, fields) {
    if(error) return next(error);
    console.log(results);
    return res.send(results[0]);
  });
}

module.exports.getUsers = function(req, res, next){
  console.log(req.body);
  database.query('SELECT * FROM users', function (error, results, fields) {
    if(error){
      console.log("gfh");
    return next(error);
  }
    return res.send(results);
  });
}

module.exports.test = function(req, res, next) {
  console.log(req.body);
}
};

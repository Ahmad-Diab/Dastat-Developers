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
  console.log(req.headers);
  database.query('SELECT * FROM users', function (error, results, fields) {
    if(error){
      console.log("gfh");
    return next(error);
  }
    return res.send(results);
  });
}

module.exports.editProfile = function(req, res, next){
     var username = req.params.username;
     var email = req.body.email;
     var first_name = req.body.first_name;
     var last_name = req.body.last_name;
     var phone_number = req.body.phone_number;
     var age = req.body.age;

     database.query('UPDATE Users SET email = ?, first_name = ?, last_name = ?, phone_number = ?, age = ? where username = ?' ,[email,first_name,last_name,phone_number,age,username], function(err, results, fields) {
       if(err) return next(err);
       return res.send(results);
         });
}

module.exports.test = function(req, res, next) {
  console.log(req.body);
}

var database = require('../config/db-connection'),
    Validations = require('../utils/validations');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

module.exports.viewMyInfo = function(req, res, next){
  if(!Validations.isString(req.query.username))
    return res.status(422).json({
      err: null,
      msg: 'Provided data must be in valid types.',
      data: null
  });
  var username = req.query.username;
  var query = "SELECT * FROM users WHERE username = ?";
  database.query(query,[username],function (error,results, fields) {
    if(error) return next(error);
    console.log(results);
    return res.send(results[0]);
  });
}

module.exports.getUsers = function(req, res, next){
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
     if(!Validations.isString(username) || !Validations.isString(email) || !Validations.isString(first_name) || !Validations.isString(last_name)
     || !Validations.isNumber(phone_number) || !Validations.isNumber(age))
     return res.status(422).json({
       err: null,
       msg: 'Provided data must be in valid types.',
       data: null
   });
     database.query('UPDATE users SET email = ?, first_name = ?, last_name = ?, phone_number = ?, age = ? where username = ?' ,[email,first_name,last_name,phone_number,age,username], function(err, results, fields) {
       if(err) return next(err);
       return res.send(results);
         });
}

module.exports.test = function(req, res, next) {
  console.log(req.body);
}

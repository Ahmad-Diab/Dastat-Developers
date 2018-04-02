var database = require('../config/db-connection');
var config = require('../config/config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

module.exports.getUsers = function(req, res, next){
  database.query('SELECT * FROM users', function (error, results, fields) {
    if(error) return next(error);
    return res.send(results);
  });
}

module.exports.authenticate = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if(!username){
    return res.status(422).json({
      err: null,
      msg: 'Username is required.',
      data: null
    });
  }
  if(!password){
    return res.status(422).json({
      err: null,
      msg: 'Password is required.',
      data: null
    });
  }
  var query = 'SELECT * FROM users WHERE username = ?';
  database.query(query,[username], function(err, results, fields) {
    if(err) return next(err);
    
    if(results.length > 0) { 
      var user = {
        username: results[0].username,
        password: results[0].password,
        email: results[0].email,
        phone_number: results[0].phone_number,
        credit_card: results[0].credit_card,
        first_name: results[0].first_name,
        last_name: results[0].last_name,
        age: results[0].age,
        gender: results[0].gender
      }
      bcrypt.compare(password, results[0].password, function(err, isMatch){
        if(isMatch){
          var token = jwt.sign(user, config.secret, {
          expiresIn: 604800
          });
          res.status(200).json({
            err: null,
            msg: "Logged in successfully",
            token: 'JWT' + token,
            data: token,
            success: true
          });
        }
        else {
          res.send({
            "code": 204,
            "success": "Username and password does not match",
          });
        }
      });      
    }
    else {
      res.send({
      "code": 204,
      "success": "Username does not exits"
      });
    }
  });
}
module.exports.test = function(req, res, next) {
  console.log(req.body);
}
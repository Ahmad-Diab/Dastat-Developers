var database = require('../config/db-connection');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
module.exports.login = function(req, res, next) {
    console.log("here");
    console.log(req.body);
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
    var query = 'SELECT * FROM admins WHERE username = ?';
    database.query(query,[username], function(err, results, fields) {
      if(err) return next(err);
      
      if(results.length > 0) { 
        var user = {
          username: results[0].username,
          email: results[0].email,
          phone_number: results[0].phone_number,
          first_name: results[0].first_name,
          last_name: results[0].last_name,
          age: results[0].age,
          type: results[0].type
        }
        console.log(results[0].active);
        bcrypt.compare(password, results[0].password, function(err, isMatch){
          if(isMatch){
            var token = jwt.sign(user, config.secret, {
              expiresIn: '10d'
            });
            console.log(token.username);
            res.status(200).json({
              err: null,
              msg: "Logged in successfully",
              token: 'JWT' + token,
              data: token,
              success: true,
              username: user.username,
              type: user.type
            });
          }
      
          else {
            res.status(401).json({
              err: null,
              msg: "Wrong Password",
              success: false
            });
          }
        });      
      }
      else {
        res.status(401).json({
          err: null,
          msg: "Wrong User Name",
          success: false
        });
      }
    });
  }
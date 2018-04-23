var database = require('../config/db-connection');
var config = require('../config/config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
const mailer = require("../config/nodemailer");

// Authentication log in
module.exports.authenticate = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (!username) {
    return res.status(422).json({
      err: null,
      msg: 'Username is required.',
      data: null
    });
  }
  if (!password) {
    return res.status(422).json({
      err: null,
      msg: 'Password is required.',
      data: null
    });
  }
  var query = 'SELECT * FROM users WHERE username = ?';
  database.query(query, [username], function (err, results, fields) {
    if (err) return next(err);

    if (results.length > 0) {
      var user = {
        username: results[0].username,
        email: results[0].email,
        phone_number: results[0].phone_number,
        first_name: results[0].first_name,
        last_name: results[0].last_name,
        age: results[0].age,
        gender: results[0].gender,
        //   active:results[0].active
      }
      console.log(results[0].active);
      bcrypt.compare(password, results[0].password, function (err, isMatch) {
        if (isMatch) {
          if (results[0].active) {
            var token = jwt.sign(user, config.secret, {
              expiresIn: '10h'
            });

            console.log("testing");
            res.status(200).json({
              err: null,
              msg: "Logged in successfully",
              token: 'JWT' + token,
              data: token,
              success: true,
              username: token.username
            });
          } else {
            res.status(200).json({
              err: null,
              msg: "please Verify the account",
              success: false
            });
          }
        } else {
          res.status(200).json({
            err: null,
            msg: "Wrong Password",
            success: false
          });
        }
      });
    } else {
      res.status(200).json({
        err: null,
        msg: "Wrong User Name",
        success: false
      });
    }
  });
}



//Authentication Register
module.exports.verify = function (req, res, next) {
  var username = req.body.username;
  var token = req.body.token;
  var tokendb;
  console.log(username);
  console.log(token);
  var query = 'SELECT * FROM users WHERE username = ?';
  database.query(query, [username], function (err, results, fields) {
    if (err) return next(err);

    if (results.length == 0) {
      res.status(200).json({
        err: null,
        msg: "Please Enter a valied Username",
        success: false
      });
      return;
    }
    console.log(results[0].username);
    if (results[0].active_code == token) {
      var query = 'update users  SET active= ?, active_code=? WHERE username=?';
      database.query(query, [true, "", username], function (err, results, fields) {
        if (err) return next(err);
        res.status(200).json({
          err: null,
          msg: "Done",
          success: true
        });
        return;
      });

    } else {
      res.status(200).json({
        err: null,
        msg: "Incorrect Token",
        success: false
      });
    }
  });

}
module.exports.Register = function (req, res, next) {
  console.log("heree");
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var phone_number = req.body.phone_number;
  var credit_card = req.body.credit_card;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var age = req.body.age;
  var gender = req.body.gender;
  var active = false;
  var active_code = randomstring.generate();;
  var flag = true;
  var unique = true;
  var valid =
    req.body.username &&
    req.body.password &&
    req.body.email &&
    req.body.phone_number &&
    req.body.first_name &&
    req.body.last_name &&
    req.body.age &&
    req.body.gender;

  var query = 'SELECT * FROM users WHERE username = ?';
  database.query(query, [username], function (err, results, fields) {
    if (err) return next(err);

    if (results.length > 0) {
      flag = false;
      res.status(200).json({
        err: null,
        msg: "Please change the User name",
        success: true
      });
      return;
    }
    var query = 'SELECT * FROM users WHERE email = ?';
    database.query(query, [email], function (err, results, fields) {
      if (err) return next(err);
      if (results.length > 0) {
        flag = false;
        res.status(200).json({
          err: null,
          msg: "Please change the Email",
          success: true
        });
        return;
      }


      console.log(flag + "hhhhhhhhhh");

      var hashed_pass;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) return next(err);

          hashed_pass = hash;

          var user = {
            username: username,
            password: hashed_pass,
            email: email,
            phone_number: phone_number,
            credit_card: credit_card,
            first_name: first_name,
            last_name: last_name,
            age: age,
            gender: gender,
            active: active,
            active_code: active_code
          }


          database.query('INSERT INTO users SET ?', user, function (error, results, fields) {
            if (error) {

              return next(error);
            }
            const html = '<p>Hi there,</p><br/><p>Thank you For Registering!</p><br/><p> Token:' + active_code + '</p><b></b> <br/><p>Please Write that token on that link to activate your Account.</p><a href ="http://localhost:4200/verify">here</a>';
            mailer.sendmail(email, html)

            res.status(200).json({
              err: null,
              msg: "Register done Please check your account to verify your account",
              success: true
            });
            return;
          });

        });
      });
    });
  });
};
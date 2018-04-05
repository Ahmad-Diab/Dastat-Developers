var database = require('../config/db-connection');
var config = require('../config/config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// Authentication log in
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
          res.status(200).json({
            err: null,
            msg: "Wrong Password",
            success: false
          });
        }
      });      
    }
    else {
      res.status(200).json({
        err: null,
        msg: "Wrong User Name",
        success: false
      });
    }
  });
}



//Authentication Register

module.exports.Register=function(req, res, next){
  
var username=req.body.username;
var password=req.body.password;
var email = req.body.email;
var phone_number=req.body.phone_number;
var credit_card=req.body.credit_card;
var first_name=req.body.first_name;
var last_name = req.body.last_name;
var age=req.body.age;
var gender=req.body.gender;

 

   
var valid =
req.body.username &&
req.body.password &&
req.body.email&&
req.body.phone_number&&
req.body.first_name&&
req.body.last_name&&
req.body.age&&
req.body.gender;
//check if the fields is empty
//if(!valid) {
//    return res.status(422).json({
//        err: null,
//        msg: ' username, password, email, phone number, credit card, first name, last name, age and gender are required fields.',
//        data: null 
//    });
//}

var hashed_pass ;
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if(err) return next(err);
        
        hashed_pass= hash;
        
        var user={
            username:username,
            password:hashed_pass,
            email:email,
            phone_number:phone_number,
            credit_card:credit_card,
            first_name:first_name,
            last_name:last_name,
            age:age,
            gender:gender
        
        }
        
        
        database.query('INSERT INTO users SET ?',user, function (error, results, fields) {
            if(error){ 
              
                return next(error);
               }
               res.status(200).json({
                err: null,
                msg: "Register Done",
                success: true
              });
          });
        
    });
});



};
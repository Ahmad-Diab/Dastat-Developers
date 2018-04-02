var database = require('../config/db-connection');
var bcrypt = require('bcrypt');
//Authentication Register

module.exports.Register=function(req, res, next){
    console.log("wslt l hna ");
var username=req.body.username;
var password=req.body.password;
var email = req.body.email;
var phone_num=req.body.phone_num;
var credit_card=req.body.credit_card;
var first_name=req.body.first_name;
var last_name = req.body.last_name;
var age=req.body.age;
var gender=req.body.gender;

 

console.log(req.body);   
var valid =
req.body.username &&
req.body.password &&
req.body.email&&
req.body.phone_num&&
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
        console.log(hash);
        hashed_pass= hash;
        console.log(hashed_pass);
        var user={
            username:username,
            password:hashed_pass,
            email:email,
            phone_number:phone_num,
            credit_card:credit_card,
            first_name:first_name,
            last_name:last_name,
            age:age,
            gender:gender
        
        }
        
        
        database.query('INSERT INTO users SET ?',user, function (error, results, fields) {
            if(error){ 
                console.log("Error1");    
                return next(error);
               }
            return res.send("Done");
          });
        
    });
});
console.log(hashed_pass);


};
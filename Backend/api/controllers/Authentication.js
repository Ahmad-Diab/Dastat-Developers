let database = require('../config/db-connection'),
    config = require('../config/config'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    randomstring = require("randomstring");

const mailer = require("../config/nodemailer");


/**
 * Authentication log in
 * @params req, res, next
 * @returns {*}
 */
module.exports.authenticate = function (req, res, next) {
    let username = req.body.username,
        password = req.body.password;

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

    let query = 'SELECT * FROM users WHERE username = ?';

    database.query(query, [username], function (err, results) {
        if (err) return next(err);

        if (results.length > 0) {
            let user = {
                username: results[0].username,
                email: results[0].email,
                phone_number: results[0].phone_number,
                first_name: results[0].first_name,
                last_name: results[0].last_name,
                age: results[0].age,
                gender: results[0].gender,
                //   active:results[0].active
            };

            console.log(user.username + " is " + results[0].active);

            bcrypt.compare(password, results[0].password, function (err, isMatch) {
                if (isMatch) {
                    if (results[0].active) {
                        let token = jwt.sign(user, config.secret, {
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
};


/**
 * Authentication Register
 * @params req: username, and token in the body
 * @params res, next
 */
module.exports.verify = function (req, res, next) {
    let username = req.body.username,
        token = req.body.token;

    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'username is required field.',
            data: null
        });
    }
    if (!token) {
        return res.status(422).json({
            err: null,
            msg: 'token is required for verification.',
            data: null
        });
    }

    console.log("Username : " + username);
    console.log("Token : " + token);

    let query = 'SELECT * FROM users WHERE username = ?';
    database.query(query, [username], function (err, results) {
        if (err) return next(err);

        if (!results.length) {
            res.status(200).json({
                err: null,
                msg: "Please Enter a valid Username",
                success: false
            });
            return;
        }

        console.log("Username found :" + results[0].username);

        if (results[0].active_code == token) {
            let query = 'update users  SET active= ?, active_code=? WHERE username=?';
            database.query(query, [true, "", username], function (err) {
                if (err) return next(err);

                res.status(200).json({
                    err: null,
                    msg: "Done, correct token",
                    success: true
                });
            });

        } else {
            res.status(404).json({
                err: null,
                msg: "Incorrect Token",
                success: false
            });
        }
    });

};

module.exports.ForgotPassword = function(req,res,next){
    let username = req.body.username;
    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'username is required field.',
            data: null
        });}
        let query = 'SELECT * FROM users WHERE username = ?';
        database.query(query, [username], function (err, results) {
            if (err) return next(err);
    
            if (!results.length) {
                res.status(200).json({
                    err: null,
                    msg: "Please Enter a valid Username",
                    success: false
                });
                return;
            }//else
            let newpass = randomstring.generate(7);
            let email=results[0].email;
            let hashed_pass;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newpass, salt, (err, hash) => {
                    if (err) return next(err);
                    hashed_pass = hash;
        database.query('UPDATE users SET password = ? where username = ?',[hashed_pass,username],function(err,result){
            if (err) return next(err);
            const html = '<p>Hi there</p><br/><p>This is Your new Password</p><br/><p>'+ newpass +'</p><b></b> <br/>';
              mailer.sendmail(email, html);
              res.status(200).json({
                err: null,
                msg: "A New Password Sent to Your Email Check it :D",
                success: true
            });
        })
    })
});

        });

}

/**
 *
 * @params req, its body containing username, password, email, phone_number,
 *              credit_card, first_name, last_name, age, and gender
 * @params res, next
 * @constructor
 */
module.exports.Register = function (req, res, next) {

    let username = req.body.username,
        password = req.body.password,
        email = req.body.email,
        phone_number = req.body.phone_number,
        credit_card = req.body.credit_card,
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        age = req.body.age,
        gender = req.body.gender,
        active = false,
        active_code = randomstring.generate(),
        flag = true,
        unique = true,
        valid = req.body.username &&
            req.body.password &&
            req.body.email &&
            req.body.phone_number &&
            req.body.first_name &&
            req.body.last_name &&
            req.body.age &&
            req.body.gender;

    // NULL Checkers
    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'username is required field.',
            data: null
        });
    }
    if (!password) {
        return res.status(422).json({
            err: null,
            msg: 'Password is required field.',
            data: null
        });
    }
    if (!email) {
        return res.status(422).json({
            err: null,
            msg: 'email is required field.',
            data: null
        });
    }
    if (!phone_number) {
        return res.status(422).json({
            err: null,
            msg: 'phone_number is required field.',
            data: null
        });
    }
    if (!first_name) {
        return res.status(422).json({
            err: null,
            msg: 'first_name is required field.',
            data: null
        });
    }
    if (!last_name) {
        return res.status(422).json({
            err: null,
            msg: 'last_name is required field.',
            data: null
        });
    }
    if (!age) {
        return res.status(422).json({
            err: null,
            msg: 'age is required field.',
            data: null
        });
    }
    if (!gender) {
        return res.status(422).json({
            err: null,
            msg: 'gender is required field.',
            data: null
        });
    }

    // TODO type & regex validations

    let query = 'SELECT * FROM users WHERE username = ?';
    database.query(query, [username], function (err, results) {

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

        let query = 'SELECT * FROM users WHERE email = ?';
        database.query(query, [email], function (err, results) {

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

            let hashed_pass;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) return next(err);

                    hashed_pass = hash;
                    let user = {
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
                    };

                    database.query('INSERT INTO users SET ?', user, function (error) {
                        if (error)
                            return next(error);

                        const html = '<p>Hi there,</p><br/><p>Thank you For Registering!</p><br/><p> Activation Code:' + active_code + '</p><b></b> <br/><p>Please Write that Activation Code on the following link to activate your Account.</p><a href ="http://localhost:4200/verify">here</a>';

                        mailer.sendmail(email, html);

                        res.status(200).json({
                            err: null,
                            msg: "Registration done successfully," +
                            " Please check your Email to verify your account.",
                            success: true
                        });

                    });

                });
            });
        });
    });
};
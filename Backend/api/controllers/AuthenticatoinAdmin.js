let database = require('../config/db-connection'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    Validations = require('../utils/validations');

/**
 * Admin Log-in
 * @param req, username and password in body
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.login = function (req, res, next) {

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

    if (!Validations.isString(username) || !Validations.isString(password)) {
        return res.status(422).json({
            err: null,
            msg: 'Entered data must be of valid types.',
            data: null
        });
    }

    console.log("Entered Username : " + username);

    let query = 'SELECT * FROM admins WHERE username = ?';
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
                type: results[0].type
            };

            console.log("Is ACTIVE = " + results[0].active);

            bcrypt.compare(password, results[0].password, function (err, isMatch) {
                if (isMatch) {
                    let token = jwt.sign(user, config.secret, {
                        expiresIn: '10d'
                    });

                    console.log("Token Username : " + token.username);

                    res.status(200).json({
                        err: null,
                        msg: "Logged in successfully",
                        token: 'JWT' + token,
                        data: token,
                        success: true,
                        username: user.username,
                        type: user.type
                    });

                } else {
                    res.status(401).json({
                        err: null,
                        msg: "Wrong Password",
                        success: false
                    });
                }
            });
        } else {
            res.status(401).json({
                err: null,
                msg: "Wrong User Name",
                success: false
            });
        }
    });
};
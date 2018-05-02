let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

module.exports.viewMyInfo = function (req, res, next) {

    let username = req.query.username;

    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'username is required.',
            data: null
        });
    }

    if (!Validations.isString(username)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    let query = "SELECT * FROM users WHERE username = ?";
    database.query(query, [username], function (error, results) {
        if (error) return next(error);

        return res.send(results[0]);
    });

};

module.exports.getUsers = function (req, res, next) {
    database.query('SELECT * FROM users', function (error, results) {
        if (error) {
            return next(error);
        }
        return res.send(results);
    });
};

module.exports.editProfile = function (req, res, next) {
    let username = req.params.username,
        email = req.body.email,
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        phone_number = req.body.phone_number,
        age = req.body.age;

    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'username is required.',
            data: null
        });
    }
    if (!email) {
        return res.status(422).json({
            err: null,
            msg: 'email is required.',
            data: null
        });
    }
    if (!first_name) {
        return res.status(422).json({
            err: null,
            msg: 'first_name is required.',
            data: null
        });
    }
    if (!last_name) {
        return res.status(422).json({
            err: null,
            msg: 'last_name is required.',
            data: null
        });
    }
    if (!phone_number) {
        return res.status(422).json({
            err: null,
            msg: 'phone_number is required.',
            data: null
        });
    }
    if (!age) {
        return res.status(422).json({
            err: null,
            msg: 'age is required.',
            data: null
        });
    }

    if (!Validations.isString(username) || !Validations.isString(email) ||
        !Validations.isString(first_name) || !Validations.isString(last_name) ||
        !Validations.isNumber(phone_number) || !Validations.isNumber(age)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    database.query('UPDATE users SET email = ?, first_name = ?, last_name = ?, phone_number = ?, age = ? where username = ?', [email, first_name, last_name, phone_number, age, username], function (err, results, fields) {
        if (err) return next(err);
        return res.send(results);
    });
};

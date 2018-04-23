var jwt = require('jsonwebtoken');
var config = require('./config/config');
var database = require('./config/db-connection');
//Header Format
// authorization: Token <access_token>
//user authorization
module.exports.Verify_User = function (req, res, next) {

    //console.log(req.headers['authorization']);
    var tokenHeader = req.headers['authorization'];
    if (typeof tokenHeader !== 'undefined') {
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var decoded = jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                return res.status(401).json({
                    err: null,
                    msg: 'there is no token like that',
                    data: null
                });
            } else {
                console.log(authData.username);
                var query = 'SELECT * FROM users WHERE username = ?';
                database.query(query, [authData.username], function (err, results, fields) {
                    if (err) return next(err);
                    if (results.length == 1) {
                        next();
                    } else {
                        return res.status(401).json({
                            err: null,
                            msg: 'You Are Not a user',
                            data: null
                        });
                    }
                });
            }

        });
    } else {
        return res.status(401).json({
            err: null,
            msg: 'The Request dont have a header authorization',
            data: null
        });
    }

};
// Admin authorization
module.exports.Verify_Cinema_Owner = function (req, res, next) {

    var tokenHeader = req.headers['authorization'];
    if (typeof tokenHeader !== 'undefined') {
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var decoded = jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                return res.status(401).json({
                    err: null,
                    msg: 'there is no token like that',
                    data: null
                });
            } else {
                console.log(authData.username);
                var query = 'SELECT * FROM admins WHERE username = ?';
                database.query(query, [authData.username], function (err, results, fields) {
                    if (err) return next(err);
                    if (results.length == 1) {
                        if (results[0].type == "Cinema Owner") {
                            next();
                        } else {
                            return res.status(401).json({
                                err: null,
                                msg: 'You Are Not a Cinema Owner',
                                data: null
                            });
                        }

                    } else {
                        return res.status(401).json({
                            err: null,
                            msg: 'You Are Not a Cinema Owner',
                            data: null
                        });
                    }
                });
            }

        });
    } else {
        return res.status(401).json({
            err: null,
            msg: 'The Request dont have a header authorization',
            data: null
        });
    }

};
//Branch Manager
module.exports.Verify_Branch_Manager = function (req, res, next) {

    var tokenHeader = req.headers['authorization'];
    if (typeof tokenHeader !== 'undefined') {
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var decoded = jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                return res.status(401).json({
                    err: null,
                    msg: 'there is no token like that',
                    data: null
                });
            } else {
                console.log(authData.username);
                var query = 'SELECT * FROM admins WHERE username = ?';
                database.query(query, [authData.username], function (err, results, fields) {
                    if (err) return next(err);
                    if (results.length == 1) {
                        if (results[0].type == "Branch Manager") {
                            next();
                        } else {
                            return res.status(401).json({
                                err: null,
                                msg: 'You Are Not a Branch Manager',
                                data: null
                            });
                        }

                    } else {
                        return res.status(401).json({
                            err: null,
                            msg: 'You Are Not a Branch Manager',
                            data: null
                        });
                    }
                });
            }

        });
    } else {
        return res.status(401).json({
            err: null,
            msg: 'The Request dont have a header authorization',
            data: null
        });
    }

};
//Booking Usher
module.exports.Verify_Booking_Usher = function (req, res, next) {

    var tokenHeader = req.headers['authorization'];
    if (typeof tokenHeader !== 'undefined') {
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var decoded = jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                return res.status(401).json({
                    err: null,
                    msg: 'there is no token like that',
                    data: null
                });
            } else {
                console.log(authData.username);
                var query = 'SELECT * FROM admins WHERE username = ?';
                database.query(query, [authData.username], function (err, results, fields) {
                    if (err) return next(err);
                    if (results.length == 1) {
                        if (results[0].type == "Booking Usher") {
                            next();
                        } else {
                            return res.status(401).json({
                                err: null,
                                msg: 'You Are Not a Booking Usher',
                                data: null
                            });
                        }

                    } else {
                        return res.status(401).json({
                            err: null,
                            msg: 'You Are Not a Booking Usher',
                            data: null
                        });
                    }
                });
            }

        });
    } else {
        return res.status(401).json({
            err: null,
            msg: 'The Request dont have a header authorization',
            data: null
        });
    }

};

//App Owner
module.exports.Verify_App_Owner = function (req, res, next) {

    var tokenHeader = req.headers['authorization'];
    if (typeof tokenHeader !== 'undefined') {
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var decoded = jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                return res.status(401).json({
                    err: null,
                    msg: 'there is no token like that',
                    data: null
                });
            } else {
                console.log(authData.username);
                var query = 'SELECT * FROM admins WHERE username = ?';
                database.query(query, [authData.username], function (err, results, fields) {
                    if (err) return next(err);
                    if (results.length == 1) {
                        if (results[0].type == "App Owner") {
                            next();
                        } else {
                            return res.status(401).json({
                                err: null,
                                msg: 'You Are Not a App Owner',
                                data: null
                            });
                        }

                    } else {
                        return res.status(401).json({
                            err: null,
                            msg: 'You Are Not a App Owner',
                            data: null
                        });
                    }
                });
            }

        });

    } else {
        return res.status(401).json({
            err: null,
            msg: 'The Request dont have a header authorization',
            data: null
        });
    }

};
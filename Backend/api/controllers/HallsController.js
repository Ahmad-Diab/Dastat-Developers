let database = require('../config/db-connection');
    config = require('../config/config'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    Validations = require('../utils/validations');

module.exports.getAllHalls = function (req, res, next) {
    database.query("SELECT h.*,l.name as layout_name FROM `halls` h inner join `layout` l on h.layout = l.id ", function (error, hall, field) {
        if (error) return next(error);
        return res.send(hall);
    });
};

module.exports.getHall = function (req, res, next) {
    database.query("SELECT h.*,l.name as layout_name FROM `halls` h inner join `layout` l on h.layout = l.id where h.cinema_location = ? AND h.cinema_name = ? AND h.hall_number = ?", [req.body.cinema_location, req.body.cinema_location, req.body.hall_number], function (error, hall, field) {
        if (error) return next(error);
        return res.send(hall);
    });
};

module.exports.getHalls = function (req, res, next) {
    database.query("SELECT h.*,l.name as layout_name FROM `halls` h inner join `layout` l on h.layout = l.id ", function (error, hall, field) {
        if (error) return next(error);
        return res.send(hall);
    });
};


module.exports.addHall = function (req, res, next) {
    let hall = {
        cinema_location: req.body.cinema_location,
        cinema_name: req.body.cinema_name,
        hall_number: req.body.hall_number,
        type: req.body.type,
        layout: req.body.layout,
        number_of_seats: req.body.number_of_seats,
        movie: null
    },
    tokenHeader = req.headers['authorization'],
    adminUserName;

    if (!tokenHeader) {
        return res.status(401).json({
            err: err,
            msg: 'no username in headers token.',
            data: null
        });
    }

    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];
    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: err,
                msg: 'no username in headers token.',
                data: null
            });
        }

        adminUserName = authData.username;

        //checking for null values or not entered data
   

        database.query('SELECT * FROM admins_cinemas WHERE cinema_name = ? AND cinema_location = ? AND admin = ?',
            [hall.cinema_name, hall.cinema_location, adminUserName], function (error, results) {
                if (error) {
                    return next(error);
                }

                if (!results || !results.length) {
                    return res.status(404).json({
                        err: null,
                        msg: "You don't belong to this cinema.",
                        data: null
                    });
                }
            console.log(hall);
            database.query('INSERT INTO halls SET ?', hall, function (error) {
                if (error) return next(error);
                res.status(200).json({
                    msg: 'Hall Added Successfully',
                });
            });
        });
    });
};

module.exports.updateHall = function (req, res, next) {

    console.log("Entered updateHall");
    let type = req.body.type,
        layout = req.body.layout,
        cinema_name = req.body.cinema_name,
        cinema_location = req.body.cinema_location, 
        hall_number = req.body.hall_number,
        tokenHeader = req.headers['authorization'],
        adminUserName;
        tokenHeader;
        
    if (!tokenHeader) {
        return res.status(401).json({
            err: err,
            msg: 'no username in headers token.',
            data: null
        });
    }
    
    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];
    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: err,
                msg: 'no username in headers token.',
                data: null
            });
        }
        
        adminUserName = authData.username;

        //checking for null values or not entered data
        
        database.query('SELECT * FROM admins_cinemas WHERE cinema_name = ? AND cinema_location = ? AND admin = ?',
            [cinema_name, cinema_location, adminUserName], function (error, results) {
                if (error) {
                    return next(error);
                }

                if (!results || !results.length) {
                    return res.status(404).json({
                        err: null,
                        msg: "You don't belong to this cinema.",
                        data: null
                    });
                }
            database.query('UPDATE halls SET type = ?, layout = ? where cinema_name = ? AND cinema_location = ? AND hall_number = ?',
                [req.body.type, req.body.layout, req.body.cinema_name, req.body.cinema_location, req.body.hall_number],
                function (error) {
                    if (error) {
                        console.log(error);
                        return (error);
                    }
                    res.status(200).json({
                        msg: 'Hall Updated Successfully',
                    });
            });
        });
    });
};


module.exports.deleteHall = function (req, res, next) {
   
    let cinema_name = req.body.cinema_name,
        cinema_location = req.body.cinema_location, 
        hall_number = req.body.hall_number,
        tokenHeader = req.headers['authorization'],
      adminUserName;
    
    if (!tokenHeader) {
        return res.status(401).json({
            err: err,
            msg: 'no username in headers token.',
            data: null
        });
    }

    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];
    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: err,
                msg: 'no username in headers token.',
                data: null
            });
        }

        adminUserName = authData.username;

        //checking for null values or not entered data
        

        database.query('SELECT * FROM admins_cinemas WHERE cinema_name = ? AND cinema_location = ? AND admin = ?',
            [cinema_name, cinema_location, adminUserName], function (error, results) {
                if (error) {
                    return next(error);
                }

                if (!results || !results.length) {
                    return res.status(404).json({
                        err: null,
                        msg: "You don't belong to this cinema.",
                        data: null
                    });
                }
            database.query('DELETE FROM halls where cinema_name = ? AND cinema_location = ? AND hall_number = ?',
                [cinema_name, cinema_location, hall_number], function (error) {
                    if (error) return next(error);
                    res.status(200).json({
                        msg: 'Hall Deleted Successfully',
                    });
            });
        });
    });
};
// OUR DATABASE IS HERE
let database = require('../config/db-connection'),
    Validations = require('../utils/validations'),
    bcrypt = require('bcrypt'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken');

/**
 * @param req, name, location, address, num_of_halls, is3D, is4D, company,
 *      imagePath and imagePath2 in body
 * @param res
 * @param next
 */
module.exports.addCinema = function (req, res, next) {

    let tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({
            err: null,
            msg: 'You must log in first',
            data: null
        });
    }

    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];
    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: null,
                msg: 'Must be a user of the system',
                data: null
            });
        }

        let admin_username = authData.username;
        console.log('Admin username : ' + authData.username);

        let name = req.body["name"],
            location = req.body["location"],
            address = req.body["address"],
            number_of_halls = req.body["number_of_halls"],
            is3D = req.body["is3D"],
            is4D = req.body["is4D"],
            company = req.body["company"],
            imagePath = req.body["imagePath"],
            imagePath2 = req.body["imagePath2"];

        if (!name) {
            return res.status(422).json({
                err: null,
                msg: 'cinema name as (name) is required.',
                data: null
            });
        }
        if (!location) {
            return res.status(422).json({
                err: null,
                msg: 'cinema location as (location) is required.',
                data: null
            });
        }

        if (!address) {
            return res.status(422).json({
                err: null,
                msg: 'address is required.',
                data: null
            });
        }
        if (!number_of_halls) {
            return res.status(422).json({
                err: null,
                msg: 'number_of_halls is required.',
                data: null
            });
        }
        if (is3D !== 1 && is3D !== 0) {
            return res.status(422).json({
                err: null,
                msg: 'is3D must be 0 or 1.',
                data: null
            });
        }
        if (is4D !== 1 && is4D !== 0) {
            return res.status(422).json({
                err: null,
                msg: 'is4D must be 0 or 1.',
                data: null
            });
        }
        if (!company) {
            return res.status(422).json({
                err: null,
                msg: 'company is required.',
                data: null
            });
        }
        if (!imagePath) {
            return res.status(422).json({
                err: null,
                msg: 'imagePath is required.',
                data: null
            });
        }
        if (!imagePath2) {
            return res.status(422).json({
                err: null,
                msg: 'imagePath2 is required.',
                data: null
            });
        }

        if (!Validations.isString(name) || !Validations.isString(location) || !Validations.isString(address) ||
            !Validations.isNumber(number_of_halls) || !Validations.isNumber(is3D) || !Validations.isNumber(is4D) ||
            !Validations.isString(company) || !Validations.isString(imagePath) || !Validations.isString(imagePath2)) {
            return res.status(422).json({
                err: null,
                msg: 'Provided data must be in valid types.',
                data: null
            });
        }

        let cinemaInsertionQuery = 'INSERT INTO cinemas (location,address,name,number_of_halls,is3D,is4D,company,imagePath,imagePath2) VALUES (?,?,?,?,?,?,?,?,?);';
        let cinemaData = [location, address, name, number_of_halls, Boolean(is3D), Boolean(is4D), company, imagePath, imagePath2];
        database.query(cinemaInsertionQuery, cinemaData, function (error, cinemaInsertionResults) {
            if (error) {
                return next(error);
            }

            let membershipInsertionQuery = 'INSERT INTO admins_cinemas (admin, cinema_name, cinema_location) VALUES (?,?,?);';
            let membershipData = [admin_username, name, location];
            database.query(membershipInsertionQuery, membershipData, function (error, membershipInsertionResults) {
                if (error) {
                    // Deleting not complete insertions if error
                    database.query('DELETE FROM cinemas WHERE name = ? AND location = ?', [name, location], function (err) {
                        if(err) return next(err);
                    });

                    return next(error);
                }

                // Adding user account for cinema, used for booking
                let password = config.secret; // Untraceable password
                let hashed_pass;
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            database.query('DELETE FROM cinemas WHERE name = ? AND location = ?', [name, location], function (err) {
                                if(err) return next(err);
                            });
                            database.query('DELETE FROM admin_cinemas WHERE admin = ? AND cinema_name = ? AND cinema_location = ?',
                                [admin_username, name, location], function (err) {
                                    if(err) return next(err);
                                });
                            return next(err);
                        }

                        hashed_pass = hash;
                        let user = {
                            username: name.toLowerCase().trim() + "_" + location.toLowerCase().trim(),
                            password: hashed_pass,
                            email: null,
                            phone_number: null,
                            credit_card: null,
                            first_name: null,
                            last_name: null,
                            age: null,
                            gender: null
                        };

                        database.query('INSERT INTO users SET ?', user, function (error, cinemaAccountInsertionResults) {
                            if (error)
                                return res.status(200).json({
                                    err: null,
                                    msg: 'The cinema is added successfully.',
                                    data: [cinemaInsertionResults, membershipInsertionResults, cinemaAccountInsertionResults]
                                });
                        });
                    });
                });
            });

        });
    });


};

/**
 * @param req, name & cinema_location in params
 *              address, num_of_halls, is3D, is4D, company, image_path_1 and image_path_2 in body
 * @param res
 * @param next
 */
module.exports.editCinema = function (req, res, next) {

    let tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({
            err: null,
            msg: 'You must log in first',
            data: null
        });
    }
    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];
    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: null,
                msg: 'Must be a user of the system',
                data: null
            });
        }

        let admin_username = authData.username;
        console.log('Admin username : ' + authData.username);
        //TODO does username still exist ??
        let name = req.params['name'],
            location = req.params['location'];

        let address = req.body['address'],
            number_of_halls = req.body['number_of_halls'],
            is3D = req.body['is3D'],
            is4D = req.body['is4D'],
            company = req.body['company'],
            imagePath = req.body['imagePath'],
            imagePath2 = req.body['imagePath2'];

        if (!name) {
            return res.status(422).json({
                err: null,
                msg: 'cinema name as (name) is required.',
                data: null
            });
        }
        if (!location) {
            return res.status(422).json({
                err: null,
                msg: 'cinema location as (location) is required.',
                data: null
            });
        }
        if (!address) {
            return res.status(422).json({
                err: null,
                msg: 'address is required.',
                data: null
            });
        }
        if (!number_of_halls) {
            return res.status(422).json({
                err: null,
                msg: 'number_of_halls is required.',
                data: null
            });
        }
        if (is3D !== 1 && is3D !== 0) {
            return res.status(422).json({
                err: null,
                msg: 'is3D must be 0 or 1.',
                data: null
            });
        }
        if (is4D !== 1 && is4D !== 0) {
            return res.status(422).json({
                err: null,
                msg: 'is4D must be 0 or 1.',
                data: null
            });
        }
        if (!company) {
            return res.status(422).json({
                err: null,
                msg: 'company is required.',
                data: null
            });
        }
        if (!imagePath) {
            return res.status(422).json({
                err: null,
                msg: 'imagePath is required.',
                data: null
            });
        }
        if (!imagePath2) {
            return res.status(422).json({
                err: null,
                msg: 'imagePath2 is required.',
                data: null
            });
        }

        if (!Validations.isString(name) || !Validations.isString(location) || !Validations.isString(address) ||
            !Validations.isNumber(number_of_halls) || !Validations.isNumber(is3D) || !Validations.isNumber(is4D) ||
            !Validations.isString(company) || !Validations.isString(imagePath) || !Validations.isString(imagePath2)) {
            return res.status(422).json({
                err: null,
                msg: 'Provided data must be in valid types.',
                data: null
            });
        }

        let checkForMembershipQuery = 'SELECT admin FROM admins_cinemas WHERE cinema_name = ? AND cinema_location = ?',
            membershipData = [admin_username, name, location];
        database.query(checkForMembershipQuery, membershipData, function (err, results) {
            if (err) return next(err);

            if(!results.length) {
                return res.status(401).send({
                    err: null,
                    msg: "Not member of this cinema",
                    data: null
                });
            }

            database.query('UPDATE cinemas SET address = ?, number_of_halls = ?, is3D = ? , is4D = ? , company = ? , imagePath = ?, imagePath2 = ? where location = ? and name = ? ', [address, number_of_halls, Boolean(is3D), Boolean(is4D), company, imagePath, imagePath2, location, name],
                function (err, results) {

                    if (err) return next(err);

                    res.status(200).send({
                        err: null,
                        msg: "Cinema is edited successfully",
                        data: results
                    });
                });
        });
    });
};

/**
 * @param req, cinema_name & cinema_location in params
 * @param res
 * @param next
 */
module.exports.deleteCinema = function (req, res, next) {
    let tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        return res.status(401).json({
            err: null,
            msg: 'You must log in first',
            data: null
        });
    }

    let tokenHeaderSpliced = tokenHeader.split(' '),
        token = tokenHeaderSpliced[1];
    jwt.verify(token, config.secret, (err, authData) => {
        if (err) {
            return res.status(401).json({
                err: null,
                msg: 'Must be a user of the system',
                data: null
            });
        }

        let admin_username = authData.username;
        console.log('Admin username : ' + authData.username);

        let name = req.params['name'],
            location = req.params['location'];

        if (!name) {
            return res.status(422).json({
                err: null,
                msg: 'cinema name as (name) is required.',
                data: null
            });
        }

        if (!location) {
            return res.status(422).json({
                err: null,
                msg: 'cinema location as (location) is required.',
                data: null
            });
        }

        if (!Validations.isString(name) ||
            !Validations.isString(location)) {

            return res.status(422).json({
                err: null,
                msg: 'Provided data must be in valid types.',
                data: null
            });
        }

        let checkForMembershipQuery = 'SELECT admin FROM admins_cinemas WHERE cinema_name = ? AND cinema_location = ?',
            membershipData = [admin_username, name, location];
        database.query(checkForMembershipQuery, membershipData, function (err, results) {
            if (err) return next(err);

            if (!results.length) {
                return res.status(401).send({
                    err: null,
                    msg: "Not member of this cinema",
                    data: null
                });
            }

            database.query('DELETE FROM cinemas WHERE name = ? AND location = ?', [name, location], function (error, results) {
                if (error) return next(error);
                /* // CHECK IF DELETE ON CASCADE IS DONE
                database.query('DELETE FROM admin_cinemas WHERE admin = ? AND cinema_name = ? AND cinema_location = ?',
                    [admin_username, name, location], function (err) {
                        if(err) return next(err);
                    });
                */
                res.status(200).json({
                    err: null,
                    msg: "Deleted Successfully!",
                    data: results
                });
            });
        });

    });

};

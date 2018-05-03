//OUR DATABASE IS HERE
let database = require('../config/db-connection'),
    config = require('../config/config'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    Validations = require('../utils/validations');

//------------------------- View all admins -------------------------------
module.exports.getAdmins = function (req, res, next) {

    console.log("Entered getAdmins");
    let pagination = true, // boolean for checking if the user entered limits for pagination or not
        errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        username = req.query['username'];

    console.log(req.query['username']);

    if (!username) {

        return res.status(422).json({
            err: null,
            msg: 'Username is required',
            data: null
        });

    }

// To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Booking Usher'" +
        " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location";


    //query = database.format(query);
    database.query(query, username, function (err, rows) {

        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if (!totalCount) {

            return res.status(200).json({
                err: null,
                msg: 'No admins available',
                data: rows
            });

        }
        if (start === '' || limit === '' || !start || !limit) {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            errMsg = "No Limits were provided";
            console.log("No limits");

        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let query = "select DISTINCT A.* from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Booking Usher'" +
            " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location limit ? OFFSET ?";
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [username, limitNum, startNum];

        database.query(query, table, function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Admins have been successfully retrieved"
                });
            }
        });
    });
};

//------------------------- View all Booking ushers -------------------------------
module.exports.getBookingUshers = function (req, res, next) {

    console.log("Entered getBookingUshers");
    let pagination = true, // boolean for checking if the user entered limits for pagination or not
        errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        username = req.query['username'];

    console.log(req.query['username']);

    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required',
            data: null
        });
    }

    // To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Booking Usher'" +
        " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location";

    database.query(query, username, function (err, rows) {

        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if (!totalCount) {

            return res.status(200).json({
                err: null,
                msg: 'No admins available',
                data: rows
            });

        }
        if (start === '' || limit === '' || !start || !limit) {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            errMsg = "No Limits were provided";
            console.log("No limits");

        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let query = "select DISTINCT A.* , C1.cinema_name , C1.cinema_location from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Booking Usher'" +
            " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location limit ? OFFSET ?";
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [username, limitNum, startNum];

        database.query(query, table, function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Booking Ushers have been successfully retrieved"
                });
            }
        });
    });
};

//------------------------- Add Booking ushers -------------------------------
module.exports.addBookingUsher = function (req, res, next) {

    let newBookingUsherUsername = req.body.username,
        email = req.body.email,
        salary = req.body.salary,
        type = "Booking Usher",
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        phone_number = req.body.phone_number,
        gender = req.body.gender,
        cinema_location = req.body.cinema_location,
        cinema_name = req.body.cinema_name,
        password = req.body.password,
        admin;

    //getting the username of the currently logged in admin
    let tokenHeader = req.headers['authorization'];
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
        let adminUserName = authData.username;

        //checking for null values or not entered data
        if (!newBookingUsherUsername) {
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
        if (!email) {
            return res.status(422).json({
                err: null,
                msg: 'Email is required.',
                data: null
            });
        }
        if (!salary) {
            return res.status(422).json({
                err: null,
                msg: 'Salary is required.',
                data: null
            });
        }
        if (!first_name) {
            return res.status(422).json({
                err: null,
                msg: 'First name is required.',
                data: null
            });
        }
        if (!last_name) {
            return res.status(422).json({
                err: null,
                msg: 'Last name is required.',
                data: null
            });
        }
        if (!gender) {
            return res.status(422).json({
                err: null,
                msg: 'Gender is required.',
                data: null
            });
        }
        if (!cinema_name) {
            return res.status(422).json({
                err: null,
                msg: 'Cinema Name is required.',
                data: null
            });
        }
        if (!cinema_location) {
            return res.status(422).json({
                err: null,
                msg: 'Cinema Location is required.',
                data: null
            });
        }
        //Validations for correct data types
        if (!Validations.isNumber(phone_number)) {
            return res.status(422).json({
                err: null,
                msg: 'Phone number must be numbers only.',
                data: null
            });
        }
        if (!Validations.isNumber(salary)) {
            return res.status(422).json({
                err: null,
                msg: 'Salary must be numbers only.',
                data: null
            });
        }
        if (!Validations.isString(first_name) || !Validations.isString(last_name)) {
            return res.status(422).json({
                err: null,
                msg: 'Invalid first name or last name',
                data: null
            });
        }

        //checking if the username already exists
        database.query('SELECT * FROM admins WHERE username = ?', [newBookingUsherUsername], function (err, results) {

            if (err) return next(err);

            if (results.length > 0) {
                return res.status(200).json({
                    err: null,
                    msg: "This username is already used , please enter a different one.",
                    success: true
                });
            }

            //checking if the email already exists
            database.query('SELECT * FROM admins WHERE email = ?', [email], function (err, results) {

                if (err) return next(err);

                if (results.length > 0) {
                    return res.status(200).json({
                        err: null,
                        msg: "This email already exists , please enter a different one.",
                        success: true
                    });
                }

                //Verify that this admins user belongs to this cinema
                database.query('SELECT * FROM admins_cinemas c  WHERE c.cinema_name = ? AND c.cinema_location = ? AND c.admin = ?',
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

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                if (err) {
                                    return next(err);
                                }
                                admin = {
                                    username: newBookingUsherUsername,
                                    password: hash,
                                    email: email,
                                    salary: salary,
                                    type: type,
                                    first_name: first_name,
                                    last_name: last_name,
                                    phone_number: phone_number,
                                    gender: gender
                                };

                                let sqlQuery = 'INSERT INTO admins SET ?';
                                database.query(sqlQuery, admin, function (err) {
                                    if (err) {
                                        return next(err);
                                    }
                                    sqlQuery = 'INSERT INTO admins_cinemas SET ?';
                                    database.query(sqlQuery, {newBookingUsherUsername, cinema_location, cinema_name}, function (err, results) {
                                        if (err)
                                            return next(err);

                                        res.status(200).json({
                                            err: null,
                                            msg: 'Booking Usher added Successfully.',
                                            data: results
                                        });

                                    });

                                });
                            });
                        });


                    });

            });
        });
    });
};

//------------------------- Edit Booking ushers -------------------------------
// TODO Membership validations
module.exports.editBookingUsher = function (req, res, next) {
    let username = req.body.username,
        user = 'select * from admins where username = ? AND type = "Booking Usher"';
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
        if (!username) {
            return res.status(422).json({
                err: null,
                msg: 'Username is required.',
                data: null
            });
        }

        database.query('SELECT * FROM admins_cinemas C1 , admins_cinemas C2  WHERE C1.admin = ? AND C2.admin = ? AND C1.cinema_name = C2.cinema_name AND C1.cinema_location = C2.cinema_location',
            [username , adminUserName], function (error, results) {
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
            database.query(user, [username], function (err, results) {
                if (err) return next(err);
                if (results.length > 0) {
                    let email = req.body.email,
                        salary = req.body.salary,
                        type = req.body.type,
                        phone_number = req.body.phone_number;
                    if (!email) {
                        email = results[0].email;
                    }
                    if (!salary) {
                        salary = results[0].salary;
                    }
                    if (!type) {
                        type = results[0].type;
                    }
                    if (!phone_number) {
                        phone_number = results[0].phone_number;
                    }
                    let query = 'UPDATE admins SET email = ?, salary = ?, type = ?, phone_number = ? where username = ? AND type = "Booking Usher"';
                    database.query(query, [email, salary, type, phone_number, username], function (err, results) {
                        if (err) return next(err);
                        return res.send(results);
                    });
                }
                else {
                    res.status(200).json({
                        err: null,
                        msg: "wrong username or invalid admin type",
                        success: false
                    });
                }
            });
        });
    });
};

//------------------------- Delete Booking ushers -------------------------------
module.exports.deleteBookingUsher = function (req, res, next) {

    let username = req.body.username,
        user = 'select * from admins where username = ? AND type = "Booking Usher"',
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
        if (!username) {
            return res.status(422).json({
                err: null,
                msg: 'Username is required.',
                data: null
            });
        }

        database.query('SELECT * FROM admins_cinemas C1 , admins_cinemas C2  WHERE C1.admin = ? AND C2.admin = ? AND C1.cinema_name = C2.cinema_name AND C1.cinema_location = C2.cinema_location',
            [username , adminUserName], function (error, results) {
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
    
            database.query(user, [username], function (err, results) {
                if (err) return next(err);

                if (results.length > 0) {
                    let queryDeleteAdminCinemas = 'DELETE FROM admins_cinemas where admin = ?';
                    database.query(queryDeleteAdminCinemas, [username], function (err) {
                        if (err) return next(err);

                        let queryDeleteAdmins = 'DELETE FROM admins where username = ? AND type = "Booking Usher"';
                        database.query(queryDeleteAdmins, [username], function (err, results) {
                            if (err) return next(err);
                            return res.send(results);
                        });
                    });

                } else {
                    res.status(200).json({
                        err: null,
                        msg: "wrong username or invalid admin type",
                        success: false
                    });
                }
            });
        });
    });
};
//------------------------- Add Branch managers -------------------------------
module.exports.addBranchManager = function (req, res, next) {

    let newBranchManagerUsername = req.body.username,
        email = req.body.email,
        salary = req.body.salary,
        type = "Branch Manager",
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        phone_number = req.body.phone_number,
        gender = req.body.gender,
        cinema_location = req.body.cinema_location,
        cinema_name = req.body.cinema_name,
        hashed_password,
        password = req.body.password,
        admin;

    //getting the username of the currently logged in admin
    let tokenHeader = req.headers['authorization'];
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

        let adminUserName = authData.username;

        //checking for null values or not entered data
        if (!newBranchManagerUsername) {
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
        if (!email) {
            return res.status(422).json({
                err: null,
                msg: 'Email is required.',
                data: null
            });
        }
        if (!salary) {
            return res.status(422).json({
                err: null,
                msg: 'Salary is required.',
                data: null
            });
        }
        if (!first_name) {
            return res.status(422).json({
                err: null,
                msg: 'First name is required.',
                data: null
            });
        }
        if (!last_name) {
            return res.status(422).json({
                err: null,
                msg: 'Last name is required.',
                data: null
            });
        }
        if (!gender) {
            return res.status(422).json({
                err: null,
                msg: 'Gender is required.',
                data: null
            });
        }
        if (!cinema_name) {
            return res.status(422).json({
                err: null,
                msg: 'Cinema Name is required.',
                data: null
            });
        }
        if (!cinema_location) {
            return res.status(422).json({
                err: null,
                msg: 'Cinema Location is required.',
                data: null
            });
        }

        // Validations for correct data types
        if (!Validations.isNumber(phone_number)) {
            return res.status(422).json({
                err: null,
                msg: 'Phone number must be numbers only.',
                data: null
            });
        }
        if (!Validations.isNumber(salary)) {
            return res.status(422).json({
                err: null,
                msg: 'Salary must be numbers only.',
                data: null
            });
        }
        if (!Validations.isString(first_name) || !Validations.isString(last_name)) {
            return res.status(422).json({
                err: null,
                msg: 'Invalid first name or last name',
                data: null
            });
        }

        //checking if the username already exists
        database.query('SELECT * FROM admins WHERE username = ?', [newBranchManagerUsername], function (err, results) {

            if (err) return next(err);

            if (results.length > 0) {
                return res.status(200).json({
                    err: null,
                    msg: "This username is already used , please enter a different one.",
                    success: true
                });
            }

            //checking if the email already exists
            database.query('SELECT * FROM admins WHERE email = ?', [email], function (err, results) {

                if (err) return next(err);

                if (results.length > 0) {

                    return res.status(200).json({
                        err: null,
                        msg: "This email already exists , please enter a different one.",
                        success: true
                    });

                }

                //Verify that this admins user belongs to this cinema
                database.query('SELECT * FROM admins_cinemas c  WHERE c.cinema_name = ? AND c.cinema_location = ? AND c.admin = ?',
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

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                if (err) {
                                    return next(err);
                                }
                                hashed_password = hash;

                                admin = {
                                    username: newBranchManagerUsername,
                                    password: hashed_password,
                                    email: email,
                                    salary: salary,
                                    type: type,
                                    first_name: first_name,
                                    last_name: last_name,
                                    phone_number: phone_number,
                                    gender: gender
                                };

                                let sqlQuery = 'INSERT INTO admins SET ?';
                                database.query(sqlQuery, admin, function (err) {
                                    if (err) {
                                        return next(err);
                                    }


                                    sqlQuery = 'INSERT INTO admins_cinemas SET ?';
                                    database.query(sqlQuery, {newBranchManagerUsername, cinema_location, cinema_name},
                                        function (err, results) {
                                            if (err)
                                                return next(err);

                                            res.status(200).json({
                                                err: null,
                                                msg: 'Branch manager added Successfully.',
                                                data: results
                                            });

                                        });


                                });

                            });
                        });

                    });

            });

        });

    });
};


//------------------------- View All Branch managers -------------------------------

module.exports.getBranchManagers = function (req, res, next) {

    console.log("Entered getBranchManagers");
    let pagination = true, // boolean for checking if the user entered limits for pagination or not
        errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        username = req.query['username'];

    console.log(req.query['username']);
    if (!username) {

        return res.status(422).json({
            err: null,
            msg: 'Username is required',
            data: null
        });

    }

// To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Branch Manager'" +
        " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location";


    //query = database.format(query);
    database.query(query, username, function (err, rows) {

        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if (!totalCount) {

            return res.status(200).json({
                err: null,
                msg: 'No admins available',
                data: rows
            });

        }
        if (start === '' || limit === '' || !start || !limit) {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            errMsg = "No Limits were provided";
            console.log("No limits");

        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let query = "select DISTINCT A.* , C1.cinema_name , C1.cinema_location from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Branch Manager'" +
            " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location limit ? OFFSET ?";
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [username, limitNum, startNum];

        database.query(query, table, function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Branch Managers have been successfully retrieved"
                });
            }
        });
    });
};


module.exports.editBranchManager = function (req, res, next) {
    let username = req.body.username,
        user = 'select * from admins where username = ? AND type = "Branch Manager"';
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
        if (!username) {
            return res.status(422).json({
                err: null,
                msg: 'Username is required.',
                data: null
            });
        }

        database.query('SELECT * FROM admins_cinemas C1 , admins_cinemas C2  WHERE C1.admin = ? AND C2.admin = ? AND C1.cinema_name = C2.cinema_name AND C1.cinema_location = C2.cinema_location',
            [username, adminUserName], function (error, results) {
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
            database.query(user, [username], function (err, results) {
                if (err) return next(err);
                if (results.length > 0) {
                    let email = req.body.email,
                        salary = req.body.salary,
                        type = req.body.type,
                        phone_number = req.body.phone_number;
                    if (!email) {
                        email = results[0].email;
                    }
                    if (!salary) {
                        salary = results[0].salary;
                    }
                    if (!type) {
                        type = results[0].type;
                    }
                    if (!phone_number) {
                        phone_number = results[0].phone_number;
                    }
                    let query = 'UPDATE admins SET email = ?, salary = ?, type = ?, phone_number = ? where username = ? AND type = "Branch Manager"';
                    database.query(query, [email, salary, type, phone_number, username], function (err, results) {
                        if (err) return next(err);
                        return res.send(results);
                    });
                }
                else {
                    res.status(200).json({
                        err: null,
                        msg: "wrong username or invalid admin type",
                        success: false
                    });
                }
            });
        });
    });
};


//------------------------- Delete Branch managers -------------------------------
module.exports.deleteBranchManager = function (req, res, next) {

    let username = req.body.username,
        user = 'select * from admins where username = ? AND type = "Branch Manager"',
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
        if (!username) {
            return res.status(422).json({
                err: null,
                msg: 'Username is required.',
                data: null
            });
        }

        database.query('SELECT * FROM admins_cinemas C1 , admins_cinemas C2  WHERE C1.admin = ? AND C2.admin = ? AND C1.cinema_name = C2.cinema_name AND C1.cinema_location = C2.cinema_location',
            [username, adminUserName], function (error, results) {
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
    
            database.query(user, [username], function (err, results) {
                if (err) return next(err);

                if (results.length > 0) {
                    let queryDeleteAdminCinemas = 'DELETE FROM admins_cinemas where admin = ?';
                    database.query(queryDeleteAdminCinemas, [username], function (err) {
                        if (err) return next(err);

                        let queryDeleteAdmins = 'DELETE FROM admins where username = ? AND type = "Branch Manager"';
                        database.query(queryDeleteAdmins, [username], function (err, results) {
                            if (err) return next(err);
                            return res.send(results);
                        });
                    });

                } else {
                    res.status(200).json({
                        err: null,
                        msg: "wrong username or invalid admin type",
                        success: false
                    });
                }
            });
        });
    });
};

//------------------------- View all Cinema owners -------------------------------

module.exports.getCinemaOwners = function (req, res, next) {

    console.log("Entered getCinemaOwners");

    let pagination = true, // boolean for checking if the user entered limits for pagination or not
        errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        username = req.query['username'];

    if (!username) {

        return res.status(422).json({
            err: null,
            msg: 'Username is required',
            data: null
        });

    }

// To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas WHERE type = 'Cinema Owner'";

    //query = database.format(query);
    database.query(query, username, function (err, rows) {

        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if (!totalCount) {

            return res.status(200).json({
                err: null,
                msg: 'No Cinema Owners available',
                data: rows
            });

        }
        if (start === '' || limit === '' || !start || !limit) {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            errMsg = "No Limits were provided";
            console.log("No limits");

        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let query = "select DISTINCT * from admins_cinemas ac , admins a WHERE ac.admin = a.username AND type = 'Cinema Owner' limit ? OFFSET ?";
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [username, limitNum, startNum];

        database.query(query, table, function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Cinema Owners have been successfully retrieved"
                });
            }
        });
    });
};

//------------------------------ add Cinema Owner-----------------------------------
module.exports.addCinemaOwner = function (req, res, next) {

    let newCinemaOwnerUsername = req.body.username,
        email = req.body.email,
        salary = req.body.salary,
        type = "Cinema Owner",
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        phone_number = req.body.phone_number,
        gender = req.body.gender,
        cinema_location = req.body.cinema_location,
        cinema_name = req.body.cinema_name,
        password = req.body.password,
        admin;

    //getting the username of the currently logged in admin
    let tokenHeader = req.headers['authorization'];
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

        let adminUsername = authData.username;

        //checking for null values or not entered data
        if (!newCinemaOwnerUsername) {
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
        if (!email) {
            return res.status(422).json({
                err: null,
                msg: 'Email is required.',
                data: null
            });
        }
        if (!salary) {
            return res.status(422).json({
                err: null,
                msg: 'Salary is required.',
                data: null
            });
        }
        if (!first_name) {
            return res.status(422).json({
                err: null,
                msg: 'First name is required.',
                data: null
            });
        }
        if (!last_name) {
            return res.status(422).json({
                err: null,
                msg: 'Last name is required.',
                data: null
            });
        }
        if (!gender) {
            return res.status(422).json({
                err: null,
                msg: 'Gender is required.',
                data: null
            });
        }
        if (!cinema_name) {
            return res.status(422).json({
                err: null,
                msg: 'Cinema Name is required.',
                data: null
            });
        }
        if (!cinema_location) {
            return res.status(422).json({
                err: null,
                msg: 'Cinema Location is required.',
                data: null
            });
        }

        //Validations for correct data types
        if (!Validations.isNumber(phone_number)) {
            return res.status(422).json({
                err: null,
                msg: 'Phone number must be numbers only.',
                data: null
            });
        }
        if (!Validations.isNumber(salary)) {
            return res.status(422).json({
                err: null,
                msg: 'Salary must be numbers only.',
                data: null
            });
        }
        if (!Validations.isString(first_name) || !Validations.isString(last_name)) {
            return res.status(422).json({
                err: null,
                msg: 'Invalid first name or last name',
                data: null
            });
        }

        //checking if the username already exists
        database.query('SELECT * FROM admins WHERE username = ?', [newCinemaOwnerUsername], function (err, results) {

            if (err) return next(err);

            if (results.length > 0) {
                return res.status(200).json({
                    err: null,
                    msg: "This username is already used , please enter a different one.",
                    success: true
                });
            }

            //checking if the email already exists
            database.query('SELECT * FROM admins WHERE email = ?', [email], function (err, results) {

                if (err) return next(err);

                if (results.length > 0) {
                    return res.status(200).json({
                        err: null,
                        msg: "This email already exists , please enter a different one.",
                        success: true
                    });
                }


                // Verify that this admins user belongs to this cinema

                database.query('SELECT * FROM admins_cinemas c  WHERE c.cinema_name = ? AND c.cinema_location = ? AND c.admin = ?',
                    [cinema_name, cinema_location, adminUsername], function (error, results) {
                        if (error) {
                            return next(error);
                        }
                        console.log(results + "This Admin user doesn't belong to this cinema");
                        if (!results || !results.length) {
                            return res.status(404).json({
                                err: null,
                                msg: "You don't belong to this cinema.",
                                data: null
                            });
                        }

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                if (err) {
                                    return next(err);
                                }

                                admin = {
                                    username: newCinemaOwnerUsername,
                                    password: hash,
                                    email: email,
                                    salary: salary,
                                    type: type,
                                    first_name: first_name,
                                    last_name: last_name,
                                    phone_number: phone_number,
                                    gender: gender
                                };

                                let sqlQuery = 'INSERT INTO admins SET ?';
                                database.query(sqlQuery, admin, function (err) {
                                    if (err) {
                                        return next(err);
                                    }


                                    sqlQuery = 'INSERT INTO admins_cinemas SET ?';
                                    database.query(sqlQuery, {newCinemaOwnerUsername, cinema_location, cinema_name},
                                        function (err, results) {
                                            if (err)
                                                return next(err);
                                            else {
                                                res.status(200).json({
                                                    err: null,
                                                    msg: 'Cinema Owner added Successfully.',
                                                    data: results
                                                });
                                            }
                                        });

                                });
                            });
                        });
                    });
            });
        });
    });
};


//------------------------- Edit Cinema owners -------------------------------

module.exports.editCinemaOwner = function (req, res, next) {
    let username = req.body.username,
        user = 'select * from admins where username = ? AND type = "Cinema Owner"';
    
    database.query(user, [username], function (err, results) {
        if (err) return next(err);
        if (results.length > 0) {
            let email = req.body.email,
                salary = req.body.salary,
                type = req.body.type,
                phone_number = req.body.phone_number;
            if (!email) {
                email = results[0].email;
            }
            if (!salary) {
                salary = results[0].salary;
            }
            if (!type) {
                type = results[0].type;
            }
            if (!phone_number) {
                phone_number = results[0].phone_number;
            }
            let query = 'UPDATE admins SET email = ?, salary = ?, type = ?, phone_number = ? where username = ? AND type = "Cinema Owner"';
            database.query(query, [email, salary, type, phone_number, username], function (err, results) {
                if (err) return next(err);
                return res.send(results);
            });
        }
        else {
            res.status(200).json({
                err: null,
                msg: "wrong username or invalid admin type",
                success: false
            });
        }
    });
};

//------------------------- Delete Cinema owners -------------------------------

module.exports.deleteCinemaOwner = function (req, res, next) {
    let username = req.body.username,
        user = 'select * from admins where username = ? AND type = "Cinema Owner"';
    database.query(user, [username], function (err, results) {
        if (err) return next(err);

        if (results.length > 0) {
            let queryDeleteAdminCinemas = 'DELETE FROM admins_cinemas where admin = ?';
            database.query(queryDeleteAdminCinemas, [username], function (err) {
                if (err) return next(err);
            });
            let queryDeleteAdmins = 'DELETE FROM admins where username = ? AND type = "Cinema Owner"';
            database.query(queryDeleteAdmins, [username], function (err, results) {
                if (err) return next(err);
                return res.send(results);
            });
        }
        else {
            res.status(200).json({
                err: null,
                msg: "wrong username or invalid admin type",
                success: false
            });
        }
    });
};

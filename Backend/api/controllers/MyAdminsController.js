//OUR DATABASE IS HERE
let database = require('../config/db-connection'),
    config = require('../config/config'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    Validations = require('../utils/validations');

//User stories related to the MyAdmins should be implemented here
//DONT FORGET TO ADD IT IN THE ROUTES

//------------------------- Admin Login -----------------------------------
/*
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
    var query = 'SELECT * FROM admins WHERE username = ?';
    database.query(query,[username], function(err, results, fields) {
    if(err) return next(err); 
    if(results.length > 0) { 
        var admin = {
        username: results[0].username,
        password: results[0].password,
        email: results[0].email,
        salary: results[0].salary,
        type: results[0].type,
        first_name: results[0].first_name,
        last_name: results[0].last_name,
        phone_number: results[0].phone_number,
        gender: results[0].gender,
    }
    bcrypt.compare(password, results[0].password, function(err, isMatch){
        if(isMatch){
            if (results[0].active==true){
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
            msg: "please Verify the account",
            success: false
            });
        }
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
        msg: "Wrong Username",
        success: false
        });
    }
    });
}
*/
//------------------------- View all admins -------------------------------

module.exports.getAdmins = function(req, res, next){

    console.log("Entered getAdmins");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        username = req.query['username'];

    console.log(req.query['username']);

    if(!username){

        return res.status(422).json({
            err: null,
            msg: 'Username is required',
            data: null
        });

    }
    
// To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Booking Usher'"+
    " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location";
    
    
    //query = database.format(query);    
    database.query(query, username , function (err, rows) {
        
        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if(totalCount == 0){

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
        
        let query = "select DISTINCT A.* from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Booking Usher'"+
        " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location limit ? OFFSET ?"
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [username , limitNum, startNum];
        
        database.query(query, table , function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Admins have been successfully retrived"
                });
            }
        });
    });
    // var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username";
    // database.query(query, function(err, results, fiels) {
        // if(err) return next(err);
        // console.log(results);
        // return res.send(results);
    // });
}

// module.exports.viewAdmins = function(req, res, next){
//     var query = "select cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username";
//     database.query(query, function(err, results, fiels) {
//         if(err) return next(err);
//         console.log(results);
//         return res.send(results);
//     });
// }

//------------------------- Show Admins working in a certain Cinema -------------------------------

// module.exports.getAdmin = function(req, res, next){
//     var cinema_name = req.body.cinema_name;
//     console.log(req);
//     var query = "select cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND cinema_name LIKE ?";
//     database.query(query, '%'+[cinema_name]+'%', function(err, results, fiels) {
//         if(err) return next(err);
//         //console.log(results);
//         return res.send(results);
//     });
// }

//------------------------- View all Users -------------------------------



























//------------------------- View all Booking ushers -------------------------------

module.exports.viewBookingUshers = function(req, res, next){
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit;

// To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas C, admins A where C.admin = A.username";
    query = database.format(query);

    database.query(query, function (err, rows) {
        if (err) {
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if(totalCount == 0){

            res.status(200).json({
                err: null,
                msg: 'No admins available',
                data: rows
            });

        }
        if (start === '' || limit === '') {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            errMsg = "No Limits were provided";
            
        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        let query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher' DESC limit ? OFFSET ?";
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [limitNum, startNum];
        query = database.format(query, table);
        database.query(query, function (err, rest) {
            if (err) {
                res.json(err);
                return next(err);

            } else {
                return res.status(200).json({
                    "Total Count": totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Booking ushers have been successfully retrived"
                });
            }
        });
    });

    // var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher'";
    // database.query(query, function(err, results, fiels) {
    //     if(err) return next(err);
    //     console.log(results);
    //     return res.send(results);
    // });
}

//------------------------- Add Booking ushers -------------------------------
module.exports.addBookingUsher = function(req,res,next){
    var username = req.body.username;
    var email = req.body.email;
    var salary = req.body.salary;
    var type = "Booking Usher"; 
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var phone_number = req.body.phone_number;
    var gender = req.body.gender;
   // var cinema_location = req.body.cinema_location;
    var cinema_name = req.body.cinema_name;
    
    var adminsInsertionQuery = 'INSERT INTO admins SET ?';
    var hashed_password ;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) return next(err);
            hashed_password= hash; 
            var admin={
                username:username,
                password:hashed_password,
                email:email,
                salary:salary,
                type:type,
                first_name:first_name,
                last_name:last_name,
                phone_number:phone_number,
                gender:gender
               }
            
                database.query(adminsInsertionQuery,admin, function (error, results, fields) {
                    if(err) return next(err);
                    return res.send(results);
                    });
                    database.query('select * from cinemas where name = ?', cinema_name, function(err, res, fields){
                        if(err) return next(err)
                        if(res.length > 0){
                            var admin_cinema = {
                                admin: username,
                                cinema_name: cinema_name,
                                cinema_location: res[0].location
                          };
                        var cinemaAdminInsertionQuery = "INSERT INTO admins_cinemas (admin, cinema_location, cinema_name) VALUES('" + admin_cinema.admin + "', '" + admin_cinema.cinema_location + "', '" + admin_cinema.cinema_name + "')";
                        console.log("tested")
                        database.query(cinemaAdminInsertionQuery, function(err, results, fields) {
                        if(err) return next(err);
                       // return res.send(results);
                        });
                        }
                        else {
                            res.status(200).json({
                            err: null,
                            msg: "wrong cinema name",
                            success: false
                            });
                        }
                    });
             });   
        });          
}


//------------------------- Edit Booking ushers -------------------------------

module.exports.getBookingUshers = function(req, res, next){

    console.log("Entered getBookingUshers");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        username = req.query['username'];

    console.log(req.query['username']);

    if(!username){

        return res.status(422).json({
            err: null,
            msg: 'Username is required',
            data: null
        });

    }
    
// To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Booking Usher'"+
    " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location";
    
    
    //query = database.format(query);    
    database.query(query, username , function (err, rows) {
        
        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if(totalCount == 0){

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
        
        let query = "select DISTINCT A.* from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Booking Usher'"+
        " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location limit ? OFFSET ?"
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [username , limitNum, startNum];
        
        database.query(query, table , function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Booking Ushers have been successfully retrived"
                });
            }
        });
    });
    //var uname = req.body['uname'];
    //console.log(uname);
    // var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher'";
    // // var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher' AND cinema_name = (select cinema_name from admins_cinemas where admin = ?"+" AND cinema_name = C.cinema_name GROUP BY cinema_name)";
    // database.query(query, function(err, results, fiels) {
    //     if(err) return next(err);
    //     console.log(results);
    //     return res.send(results);
    // });
}
// module.exports.getBookingUsher = function(req, res, next){


//     var cinema_name = req.body.cinema_name;

//     console.log("Entered getBookingUshers");
//     var pagination = true; // boolean for checking if the user entered limits for pagination or not
//     var errMsg = null;

//     var start = req.query.start;
//     var limit = req.query.limit;
    
// // To calculate Total Count use MySQL count function
//     let query = "Select count(*) as TotalCount from admins_cinemas C, admins A where C.admin = A.username AND A.type = 'Booking Usher'";
    
//     //query = database.format(query);    
//     database.query(query, function (err, rows) {
        
//         if (err) {
//             console.log("err");
//             return err;
//         }

//         let startNum,
//             limitNum;

//         let totalCount = rows[0]['TotalCount'];
//         if(totalCount == 0){

//             return res.status(200).json({
//                 err: null,
//                 msg: 'No admins available',
//                 data: rows
//             });

//         }
//         if (start === '' || limit === '' || !start || !limit) {
//             // In case no limits entered.
//             startNum = 0;
//             limitNum = 10;
//             pagination = false;
//             errMsg = "No Limits were provided";
//             console.log("No limits");
            
//         } else {
//             startNum = parseInt(start);
//             limitNum = parseInt(limit);
//         }
        
//         let query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher'";
//         //Mention table from where you want to fetch records example-users & send limit and start
//         let table = [limitNum, startNum];
        
//         database.query(query, table , function (err, rest) {
//             if (err) {
//                 return next(err);
//             } else {
//                 res.status(200).json({
//                     totalCount: totalCount,
//                     data: rest,
//                     err: errMsg,
//                     msg: "Booking Usher has been successfully retrived"
//                 });
//             }
//         });
//     });
//     // var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher' AND cinema_name like ?";
//     // database.query(query, '%'+[cinema_name]+'%', function(err, results, fiels) {
//     //     if(err) return next(err);
//     //     console.log(results);
//     //     return res.send(results);
//     // });
// }

module.exports.editBookingUsher = function(req, res, next){
    var username = req.body.username;
    var user = 'select * from admins where username = ? AND type = "Booking Usher"';
    database.query(user, [username], function(err, results, fiels) {
        //console.log("tested");
        if(err) return next(err);
        if(results.length > 0){
            var email = req.body.email;
            var salary = req.body.salary;
            var type = req.body.type;
            var phone_number = req.body.phone_number;
            if(!email){
                email = results[0].email;
            }
            if(!salary){
                salary = results[0].salary;
            }
            if(!type){
                type = results[0].type;
            }
            if(!phone_number){
                phone_number = results[0].phone_number;
            }
            var query = 'UPDATE admins SET email = ?, salary = ?, type = ?, phone_number = ? where username = ? AND type = "Booking Usher"';
            database.query(query, [email, salary, type, phone_number, username], function(err, results, fiels) {
            if(err) return next(err);
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
}
//------------------------- Delete Booking ushers -------------------------------

module.exports.deleteBookingUsher = function(req, res, next){
    var username = req.body.username;
    var user = 'select * from admins where username = ? AND type = "Booking Usher"';
    database.query(user, [username], function(err, results, fiels) {
        if(err) return next(err);
        if(results.length > 0){
            var query = 'DELETE FROM admins_cinemas where admin = ?';
            database.query(query, [username], function(err, results, fiels) {
            if(err) return next(err);
            });
            var query = 'DELETE FROM admins where username = ? AND type = "Booking Usher"';
            database.query(query, [username], function(err, results, fiels) {
            if(err) return next(err);
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
}

//------------------------- View all Branch managers -------------------------------

module.exports.viewBranchManagers = function(req, res, next){
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Branch Manager'";
    database.query(query, function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}


//------------------------- Add Branch managers -------------------------------
module.exports.addBranchManager = function(req,res,next){

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
        adminUserName,
        admin;

    var adminsInsertionQuery = 'INSERT INTO admins SET ?';

    //getting the username of the currently logged in admin
    var tokenHeader = req.headers['authorization'];
    if (typeof tokenHeader !== 'undefined') {
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var decoded = jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                return res.status(401).json({
                    err: err,
                    msg: 'no username in headers token.',
                    data: null
                });
            }
            else
                adminUserName = authData.username;
        });
    }

    //checking for null values or not entered data
    if(!newBranchManagerUsername) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }

    if(!password) {
        return res.status(422).json({
            err: null,
            msg: 'Password is required.',
            data: null
        });
    }

    if(!email) {
        return res.status(422).json({
            err: null,
            msg: 'Email is required.',
            data: null
        });
    }

    if(!salary) {
        return res.status(422).json({
            err: null,
            msg: 'Salary is required.',
            data: null
        });
    }

    if(!first_name) {
        return res.status(422).json({
            err: null,
            msg: 'First name is required.',
            data: null
        });
    }

    if(!last_name) {
        return res.status(422).json({
            err: null,
            msg: 'Last name is required.',
            data: null
        });
    }

    if(!gender) {
        return res.status(422).json({
            err: null,
            msg: 'Gender is required.',
            data: null
        });
    }

    if(!cinema_name) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Name is required.',
            data: null
        });
    }

    if(!cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Location is required.',
            data: null
        });
    }

    //Valdiations for correct data types

    if(!Validations.isNumber(phone_number)) {
        return res.status(422).json({
            err: null,
            msg: 'Phone number must be numbers only.',
            data: null
        });
    }

    if(!Validations.isNumber(salary)) {
        return res.status(422).json({
            err: null,
            msg: 'Salary must be numbers only.',
            data: null
        });
    }

    if(!Validations.isString(first_name) || !Validations.isString(last_name)) {
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
    });

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

    });

    //Verify that this admins user belongs to this cinema
    
    database.query('SELECT * FROM admins_cinemas c  WHERE c.cinema_name = ? AND c.cinema_location = ? AND c.admin = ?',
        [cinema_name, cinema_location, username],function (error, results) {
            if (error) {
                return next(error);
            }
            console.log(results + "This Admin user doesn't belong to this cinema");
            if(!results || !results.length) {
                return res.status(404).json({
                    err: null,
                    msg: "You don't belong to this cinema.",
                    data: null
                });
            }
    });
    
    
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) {
                return next(err);
            }
            hashed_password = hash; 
        });   
    });

    admin = {
        username:username,
        password:hashed_password,
        email:email,
        salary:salary,
        type:type,
        first_name:first_name,
        last_name:last_name,
        phone_number:phone_number,
        gender:gender
    }

    let sqlQuery = 'INSERT INTO admins (username,password,email,salary,type,first_name,last_name,phone_number,gender) VALUES ?';
    database.query(sqlQuery, [admin], function (err, results) {
        if (err) {
            return next(err);
        }
        else{

            sqlQuery = 'INSERT INTO admins_cinemas (admin,cinema_location,cinema_name) VALUES ?'
            database.query(sqlQuery, [username,cinema_location,cinema_name] ,function (err, results) {
                if(err)
                    return next(err);
                else{
                    res.status(200).json({
                        err: null,
                        msg: 'Branch manager added Successfully.',
                        data: results
                    });
                }
            });
            
        }
        
    });
     
}




//------------------------- Edit Branch managers -------------------------------

module.exports.getBranchManagers = function(req, res, next){

    console.log("Entered getBranchManagers");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        username = req.query['username'];

    console.log(req.query['username']);
    if(!username){

        return res.status(422).json({
            err: null,
            msg: 'Username is required',
            data: null
        });

    }
    
// To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Branch Manager'"+
    " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location";
    
    
    //query = database.format(query);    
    database.query(query, username , function (err, rows) {
        
        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if(totalCount == 0){

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
        
        let query = "select DISTINCT A.* from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Branch Manager'"+
        " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location limit ? OFFSET ?"
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [username , limitNum, startNum];
        
        database.query(query, table , function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Branch Managers have been successfully retrived"
                });
            }
        });
    });
    // var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Branch Manager'";
    // database.query(query, function(err, results, fiels) {
    //     if(err) return next(err);
    //     console.log(results);
    //     return res.send(results);
    // });
}

// module.exports.getBranchManager = function(req, res, next){
//     var cinema_name = req.body.cinema_name;
//     var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Branch Manager' AND cinema_name like ?";
//     database.query(query, '%'+[cinema_name]+'%', function(err, results, fiels) {
//         if(err) return next(err);
//         console.log(results);
//         return res.send(results);
//     });
// }
module.exports.editBranchManager = function(req, res, next){
    var username = req.body.username;
    var user = 'select * from admins where username = ? AND type = "Branch Manager"';
    database.query(user, [username], function(err, results, fiels) {
        console.log("tested");
        if(err) return next(err);
        if(results.length > 0){
            var email = req.body.email;
            var salary = req.body.salary;
            var type = req.body.type;
            var phone_number = req.body.phone_number;
            if(!email){
                email = results[0].email;
            }
            if(!salary){
                salary = results[0].salary;
            }
            if(!type){
                type = results[0].type;
            }
            if(!phone_number){
                phone_number = results[0].phone_number;
            }
            var query = 'UPDATE admins SET email = ?, salary = ?, type = ?, phone_number = ? where username = ? AND type = "Branch Manager"';
            database.query(query, [email, salary, type, phone_number, username], function(err, results, fiels) {
            if(err) return next(err);
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
}

//------------------------- Delete Branch managers -------------------------------


module.exports.deleteBranchManager = function(req, res, next){
    var username = req.body.username;
    var user = 'select * from admins where username = ? AND type = "Branch Manager"';
    database.query(user, [username], function(err, results, fiels) {
        if(err) return next(err);
        if(results.length > 0){
            var query = 'DELETE FROM admins_cinemas where admin = ?';
            database.query(query, [username], function(err, results, fiels) {
            if(err) return next(err);
            });
            var query = 'DELETE FROM admins where username = ? AND type = "Branch Manager"';
            database.query(query, [username], function(err, results, fiels) {
            if(err) return next(err);
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
}

//------------------------- View all Cinema owners -------------------------------



























//------------------------- Add Cinema owners -------------------------------


// module.exports.viewCinemaOwners = function(req, res, next){
//     var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, lastName, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Cinema Owner'";
//     database.query(query, function(err, results, fiels) {
//         if(err) return next(err);
//         console.log(results);
//         return res.send(results);
//     });
// }

//------------------------- Edit Cinema owners -------------------------------

module.exports.getCinemaOwners = function(req, res, next){

    console.log("Entered getCinemaOwners");

    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        username = req.query['username'];

    console.log(req.query['username']);

    if(!username){

        return res.status(422).json({
            err: null,
            msg: 'Username is required',
            data: null
        });

    }
    
// To calculate Total Count use MySQL count function
    let query = "Select count(*) as TotalCount from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Cinema Owner'"+
    " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location";
    
    //query = database.format(query);    
    database.query(query, username , function (err, rows) {
        
        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if(totalCount == 0){

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
        
        let query = "select DISTINCT A.* from admins_cinemas C1 , admins_cinemas C2, admins A WHERE C1.admin = A.username AND A.type = 'Cinema Owner'"+
        " AND C2.admin = ? AND C2.cinema_name = C1.cinema_name AND C2.cinema_location = C1.cinema_location limit ? OFFSET ?"
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [username , limitNum, startNum];
        
        database.query(query, table , function (err, rest) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Cinema Owners have been successfully retrived"
                });
            }
        });
    });
    // var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Cinema Owner'";
    // database.query(query, function(err, results, fiels) {
    //     if(err) return next(err);
    //     console.log(results);
    //     return res.send(results);
    // });
}


// module.exports.getCinemaOwner = function(req, res, next){
//     var cinema_name = req.body.cinema_name;
//     var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Cinema Owner' AND cinema_name like ?";
//     database.query(query, '%'+[cinema_name]+'%', function(err, results, fiels) {
//         if(err) return next(err);
//         console.log(results);
//         return res.send(results);
//     });
// }

module.exports.editCinemaOwner = function(req, res, next){
    var username = req.body.username;
    var user = 'select * from admins where username = ? AND type = "Cinema Owner"';
    database.query(user, [username], function(err, results, fiels) {
        if(err) return next(err);
        if(results.length > 0){
            var email = req.body.email;
            var salary = req.body.salary;
            var type = req.body.type;
            var phone_number = req.body.phone_number;
            if(!email){
                email = results[0].email;
            }
            if(!salary){
                salary = results[0].salary;
            }
            if(!type){
                type = results[0].type;
            }
            if(!phone_number){
                phone_number = results[0].phone_number;
            }
            var query = 'UPDATE admins SET email = ?, salary = ?, type = ?, phone_number = ? where username = ? AND type = "Cinema Owner"';
            database.query(query, [email, salary, type, phone_number, username], function(err, results, fiels) {
            if(err) return next(err);
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
}

//------------------------- Delete Cinema owners -------------------------------

module.exports.deleteCinemaOwner = function(req, res, next){
    var username = req.body.username;
    var user = 'select * from admins where username = ? AND type = "Cinema Owner"';
    database.query(user, [username], function(err, results, fiels) {
        if(err) return next(err);
        if(results.length > 0){
            var query = 'DELETE FROM admins_cinemas where admin = ?';
            database.query(query, [username], function(err, results, fiels) {
            if(err) return next(err);
            });
            var query = 'DELETE FROM admins where username = ? AND type = "Cinema Owner"';
            database.query(query, [username], function(err, results, fiels) {
            if(err) return next(err);
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
}

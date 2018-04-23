//OUR DATABASE IS HERE
var database = require('../config/db-connection');
var config = require('../config/config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


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
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username";
    database.query(query, function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}


























module.exports.viewAdmins = function(req, res, next){
    var query = "select cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username";
    database.query(query, function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}

//------------------------- Show Admins working in a certain Cinema -------------------------------

module.exports.getAdmin = function(req, res, next){
    var cinema_name = req.body.cinema_name;
    console.log(req);
    var query = "select cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND cinema_name LIKE ?";
    database.query(query, '%'+[cinema_name]+'%', function(err, results, fiels) {
        if(err) return next(err);
        //console.log(results);
        return res.send(results);
    });
}

//------------------------- View all Users -------------------------------



























//------------------------- View all Booking ushers -------------------------------

module.exports.viewBookingUshers = function(req, res, next){
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher'";
    database.query(query, function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
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
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher'";
    database.query(query, function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}
module.exports.getBookingUsher = function(req, res, next){
    var cinema_name = req.body.cinema_name;
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Booking Usher' AND cinema_name like ?";
    database.query(query, '%'+[cinema_name]+'%', function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}

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




//------------------------- Edit Branch managers -------------------------------

module.exports.getBranchManagers = function(req, res, next){
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Branch Manager'";
    database.query(query, function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}

module.exports.getBranchManager = function(req, res, next){
    var cinema_name = req.body.cinema_name;
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Branch Manager' AND cinema_name like ?";
    database.query(query, '%'+[cinema_name]+'%', function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}
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


module.exports.viewCinemaOwners = function(req, res, next){
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, lastName, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Cinema Owner'";
    database.query(query, function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}

//------------------------- Edit Cinema owners -------------------------------

module.exports.getCinemaOwners = function(req, res, next){
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Cinema Owner'";
    database.query(query, function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}
module.exports.getCinemaOwner = function(req, res, next){
    var cinema_name = req.body.cinema_name;
    var query = "select DISTINCT cinema_name, username, email, type, salary, first_name, last_name, phone_number, gender from admins_cinemas C, admins A where C.admin = A.username AND type = 'Cinema Owner' AND cinema_name like ?";
    database.query(query, '%'+[cinema_name]+'%', function(err, results, fiels) {
        if(err) return next(err);
        console.log(results);
        return res.send(results);
    });
}

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

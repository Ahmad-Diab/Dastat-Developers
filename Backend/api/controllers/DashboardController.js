/**
 * A Controller, having the functions to handle all dashboard's requirements.
 */
let database = require('../config/db-connection');

module.exports.getAdminCount = function(req,res,next){

    console.log("Entered getAdminCount");

    let query = 'Select count(*) as TotalCount FROM admins',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            console.log(err);
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Admins retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getCinemaOwnerCount = function(req,res,next){

    console.log("Entered getCinemaOwnerCount");
    let query = 'Select count(*) as TotalCount FROM admins WHERE type = "Cinema Owner"',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Cinema Owners retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getBranchManagerCount = function(req,res,next){

    console.log("Entered getBranchManagerCount");
    let query = 'Select count(*) as TotalCount FROM admins WHERE type = "Branch Manager"',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Branch Managers retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getBookingUsherCount = function(req,res,next){

    console.log("Entered getBranchManagerCount");
    let query = 'Select count(*) as TotalCount FROM admins WHERE type = "Booking Usher"',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Booking Ushers retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getCinemaCount = function(req,res,next){

    console.log("Entered getCinemaCount");
    let query = 'Select count(*) as TotalCount FROM cinemas',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Cinemas retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getCinemasInRegionsCount = function(req,res,next){

    console.log("Entered getCinemasInRegionsCount");
    let query = 'Select location , COUNT(name) as Count FROM cinemas GROUP BY location';
        
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            return res.status(200).json({
                err: null,
                msg: 'Number of cinemas in regions retrieved successfully.',
                data: rows
            });
        }
    });
};

module.exports.getMoviesPlayedCount = function(req,res,next){

    console.log("Entered getMoviesPlayedCount");
    let query = 'Select DISTINCT count(m.movie_id) as TotalCount FROM movies m , halls h WHERE m.movie_id = h.movie',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Played Movies retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getTicketsCount = function(req,res,next){

    console.log("Entered getTicketsCount");
    let query = 'Select count(*) as TotalCount FROM tickets',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Reserved Tickets retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getTicketsInRegionsCount = function(req,res,next){

    console.log("Entered getTicketsInRegionsCount");
    let query = 'Select cinema_location , COUNT(reservation_id) as Count FROM tickets GROUP BY cinema_location';
        
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            return res.status(200).json({
                err: null,
                msg: 'Number of Reserved Tickets in regions retrieved successfully.',
                data: rows
            });
        }
    });
};

module.exports.getUsersCount = function(req,res,next){

    console.log("Entered getUsersCount");
    let query = 'Select count(*) as TotalCount FROM users',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of users retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getPaidTicketsCount = function(req,res,next){

    console.log("Entered getPaidTicketsCount");
    let query = 'Select count(*) as TotalCount FROM tickets WHERE payment = 1',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Paid Reserved Tickets retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getUnpaidTicketsCount = function(req,res,next){

    console.log("Entered getUnpaidTicketsCount");
    let query = 'Select count(*) as TotalCount FROM tickets WHERE payment = 0',
        totalCount;
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            totalCount = rows[0]['TotalCount'];
            return res.status(200).json({
                err: null,
                msg: 'Number of Paid Reserved Tickets retrieved successfully.',
                data: totalCount
            });
        }
    });
};

module.exports.getTop10ReservedMovies = function(req,res,next){

    console.log("Entered getTop10ReservedMovies");
    let query = 'Select m.title , count(t.reservation_id) as TicketsCount FROM tickets t , halls h , movies m  '
    +'WHERE h.hall_number = t.hall AND h.cinema_name = t.cinema_name AND h.cinema_location = t.cinema_location AND h.movie = m.movie_id GROUP BY m.title ORDER By TicketsCount DESC LIMIT 10 ';
        
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            
            return res.status(200).json({
                err: null,
                msg: 'Top 10 Reserved Movies retrieved successfully.',
                data: rows
            });
        }
    });
};

module.exports.getTopReservedMovie = function(req,res,next){

    console.log("Entered getTopReservedMovie");
    let query = 'Select m.title , count(t.reservation_id) as TicketsCount FROM tickets t , halls h , movies m  '
    +'WHERE h.hall_number = t.hall AND h.cinema_name = t.cinema_name AND h.cinema_location = t.cinema_location AND h.movie = m.movie_id GROUP BY m.title ORDER By TicketsCount DESC LIMIT 1 ';
        
    database.query(query , function (err, rows) {
        if(err){
            return next(err);
        }
        else{
            
            return res.status(200).json({
                err: null,
                msg: 'Top Reserved Movie retrieved successfully.',
                data: rows
            });
        }
    });
};




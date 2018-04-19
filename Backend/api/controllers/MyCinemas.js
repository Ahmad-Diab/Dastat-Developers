// OUR DATABASE IS HERE
var database = require('../config/db-connection');






////////////////////////////////////////// DON'T FORGET TO USE MODULE EXPORT ////////////////////////////////////////



////////////////////////////////////////////// VIEW ALL CINEMAS MODULES //////////////////////////////////////////////


















////////////////////////////////////////////// ADD ALL CINEMAS MODULES //////////////////////////////////////////////
module.exports.addCinema = function(req,res,next){

    var 
        location = req.body['location'],
        address = req.body['address'],
        name = req.body['name'],
        number_of_halls = req.body['number_of_halls'],
        is3D = req.body['is3D'],
        is4D = req.body['is4D'],
        company = req.body['company'],
        imagePath = req.body['imagePath'],
        imagePath2 = req.body['imagePath2'];

    var query = 'INSERT INTO cinemas (location,address,name,number_of_halls,is3D,is4D,company,imagePath,imagePath2) VALUES (?,?,?,?,?,?,?,?,?)';

    database.query(query,[location,address,name,number_of_halls,is3D,is4D,company,imagePath,imagePath2],function(error, results, fields){
        if(error){
            return next(error);  
        } 
        return res.status(200).json({
            err: null,
            msg: 'The cinema is added successfully.',
            data: results
        });
    });
}
















////////////////////////////////////////////// EDIT ALL CINEMAS MODULES //////////////////////////////////////////////


















////////////////////////////////////////////// DELETE ALL CINEMAS MODULES //////////////////////////////////////////////

module.exports.deleteCinemaForAdmin = function(req, res, next){
    var cinema = req.params.cinema;
    var owner = req.params.owner;
    database.query('DELETE FROM TABLE admins_cinemas WHERE admin = ? AND cinema_name = ?', [owner, cinema], function(error, results, fields){
        if(error) return next(error);
        return res.send(results);
    } );
}

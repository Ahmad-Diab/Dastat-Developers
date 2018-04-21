// OUR DATABASE IS HERE
var database = require('../config/db-connection');






////////////////////////////////////////// DON'T FORGET TO USE MODULE EXPORT ////////////////////////////////////////



////////////////////////////////////////////// VIEW ALL CINEMAS MODULES //////////////////////////////////////////////


















////////////////////////////////////////////// ADD ALL CINEMAS MODULES //////////////////////////////////////////////


















////////////////////////////////////////////// EDIT ALL CINEMAS MODULES //////////////////////////////////////////////


















////////////////////////////////////////////// DELETE ALL CINEMAS MODULES //////////////////////////////////////////////

module.exports.deleteCinemaForAdmin = function(req, res, next){
    var cinema = req.params.cinema;
    var owner = req.params.owner;
    database.query('DELETE FROM admins_cinemas WHERE admins_cinemas.admin = ? AND admins_cinemas.cinema_name = ?', [owner, cinema], function(error, results, fields){
        if(error) return next(error);
        // console.log("HERE!");
        res.status(200).json({
            err : null,   
            msg : "Deleted Sucessfully!",
            data : results
          });
    } );
}

var database = require('../config/db-connection');

// Promocodes Controller should be implemented here


/**
 * Retrieves the promocode with its type, amount, and in which cinema
 * 
 * @param {*} req 
 * @param {*} res Contains the property data that consist of the promocode results
 * @param {*} next 
 */
module.exports.viewPromocodes = function(req,res,next){
    database.query('SELECT * FROM promocodes p INNER JOIN promocodes_cinemas c ON p.promocode = c.promocode', function(error, results, fields){
        if(error) return next(error);
                res.status(200).json({
                    err : null,   
                    msg : "All promocodes are retrieved",
                    data : results
                });
    });   
}


/**
 * A function to handle the assignment of a promocode to a certain cinema
 * by the app owner
 * @param req, required data for processing the request of assigning a promocode to a certain cinema
 * @param res, results of changes on the promocodes_cinemas table in database
 * @param next, next middleware to handle errors
 */
module.exports.assignPromoCodeToCinema = function(req, res, next){
    var promoCode = req.body["promocode"];
    var cinemaName = req.body["cinema_name"];
    var cinemaLocation = req.body["cinema_location"];
    database.query('INSERT INTO promocodes_cinemas (cinema_location,cinema_name,promocode) VALUES(?,?,?)',[cinemaLocation,cinemaName,promoCode] ,function (error, results, fields) {
      if(error) return next(error);
      return res.status(200).json({
        err: null,
        msg: 'Promocode had been assigned successfully.',
        data: results,
      });
    });
  };

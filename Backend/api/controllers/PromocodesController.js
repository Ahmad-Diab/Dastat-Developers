var database = require('../config/db-connection');

// Promocodes Controller should be implemented here

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
        msg: 'Booking Request has been completed successfully.',
        data: results,
      });
    });
  };
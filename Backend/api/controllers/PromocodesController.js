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



var database = require('../config/db-connection');
var Validations = require('../utils/validations');
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
module.exports.assignPromocodeToCinema = function(req, res, next){
    var promocode = req.body["promocode"]; //storing the value of column promocode in variable promocode
    var cinemaName = req.body["cinema_name"]; //storing the value of column cinema_name in variable cinemaName 
    var cinemaLocation = req.body["cinema_location"]; //storing the value of column cinema_location in variable cinemaLocation  
    //Adding same validity checks to make sure user enter data in right format
    if(!Validations.isString(promocode)){
      return res.status(422).json({
        err: null,
        msg: 'Provided promocode must be of type String.',
        data: null
      });
    }
    if(!Validations.isString(cinemaName)){
      return res.status(422).json({
        err: null,
        msg: 'Provided cinema name must be of type String.',
        data: null
      });
    }
    if(!Validations.isString(cinemaLocation)){
      return res.status(422).json({
        err: null,
        msg: 'Provided cinema location must be of type String.',
        data: null
      });
    }
    //NULL Checker
    if(!promocode) {
      return res.status(422).json({
          err: null,
          msg: 'promocode is required.',
          data: null
      });
    }
    if(!cinemaLocation) {
      return res.status(422).json({
          err: null,
          msg: 'Cinema location is required.',
          data: null
      });
    }
    if(!cinemaName) {
      return res.status(422).json({
          err: null,
          msg: 'Cinema name is required.',
          data: null
      });
    }
    //this query is to handle if promocode user trying to add is already there
    database.query('SELECT * FROM promocodes_cinemas WHERE promocode = ? AND cinema_name = ? AND cinema_location = ?',[promocode,cinemaName,cinemaLocation],function(error, results, fields){
      if(error) return next(error);
      if(results.length > 0) return res.status(200).json({
        err : null,
        msg : 'Promocode already added!',
        data : null,
      })
      //Inserting into promocodes_cinemas table to complete the assignment of promocode to cinema
      database.query('INSERT INTO promocodes_cinemas (cinema_location,cinema_name,promocode) VALUES(?,?,?)',[cinemaLocation,cinemaName,promocode] ,function (error, results, fields) {
        if(error) return next(error); //security check outputing 404 NOT FOUND if an error occurred
        return res.status(200).json({ //returning a status 200 OK to acknowledge the user of successfull process
          err: null,
          msg: 'Promocode had been assigned successfully.',
          data: results,
        });
      });
    })
    
  };



/**
 * A function to handle editing a certain promocode by the app owner
 * @param req, required data for processing the request of editing a certain promocode
 * @param res, results of changes on the promocodes table in database
 * @param next, next middleware to handle errors
 */
module.exports.editPromocode = function(req,res,next){

  var promocode = req.params.promocode;//storing the value of column promocode in variable promocode
  var type = req.body.type;//storing the type of promocode in variable type
  var value = req.body.value;//storing the value of promocode in variable value

  //Update into promocodes table to complete editing a certain promocode
  database.query('Update promocodes Set type = ?, value = ? where promocode = ?',[type,value,promocode], function(error, results, fields){
      if(error) return next(error); //security check outputing 404 NOT FOUND if an error occurred
              res.status(200).json({ //returning a status 200 OK to acknowledge the user of successfull process
                  err : null,   
                  msg : "Promocode Successfully edited",
                  data : results
              });
  });   
}
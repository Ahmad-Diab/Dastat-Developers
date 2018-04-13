var database = require('../config/db-connection');


module.exports.addMovie = function(req,res,next){
   var sql = "INSERT INTO Movies VALUES ?"; 
   var values = [];  //TODO HTTP REQUEST FROM FRONT END WITH VALUES OF INSERTION

    database.query(sql,[values],function(err,results,field){
        if(err) throw err;

        res.status(200).json({
            err : null,   
            msg : "Info succussfully retreived",
            data : results
          });

    })

}

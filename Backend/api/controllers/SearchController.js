var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.searchByKeyWord = function(req,res,next){
    database.query('SELECT * FROM cinemas', function(error,result,fields){
        if(error){ 
            return next(error);
            console.log("hoba");
        }
        return res.send(result);
    }); 
}

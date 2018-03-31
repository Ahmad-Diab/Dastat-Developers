var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.searchByKeyWord = function(req,res,next){
    database.query('select * from cinemas where name = req.params', function(error,result){
        if(error) return next(error);
        return res.send(result);
    }); 
}

var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.searchByKeyWord = function(req,res,next){
    var where = req.params.searchKeyWord;
    var sql = 'SELECT * FROM cinemas WHERE number_of_halls = ' + database.escape(where);
    database.query(sql, function(error, result, fields){
        if(error) return next(error);
        return res.send(result);
    }); 
}

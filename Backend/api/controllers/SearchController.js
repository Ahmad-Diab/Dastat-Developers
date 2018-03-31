var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.searchByKeyWord = function(req,res,next){
    var searchKeyN = req.params.searchKeyWord;
    var searchKeyS = req.params.searchKeyWord + '%';
    var sql = "SELECT * FROM Cinemas WHERE number_of_halls = ? OR name LIKE ?";
    database.query(sql, [searchKeyN,searchKeyS], function(error, result, fields){
        if(error) return next(error);
        return res.send(result);
    }); 
}

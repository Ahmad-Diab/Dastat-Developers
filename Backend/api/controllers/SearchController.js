var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.searchByKeyWord = function(req,res,next){
    var searchKeyS = req.params.searchKeyWord + '%';
    var sql = "SELECT * FROM Cinemas WHERE name LIKE ? OR company LIKE ? OR location LIKE ?";
    database.query(sql, [searchKeyS,searchKeyS,searchKeyS], function(error, result, fields){
        if(error) return next(error);
        return res.send(result);
    }); 
}

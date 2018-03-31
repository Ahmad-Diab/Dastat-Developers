var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.searchByKeyWord = function(req,res,next){
    var searchKeyN = req.params.searchKeyWord;
    var searchKeyS = req.params.searchKeyWord + '%';
    var sql = 'SELECT title,genre,imagePath,year,rating FROM Movies WHERE title LIKE ? OR genre LIKE ? OR cast LIKE ? OR year = ?';
    database.query(sql, [searchKeyS,searchKeyS,searchKeyS,searchKeyN,searchKeyN], function(error, result, fields){
        if(error) return next(error);
        return res.send(result);
    }); 
}

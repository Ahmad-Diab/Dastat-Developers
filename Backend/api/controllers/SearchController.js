var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.searchByKeyWord = function(req,res,next){
    var searchKeyS = req.params.searchKeyWord + '%';
    var searchKeyN = req.params.searchKeyWord;
    var sql = 'SELECT title,genre,imagePath,year,rating FROM Movies WHERE title LIKE ? OR genre LIKE ? OR cast LIKE ? OR year = ?';
    var sql = "SELECT * FROM Cinemas WHERE name LIKE ? OR company LIKE ? OR location LIKE ?";
    var resultCinema;
    var resultMovie;
    database.query(sql, [searchKeyS,searchKeyS,searchKeyS,searchKeyN,searchKeyN], function(error, result, fields){
        if(error) return next(error);
        resultMovie = result;
    });
    database.query(sql, [searchKeyS,searchKeyS,searchKeyS], function(error, result, fields){
        if(error) return next(error);
        resultCinema = result;
    });
    return res.send({"Movies": resultMovie, "Cinemas": resultCinema});
}

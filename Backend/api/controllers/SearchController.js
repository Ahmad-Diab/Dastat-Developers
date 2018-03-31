var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports


module.exports.searchByKeyWord = function(req,res,next){
    var searchKeyS = req.params.searchKeyWord + '%';
    var searchKeyN = req.params.searchKeyWord;
    var sqlMovie = 'SELECT title,genre,imagePath,year,rating FROM Movies WHERE title LIKE ? OR genre LIKE ? OR cast LIKE ? OR year = ?';
    var sqlCinema = "SELECT * FROM Cinemas WHERE name LIKE ? OR company LIKE ? OR location LIKE ?";
    var resultCinema;
    var resultMovie;
    database.query(sqlMovie, [searchKeyS,searchKeyS,searchKeyS,searchKeyN,searchKeyN], function(error, result1, fields){
        if(error) return next(error);
        resultMovie = result1;
    });
    database.query(sqlCinema, [searchKeyS,searchKeyS,searchKeyS], function(error, result2, fields){
        if(error) return next(error);
        resultCinema = result2;
    });
    return res.send({"Movies": resultMovie,"Cinemas": resultCinema});
}

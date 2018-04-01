var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

// Used to search in Movies or Cinemas with a key word
module.exports.searchByKeyWord = function(req,res,next){
    var searchKeyS = req.params.searchKeyWord + '%';        // used in comparison to char columns using LIKE
    var searchKeyN = req.params.searchKeyWord;              // used in comparison to int columns usin =
    var sqlMovie = 'SELECT title,genre,imagePath,year,rating FROM Movies WHERE title LIKE ? OR genre LIKE ? OR cast LIKE ? OR year = ?';
    var sqlCinema = "SELECT * FROM Cinemas WHERE name LIKE ? OR company LIKE ? OR location LIKE ?";
    database.query(sqlMovie, [searchKeyS,searchKeyS,searchKeyS,searchKeyN,searchKeyN], function(error, , fields){
        if(error) return next(error);
        database.query(sqlCinema, [searchKeyS,searchKeyS,searchKeyS], function(error, result2, fields){
            if(error) return next(error);
            return res.send({"Movies": result1,"Cinemas": result2});
        });
    });
    
}

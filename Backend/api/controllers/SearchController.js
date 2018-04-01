var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

/**
 * Search on Movies, Cinemas, Actors using a search keyword
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 */
module.exports.searchByKeyWord = function(req,res,next){
    var searchKeyS = '%' +  req.params.searchKeyWord + '%';        // used in comparison to char columns using LIKE
    var searchKeyN = req.params.searchKeyWord;              // used in comparison to int columns usin =
    var sqlMovie = 'SELECT title,genre,imagePath,year,rating FROM Movies WHERE title LIKE ? OR genre LIKE ? OR cast LIKE ? OR year = ?';
    var sqlCinema = 'SELECT * FROM Cinemas WHERE name LIKE ? OR company LIKE ? OR location LIKE ?';
    var sqlActor = 'SELECT name FROM Actors WHERE name LIKE ?'
    database.query(sqlMovie, [searchKeyS,searchKeyS,searchKeyS,searchKeyN,searchKeyN], function(error, movieResult, fields){
        if(error) return next(error);
        database.query(sqlCinema, [searchKeyS,searchKeyS,searchKeyS], function(error, cinemaResult, fields){
            if(error) return next(error);
            database.query(sqlActor, [searchKeyS] , function(error, actorResult, fields){
                if(error) return next(error);
                res.status(200).json({
                    err : null,   
                    data : {"Movies": movieResult,"Cinemas": cinemaResult,"Actors": actorResult},
                    msg : "search done successfully"
                })
            });
        });
    });   
}

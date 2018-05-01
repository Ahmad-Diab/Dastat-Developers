var database = require('../config/db-connection'),
    Validations = require('../utils/validations');

//Search Controllers should be implemented here

/**
 * Search on Movies, Cinemas, Actors using a search keyword
 * @param {*} req 
 * @param {*} res The result of the function. res.data contains the result of the search which are: res.data.Movies, res.data.Cinemas, res.data.Actors
 * @param {*} next
 */
module.exports.searchByKeyword = function(req,res,next){
    let username = req.params['username'],
        start = req.params['start'],
        limit = req.params['limit'];
    console.log("got params");
    if (!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }
    console.log("Username = " + username);
    let limitEntered = !(!start || !limit);
    // TODO send a msg that no limit entered
    console.log("About to enter queryForCount");
    let queryForCount = "Select count(*) as TotalCount from tickets WHERE user = ?";
    console.log("queryIsReady");
    database.query(queryForCount, [username] ,function (err, rows) {
        if (err)
            return err;
        console.log("no error in query");
        let startNum, limitNum;
        let totalCount = rows[0]['TotalCount'];
        if (start === '' || limit === '' ||
            !start || !limit) {
            // In case no limits entered, send just few.
            startNum = 0;
            limitNum = 10;
        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }
        console.log("About to enter query for selecting tickets info");
        console.log("start :" + start);
        console.log("limit : " + limit);
        let userAndLimitData = [username, limitNum, startNum];

    var searchKeyS = '%' +  req.params.searchKeyword + '%';        // used in comparison to char columns using 'LIKE'
    var searchKeyN = req.params.searchKeyword;                     // used in comparison to int columns using '='
    var sqlMovie = 'SELECT movie_id,title,genre,imagePath,year,rating,duration FROM movies WHERE title LIKE ? OR genre LIKE ? OR cast LIKE ? OR year = ? ORDER BY movie_id DESC limit ? OFFSET ?';
    var sqlCinema = 'SELECT * FROM cinemas WHERE name LIKE ? OR company LIKE ? OR location LIKE ? ORDER BY name limit ? OFFSET ?';
    var sqlActor = 'SELECT name,age,bio FROM actors WHERE name LIKE ? ORDER BY name limit ? OFFSET ?'
    if(!Validations.isString(req.params.searchKeyword))
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    database.query(sqlMovie, [searchKeyS,searchKeyS,searchKeyS,searchKeyN,searchKeyN],userAndLimitData ,function(error, movieResult, fields){
        if(error) return next(error);
        database.query(sqlCinema, [searchKeyS,searchKeyS,searchKeyS], userAndLimitData,function(error, cinemaResult, fields){
            if(error) return next(error);
            database.query(sqlActor, [searchKeyS] ,userAndLimitData, function(error, actorResult, fields){
                if(error) return next(error);
                res.status(200).json({
                    err : null,   
                    msg : "Search done successfully",
                    data : {"Movies": movieResult,"Cinemas": cinemaResult,"Actors": actorResult}
                })
            });
        });
    });   
});
}

module.exports.viewMovies = function(req,res,next){
    database.query('SELECT * FROM Movies', function (error, results, fields) {
        if(error) return next(error);
        return res.send(results);
      });
}

module.exports.viewMovies3 = function(req,res,next){
    database.query('SELECT * FROM movies WHERE feature=3', function (error, results, fields) {
        if(error) return next(error);
        console.log(results);
        return res.send(results);
      });
}
module.exports.viewMovies2 = function(req,res,next){
    database.query('SELECT * FROM movies WHERE feature=2', function (error, results, fields) {
        if(error) return next(error);
        return res.send(results);
      });
}
module.exports.viewMovies1 = function(req,res,next){
    database.query('SELECT * FROM movies WHERE feature=1', function (error, results, fields) {
        if(error) return next(error);
        return res.send(results);
      });
}
module.exports.viewMovies0 = function(req,res,next){
    database.query('SELECT * FROM movies WHERE feature=0', function (error, results, fields) {
        if(error) return next(error);
        return res.send(results);
      });
}
module.exports.getTopMovies = function(req,res,next){
    database.query('SELECT * FROM `movies` WHERE feature = 3 ORDER BY rating DESC LIMIT 6', function (error, results, fields) {
        if(error) return next(error);
        return res.send(results);
      });
}

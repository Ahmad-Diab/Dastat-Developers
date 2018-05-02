var database = require('../config/db-connection');

//Movie Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

module.exports.getMovieInfo = function(req, res, next){

    database.query('SELECT movie_id,title,duration,genre,description,imagePath,cast,year,feature,release_date, rating FROM movies WHERE movies.movie_id = ?', [req.params.movie_id], function (error, results, fields) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Info succussfully retreived",
        data : results
      });
    });
  }
//DONT FORGET TO ADD IT IN THE ROUTES


//--View Biography Movies
module.exports.getMoviesWithFilters = function(req,res,next){

    console.log("Entered getMoviesWithFilters");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null,
        filterString = "",
        genreString = "",
        where = " WHERE",
        and = " AND",
        orderBy = " ORDER BY",
        query,
        table;

    let start = req.query.start,
        limit = req.query.limit,
        filter = req.query.filter,
        genre = req.query.genre;

// To calculate Total Count use MySQL count function

    if(filter === 'High Rates')
        filterString = 'ORDER BY rating DESC';
    else if(filter === 'Low Rates')
        filterString = 'ORDER BY rating ASC';
    else if(filter === 'Latest')
        filterString = 'ORDER BY year DESC';
    else if(filter === 'Oldest')
        filterString = 'ORDER BY year ASC';
    else if(filter === 'Not sorted')
        filterString = " ";

    if(genre === 'No filter')
        genre = null;
    else if(genre)
        genreString = ' genre = ?'
    
    if(!genre){
        console.log("All empty!" +start +"____"+ limit);
        table = [];
        where = " ";
        and = " ";
    }
    else
        table = [genre];   

    query = 'Select count(*) as TotalCount FROM movies '+where+genreString+filterString;
    //query = database.format(query);    
    database.query(query ,table ,function (err, rows) {
        
        if (err) {
            console.log(err);
            return err;
        }

        let startNum,
            limitNum;

        let totalCount = rows[0]['TotalCount'];
        if(totalCount == 0){

            return res.status(200).json({
                err: null,
                msg: 'No Movies available',
                data: rows
            });

        }
        if (start === '' || limit === '' || !start || !limit) {
            // In case no limits entered.
            startNum = 0;
            limitNum = 10;
            pagination = false;
            errMsg = "No Limits were provided";
            console.log("No limits");
            
        } else {
            startNum = parseInt(start);
            limitNum = parseInt(limit);
        }

        if(!genre){
            // console.log("All empty!" +start +"____"+ limit);
            table = [limitNum  , startNum];
            where = " ";
            and = " ";
        }
        else 
            table = [genre , limitNum , startNum];
    
        
        
        query ='Select * FROM movies where status = "ACCEPTED" '+and+genreString+filterString+'  limit ? OFFSET ?'

        //Mention table from where you want to fetch records example-users & send limit and start
         console.log(table);
        database.query(query, table , function (err, rest) {
            if (err) {
                console.log(err);
                return next(err);
            } else {
                res.status(200).json({
                    totalCount: totalCount,
                    data: rest,
                    err: errMsg,
                    msg: "Movies have been successfully retrived"
                });
            }
        });
    });
}   
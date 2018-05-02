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
        ratingString = "",
        dateString = "",
        genreString = "",
        where = " WHERE",
        and = " AND",
        orderBy = " ORDER BY",
        query,
        table;

    let start = req.query.start,
        limit = req.query.limit,
        rating = req.query.rating,
        date = req.query.date,
        genre = req.query.genre;

// To calculate Total Count use MySQL count function

    if(rating === 'High Rates')
        ratingString = ' rating DESC';
    else if(rating === 'Low Rates')
        ratingString = ' rating ASC';
    else if(rating === 'Not sorted')
        rating = null;

    if(date === 'Latest')
        dateString = ' year DESC';
    else if(date === 'Oldest')
        dateString = ' year ASC';
    else if(date === 'Not sorted')
        date = null;

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

    if(!rating && !date){
        orderBy = " ";
    }
    else if(rating && date){
        dateString = ","+dateString
    }
    
    
    query = 'Select count(*) as TotalCount FROM movies '+where+genreString+orderBy+ratingString+dateString;
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
    
        
        
        query ='Select * FROM movies where status = "ACCEPTED" '+and+genreString+orderBy+ratingString+dateString+'  limit ? OFFSET ?'

        //Mention table from where you want to fetch records example-users & send limit and start
         console.log(table);
         console.log("start : " + startNum);
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
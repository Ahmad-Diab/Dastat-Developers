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
        query,
        table;

    let start = req.query.start,
        limit = req.query.limit,
        rating = req.query.rating,
        date = req.query.date,
        genre = req.query.genre;

// To calculate Total Count use MySQL count function

    if(rating === 'High Rates'){
        ratingString = ' ORDER BY rating DESC';
    }
    else if(rating === 'Low Rates'){
        ratingString = ' ORDER BY rating ASC';
    }

    if(date === 'Latest'){
        dateString = ' ORDER BY year DESC';
    }
    else if(date === 'Oldest'){
        dateString = ' ORDER BY year ASC';
    }

    if(genre){
        genreString = ' genre = ?'
    }

    query = 'Select count(*) as TotalCount FROM movies '+where+genreString+ratingString+dateString;
    
    if(!genre && !rating && !date){
        console.log("All empty!");
        table = [];
        where = " ";
        and = " ";
    }
    else if (!genre && !rating && date)
        table = [date];
    else if (!genre && rating && !date)
        table = [rating];
    else if (!genre && rating && date)
        table = [rating , date];
    else if (genre && !rating && !date)
        table = [genre];
    else if (genre && !rating && date)
        table = [genre , date];
    else if (genre && rating && !date)
        table = [genre , rating];
    else if (genre && rating && date)
        table = [genre , rating , date];
    
    if(table === [])
        query = database.format(query);
    else
        query = database.format(query, table);
    
    //query = database.format(query);    
    database.query(query  ,function (err, rows) {
        
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

        query ='Select * FROM movies where '+genreString+ratingString+dateString+and+' status = "ACCEPTED" limit ? OFFSET ?'

        //Mention table from where you want to fetch records example-users & send limit and start
                
        database.query(query, table , function (err, rest) {
            if (err) {
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
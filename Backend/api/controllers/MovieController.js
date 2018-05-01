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

//-------VIEW ALL MOVIES------

module.exports.getMovies = function(req,res,next){

    console.log("Entered getMovies");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit;
            
// To calculate Total Count use MySQL count function
    let query = 'Select count(*) as TotalCount from from movies where status ="ACCEPTED" ORDER BY feature desc';
    
    
    //query = database.format(query);    
    database.query(query, username , function (err, rows) {
        
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
        
        let query = 'select DISTINCT * from movies where status ="ACCEPTED" ORDER BY feature desc limit ? OFFSET ?'
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [limitNum, startNum];
        
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

//     database.query('SELECT * from movies where status ="ACCEPTED" ORDER BY feature desc',
   
// function(error,results,fields){
//     if(error) return next(error);
//     if(results.length ==0){
//         return res.send("No Movies found!");
//     }
//     else{
//         return res.send(results);
//     }
// });
}


//-------------VIEW RATINGS-----------------
//--View Movies by High ratings

module.exports.getMoviesHighRatings = function(req,res,next){

    console.log("Entered getMoviesHighRatings");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        genre = req.params.genre;
// To calculate Total Count use MySQL count function

    if(genre === "No filter")
        let query = 'SELECT count(*) as TotalCount from movies where status ="ACCEPTED"  ORDER BY rating desc';
    else
        let query = 'SELECT count(*) as TotalCount from movies where genre = ? AND status ="ACCEPTED"  ORDER BY rating desc'
    //query = database.format(query);    
    database.query(query, genre , function (err, rows) {
        
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
        
        if(genre === "No filter")
            let query = 'SELECT * from movies where status ="ACCEPTED"  ORDER BY rating desc limit ? OFFSET ? ';
        else
            let query = 'SELECT * from movies where genre = ? AND status ="ACCEPTED"  ORDER BY rating desc limit ? OFFSET ?'
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [genre ,limitNum, startNum];
        
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

    // let genre = req.params.genre;
    // if(genre === "No filter"){
    //     database.query('SELECT * from movies where status ="ACCEPTED"  ORDER BY rating desc',function(error,results,fields){
    //         if(error) return next(error);
    //         return res.send(results);
    
    //     });
    // }
    // else {
    //     database.query('SELECT * from movies where genre = ? AND status ="ACCEPTED"  ORDER BY rating desc',[genre],function(error,results,fields){
    //         if(error) return next(error);
    //         return res.send(results);
    
    //     });
    // }
    // }
}
//--View Movies by Low ratings

module.exports.getMoviesLowRatings = function(req,res,next){

    console.log("Entered getMoviesLowRatings");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        genre = req.params.genre;
// To calculate Total Count use MySQL count function

    if(genre === "No filter")
        let query = 'SELECT count(*) as TotalCount from movies where status ="ACCEPTED"  ORDER BY rating ASC';
    else
        let query = 'SELECT count(*) as TotalCount from movies where genre = ? AND status ="ACCEPTED"  ORDER BY rating ASC'
    //query = database.format(query);    
    database.query(query, genre , function (err, rows) {
        
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
        
        if(genre === "No filter")
            let query = 'SELECT * from movies where status ="ACCEPTED"  ORDER BY rating ASC limit ? OFFSET ? ';
        else
            let query = 'SELECT * TotalCount from movies where genre = ? AND status ="ACCEPTED"  ORDER BY rating ASC limit ? OFFSET ?'
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [genre ,limitNum, startNum];
        
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


    // let genre = req.params.genre;
    
    // if(genre === "No filter"){
    //     database.query('SELECT * from movies where status ="ACCEPTED"  ORDER BY rating ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         return res.send(results);
    
    //     });
    // }
    // else {
    //     database.query('SELECT * from movies where genre = ? AND status ="ACCEPTED"  ORDER BY rating ASC',[genre],function(error,results,fields){
    //         if(error) return next(error);
    //         return res.send(results);
    
    //     });
    // }
}





//-----------VIEW BY DATE -------------------

//--View Movies ordered by the latest

module.exports.getMoviesLastestDate = function(req,res,next){

    console.log("Entered getMoviesLastestDate");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        genre = req.params.genre;
// To calculate Total Count use MySQL count function

    if(genre === "No filter")
        let query = 'SELECT count(*) as TotalCount from movies where status ="ACCEPTED"  ORDER BY year DESC';
    else
        let query = 'SELECT count(*) as TotalCount from movies where genre = ? AND status ="ACCEPTED"  ORDER BY year DESC'
    //query = database.format(query);    
    database.query(query, genre , function (err, rows) {
        
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
        
        if(genre === "No filter")
            let query = 'SELECT * from movies where status ="ACCEPTED"  ORDER BY year DESC limit ? OFFSET ? ';
        else
            let query = 'SELECT * from movies where genre = ? AND status ="ACCEPTED"  ORDER BY year DESC limit ? OFFSET ?'
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [genre ,limitNum, startNum];
        
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

    // let genre = req.params.genre;
    // if(genre === "No filter"){
    //     database.query('SELECT * from movies where status ="ACCEPTED"  ORDER BY year DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         return res.send(results);
    
    //     });
    // }
    // else {
    //     database.query('SELECT * from movies where genre = ? AND status ="ACCEPTED"  ORDER BY year DESC',[genre],function(error,results,fields){
    //         if(error) return next(error);
    //         return res.send(results);
    
    //     });
    // }
}

//--View Movies ordered by the Oldest

module.exports.getMoviesOldesttDate = function(req,res,next){

    console.log("Entered getMoviesOldesttDate");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        genre = req.params.genre;
// To calculate Total Count use MySQL count function

    if(genre === "No filter")
        let query = 'SELECT count(*) as TotalCount from movies where status = "ACCEPTED"  ORDER BY year ASC';
    else
        let query = 'SELECT count(*) as TotalCount from movies where genre = ? AND status ="ACCEPTED"  ORDER BY year ASC'
    //query = database.format(query);    
    database.query(query, genre , function (err, rows) {
        
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
        
        if(genre === "No filter")
            let query = 'SELECT * from movies where status = "ACCEPTED"  ORDER BY year ASC limit ? OFFSET ? ';
        else
            let query = 'SELECT * from movies where genre = ? AND status = "ACCEPTED"  ORDER BY year ASC limit ? OFFSET ?'
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [genre ,limitNum, startNum];
        
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


    // let genre = req.params.genre;
    // if(genre === "No filter"){
    //     database.query('SELECT * from movies where status ="ACCEPTED"  ORDER BY year ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         return res.send(results);
    
    //     });
    // }
    // else {
    //     database.query('SELECT * from movies where genre = ? AND status ="ACCEPTED"  ORDER BY year ASC',[genre],function(error,results,fields){
    //         if(error) return next(error);
    //         return res.send(results);
    
    //     });
    // }
}

//------------------------VIEW BY GENRE-------------------

//--View Biography Movies
module.exports.getMoviesBiography = function(req,res,next){

    console.log("Entered getMoviesBiography");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        sortingFilter = req.params.sortingFilter;
// To calculate Total Count use MySQL count function

    if(sortingFilter === "Not sorted"){
        query ='Select count(*) as TotalCount FROM movies where genre="Biography" AND  status ="ACCEPTED"'
        
    }
    else if(sortingFilter === "High Rates")  {
        query = 'Select count(*) as TotalCount FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY rating DESC'

    }  
    else if(sortingFilter === "Low Rates") {
        query ='Select count(*) as TotalCount FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY rating ASC'

    }
    else if(sortingFilter === "Latest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY year DESC'
            
    }
    else if(sortingFilter === "Oldest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY year ASC'

    }
    //query = database.format(query);    
    database.query(query, sortingFilter , function (err, rows) {
        
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
        
        if(sortingFilter === "Not sorted"){
            query ='Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" limit ? OFFSET ?'
            
        }
        else if(sortingFilter === "High Rates")  {
            query = 'Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY rating DESC limit ? OFFSET ?'
    
        }  
        else if(sortingFilter === "Low Rates") {
            query ='Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY rating ASC limit ? OFFSET ?'
     
        }
        else if(sortingFilter === "Latest") {
            query = 'Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY year DESC limit ? OFFSET ?'
                
        }
        else if(sortingFilter === "Oldest") {
            query = 'Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY year ASC limit ? OFFSET ?'

        }
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [sortingFilter ,limitNum, startNum];
        
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

    // let sortingFilter = req.params.sortingFilter;
    // if(sortingFilter === "Not sorted"){
    //     database.query('Select * FROM movies where genre="Biography" AND  status ="ACCEPTED"',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "High Rates")  {
    //     database.query('Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY rating DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }  
    // else if(sortingFilter === "Low Rates") {
    //     database.query('Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY rating ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "Latest") {
    //     database.query('Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY year DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "Oldest") {
    //     database.query('Select * FROM movies where genre="Biography" AND  status ="ACCEPTED" ORDER BY year ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    
}

//--View Thriller Movies
module.exports.getMoviesThriller = function(req,res,next){

    console.log("Entered getMoviesBiography");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        sortingFilter = req.params.sortingFilter;
// To calculate Total Count use MySQL count function

    if(sortingFilter === "Not sorted"){
        query ='Select count(*) as TotalCount FROM movies where genre="Thriller" AND  status ="ACCEPTED"'
        
    }
    else if(sortingFilter === "High Rates")  {
        query = 'Select count(*) as TotalCount FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY rating DESC'

    }  
    else if(sortingFilter === "Low Rates") {
        query ='Select count(*) as TotalCount FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY rating ASC'

    }
    else if(sortingFilter === "Latest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY year DESC'
            
    }
    else if(sortingFilter === "Oldest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY year ASC'

    }
    //query = database.format(query);    
    database.query(query, sortingFilter , function (err, rows) {
        
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
        
        if(sortingFilter === "Not sorted"){
            query ='Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" limit ? OFFSET ?'
            
        }
        else if(sortingFilter === "High Rates")  {
            query = 'Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY rating DESC limit ? OFFSET ?'
    
        }  
        else if(sortingFilter === "Low Rates") {
            query ='Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY rating ASC limit ? OFFSET ?'
     
        }
        else if(sortingFilter === "Latest") {
            query = 'Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY year DESC limit ? OFFSET ?'
                
        }
        else if(sortingFilter === "Oldest") {
            query = 'Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY year ASC limit ? OFFSET ?'

        }
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [sortingFilter ,limitNum, startNum];
        
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
    
    // let sortingFilter = req.params.sortingFilter;
    // if(sortingFilter === "Not sorted"){
    //     database.query('Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED"',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "High Rates")  {
    //     database.query('Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY rating DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }  
    // else if(sortingFilter === "Low Rates") {
    //     database.query('Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY rating ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "Latest") {
    //     database.query('Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY year DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "Oldest") {
    //     database.query('Select * FROM movies where genre="Thriller" AND  status ="ACCEPTED" ORDER BY year ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
}

//--View Drama Movies
module.exports.getMoviesDrama = function(req,res,next){

    console.log("Entered getMoviesDrama");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        sortingFilter = req.params.sortingFilter;
// To calculate Total Count use MySQL count function

    if(sortingFilter === "Not sorted"){
        query ='Select count(*) as TotalCount FROM movies where genre="Drama" AND  status ="ACCEPTED"'
        
    }
    else if(sortingFilter === "High Rates")  {
        query = 'Select count(*) as TotalCount FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY rating DESC'

    }  
    else if(sortingFilter === "Low Rates") {
        query ='Select count(*) as TotalCount FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY rating ASC'

    }
    else if(sortingFilter === "Latest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY year DESC'
            
    }
    else if(sortingFilter === "Oldest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY year ASC'

    }
    //query = database.format(query);    
    database.query(query, sortingFilter , function (err, rows) {
        
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
        
        if(sortingFilter === "Not sorted"){
            query ='Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" limit ? OFFSET ?'
            
        }
        else if(sortingFilter === "High Rates")  {
            query = 'Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY rating DESC limit ? OFFSET ?'
    
        }  
        else if(sortingFilter === "Low Rates") {
            query ='Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY rating ASC limit ? OFFSET ?'
     
        }
        else if(sortingFilter === "Latest") {
            query = 'Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY year DESC limit ? OFFSET ?'
                
        }
        else if(sortingFilter === "Oldest") {
            query = 'Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY year ASC limit ? OFFSET ?'

        }
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [sortingFilter ,limitNum, startNum];
        
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

//     let sortingFilter = req.params.sortingFilter;
//     if(sortingFilter === "Not sorted"){
//         database.query('Select * FROM movies where genre="Drama" AND  status ="ACCEPTED"',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "High Rates")  {
//         database.query('Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY rating DESC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }  
//     else if(sortingFilter === "Low Rates") {
//         database.query('Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY rating ASC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "Latest") {
//         database.query('Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY year DESC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "Oldest") {
//         database.query('Select * FROM movies where genre="Drama" AND  status ="ACCEPTED" ORDER BY year ASC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
// }
}
//--View Adventure Movies
module.exports.getMoviesAdventure = function(req,res,next){

    console.log("Entered getMoviesAdventure");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        sortingFilter = req.params.sortingFilter;
// To calculate Total Count use MySQL count function

    if(sortingFilter === "Not sorted"){
        query ='Select count(*) as TotalCount FROM movies where genre="Adventure" AND  status ="ACCEPTED"'
        
    }
    else if(sortingFilter === "High Rates")  {
        query = 'Select count(*) as TotalCount FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY rating DESC'

    }  
    else if(sortingFilter === "Low Rates") {
        query ='Select count(*) as TotalCount FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY rating ASC'

    }
    else if(sortingFilter === "Latest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY year DESC'
            
    }
    else if(sortingFilter === "Oldest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY year ASC'

    }
    //query = database.format(query);    
    database.query(query, sortingFilter , function (err, rows) {
        
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
        
        if(sortingFilter === "Not sorted"){
            query ='Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" limit ? OFFSET ?'
            
        }
        else if(sortingFilter === "High Rates")  {
            query = 'Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY rating DESC limit ? OFFSET ?'
    
        }  
        else if(sortingFilter === "Low Rates") {
            query ='Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY rating ASC limit ? OFFSET ?'
     
        }
        else if(sortingFilter === "Latest") {
            query = 'Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY year DESC limit ? OFFSET ?'
                
        }
        else if(sortingFilter === "Oldest") {
            query = 'Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY year ASC limit ? OFFSET ?'

        }
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [sortingFilter ,limitNum, startNum];
        
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


//     let sortingFilter = req.params.sortingFilter;
//     if(sortingFilter === "Not sorted"){
//         database.query('Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED"',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "High Rates")  {
//         database.query('Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY rating DESC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }  
//     else if(sortingFilter === "Low Rates") {
//         database.query('Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY rating ASC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "Latest") {
//         database.query('Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY year DESC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "Oldest") {
//         database.query('Select * FROM movies where genre="Adventure" AND  status ="ACCEPTED" ORDER BY year ASC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
// }
}
//--View Horror Movies
module.exports.getMoviesHorror = function(req,res,next){


    console.log("Entered getMoviesHorror");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        sortingFilter = req.params.sortingFilter;
// To calculate Total Count use MySQL count function

    if(sortingFilter === "Not sorted"){
        query ='Select count(*) as TotalCount FROM movies where genre="Horror" AND  status ="ACCEPTED"'
        
    }
    else if(sortingFilter === "High Rates")  {
        query = 'Select count(*) as TotalCount FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY rating DESC'

    }  
    else if(sortingFilter === "Low Rates") {
        query ='Select count(*) as TotalCount FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY rating ASC'

    }
    else if(sortingFilter === "Latest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY year DESC'
            
    }
    else if(sortingFilter === "Oldest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY year ASC'

    }
    //query = database.format(query);    
    database.query(query, sortingFilter , function (err, rows) {
        
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
        
        if(sortingFilter === "Not sorted"){
            query ='Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" limit ? OFFSET ?'
            
        }
        else if(sortingFilter === "High Rates")  {
            query = 'Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY rating DESC limit ? OFFSET ?'
    
        }  
        else if(sortingFilter === "Low Rates") {
            query ='Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY rating ASC limit ? OFFSET ?'
     
        }
        else if(sortingFilter === "Latest") {
            query = 'Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY year DESC limit ? OFFSET ?'
                
        }
        else if(sortingFilter === "Oldest") {
            query = 'Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY year ASC limit ? OFFSET ?'

        }
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [sortingFilter ,limitNum, startNum];
        
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

//     let sortingFilter = req.params.sortingFilter;
//     if(sortingFilter === "Not sorted"){
//         database.query('Select * FROM movies where genre="Horror" AND  status ="ACCEPTED"',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "High Rates")  {
//         database.query('Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY rating DESC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }  
//     else if(sortingFilter === "Low Rates") {
//         database.query('Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY rating ASC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "Latest") {
//         database.query('Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY year DESC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
//     }
//     else if(sortingFilter === "Oldest") {
//         database.query('Select * FROM movies where genre="Horror" AND  status ="ACCEPTED" ORDER BY year ASC',function(error,results,fields){
//             if(error) return next(error);
//             else{
//             return res.send(results);
//             }
//         });
// }
}
//--View Action Movies
module.exports.getMoviesAction = function(req,res,next){

    console.log("Entered getMoviesAction");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        sortingFilter = req.params.sortingFilter;
// To calculate Total Count use MySQL count function

    if(sortingFilter === "Not sorted"){
        query ='Select count(*) as TotalCount FROM movies where genre="Action" AND  status ="ACCEPTED"'
        
    }
    else if(sortingFilter === "High Rates")  {
        query = 'Select count(*) as TotalCount FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY rating DESC'

    }  
    else if(sortingFilter === "Low Rates") {
        query ='Select count(*) as TotalCount FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY rating ASC'

    }
    else if(sortingFilter === "Latest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY year DESC'
            
    }
    else if(sortingFilter === "Oldest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY year ASC'

    }
    //query = database.format(query);    
    database.query(query, sortingFilter , function (err, rows) {
        
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
        
        if(sortingFilter === "Not sorted"){
            query ='Select * FROM movies where genre="Action" AND  status ="ACCEPTED" limit ? OFFSET ?'
            
        }
        else if(sortingFilter === "High Rates")  {
            query = 'Select * FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY rating DESC limit ? OFFSET ?'
    
        }  
        else if(sortingFilter === "Low Rates") {
            query ='Select * FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY rating ASC limit ? OFFSET ?'
     
        }
        else if(sortingFilter === "Latest") {
            query = 'Select * FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY year DESC limit ? OFFSET ?'
                
        }
        else if(sortingFilter === "Oldest") {
            query = 'Select * FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY year ASC limit ? OFFSET ?'

        }
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [sortingFilter ,limitNum, startNum];
        
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

    // let sortingFilter = req.params.sortingFilter;
    // if(sortingFilter === "Not sorted"){
    //     database.query('Select * FROM movies where genre="Action" AND  status ="ACCEPTED"',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "High Rates")  {
    //     database.query('Select * FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY rating DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }  
    // else if(sortingFilter === "Low Rates") {
    //     database.query('Select * FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY rating ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "Latest") {
    //     database.query('Select * FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY year DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "Oldest") {
    //     database.query('Select * FROM movies where genre="Action" AND  status ="ACCEPTED" ORDER BY year ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
}   
//--View Comedy Movies
module.exports.getMoviesComedy = function(req,res,next){ 

    console.log("Entered getMoviesComedy");
    var pagination = true; // boolean for checking if the user entered limits for pagination or not
    var errMsg = null;

    let start = req.query.start,
        limit = req.query.limit,
        sortingFilter = req.params.sortingFilter;
// To calculate Total Count use MySQL count function

    if(sortingFilter === "Not sorted"){
        query ='Select count(*) as TotalCount FROM movies where genre="Comedy" AND  status ="ACCEPTED"'
        
    }
    else if(sortingFilter === "High Rates")  {
        query = 'Select count(*) as TotalCount FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY rating DESC'

    }  
    else if(sortingFilter === "Low Rates") {
        query ='Select count(*) as TotalCount FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY rating ASC'

    }
    else if(sortingFilter === "Latest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY year DESC'
            
    }
    else if(sortingFilter === "Oldest") {
        query = 'Select count(*) as TotalCount FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY year ASC'

    }
    //query = database.format(query);    
    database.query(query, sortingFilter , function (err, rows) {
        
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
        
        if(sortingFilter === "Not sorted"){
            query ='Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" limit ? OFFSET ?'
            
        }
        else if(sortingFilter === "High Rates")  {
            query = 'Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY rating DESC limit ? OFFSET ?'
    
        }  
        else if(sortingFilter === "Low Rates") {
            query ='Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY rating ASC limit ? OFFSET ?'
     
        }
        else if(sortingFilter === "Latest") {
            query = 'Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY year DESC limit ? OFFSET ?'
                
        }
        else if(sortingFilter === "Oldest") {
            query = 'Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY year ASC limit ? OFFSET ?'

        }
        //Mention table from where you want to fetch records example-users & send limit and start
        let table = [sortingFilter ,limitNum, startNum];
        
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

    // let sortingFilter = req.params.sortingFilter;
    // if(sortingFilter === "Not sorted"){
    //     database.query('Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED"',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "High Rates")  {
    //     database.query('Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY rating DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }  
    // else if(sortingFilter === "Low Rates") {
    //     database.query('Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY rating ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "Latest") {
    //     database.query('Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY year DESC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
    // else if(sortingFilter === "Oldest") {
    //     database.query('Select * FROM movies where genre="Comedy" AND  status ="ACCEPTED" ORDER BY year ASC',function(error,results,fields){
    //         if(error) return next(error);
    //         else{
    //         return res.send(results);
    //         }
    //     });
    // }
}






var database = require('../config/db-connection');

//Movie Controllers should be implemented here
//DONT FORGET TO USE MODULE exports
//DONT FORGET TO ADD IT IN THE ROUTES


//------ADD A REQUEST-------------------------

module.exports.addRequests = function(req,res,next){
    
    var
        title = req.body['title'];
        var tokenHeader = req.headers['authorization'];
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var admin_requested = token.username;
       
        duration = req.body['duration'],
        genre = req.body['genre'],
        description = req.body['description'],
        imagePath = req.body['imagePath'],
        cast = req.body['cast'],
        year = req.body['year'],
        feature = req.body['feature'],
        release_date = req.body['release_date'],
        rating = req.body['rating'],
        status = "PENDING"; 
        

        var sqlQuery = 'INSERT INTO movies (title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status,admin_requested)  VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';

        database.query(sqlQuery,[title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status,admin_requested],
        function (error, results) {
            if (error) {
                return next(error);
            }
            return res.status(200).json({
                err: null,
                msg: 'The Request is sent.',
                data: results
            });
        });
}

////--------------ADD MOVIES----------------
module.exports.addMovies = function(req,res,next){
    
    var
        title = req.body['title'];
        console.log(title);
       
        duration = req.body['duration'],
        genre = req.body['genre'],
        description = req.body['description'],
        imagePath = req.body['imagePath'],
        cast = req.body['cast'],
        year = req.body['year'],
        feature = req.body['feature'],
        release_date = req.body['release_date'],
        rating = req.body['rating'],
        status = "ACCEPTED"; 
        

        var sqlQuery = 'INSERT INTO movies (title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status)  VALUES (?,?,?,?,?,?,?,?,?,?,?)';

        database.query(sqlQuery,[title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status],
        function (error, results) {
            if (error) {
                return next(error);
            }
            return res.status(200).json({
                err: null,
                msg: 'The Movie is inserted in the DataBase!.',
                data: results
            });
        });
}





///VIEW ALL OF MY REQUESTS
module.exports.viewMyRequests =function(req,res,next){

    var tokenHeader = req.headers['authorization'];
    var tokenheadersplited = tokenHeader.split(' ');
    var token = tokenheadersplited[1];
    var admin_requested = token.username;
   
    
    database.query('Select * FROM movies where status = "PENDING" and movies.admin_requested = ?', [admin_requested],
function(error,results,fields){
    if(error) return next(error);
    if(results.length == 0){
        return res.send("No Requested Movies here okk");
    }
    else{
        return res.send(results);
    }
});
}
 //VIEW ALL REQUESTS
 module.exports.viewRequests = function(req,res,next){

    database.query('SELECT * from movies where status ="PENDING" ORDER BY feature desc',
function(error,results,fields){
    if(error) return next(error);
    if(results.length ==0){
        return res.send("No Requested Movies nooooo!");
    }
    else{
        return res.send(results);
    }
});
}


//VIEW ALL MOVIES

module.exports.getMovies = function(req,res,next){

    database.query('SELECT * from movies where status ="ACCEPTED" ORDER BY feature desc',
   
function(error,results,fields){
    if(error) return next(error);
    if(results.length ==0){
        return res.send("No Movies found!");
    }
    else{
        return res.send(results);
    }
});
}

//VIEW A SINGLE MOVIE
module.exports.viewSingleMovie = function(req, res, next){

    database.query('SELECT movie_id,title,duration,genre,description,imagePath,cast,year,feature,release_date, rating FROM movies WHERE movies.movie_id = ?', [req.params.movie_id], function (error, results, fields) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Info succussfully retreived",
        data : results
      });
    });
  }

// Edit My Requests
module.exports.EditMyRequests=function(req,res,next){

    var title = req.body['title'],
        duration = req.body['duration'],
        genre = req.body['genre'],
        description = req.body['description'],
        imagePath = req.body['imagePath'],
        cast = req.body.cast['cast'],
        year = req.body['year'],
        feature = req.body['feature'],
        release_date = req.body['release_date'],
        rating = req.body['rating'],
        status = req.body['status'];

        database.query('Select * FROM movies where status = "PENDING" AND movies.movie_id = ?', [req.params.movie_id],function(err,results){
            if(err) return next(err);

            // var 
  
            // oldGenre = results[0].genre,
            // oldTitle= results[0].title,
            // oldDuration = results[0].duration,
            // oldDescribtion = results[0].description,
            // oldImagePath = results[0].imagepath,
            // oldCast = results[0].cast,
            // oldYear = results[0].year,
            // oldFeature =results[0].feature,
            // oldReleaseDate= results[0].release_date,
            // oldRating = results[0].rating,
            // oldStatus = results[0].status;

            // if(title == null){
            //     title = oldTitle;
            //  }
            //  if(genre == null){
            //      genre= oldGenre;
            //  } 
            //  if(duration==null){
            //      duration = oldDuration;
            //  }
            //  if(description==null){
            //      description=oldDescribtion;
            //  }
            //  if(imagePath==null){
            //      imagePath=oldImagePath;
            //  }
            //  if(cast==null){
            //      cast = oldCast;
            //  }
            //  if(year==null){
            //      year=oldYear;
            //  }
            //  if(feature == null){
            //      feature=oldFeature;
            //  }
            //  if(release_date==null){
            //      release_date ==oldReleaseDate;
            //  }
            //  if(rating==null){
            //      rating = oldRating;
            //  }
            //  if(status==null){
            //      status = oldStatus
            //  }
             var sqlQuery = 'UPDATE movies SET title= ?,duration= ? , genre = ?, description= ?,imagePath= ?,cast = ?, year= ?,feature= ?,release_date= ?,rating= ?,status = ?  WHERE status = "PENDING" AND movies.movie_id = ?';
             database.query(sqlQuery,[title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status,req.params.movie_id],
             function(error,results){
                 if(error){
                     return next(error);
                 }
                 return res.status(200).json({
                     err: null,
                     msg: 'Request updated',
                     data:results
                 });
             });
    }); 
}

//Delete My Requests
module.exports.DeleteMyRequests = function(req, res, next){

    database.query('DELETE FROM movies WHERE status = "PENDING" AND movies.movie_id = ?', [req.params.movie_id], function (error, results, fields) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Request Deleted",
        data : results
      });
    });
  }

// Edit Movies
module.exports.EditMovies=function(req,res,next){

    var title = req.body['title'],
        duration = req.body['duration'],
        genre = req.body['genre'],
        description = req.body['description'],
        imagePath = req.body['imagePath'],
        cast = req.body.cast['cast'],
        year = req.body['year'],
        feature = req.body['feature'],
        release_date = req.body['release_date'],
        rating = req.body['rating'],
        status = req.body['status'];
        admin_requested = req.body['admin_requested'];

        database.query('Select * FROM movies where movies.movie_id = ?', [req.params.movie_id],function(err,results){
            if(err) return next(err);

            // var 
  
            // oldGenre = results[0].genre,
            // oldTitle= results[0].title,
            // oldDuration = results[0].duration,
            // oldDescribtion = results[0].description,
            // oldImagePath = results[0].imagePath,
            // oldCast = results[0].cast,
            // oldYear = results[0].year,
            // oldFeature =results[0].feature,
            // oldReleaseDate= results[0].release_date,
            // oldRating = results[0].rating,
            // oldStatus = results[0].status;

            // if(title == null){
            //     title = oldTitle;
            //  }
            //  if(genre == null){
            //      genre= oldGenre;
            //  } 
            //  if(duration==null){
            //      duration = oldDuration;
            //  }
            //  if(description==null){
            //      description=oldDescribtion;
            //  }
            //  if(imagePath==null){
            //      imagePath=oldImagePath;
            //  }
            //  if(cast==null){
            //      cast = oldCast;
            //  }
            //  if(year==null){
            //      year=oldYear;
            //  }
            //  if(feature == null){
            //      feature=oldFeature;
            //  }
            //  if(release_date==null){
            //      release_date ==oldReleaseDate;
            //  }
            //  if(rating==null){
            //      rating = oldRating;
            //  }
            //  if(status==null){
            //      status = oldStatus
            //  }


             var sqlQuery = 'UPDATE movies SET title= ?,duration= ? , genre = ?, description= ?,imagePath= ?,cast = ?, year= ?,feature= ?,release_date= ?,rating= ?,status = ?,admin_requested=?  WHERE  movies.movie_id = ?';
             database.query(sqlQuery,[title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status,admin_requested,req.params.movie_id],
             function(error,results){
                 if(error){
                     return next(error);
                 }
                 return res.status(200).json({
                     err: null,
                     msg: 'Movie updated',
                     data:results
                 });
             });
    }); 
}

//Delete Movies
module.exports.DeleteMovies = function(req, res, next){

    database.query('DELETE FROM movies WHERE movies.movie_id = ?', [req.params.movie_id], function (error, results, fields) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Movie Deleted",
        data : results
      });
    });
  }


//View a single Request
  module.exports.ViewMovieRequest = function(req, res, next){

    database.query('SELECT status FROM movies WHERE movies.movie_id = ?', [req.params.movie_id] , function (error, results, fields) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Movie Request",
        data : results
      });
    });
  }

  //Reject a single Request
  module.exports.RejectMovieRequest = function(req, res, next){
    database.query('Select * FROM movies where movies.movie_id = ?', [req.params.movie_id],function(err,results){
        if(err) return next(err);
    var 
  
    oldGenre = results[0].genre,
    oldTitle= results[0].title,
    oldDuration = results[0].duration,
    oldDescribtion = results[0].description,
    oldImagePath = results[0].imagePath,
    oldCast = results[0].cast,
    oldYear = results[0].year,
    oldFeature =results[0].feature,
    oldReleaseDate= results[0].release_date,
    oldRating = results[0].rating;
    oldStatus = results[0].status;
   
     
     
       var  status = "REJECTED";
     
if(oldStatus == "PENDING"){

     var sqlQuery = 'UPDATE movies SET title= ?,duration= ? , genre = ?, description= ?,imagePath= ?,cast = ?, year= ?,feature= ?,release_date= ?,rating= ?,status = ?  WHERE status = "PENDING" AND movies.movie_id = ?';
     database.query(sqlQuery,[oldTitle,oldDuration,oldGenre,oldDescribtion,oldImagePath,oldCast,oldYear,oldFeature,oldReleaseDate,oldRating,status,req.params.movie_id],
     function(error,results){
         if(error){
             return next(error);
         }
         return res.status(200).json({
             err: null,
             msg: 'Request Rejected',
             data:results
         });
        });}
        else{
            return res.status(404).json({
                err: null,
                msg: 'This Movie Request is Not Pending',
                data:results
            });
        }
    });
    }


    //Accept a single Request
    module.exports.AcceptMovieRequest = function(req, res, next){
        database.query('Select * FROM movies where movies.movie_id = ?', [req.params.movie_id],function(err,results){
            if(err) return next(err);
        var 
      
        oldGenre = results[0].genre,
        oldTitle= results[0].title,
        oldDuration = results[0].duration,
        oldDescribtion = results[0].description,
        oldImagePath = results[0].imagePath,
        oldCast = results[0].cast,
        oldYear = results[0].year,
        oldFeature =results[0].feature,
        oldReleaseDate= results[0].release_date,
        oldRating = results[0].rating;
        oldStatus = results[0].status;
       
         
         
           var  status = 'ACCEPTED';
         
    
           if(oldStatus == "PENDING"){
    
         var sqlQuery = 'UPDATE movies SET title= ?,duration= ? , genre = ?, description= ?,imagePath= ?,cast = ?, year= ?,feature= ?,release_date= ?,rating= ?,status = ?  WHERE status = "PENDING" AND movies.movie_id = ?';
         database.query(sqlQuery,[oldTitle,oldDuration,oldGenre,oldDescribtion,oldImagePath,oldCast,oldYear,oldFeature,oldReleaseDate,oldRating,status,req.params.movie_id],
         function(error,results){
             if(error){
                 return next(error);
             }
             return res.status(200).json({
                 err: null,
                 msg: 'Request Accepted',
                 data:results
             });
            });}
            else{
                return res.status(404).json({
                    err: null,
                    msg: 'This Movie Request is Not Pending',
                    data:results
                });
            }
        });
        }

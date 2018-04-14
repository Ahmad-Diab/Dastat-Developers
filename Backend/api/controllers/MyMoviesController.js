import { stat } from 'fs';

var database = require('../config/db-connection');


//Movie Controllers should be implemented here
//DONT FORGET TO USE MODULE exports
//DONT FORGET TO ADD IT IN THE ROUTES

module.exports.addMovie = function(req,res,next){
   var sql = "INSERT INTO Movies VALUES ?"; 
   var values = [];  //TODO HTTP REQUEST FROM FRONT END WITH VALUES OF INSERTION
   var movie_id = req.body.movie_id;
    database.query(sql,[values],function(err,results,field){
        if(err) throw err;
        res.status(200).json({
            err : null,   
            msg : "Info succussfully retreived",
            data : results
          });
    })
}



///VIEW ALL OF MY REQUESTS
module.exports.viewMyRequests =function(req,res,next){
    
    database.query('Select * FROM movies where status = "PENDING" and movies.admin_requested = ?', [req.params.admin_requested],
function(error,results,fields){
    if(error) return next(error);
    if(results.length == 0){
        return res.send("No Requested Movies found");
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
        return res.send("No Requested Movies found!");
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




module.exports.EditMyRequests = function(req,res,next){

    var title = req.body['title'],
        duration = req.body['duration'],
        genre = req.body['genre'],
        description = req.body['description'],
        imagePath = req.body['imagepath'],
        cast = req.body.cast['cast'],
        year = req.body['year'],
        feature = req.body['feature'],
        release_date = req.body['release_date'],
        rating = req.body['rating'],
        status = req.body['status'];
       

    database.query('Select * FROM movies where status == PENDING AND movies.movie_id = ?', [req.params.movie_id],function(err,results,fields){
        if(err) return next(err);
        if(results.lenght>0){
            var movie = {
                movieId = results[0].movie_id,
                oldGenre = results[0].genre,
                oldTitle= results[0].title,
                oldDuration = results[0].duration,
                oldDescribtion = results[0].description,
                oldImagePath = results[0].imagepath,
                oldCast = results[0].cast,
                oldYear = results[0].year,
                oldFeature =results[0].feature,
                oldReleaseDate= results[0].release_date,
                oldRating = results[0].rating,
                oldStatus = results[0].status,
                
            }
        }
    });

    if(title == null){
       title = oldTitle;
    }
    if(genre == null){
        genre= oldGenre;
    } 
    if(duration==null){
        duration = oldDuration;
    }
    if(description==null){
        description=oldDescribtion;
    }
    if(imagePath==null){
        imagePath=oldImagePath;
    }
    if(cast==null){
        cast = oldCast;
    }
    if(year==null){
        year=oldYear;
    }
    if(feature == null){
        feature=oldFeature;
    }
    if(release_date==null){
        release_date ==oldReleaseDate;
    }
    if(rating==null){
        rating = oldRating;
    }
    if(status==null){
        status = oldStatus
    }
    
        database.query('Select * FROM movies where status == PENDING AND movies.movie_id = ?', [req.params.movie_id]),
        function(error,results){
            if(error){
                return next(error);
            }
            console.log(results);
            if(!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "The assigned hall does not exist.",
                    data: null
                });
            }
    var sqlQuery = 'UPDATE movies SET title=? ,duration= ?,genre=?,describtion=?,imagePath=?,cast=?,year=?,feature=?,release_date=?,rating=?,status=?, where movie_id=? AND status = "PENDING"';     
    database.query(sqlQuery,[title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status,req.params.movie_id],function(error,results){

                if (error) {
                    return next(error);
                }

                return res.status(200).json({
                    err: null,
                    msg: 'Request is updated successfully',
                    data: results
                });

            });
        }
    }

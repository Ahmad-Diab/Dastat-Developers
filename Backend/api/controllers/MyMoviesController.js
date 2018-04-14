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
        genre = req.body['genre'];
/* 
    if(title == null){
        return res.status(422).json({
            err: null,
            msg: 'title is required.',
            data: null
        });
    }
    if(genre == null){
        return res.status(422).json({
            err: null,
            msg: 'genre is required.',
            data: null
        });
    } 
        database.query('SELECT * from movies where status = "PENDING" AND title= ? AND genre = ?'),
        [title,genre],function(error,results){
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
            } */
        
            var sqlQuery = 'UPDATE movies SET title=? ,genre= ? where movie_id=? AND status = "PENDING"';
            
            database.query(sqlQuery,[title,genre,req.params.movie_id],function(error,results){

                if (error) {
                    return next(error);
                }

                return res.status(200).json({
                    err: null,
                    msg: 'Booking Request has been completed successfully.',
                    data: results
                });

            });
        
    }

var database = require('../config/db-connection');


//Movie Controllers should be implemented here
//DONT FORGET TO USE MODULE exports
//DONT FORGET TO ADD IT IN THE ROUTES

module.exports.addMovie = function(req,res,next){
   var sql = "INSERT INTO Movies VALUES ?"; 
   var values = [];  //TODO HTTP REQUEST FROM FRONT END WITH VALUES OF INSERTION

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

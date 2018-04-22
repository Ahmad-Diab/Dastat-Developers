// OUR DATABASE IS HERE
var database = require('../config/db-connection');






////////////////////////////////////////// DON'T FORGET TO USE MODULE EXPORT ////////////////////////////////////////



////////////////////////////////////////////// VIEW ALL CINEMAS MODULES //////////////////////////////////////////////


















////////////////////////////////////////////// ADD ALL CINEMAS MODULES //////////////////////////////////////////////
module.exports.addCinema = function(req,res,next){

    var 
        location = req.body['location'],
        address = req.body['address'],
        name = req.body['name'],
        number_of_halls = req.body['number_of_halls'],
        is3D = req.body['is3D'],
        is4D = req.body['is4D'],
        company = req.body['company'],
        imagePath = req.body['imagePath'],
        imagePath2 = req.body['imagePath2'];

    var query = 'INSERT INTO cinemas (location,address,name,number_of_halls,is3D,is4D,company,imagePath,imagePath2) VALUES (?,?,?,?,?,?,?,?,?)';

    database.query(query,[location,address,name,number_of_halls,is3D,is4D,company,imagePath,imagePath2],function(error, results, fields){
        if(error){
            return next(error);  
        } 
        return res.status(200).json({
            err: null,
            msg: 'The cinema is added successfully.',
            data: results
        });
    });
}
















////////////////////////////////////////////// EDIT ALL CINEMAS MODULES //////////////////////////////////////////////

module.exports.editCinema = function(req, res, next){
    var location = req.params.location;
    var name = req.params.name;
    database.query('select * from cinemas where location = ? AND name = ? ',[location,name], function(err, results, fields) {
    if(err) return next(err);
    console.log(results[0].imagePath2, name);


    var address = req.body.address;
    var number_of_halls = req.body.number_of_halls;
    var is3D=req.body.is3D;
    var is4D=req.body.is4D;
    var company = req.body.company;
    var image_path = req.body.image_path;
    var image_Path2=req.body.image_Path2;
    console.log(req.body.image_path,image_Path2);
    

    if(!address){
      address=results.address;
    }
    if(!number_of_halls){
        number_of_halls=results[0].number_of_halls;
      }
    if(!is3D){
        is3D=results[0].is3D;
      }
      if(!is4D){
        is4D=results[0].is4D;
      }

      if(!company){
        company=results[0].company;
      }
      if(!image_path){
        image_path=results[0].imagePath;
      }
      if(image_Path2='undefined'){
        image_Path2=results[0].imagePath2;
      }
      console.log(image_Path2);
      database.query('UPDATE cinemas SET address = ?, number_of_halls = ?, is3D = ? , is4D = ? , company = ? , imagePath = ?, imagePath2 = ? where location = ? and name = ? ' ,[address,number_of_halls,is3D ,is4D, company,image_path,image_path2, location,name], function(err, results, fields) {
        if(err) return next(err); 
        return res.send(results);
          });
    });
    
    
    
  
   
}








////////////////////////////////////////////// DELETE ALL CINEMAS MODULES //////////////////////////////////////////////

module.exports.deleteCinemaForAdmin = function(req, res, next){
    var cinema = req.params.cinema;
    var owner = req.params.owner;
    database.query('DELETE FROM TABLE admins_cinemas WHERE admin = ? AND cinema_name = ?', [owner, cinema], function(error, results, fields){
        if(error) return next(error);
        return res.send(results);
    } );
}

// OUR DATABASE IS HERE
var database = require('../config/db-connection');






////////////////////////////////////////// DON'T FORGET TO USE MODULE EXPORT ////////////////////////////////////////
////////////////////////////////////////////// ADD ALL CINEMAS MODULES //////////////////////////////////////////////
module.exports.addCinema = function(req,res,next){

    console.log('sssss');
    console.log(req.body[0]);
    console.log(req.body[0]);

    var 
        location = req.body[1],
        address = req.body[2],
        name = req.body[0],
        number_of_halls = req.body[3],
        is3D = req.body[4],
        is4D = req.body[5],
        company = req.body[6],
        imagePath = req.body[7],
        imagePath2 = req.body[8];
        if (is3D=="0"){
            is3D=false;
        }else{
          is3D=true;
        }
        if(is4D=="0"){
          is4D=false;
        }else{
        is4D=true;
        }
    var query = 'INSERT INTO cinemas (location,address,name,number_of_halls,is3D,is4D,company,imagePath,imagePath2) VALUES (?,?,?,?,?,?,?,?,?)';

    database.query(query,[location,address,name,number_of_halls,Boolean(is3D),Boolean(is4D),company,imagePath,imagePath2],function(error, results, fields){
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
    console.log(req.body);
    database.query('select * from cinemas where location = ? AND name = ? ',[location,name], function(err, results, fields) {
    if(err) return next(err);
  //  console.log(results[0].imagePath2, name);

    var address = req.body.address;
    var number_of_halls = req.body.number_of_halls;
    var is3D=req.body.is3D;
    var is4D=req.body.is4D;
    var company = req.body.company;
    var imagePath = req.body.imagePath;
    var imagePath2=req.body.imagePath2;
   // console.log(imagePath,imagePath2);
    
    if(!address){
      address=results[0].address;
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
      if(!imagePath){
        imagePath=results[0].imagePath;
      }
      if(!imagePath2){
        imagePath2=results[0].imagePath2;
      }
      if (is3D==0){
          is3D=false;
      }else{
        is3D=true;
      }
      if(is4D==0){
        is4D=false;
      }else{
      is4D=true;
      }
     // console.log(is3D);
     // console.log(is4D);
     // console.log(imagePath2);
      database.query('UPDATE cinemas SET address = ?, number_of_halls = ?, is3D = ? , is4D = ? , company = ? , imagePath = ?, imagePath2 = ? where location = ? and name = ? ' ,[address,number_of_halls,Boolean(is3D) ,Boolean(is4D), company,imagePath,imagePath2, location,name], function(err, results, fields) {
        if(err) return next(err); 
        return res.send(results);
          });
    });   
}
////////////////////////////////////////////// DELETE ALL CINEMAS MODULES //////////////////////////////////////////////

module.exports.deleteCinemaForAdmin = function(req, res, next){
    var name    = req.params.name;
    var location= req.params.location;
    database.query('DELETE FROM cinemas WHERE name = ? AND location = ?', [name, location], function(error, results, fields){
        if(error) return next(error);
        // console.log("HERE!");
        res.status(200).json({
            err : null,   
            msg : "Deleted Sucessfully!",
            data : results
        });
    });
}

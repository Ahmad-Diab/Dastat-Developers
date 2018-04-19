var database = require('../config/db-connection');

module.exports.getSeats = function(req, res, next){
    database.query('SELECT L.encoded FROM halls H inner join layout L ON H.layout=L.id WHERE H.cinema_location =? AND H.cinema_name=? AND H.hall_number=?',[req.query.cinema_location,req.query.cinema_name,req.query.hall_number] ,function (error, layout, fields) {
      if(error) return next(error);
      database.query('SELECT seat_number FROM tickets WHERE cinema_location =? AND cinema_name=? AND hall=? AND date=? AND time=?',[req.query.cinema_location,req.query.cinema_name,req.query.hall_number,req.query.date,req.query.time] ,function (error, seats, fields){
        layout = layout[0];
        var output={ layout, seats };
        return res.send( output );
      })
    });
}

//TODO:: CRUD Operations for layout table.
module.exports.addSeats = function(req, res, next){
  var layout={
    id: req.body.id,
    encoded: req.body.encoding,
    name: req.body.name
  }  
  database.query('INSERT INTO layout SET ?', layout,function (error, layout, fields){
      if(error) return next(error);
      console.log("Layout Added Successfully");
      console.log("layout");
    });
}


module.exports.updateSeats = function(req, res, next){  
  database.query('UPDATE layout SET encoded = ?, name = ? where id = ? ',[req.body.encoding, req.body.name, req.body.id], function (error, layout, fields){
      if(error) return next(error);
      console.log("Layout Updated Successfully");
      console.log("layout");
    });
}


module.exports.addSeats = function(req, res, next){
  database.query('DELETE FROM layout where id = ?', req.body.id, function (error, layout, fields){
      if(error) return next(error);
      console.log("Layout Deleted Successfully");
      console.log("layout");
    });
}
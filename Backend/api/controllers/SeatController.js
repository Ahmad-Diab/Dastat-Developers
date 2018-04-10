var database = require('../config/db-connection');

module.exports.getSeats = function(req, res, next){
    database.query('SELECT L.encoded FROM halls H inner join layout L ON H.layout=L.id WHERE H.cinema_location =? AND H.cinema_name=? AND H.hall_number=?',[req.query.cinema_location,req.query.cinema_name,req.query.hall_number] ,function (error, layout, fields) {
      if(error) return next(error);
      database.query('SELECT seat_number FROM tickets WHERE cinema_location =? AND cinema_name=? AND hall=? AND date_time=?',[req.query.cinema_location,req.query.cinema_name,req.query.hall_number,req.query.datetime] ,function (error, seats, fields){
        layout = layout[0];
        var output={ layout, seats };
        return res.send( output );
      })
    });
}

//TODO:: CRUD Operations for layout table.
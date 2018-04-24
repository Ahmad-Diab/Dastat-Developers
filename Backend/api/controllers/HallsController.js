var database = require('../config/db-connection');



module.exports.getAllHalls = function(req, res, next){
    database.query("SELECT h.*,l.name as layout_name FROM `halls` h inner join `layout` l on h.layout = l.id ", function(error, hall, field){
        if(error) return next(error);
        return res.send(hall);
    });
}

module.exports.getHall = function(req, res, next){
  database.query("SELECT h.*,l.name as layout_name FROM `halls` h inner join `layout` l on h.layout = l.id where h.cinema_location = ? AND h.cinema_name = ? AND h.hall_number = ?", [req.body.cinema_location, req.body.cinema_location, req.body.hall_number],function(error, hall, field){
      if(error) return next(error);
      return res.send(hall);
  });
}

module.exports.getHalls = function(req, res, next){
  database.query("SELECT h.*,l.name as layout_name FROM `halls` h inner join `layout` l on h.layout = l.id ", function(error, hall, field){
      if(error) return next(error);
      return res.send(hall);
  });
}


module.exports.addHall = function(req, res, next){
    var hall = {
        cinema_location : req.body.cinema_location,
        cinema_name     : req.body.cinema_name,
        hall_number     : req.body.hall_number,
        type            : req.body.type,
        layout          : req.body.layout,
        number_of_seats : req.body.number_of_seats,
        movie : null
      }
      console.log(hall);
      database.query('INSERT INTO halls SET ?', hall, function(error, hall, fields){
          if(error) return next(error);
          res.status(200).json({
            msg: 'Hall Added Successfully',
          });
      });
}

module.exports.updateHall = function (req, res, next) {
    database.query('UPDATE halls SET type = ?, layout = ? where cinema_name = ? AND cinema_location = ? AND hall_number = ?', [req.body.type, req.body.layout, req.body.cinema_name, req.body.cinema_location, req.body.hall_number], function (error, layout, fields) {
      if (error) return next(error);
      res.status(200).json({
        msg: 'Hall Updated Successfully',
      });
    });
  }


  module.exports.deleteHall = function (req, res, next) {
    database.query('DELETE FROM halls where cinema_name = ? AND cinema_location = ? AND hall_number = ?', [req.body.cinema_name, req.body.cinema_location, req.body.hall_number], function (error, layout, fields) {
      if (error) return next(error);
      res.status(200).json({
        msg: 'Hall Deleted Successfully',
      });
    });
  }
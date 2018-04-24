var database = require('../config/db-connection');

module.exports.getSeats = function (req, res, next) {
  database.query('SELECT L.encoded FROM halls H inner join layout L ON H.layout=L.id WHERE H.cinema_location =? AND H.cinema_name=? AND H.hall_number=?', [req.query.cinema_location, req.query.cinema_name, req.query.hall_number], function (error, layout, fields) {
    if (error) return next(error);
    database.query('SELECT seat_number FROM tickets WHERE cinema_location =? AND cinema_name=? AND hall=? AND date=? AND time=?', [req.query.cinema_location, req.query.cinema_name, req.query.hall_number, req.query.date, req.query.time], function (error, seats, fields) {
      layout = layout[0];
      var output = {
        layout,
        seats
      };
      return res.send(output);
    })
  });
}

//TODO:: CRUD Operations for layout table.
module.exports.distinctLocations =  function(req,res,next)
{
  database.query('SELECT DISTINCT location FROM cinemas', function(error, locations, fields){
    if(error) return next(error);
    res.send(locations);
  })
}

module.exports.getCinemaName =  function(req,res,next)
{
  database.query('SELECT name FROM cinemas where location = ?', [req.query.cinema_location] ,function(error, cinemas, fields){
    if(error) return next(error);
    res.send(cinemas);
  })
}

module.exports.getLayout = function(req,res,next)
{
  database.query('SELECT * FROM layout where id = ?',req.params.id,function(error, layout, fields){
    if(error) return next(error);
    res.send(layout);
  })
}

module.exports.minifiedLayout = function(req,res,next)
{
  database.query('SELECT id, name FROM layout',function(error, layout, fields){
    if(error) return next(error);
    res.send(layout);
  })
}

module.exports.getAllLayouts = function(req,res,next)
{
  database.query('SELECT * FROM layout',req.params.id,function(error, layout, fields){
    if(error) return next(error);
    res.send(layout);
  })
}

module.exports.addLayout = function (req, res, next) {
  console.log(req.headers);

  var layout = {
    encoded: req.body.encoding,
    name: req.body.name
  }
  database.query('INSERT INTO layout SET ?', layout, function (error, layout, fields) {
    if (error) return next(error);
    res.status(200).json({
      msg: 'Layout Added Successfully',
    });
  });
}


module.exports.updateLayout = function (req, res, next) {
  database.query('UPDATE layout SET encoded = ?, name = ? where id = ? ', [req.body.encoding, req.body.name, req.body.id], function (error, layout, fields) {
    if (error) return next(error);
    res.status(200).json({
      msg: 'Layout Updated Successfully',
    });
  });
}


module.exports.deleteLayout = function (req, res, next) {
  database.query('DELETE FROM layout where id = ?', req.body.id, function (error, layout, fields) {
    if (error) return next(error);
    res.status(200).json({
      msg: 'Layout Deleted Successfully',
    });
  });
}
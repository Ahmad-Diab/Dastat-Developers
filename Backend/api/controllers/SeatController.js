var database = require('../config/db-connection');

module.exports.getSeats = function(req, res, next){

    console.log(req.params);

    database.query('SELECT L.encoded FROM halls H inner join layout L ON H.layout=L.id WHERE H.cinema_location =? AND H.cinema_name=? AND H.hall_number=?',[req.headers["cinema_location"],req.headers["cinema_name"],req.headers["hall_number"]] ,function (error, results, fields) {
      if(error) return next(error);
      return res.send(results);
    });
}

// module.exports.getSeats = function(req, res, next){
//     database.query('',[req.body.cinema["cinema_location"],req.body.cinema["cinema_name"],req.body.cinema["hall_number"]] ,function (error, results, fields) {
//       if(error) return next(error);
//       return res.send(results);
//     });
// }

module.exports.test = function(req, res, next) {
    console.log(req.body);
}
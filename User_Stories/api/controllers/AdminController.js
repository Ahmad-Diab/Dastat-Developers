var database = require('../config/db-connection');

//Admin Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

module.exports.getAdmins = function(req, res, next){
  database.query('SELECT * FROM Admins', function (error, results, fields) {
    if(error) return next(error);
    return res.send(results);
  });
}

var database = require('../config/db-connection');

//User Controllers should be implemented here
//DONT FORGET TO USE MODULE exports

module.exports.getUsers = function(req, res, next){
  database.query('SELECT * FROM users', function (error, results, fields) {
    if(error) return next(error);
    return res.send(results);
  });
<<<<<<< HEAD
};
=======
}

module.exports.test = function(req, res, next) {
  console.log(req.body);
}
>>>>>>> 7d7fb693d707cb3acbd98993e2a12fe6b731c8d7

/**
 * A Controller, having the functions to handle ordinary user booking process.
 */
var database = require('../config/db-connection'),
    Validations = require('../utils/validations');


/**
 *  A function to show parties to ordinary user based on his/her choice of
 *  Movie, Cinema, as well as Date (Day).
 * @param req
 * @param res
 */
module.exports.getParties = function(req, res){
    //TODO Get parties of movies just chosen according to chosen day
    var cinemaName = req.params.cinemaName,
        movieName = req.params.movieName;
        date = req.params.date;
    var query = "SELECT h.cinema_name , m.title,h.hall_number , p.date_time , h.number_of_seats FROM Halls h JOIN Parties p ON h.hall_number = p.hall JOIN Movies m ON m.movie_id = h.movie WHERE h.cinema_name = ? AND h.movie = ? AND DATE(p.date_time) = ?";

        database.query(query,[cinemaName,movieName,date],function (err, result, fields) {
            if (err) throw err;
            return res.send(result);
          });
};


/**
 * A function to handle making the reservation of (one or more) tickets
 * to a movie in a cinema at the end of the booking process.
 * @param req
 * @param res
 * @param next
 */
module.exports.makeReservation = function(req, res, next){
    //COMPLETED Make a reservation based on all data need for reservation.
    //TODO User-name validation needs to be done!

    var username = req.body['username'],
        cinema_name = req.body['cinema_name'],
        cinema_location = req.body['cinema_location'],
        party_datetime = req.body['date_time'],
        hall = req.body['hall'],
        payment = req.body['payment'],
        tickets = req.body['tickets'],
        tickets_price = req.body['price'],
        movie = req.body['movie'];

    if(!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }

    if(!cinema_name || !cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema data is required.',
            data: null
        });
    }

    if(!party_datetime || !hall || !movie) {
        return res.status(422).json({
            err: null,
            msg: 'Party data is required.',
            data: null
        });
    }

    if(!tickets || !payment || !tickets_price) {
        return res.status(422).json({
            err: null,
            msg: 'Tickets data is required.',
            data: null
        });
    }

    if(!Validations.isBoolean(payment) ||
        !Validations.isNumber(hall)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    /*
    // Verify that hall exists in Cinema, and retrieve movie
    var hallDetails = {
        hall_number: hall,
        cinema_location: cinema_location,
        cinema_name: cinema_name
    };

    var movieData = null;
    database.query('SELECT movie FROM halls WHERE ?',
        hallDetails, function (error, results) {
        if (error) {
            return next(error);
        }
        movieData = results;
    });
    /*
    if(movieData || !movieData.length) {
        return res.status(404).send({
            err: "The assigned hall does not exist.",
            msg: null,
            data: null
        })
    }*/

    var success = true;

    for( var i = 0; i< tickets.length; i++) {
        var seatNum = tickets[i];

        //TODO seatNum type validation
        var ticketDetails = {
            user: username,
            payment: payment,
            seat_number: seatNum,
            date_time: party_datetime,
            hall: hall,
            cinema_location: cinema_location,
            cinema_name: cinema_name,
            price: tickets_price,
            movie_id: movie
        };

        database.query('INSERT INTO Tickets SET ?', ticketDetails, function (error, results) {
            if (error) {
                return next(error);
            }
            success = true;
        });
    }

    if(success) {
        res.status(200).json({
            err: null,
            msg: 'Booking Request has been completed successfully.',
            data: req.body
        });
    }

};


/**
 *  Get Current Movies..
 * @param req
 * @param res
 * @param next
 */
module.exports.getCurrentMovies = function(req, res, next){

    var currentDate = new Date();

    var sqlSelectionFromMovies = 'SELECT * FROM Movies WHERE release_date <= ?';

    database.query(sqlSelectionFromMovies,[currentDate], function (error, results) {
        if(error){
            return next(error);
        }

        if(results.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No current movies availiable',
                data: results
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

    });
};


module.exports.getUpcomingMovies = function(req, res, next){

    var currentDate = new Date();

    var sqlSelectionFromMovies = 'SELECT * FROM Movies WHERE release_date > ?';

    database.query(sqlSelectionFromMovies,[currentDate], function (error, results) {
        if(error){
            return next(error);
        }

        if(results.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No Upcoming movies availiable',
                data: results
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

        res.status(200).json({
            err: null,
            msg: 'Movies Successfully Retrieved',
            data: results
        });

    });
};


module.exports.getBookings = function(req, res, next){
    
        var username = req.params.username;
        
        var sqlBookings = 'SELECT reservation_id,seat_number,date_time,hall,cinema_location,cinema_name FROM tickets WHERE user=?';
    
        database.query(sqlBookings,[username], function (error, results) {
            if(error){
                return next(error);
            }
    
            res.status(200).json({
                err: null,
                msg: 'Bookings Successfully Retrieved',
                data: results
            });
    
        });
    };

module.exports.getCurrentMoviesForCinema = function(req, res, next){

    var cinemaName = req.params.cinema_name;
    var cinemaLocation = req.params.cinema_location;
    var currentDate = new Date();

    if(!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Name is required.',
            data: null
        });
    }

    if(!cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Location is required.',
            data: null
        });
    }

    var sqlSelection = 'SELECT * FROM movies m , movies_in_cinemas mc  WHERE mc.cinema_name = ? AND mc.cinema_location = ? AND mc.movie = m.movie_id'+
    'AND m.release_date <= ?';

    database.query(sqlSelection, [cinemaName , cinemaLocation , currentDate], function (error, results) {
        if(error){
            return next(error);
        }

        if(results.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No current movies Availiable.',
                data: results
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

    });
  };

  module.exports.getUpcomingMoviesForCinema = function(req, res, next){

    var cinemaName = req.params.cinema_name;
    var cinemaLocation = req.params.cinema_location;
    var currentDate = new Date();

    if(!cinemaName) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Name is required.',
            data: null
        });
    }

    if(!cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema Location is required.',
            data: null
        });
    }

    var sqlSelection = 'SELECT * FROM movies m , movies_in_cinemas mc  WHERE mc.cinema_name = ? AND mc.cinema_location = ? AND mc.movie = m.movie_id'+
    'AND m.release_date > ?';

    database.query(sqlSelection, [cinemaName, cinemaLocation, currentDate], function (error, results) {
        if(error){
            return next(error);
        }

        if(results.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No Upcoming Movies Availible.',
                data: results
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Movies Successfully Retrieved',
                data: results
            });

        }

    });
  };

module.exports.usePromoCode = function(req, res, next){
  var oldPrice = req.body.price;
  var promocode = req.body.code;
  var cinemaName = req.body.name;
  var cinemaLocation = req.body.location;
  /*var oldPrice = 2000;
  console.log(oldPrice);
  var promocode = '1H4H1LS0W';
  var cinemaName = 'Pharoahs Cinema';
  var cinemaLocation = 'Al Haram';*/
  database.query('SELECT promocode FROM Promocodes_Cinemas WHERE promocode = ? AND cinema_name = ? AND cinema_location = ?',
  [promocode, cinemaName, cinemaLocation], function (error, results, fields) {
    if(error) return next(error);
    if(results.length == 0){
        return res.status(404).send({
          "error": "This cinema does not have this promocode",
          "msg": null,
          "data": null
        });
    }
    if(results.length !== 1){
      return res.status().send("Error in database")
    }
    database.query('SELECT promocode, type, value FROM Promocodes WHERE promocode = ?', [promocode], function (error, results, fields) {
    var type = results[0].type;
    var value = results[0].value;
    if(type == "percentage") {
      var newPrice = oldPrice - (oldPrice * parseFloat(value)/100);
      return res.status(200).send({
        "error": null,
        "msg": "Promocode success",
        "data":{
          "price": newPrice,
          "description": value +" percent has been deducted from the original price."
        }
      });
    } else if(type == "amount") {
      var newPrice = oldPrice - value;
      if(newPrice < 0) {
        newPrice = 0;
        return res.status(200).send({
          "error": null,
          "msg": "Promocode success",
          "data":{
            "price": newPrice,
            "description": "The discount is larger than the original price, so new price is 0."
          }
        });
      }
      return res.status(200).send({
        "error": null,
        "msg": "Promocode success",
        "data":{
          "price": newPrice,
          "description": value +" EGP has been deducted from the original price."
        }
      });
    } else {
      return res.status(200).send({
        "error": null,
        "msg": "Promocode success",
        "data":{
          "price": oldPrice,
          "description": value
        }
      });
    }
  });
})};

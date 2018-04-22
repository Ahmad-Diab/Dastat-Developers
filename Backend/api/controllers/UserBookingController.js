/**
 * A Controller, having the functions to handle ordinary user booking process.
 */
let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

/**
 * A function to show the cinemas showing the requested movie
 *
 * @param req, data of a movie
 * @param res, data of all cinemas which have the movie available
 */
module.exports.getCinemasForThatMovie = function(req, res){
    let movie_id = req.params['movie_id'];

    if(!movie_id) {
        return res.status(422).json({
            err: null,
            msg: 'movie_id is required.',
            data: null
        });
    }

    let sql = "SELECT C.* FROM cinemas C , halls H WHERE C.name = H.cinema_name AND C.location = H.cinema_location AND H.movie = ?";

    database.query(sql,[movie_id],function (err, result) {
        if (err) throw err;
        //return res.send(result);
        if(result.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No cinemas show this movie',
                data: result
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Cinemas Successfully Retrieved',
                data: result
            });

        }
    });
};


/**
 *  A function to show parties to ordinary user based on his/her choice of
 *  Movie, Cinema, as well as Date (Day).
 * @param req
 * @param res
 */
module.exports.getParties = function(req, res){
    let cinemaName = req.params['cinemaName'],
        movieName = req.params['movieName'],
        date = req.params['date'],
        cinemaLocation = req.params['cinemaLocation'];

    /*
    console.log(cinemaName + " : cinemaName");
    console.log(movieName + " : movieName");
    console.log(date + " : date");
    console.log(cinemaLocation + " : cinemaLocation");
    */

    if(!cinemaName || !cinemaLocation) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema data is required.',
            data: null
        });
    }

    if(!date) {
        return res.status(422).json({
            err: null,
            msg: 'Party data is required.',
            data: null
        });
    }

    // Validations of correct types
    if(!Validations.isString(cinemaName) ||
        !Validations.isString(cinemaLocation) ||
        !Validations.isNumber(movieName)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    console.log('data passed all validations');
    //let query = 'SELECT h.cinema_location, h.cinema_name, h.hall_number, h.type, h.number_of_seats, h.movie, p.date_time, m.title, DATE_FORMAT(p.date_time, "%H:%i") AS time FROM Halls h JOIN Parties p ON h.hall_number = p.hall AND h.cinema_location = p.cinema_location AND h.cinema_name = p.cinema_name JOIN Movies m ON h.movie = m.movie_id'
    //+' WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = ? AND DATE(p.date_time) < DATE_ADD(CURRENT_DATE, INTERVAL 4 DAY) AND DATE(p.date_time) > DATE_ADD(CURRENT_DATE, INTERVAL -1 DAY)';
    //+' WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = ? AND DATE(p.date_time) = ?';

    let query = 'SELECT * FROM halls h JOIN parties p ON h.hall_number = p.hall AND h.cinema_location = p.cinema_location AND h.cinema_name = p.cinema_name'
    +' WHERE h.cinema_name = ? AND h.cinema_location = ? AND h.movie = ? AND DATE(p.date) = ?';
    //AND DATE(p.date_time) < DATE_ADD(CURRENT_DATE, INTERVAL 4 DAY) AND DATE(p.date_time) > DATE_ADD(CURRENT_DATE, INTERVAL -1 DAY)';

    console.log(cinemaName + 'getParties');

    database.query(query,[cinemaName , cinemaLocation ,movieName, date],function (err, result) {

        if (err) throw err;

        if(!result.length){
            res.status(200).json({
                err: null,
                msg: 'No parties for this movie at this date',
                data: null  // null instead of result
            });

        } else {

            res.status(200).json({
                err: null,
                msg: 'Parties Successfully Retrieved',
                data: result
            });

        }
      });
};


/**
 * A function to handle making the reservation of (one or more) tickets
 * to a movie in a cinema at the end of the booking process.
 * @param req, required data for processing the request of making the reservation
 * @param res, results of changes on the tickets table in database
 * @param next, next middleware to handle errors
 */
module.exports.makeReservation = function(req, res, next){

    let username = req.body['username'],
        cinema_name = req.body['cinema_name'],
        cinema_location = req.body['cinema_location'],
        party_date = req.body['date'],
        party_time = req.body['time'],
        hall = req.body['hall'],
        movie = req.body['movie'],
        payment = req.body['payment'],
        tickets = req.body['tickets'],
        tickets_price = req.body['price'],
        numOfTickets = tickets.length,
        comment = req.body['comment'];

    console.log(req.body);
    // Null Checkers
    if(!username) {
        return res.status(422).json({
            err: null,
            msg: 'Username is required.',
            data: null
        });
    }
    console.log('passed user check');
    if(!cinema_name || !cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema data is required.',
            data: null
        });
    }
    console.log('passed party cinema check');
    if(!party_date || !party_time) {
        return res.status(422).json({
            err: null,
            msg: 'Party data-time is required.',
            data: null
        });
    }

    console.log('passed party check');
    if(!hall || !movie) {
        return res.status(422).json({
            err: null,
            msg: 'Party hall and movie are required.',
            data: null
        });
    }

    console.log('passed hall & movie check');
    if(!tickets || !tickets_price) {
        return res.status(422).json({
            err: null,
            msg: 'Tickets data is required.',
            data: null
        });
    }
    console.log('passed tickets check');
    // Validations of correct types
    if(!Validations.isBoolean(payment) ||
        !Validations.isNumber(hall) ||
        !Validations.isNumber(tickets_price)) {

        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    console.log('passed validations check');
    // Verify that movie exists in hall
    // Verify that hall exists in Cinema, and retrieve movie
    database.query('SELECT movie FROM halls WHERE hall_number = ? AND cinema_location = ? AND cinema_name = ?',
        [hall, cinema_location, cinema_name],function (error, results) {
            if (error) {
                console.log('error selecting from halls the movie');
                return next(error);
            }
            console.log(results);
            if(!results || !results.length) {
                return res.status(404).send({
                    err: null,
                    msg: "The assigned hall does not exist.",
                    data: null
                });
            }

            let values = [];
            for(let i = 0; i< numOfTickets; i++) {
                let seatNum = tickets[i];
                let ticket_details = [username,payment,seatNum,party_date,party_time,hall,cinema_location, cinema_name,
                    tickets_price, movie, comment];
                values.push(ticket_details);
            }

            let sqlQuery = 'INSERT INTO tickets (user,payment,seat_number,date,time,hall,cinema_location,cinema_name,price,movie_id,comment) VALUES ?';

            database.query(sqlQuery,[values], function (error, results) {
                if (error) {
                    return next(error);
                }

                return res.status(200).json({
                    err: null,
                    msg: 'Booking Request has been completed successfully.',
                    data: results
                });

            });
        });

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

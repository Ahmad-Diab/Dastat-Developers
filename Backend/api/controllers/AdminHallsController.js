/**
 * A Controller, having the functions to handle admin user processes.
 */
var database = require('../config/db-connection'),
    Validations = require('../utils/validations');

/**
 * A function to show the halls of the requested cinema
 *
 * @param req, data of a cinema
 * @param res, data of all halls which are available in thisc cinema
 */
module.exports.getHallsForThatCinema = function(req, res){
    var cinema_name = req.params['cinema_name'];
    var cinema_location = req.params['cinema_location'];

    if(!cinema_name) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema name is required.',
            data: null
        });
    }

    if(!cinema_location) {
        return res.status(422).json({
            err: null,
            msg: 'Cinema location is required.',
            data: null
        });
    }

    var sql = "SELECT h.* FROM cinemas c , halls h WHERE c.name = h.cinema_name AND c.location = h.cinema_location AND c.name = ? AND c.location = ?";

    database.query(sql,[cinema_name , cinema_location],function (err, result) {
        if (err) throw err;
        //return res.send(result);
        if(result.length == 0){

            res.status(200).json({
                err: null,
                msg: 'No halls in this cinema',
                data: result
            });

        }
        else{

            res.status(200).json({
                err: null,
                msg: 'Halls Successfully Retrieved',
                data: result
            });

        }
    });
};

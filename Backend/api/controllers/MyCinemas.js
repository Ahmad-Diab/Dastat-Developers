// OUR DATABASE IS HERE
let database = require('../config/db-connection'),
    Validations = require('../utils/validations');


module.exports.addCinema = function (req, res, next) {
    let location = req.body[1],
        address = req.body[2],
        name = req.body[0],
        number_of_halls = req.body[3],
        is3D = req.body[4],
        is4D = req.body[5],
        company = req.body[6],
        imagePath = req.body[7],
        imagePath2 = req.body[8];

    let query = 'INSERT INTO cinemas (location,address,name,number_of_halls,is3D,is4D,company,imagePath,imagePath2) VALUES (?,?,?,?,?,?,?,?,?)';

    database.query(query, [location, address, name, number_of_halls, Boolean(is3D), Boolean(is4D), company, imagePath, imagePath2], function (error, results, fields) {
        if (error) {
            return next(error);
        }
        return res.status(200).json({
            err: null,
            msg: 'The cinema is added successfully.',
            data: results
        });
    });
};

module.exports.editCinema = function (req, res, next) {
    let location = req.params['location'],
        name = req.params['name'];

    database.query('select * from cinemas where location = ? AND name = ? ', [location, name], function (err, results) {
        if (err) return next(err);

        let address = req.body.address,
            number_of_halls = req.body.number_of_halls,
            is3D = req.body.is3D,
            is4D = req.body.is4D,
            company = req.body.company,
            imagePath = req.body.imagePath,
            imagePath2 = req.body.imagePath2;

        if (!address) {
            address = results[0].address;
        }
        if (!number_of_halls) {
            number_of_halls = results[0].number_of_halls;
        }
        if (!is3D) {
            is3D = results[0].is3D;
        }
        if (!is4D) {
            is4D = results[0].is4D;
        }

        if (!company) {
            company = results[0].company;
        }
        if (!imagePath) {
            imagePath = results[0].imagePath;
        }
        if (!imagePath2) {
            imagePath2 = results[0].imagePath2;
        }

        database.query('UPDATE cinemas SET address = ?, number_of_halls = ?, is3D = ? , is4D = ? , company = ? , imagePath = ?, imagePath2 = ? where location = ? and name = ? ', [address, number_of_halls, Boolean(is3D), Boolean(is4D), company, imagePath, imagePath2, location, name], function (err, results, fields) {
            if (err) return next(err);
            return res.send({
                err: null,
                msg: null,
                data: results
            });
        });
    });
};

/**
 * @param req, cinema_name & cinema_location in params
 * @param res
 * @param next
 */
module.exports.deleteCinema = function (req, res, next) {
    let name = req.params['cinema_name'],
        location = req.params['cinema_location'];

    if (!name) {
        return res.status(422).json({
            err: null,
            msg: 'cinema_name is required.',
            data: null
        });
    }

    if (!location) {
        return res.status(422).json({
            err: null,
            msg: 'cinema_location is required.',
            data: null
        });
    }

    if (!Validations.isString(name) ||
        !Validations.isString(location)) {

        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    database.query('DELETE FROM cinemas WHERE name = ? AND location = ?', [name, location], function (error, results) {
        if (error) return next(error);

        res.status(200).json({
            err: null,
            msg: "Deleted Successfully!",
            data: results
        });
    });
};

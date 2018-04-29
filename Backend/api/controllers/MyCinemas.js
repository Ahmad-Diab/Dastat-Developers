// OUR DATABASE IS HERE
let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

/**
 * @param req, cinema_name, cinema_location, address, num_of_halls, is3D, is4D, company,
 *      image_path_1 and image_path_2 in body
 * @param res
 * @param next
 */
module.exports.addCinema = function (req, res, next) {
    let name = req.body["name"],
        location = req.body["location"],
        address = req.body["address"],
        number_of_halls = req.body["number_of_halls"],
        is3D = req.body["is3D"],
        is4D = req.body["is4D"],
        company = req.body["company"],
        imagePath = req.body["imagePath"],
        imagePath2 = req.body["imagePath2"];

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
    if (!address) {
        return res.status(422).json({
            err: null,
            msg: 'address is required.',
            data: null
        });
    }
    if (!number_of_halls) {
        return res.status(422).json({
            err: null,
            msg: 'num_of_halls is required.',
            data: null
        });
    }
    if (is3D !== 1 && is3D !== 0){
        return res.status(422).json({
            err: null,
            msg: 'is3D must be 0 or 1.',
            data: null
        });
    }
    if (is4D !== 1 && is4D !== 0) {
        return res.status(422).json({
            err: null,
            msg: 'is4D must be 0 or 1.',
            data: null
        });
    }
    if (!company) {
        return res.status(422).json({
            err: null,
            msg: 'company is required.',
            data: null
        });
    }
    if (!imagePath) {
        return res.status(422).json({
            err: null,
            msg: 'image_path_1 is required.',
            data: null
        });
    }
    if (!imagePath2) {
        return res.status(422).json({
            err: null,
            msg: 'image_path_2 is required.',
            data: null
        });
    }

    if (!Validations.isString(name) ||  !Validations.isString(location) || !Validations.isString(address) ||
        !Validations.isNumber(number_of_halls) || !Validations.isNumber(is3D) || !Validations.isNumber(is4D)  ||
        !Validations.isString(company) || !Validations.isString(imagePath) || !Validations.isString(imagePath2)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    let query = 'INSERT INTO cinemas (location,address,name,number_of_halls,is3D,is4D,company,imagePath,imagePath2) VALUES (?,?,?,?,?,?,?,?,?)';
    database.query(query, [location, address, name, number_of_halls, Boolean(is3D), Boolean(is4D), company, imagePath, imagePath2], function (error, results) {
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

/**
 * @param req, cinema_name & cinema_location in params
 *              address, num_of_halls, is3D, is4D, company, image_path_1 and image_path_2 in body
 * @param res
 * @param next
 */
module.exports.editCinema = function (req, res, next) {
    let name = req.params['cinema_name'],
        location = req.params['cinema_location'];

    let address = req.body['address'],
        number_of_halls = req.body['number_of_halls'],
        is3D = req.body['is3D'],
        is4D = req.body['is4D'],
        company = req.body['company'],
        imagePath = req.body['imagePath'],
        imagePath2 = req.body['imagePath2'];

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
    if (!address) {
        return res.status(422).json({
            err: null,
            msg: 'address is required.',
            data: null
        });
    }
    if (!number_of_halls) {
        return res.status(422).json({
            err: null,
            msg: 'num_of_halls is required.',
            data: null
        });
    }
    if (is3D !== 1 && is3D !== 0){
        return res.status(422).json({
            err: null,
            msg: 'is3D must be 0 or 1.',
            data: null
        });
    }
    if (is4D !== 1 && is4D !== 0) {
        return res.status(422).json({
            err: null,
            msg: 'is4D must be 0 or 1.',
            data: null
        });
    }
    if (!company) {
        return res.status(422).json({
            err: null,
            msg: 'company is required.',
            data: null
        });
    }
    if (!imagePath) {
        return res.status(422).json({
            err: null,
            msg: 'image_path_1 is required.',
            data: null
        });
    }
    if (!imagePath2) {
        return res.status(422).json({
            err: null,
            msg: 'image_path_2 is required.',
            data: null
        });
    }


    if (!Validations.isString(name) ||  !Validations.isString(location) || !Validations.isString(address) ||
        !Validations.isNumber(number_of_halls) || !Validations.isNumber(is3D) || !Validations.isNumber(is4D)  ||
        !Validations.isString(company) || !Validations.isString(imagePath) || !Validations.isString(imagePath2)) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    database.query('SELECT * FROM cinemas WHERE location = ? AND name = ? ', [location, name], function (err, results) {
        if (err) return next(err);

        database.query('UPDATE cinemas SET address = ?, number_of_halls = ?, is3D = ? , is4D = ? , company = ? , imagePath = ?, imagePath2 = ? where location = ? and name = ? ', [address, number_of_halls, Boolean(is3D), Boolean(is4D), company, imagePath, imagePath2, location, name],
            function (err, results) {

            if (err) return next(err);

            return res.send({
                err: null,
                msg: "Cinema is edited successfully",
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

let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

//filter cinemas according to location
module.exports.filterByLocation = function (req, res, next) {
    let location = req.params.location,
        is3D = req.params.is3D,
        is4D = req.params.is4D;

    if (location === 'All') {
        if (is4D === 1 && is3D === 1) {
            database.query('SELECT * FROM cinemas WHERE is3D = ? or is4D = ?', [is3D, is4D], function (error, results) {
                if (error) return next(error);
                return res.status(200).send({
                    err: null,
                    msg: 'Cinemas are retrieved successfully.',
                    data: results
                });
            });
        }
        else if (is4D === 1 && is3D === 0) {
            database.query('SELECT * FROM cinemas WHERE is4D = ?', [is4D], function (error, results) {
                if (error) return next(error);
                return res.status(200).send({
                    err: null,
                    msg: 'Cinemas are retrieved successfully.',
                    data: results
                });
            });
        }
        else if (is4D === 0 && is3D === 1) {
            database.query('SELECT * FROM cinemas WHERE is3D = ?', [is3D], function (error, results) {
                if (error) return next(error);
                return res.status(200).send({
                    err: null,
                    msg: 'Cinemas are retrieved successfully.',
                    data: results
                });
            });
        }
        else {
            database.query('SELECT * FROM cinemas WHERE is3D = ? and is4D = ?', [is3D, is4D], function (error, results) {
                if (error) return next(error);
                return res.status(200).send({
                    err: null,
                    msg: 'Cinemas are retrieved successfully.',
                    data: results
                });
            });
        }
    }
    else if (is4D === 1 && is3D === 1) {
        database.query('SELECT * FROM cinemas WHERE location LIKE ? and (is3d = ? or is4D = ?)', [location, is3D, is4D],
            function (error, results) {
                if (error) return next(error);
                return res.status(200).send({
                    err: null,
                    msg: 'Cinemas are retrieved successfully.',
                    data: results
                });
            });
    }
    else if (is4D === 1 && is3D === 0) {
        database.query('SELECT * FROM cinemas WHERE location LIKE ? and is4D = ?', [location, is4D], function (error, results) {
            if (error) return next(error);
            return res.status(200).send({
                err: null,
                msg: 'Cinemas are retrieved successfully.',
                data: results
            });
        });
    }
    else if (is4D === 0 && is3D === 1) {
        database.query('SELECT * FROM cinemas WHERE location LIKE ? and is3D = ?', [location, is3D], function (error, results) {
            if (error) return next(error);
            return res.status(200).send({
                err: null,
                msg: 'Cinemas are retrieved successfully.',
                data: results
            });
        });
    }
    else {
        database.query('SELECT * FROM cinemas WHERE location LIKE ? and is3D = ? and is4D = ?', [location, is3D, is4D], function (error, results) {
            if (error) return next(error);
            return res.status(200).send({
                err: null,
                msg: 'Cinemas are retrieved successfully.',
                data: results
            });
        });
    }
};

//TODO not needed probably
/**
 * @param req, hallNumber in params
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.filterByHalls = function (req, res, next) {
    let hallNumber = req.params['hallNumber'];
    if (!hallNumber) {
        return res.status(422).send({
            err: null,
            msg: 'hallNumber is required.',
            data: null
        });
    }
    if (!Validations.isNumber(hallNumber)) {
        return res.status(422).send({
            err: null,
            msg: 'Data must be in valid types.',
            data: null
        });
    }

    database.query('SELECT * FROM cinemas WHERE number_of_halls LIKE ?', [hallNumber], function (error, results) {
        if (error) return next(error);
        return res.status(200).send({
            err: null,
            msg: 'Cinemas are retrieved successfully',
            data: results
        });
    });
};

//TODO NEEDED, do we need pagination
module.exports.ViewCinemas = function (req, res, next) {
    database.query('SELECT * FROM cinemas', function (error, results) {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            err: null,
            msg: 'Cinemas are retrieved successfully',
            data: results
        });
    });
};

//TODO NOT NEEDED Probably
/**
 * @param req, cinema and loc in params
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.viewCinema = function (req, res, next) {
    let cinema = req.params['cinema'];
    let loc = req.params['loc'];

    if (!cinema) {
        return res.status(422).send({
            err: null,
            msg: 'cinema is required.',
            data: null
        });
    }
    if (!loc) {
        return res.status(422).send({
            err: null,
            msg: 'location (loc) is required.',
            data: null
        });
    }

    if (!Validations.isString(cinema) || !Validations.isString(loc)) {
        return res.status(422).send({
            err: null,
            msg: 'Data must be in valid types.',
            data: null
        });
    }

    let q = "SELECT * FROM cinemas WHERE cinemas.name = ? and cinemas.location = ?";
    database.query(q, [cinema, loc], function (error, results) {

        if (error) return next(error);
        return res.status(200).send({
            err: null,
            msg: 'Cinema is retrieved successfully',
            data: results
        });
    });
};

//TODO is it needed, returning all history of movies in some cinema
/**
 * @param req, cinema, and loc in params
 * @param res
 * @param next
 * @returns {*}
 */
module.exports.moviesInCinema = function (req, res, next) {
    let cinema = req.params['cinema'];
    let loc = req.params['loc'];

    if (!cinema) {
        return res.status(422).send({
            err: null,
            msg: 'cinema is required.',
            data: null
        });
    }
    if (!loc) {
        return res.status(422).send({
            err: null,
            msg: 'location (loc) is required.',
            data: null
        });
    }

    if (!Validations.isString(cinema) || !Validations.isString(loc)) {
        return res.status(422).send({
            err: null,
            msg: 'Data must be in valid types.',
            data: null
        });
    }

    database.query('SELECT * FROM movies m INNER JOIN movies_in_cinemas x on m.movie_id = x.movie WHERE x.cinema_name = ? AND x.cinema_location = ? ',
        [cinema, loc], function (error, results) {
            if (error) {
                return next(error);
            }
            res.status(200).send({
                err: null,
                msg: 'Movies are retrieved successfully.',
                data: results
            });
        });
};

module.exports.DistinctLocation = function (req, res, next) {
    database.query('SELECT DISTINCT location FROM cinemas', function (error, results) {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            err: null,
            msg: 'Cinemas are retrieved successfully.',
            res: results
        });
    });
};
    

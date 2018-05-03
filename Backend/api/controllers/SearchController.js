let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

//Search Controllers should be implemented here

/**
 * Search on Movies, Cinemas, Actors using a search keyword
 * @param {*} req
 * @param {*} res The result of the function. res.data contains the result of the search which are: res.data.Movies, res.data.Cinemas, res.data.Actors
 * @param {*} next
 */
module.exports.searchByKeyword = function (req, res, next) {
    let start = req.params['start'],
        limit = req.params['limit'];

    if (!req.params['searchKeyword']) {
        return res.status(422).json({
            err: null,
            msg: 'searchKeyword must entered.',
            data: null
        });
    }
    if (!Validations.isString(req.params['searchKeyword'])) {
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    }

    let limitNotEnteredMsg = !(!start || !limit) ? "" : " - No limits have been entered.";

    let startNum, limitNum;
    if (start === '' || limit === '' ||
        !start || !limit) {
        // In case no limits entered, send just few.
        startNum = 0;
        limitNum = 10;
    } else {
        startNum = parseInt(start);
        limitNum = parseInt(limit);
    }

    let sqlMovie = 'SELECT movie_id,title,genre,imagePath,year,rating,duration FROM movies WHERE title LIKE ? OR genre LIKE ? OR cast LIKE ? OR year = ? ORDER BY title DESC limit ? OFFSET ?';
    let sqlCinema = 'SELECT * FROM cinemas WHERE name LIKE ? OR company LIKE ? OR location LIKE ? ORDER BY name limit ? OFFSET ?';
    let sqlActor = 'SELECT name,age,bio FROM actors WHERE name LIKE ? ORDER BY name limit ? OFFSET ?';
    let userAndLimitData = startNum;
    let searchKeyS = '%' + req.params['searchKeyword'] + '%';        // used in comparison to char columns using 'LIKE'
    let searchKeyN = req.params['searchKeyword'];                     // used in comparison to int columns using '='
    let sqlMovieData = [searchKeyS, searchKeyS, searchKeyS, searchKeyN, 20, userAndLimitData],
        sqlCinemaData = [searchKeyS, searchKeyS, searchKeyS,20, userAndLimitData],
        sqlActorData = [searchKeyS,20, userAndLimitData];

    let sqlMovieCount = 'SELECT count(*) AS TotalCount FROM movies WHERE title LIKE ? OR genre LIKE ? OR cast LIKE ? OR year = ?',
        sqlCinemaCount = 'SELECT count(*) AS TotalCount FROM cinemas WHERE name LIKE ? OR company LIKE ? OR location LIKE ?',
        sqlActorCount = 'SELECT count(*) AS TotalCount FROM actors WHERE name LIKE ?';
    let movieCountData = [searchKeyS, searchKeyS, searchKeyS, searchKeyN, searchKeyN],
        cinemaCountData = [searchKeyS, searchKeyS, searchKeyS, userAndLimitData],
        actorCountData = [searchKeyS, searchKeyS, searchKeyS, userAndLimitData];

    database.query(sqlMovieCount, movieCountData, function (err, moviesRows) {
        if (err)
            return err;
        let moviesTotalCount = moviesRows[0]['TotalCount'];

        database.query(sqlCinemaCount, cinemaCountData, function (err, cinemasRows) {
            if (err)
                return err;
            let cinemasTotalCount = cinemasRows[0]['TotalCount'];

            database.query(sqlActorCount, actorCountData, function (err, actorsRows) {
                if (err)
                    return err;
                let actorsTotalCount = actorsRows[0]['TotalCount'];

                database.query(sqlMovie, sqlMovieData,
                    function (error, movieResult) {
                        if (error) return next(error);
                        database.query(sqlCinema, sqlCinemaData, function (error, cinemaResult) {
                            if (error) return next(error);
                            database.query(sqlActor, sqlActorData, function (error, actorResult) {
                                if (error) return next(error);
                                res.status(200).json({
                                    err: null,
                                    msg: "Search done successfully" + limitNotEnteredMsg,
                                    data: {
                                        "Movies": movieResult,
                                        "MoviesTotalCount": moviesTotalCount,
                                        "Cinemas": cinemaResult,
                                        "CinemasTotalCount": cinemasTotalCount,
                                        "Actors": actorResult,
                                        "ActorsTotalCount": actorsTotalCount
                                    }
                                })
                            });
                        });
                    });
            });
        });
    });
};

module.exports.viewMovies = function (req, res, next) {
    database.query('SELECT * FROM Movies', function (error, results) {
        if (error) return next(error);
        return res.status(200).send({
            err: null,
            msg: 'data retrieved.',
            data: results
        });
    });
};

module.exports.viewMovies3 = function (req, res, next) {
    database.query('SELECT * FROM movies WHERE feature=3', function (error, results) {
        if (error) return next(error);
        console.log(results);
        return res.status(200).send({
            err: null,
            msg: 'data retrieved.',
            data: results
        });
    });
};

module.exports.viewMovies2 = function (req, res, next) {
    database.query('SELECT * FROM movies WHERE feature=2', function (error, results) {
        if (error) return next(error);
        return res.status(200).send({
            err: null,
            msg: 'data retrieved.',
            data: results
        });
    });
};

module.exports.viewMovies1 = function (req, res, next) {
    database.query('SELECT * FROM movies WHERE feature=1', function (error, results) {
        if (error) return next(error);
        return res.status(200).send({
            err: null,
            msg: 'data retrieved.',
            data: results
        });
    });
};

module.exports.viewMovies0 = function (req, res, next) {
    database.query('SELECT * FROM movies WHERE feature=0', function (error, results) {
        if (error) return next(error);
        return res.status(200).send({
            err: null,
            msg: 'data retrieved.',
            data: results
        });
    });
};

module.exports.getTopMovies = function (req, res, next) {
    database.query('SELECT * FROM `movies` WHERE feature = 3 ORDER BY rating DESC LIMIT 6',
        function (error, results) {
            if (error) return next(error);
            return res.status(200).send({
                err: null,
                msg: 'data retrieved.',
                data: results
            });
        });
};

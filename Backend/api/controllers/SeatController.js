let database = require('../config/db-connection'),
    Validations = require('../utils/validations');

module.exports.getSeats = function (req, res, next) { //gets the Layout of a Hall along with the Booked Seats in a certain Party
    
    console.log(req.query);

    if (!Validations.isString(req.query.cinema_location) ||
        !Validations.isString(req.query.cinema_name) ||
        !Validations.isNumber(req.query.hall_number) ||
        !Validations.isString(req.query.date) ||
        !Validations.isString(req.query.time))
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null,
            some: Validations.isString(req.query.date)
        });

    database.query('SELECT L.encoded FROM halls H inner join layout L ON H.layout=L.id WHERE H.cinema_location =? AND H.cinema_name=? AND H.hall_number=?',
        [req.query.cinema_location, req.query.cinema_name, req.query.hall_number],
        function (error, layout) {
            if (error) return next(error);
            database.query('SELECT seat_number FROM tickets WHERE cinema_location =? AND cinema_name=? AND hall=? AND date=? AND time=?',
                [req.query.cinema_location, req.query.cinema_name, req.query.hall_number, req.query.date, req.query.time],
                function (error, seats) {
                    layout = layout[0];
                    let output = {
                        layout,
                        seats
                    };
                    return res.send(output);
                })
        });
};

//TODO:: CRUD Operations for layout table.
module.exports.distinctLocations = function (req, res, next) //gets the different locations that has Cinemas
{
    database.query('SELECT DISTINCT location FROM cinemas', function (error, locations) {
        if (error) return next(error);
        res.send(locations);
    })
};

module.exports.getCinemaName = function (req, res, next) //gets the names of cinemas in a certain location
{
    if (!Validations.isString(req.query.cinema_location))
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    database.query('SELECT name FROM cinemas where location = ?', [req.query.cinema_location], function (error, cinemas) {
        if (error) return next(error);
        res.send(cinemas);
    })
};

module.exports.getLayout = function (req, res, next) //gets the structure of a certain layout
{
    if (!Validations.isNumber(req.params.id))
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    database.query('SELECT * FROM layout where id = ?', req.params.id, function (error, layout) {
        if (error) return next(error);
        res.send(layout);
    })
};

module.exports.minifiedLayout = function (req, res, next) //gets a layout with only id and name (Without the Encoding)
{
    database.query('SELECT id, name FROM layout', function (error, layout) {
        if (error) return next(error);
        res.send(layout);
    })
};

module.exports.getAllLayouts = function (req, res, next) {
    database.query('SELECT * FROM layout', function (error, layout) {
        if (error) return next(error);
        res.send(layout);
    })
};

// CRUD operations for the LAYOUTS

module.exports.addLayout = function (req, res, next) { //adds a new layout
    if (!Validations.isString(req.body.name) || !Validations.isString(req.body.encoded))
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    let layout = {
        encoded: req.body.encoded,
        name: req.body.name
    };
    database.query('INSERT INTO layout SET ?', layout, function (error) {
        if (error) return next(error);
        res.status(200).json({
            msg: 'Layout Added Successfully',
        });
    });
};

module.exports.updateLayout = function (req, res, next) {
    if (!Validations.isString(req.body.name) || !Validations.isString(req.body.encoded) || !Validations.isNumber(req.body.id))
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    database.query('UPDATE layout SET encoded = ?, name = ? where id = ? ',
        [req.body.encoded, req.body.name, req.body.id], function (error) {
            if (error) return next(error);
            res.status(200).json({
                msg: 'Layout Updated Successfully',
            });
        });
};


module.exports.deleteLayout = function (req, res, next) {
    if (!Validations.isNumber(req.body.id))
        return res.status(422).json({
            err: null,
            msg: 'Provided data must be in valid types.',
            data: null
        });
    database.query('DELETE FROM layout where id = ?', req.body.id, function (error) {
        if (error) return next(error);
        res.status(200).json({
            msg: 'Layout Deleted Successfully',
        });
    });
};
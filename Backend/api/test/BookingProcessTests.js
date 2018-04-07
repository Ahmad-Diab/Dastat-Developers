//process.env.Node_ENV = 'test';

require('chai/register-should');  // Using Should style

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');

chai.use(chaiHttp);
describe('Booking Tickets', () => {
    beforeEach((done) => {});
    /**
     * Reserving multiple tickets
     */
    describe('/POST tickets', () => {
        it('it should POST (make Reservations)', (done) => {
            let bookingDetails = {
                "username": "mai_emad",
                "cinema_name": "Point 90",
                "cinema_location": "New Cairo",
                "date": "2018-04-0",
                "time": "10:00:00",
                "hall": "200",
                "payment": true,
                "tickets": [3, 31, 32],
                "price": 150,
                "movie": 10,
                "comment": "abc"
            };
            chai.request(server).post('/userBooking/makeReservation')
                .send(bookingDetails).end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json();
                    console.log(res);
                    done();
                });
        });
    });

});



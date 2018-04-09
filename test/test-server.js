var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Backend/app');
var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);


describe('Seats', function() {
  it('should list the layout and booked seats on /layout/encoded GET',function(done){
      chai.request("localhost:8000").get("/api/layout/encoding").query({
        cinema_name: 'Point 90',
        cinema_location: 'New Cairo',
        hall_number: '1',
        datetime: '2018-04-01 13:00:00',
      })
      .end(function(req,res){
        res.should.have.status(200);
        res.should.be.json;
        assert.isArray(res.body.seats,'Booked Seats');
        done();
      });
  });
});

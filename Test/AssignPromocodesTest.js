var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Backend/app');
var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);


describe('AssignPromocodes',function(){
    it('Assignment done successfully' , function(done){
        let AssignmentBody = {
            "promocode" : '1M2NN4N22',
            "cinema_name" : 'Mayo Movies',
            "cinema_location" : '9th of Mayo'
        }
        chai.request("localhost:8000").post("/api/promocodes/assignPromocodes",AssignmentBody)
        .send(AssignmentBody)
        .end(function(req,res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.msg.should.equals("Promocode had been assigned successfully.");
        done();
        });
    });
    it('Cinema you are trying to assign to not found' , function(done){
        let AssignmentBody = {
            "promocode" : '1M2NN4N22',
            "cinema_name" : 'Maylwgen',
            "cinema_location" : '9th of Mayo'
        }
        chai.request("localhost:8000").post("/api/promocodes/assignPromocodes")
        .send(AssignmentBody)
        .end(function(req,res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.msg.should.equals("cinema you are trying to add the promocode to is not found");
        //res.body.data[0].should.have.property("promocode");
        done();
        });
    });
    it('PromoCode missing' , function(done){
      let AssignmentBody = {
          "promocode" : '',
          "cinema_name" : 'Mayo Movies',
          "cinema_location" : '9th of Mayo'
      }
      chai.request("localhost:8000").post("/api/promocodes/assignPromocodes")
      .send(AssignmentBody)
      .end(function(req,res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.msg.should.equals("promocode is required.");
      done();
      });
    });
    it('Cinema missing' , function(done){
      let AssignmentBody = {
          "promocode" : '1M2NN4N22',
          "cinema_name" : '',
          "cinema_location" : '9th of Mayo'
      }
      chai.request("localhost:8000").post("/api/promocodes/assignPromocodes")
      .send(AssignmentBody)
      .end(function(req,res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.msg.should.equals("Cinema info is required.");
      done();
      });
    });
  });
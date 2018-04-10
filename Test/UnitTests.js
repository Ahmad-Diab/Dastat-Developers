//UNIT TESTING FOR T-12
//SEARCH FOR YOUR NAME BY CTRL+F AND START WRITING IN YOUR SPECIFIED SPACE
//PLEASE TRY TO STICK TO YOUR SPECIFIED SPACE, IF YOU HAD TO USE MORE SPACE IT'S NOT A MAJOR PROBLEM
//PLEASE USE THE CURSOR TO MOVE TO THE LINE YOU WANT TO WRITE IN, USING THE ENTER BUTTON WILL MAKE THE SPAECES MADE IN THIS FILE USELESS
//EVERY TIME YOU USE THE CURSOR INSTEAD OF THE ENTER BUTTON IT WILL SAVE ME A CONFLICT TO RESOLVE :)

//Initializing Chai

// FIRST YOU HAVE TO INSTALL MOCHA AS IT'S NOT IN THE package.json ---> npm install -g mocha@2.3.1
// THEN INSTALL npm install chai@3.2.0 chai-http@1.0.0 --save-dev
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Backend/app');
var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);


//Amir Zaghloul

describe('Seats', function() { //This should contain all realted Tests
    it('should list the layout and booked seats on /layout/encoded GET',function(done){ //Just a Custom message to know describe what is the expected output
        chai.request("localhost:8000").get("/api/layout/encoding").query({ //This is sending the request along with my Data that i use in the Query. use this if you send your data in req.query
          cinema_name: 'Point 90',
          cinema_location: 'New Cairo',
          hall_number: '1',
          datetime: '2018-04-01 13:00:00',
        })
        .end(function(req,res){
          res.should.have.status(200); //response status should be 200 aka found
          res.should.be.json; //response type should be json
          assert.isArray(res.body.seats,'Booked Seats'); //the array of booked Seats has type of Array
          done();
        });
    });
  });




































//Joe William
describe('Movie',function(){ //This should contain all the tests related to ViewMovies
  it('High Rates movies are found' , function(done){//This is the message i will get if the test is succeeded and function is done.
    chai.request("localhost:8000").get("/api/movies/highrate")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Low Rates movies are found' , function(done){//This is the message i will get if the test is succeeded and function is done.
    chai.request("localhost:8000").get("/api/movies/lowrate")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Latest  movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
    chai.request("localhost:8000").get("/api/movies/latest")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Oldest movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
    chai.request("localhost:8000").get("/api/movies/oldest")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Action movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
    chai.request("localhost:8000").get("/api/movies/Action")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Adventure movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
    chai.request("localhost:8000").get("/api/movies/Adventure")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Comedy movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
    chai.request("localhost:8000").get("/api/movies/Comedy")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Drama movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
    chai.request("localhost:8000").get("/api/movies/Drama")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Horror movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
    chai.request("localhost:8000").get("/api/movies/Horror")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
  it('Thriller movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
    chai.request("localhost:8000").get("/api/movies/Thriller")//This is chai request to the path of the function same as the route.
    .end(function(req,res){
      res.should.have.status(200);//Check if the response of the request has 200 OK status
      res.should.be.json; // Check if the response of the request is in JSON
     done();// Finishing the function
    });
 });
 it('Biography movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
   chai.request("localhost:8000").get("/api/movies/Bio")//This is chai request to the path of the function same as the route.
   .end(function(req,res){
    res.should.have.status(200);//Check if the response of the request has 200 OK status
    res.should.be.json; // Check if the response of the request is in JSON
    done();// Finishing the function
    });
  });
});








































//Youssef Raphail
























































//Ahmed Diab






















































//Omar Abdelaziz

























































//Michael Khalil & Ibram Medhat






















































//Hazem












































//Omar El-Sayed













































//Bas Rizk

describe('Booking Tickets', () => {
        it('it should POST (make Reservations)', (done) => {
            let bookingDetails = {
                "username": "mai_emad",
                "cinema_name": "Point 90",
                "cinema_location": "New Cairo",
                "date": "2018-04-0",
                "time": "10:00:00",
                "hall": "2",
                "payment": true,
                "tickets": [3, 31, 32],
                "price": 150,
                "movie": 10,
                "comment": "abc"
            };
            chai.request(server)
                .post('/api/userBooking/makeReservation')
                .send(bookingDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

    it('it should fail to reserve given null inputs', (done) => {
        let bookingDetails = {
            "username": null,
            "cinema_name": null,
            "cinema_location": null,
            "date": "2018-04-0",
            "time": "10:00:00",
            "hall": null,
            "payment": true,
            "tickets": [3, 31, 32],
            "price": 150,
            "movie": 10,
            "comment": "abc"
        };
        chai.request(server)
            .post('/api/userBooking/makeReservation')
            .send(bookingDetails)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });
});






































































//Steven Nassef




























































//Youssef Hatem





























































//Omar El-Dahrawy

































































//Zeyad Yasser & Nayer Ezzat

describe('HOMEPAGE', function(){
  it('Viewing Featured Movies', function(done){
    chai.request("localhost:8000").get("/api/getTopMovies")
    .end(function(req,res){
      res.should.have.status(200);
      res.should.be.json;
      assert.isArray(res.body, 'Cinema');
      done();
    });
  });
  it('Viewing Currently Showed Movies', function(done){
    chai.request("localhost:8000").get("/api/viewMovies3")
    .end(function(req,res){
      res.should.have.status(200);
      res.should.be.json;
      assert.isArray(res.body, 'Cinema');
      done();
    });
  });
});












































//Abdo Hossam


































































//Mariam Fawzy
































































//Basma Gamal
















































//Mostafa Nasr






















































//Mahmoud Khalaf































































//Daniel Ashraf

































































//Karim Abdelkader































































//George Maged

































//UNIT TESTING FOR T-12
//SEARCH FOR YOUR NAME BY CTRL+F AND START WRITING IN YOUR SPECIFIED SPACE
//PLEASE TRY TO STICK TO YOUR SPECIFIED SPACE, IF YOU HAD TO USE MORE SPACE IT'S NOT A MAJOR PROBLEM
//PLEASE USE THE CURSOR TO MOVE TO THE LINE YOU WANT TO WRITE IN, USING THE ENTER BUTTON WILL MAKE THE SPAECES MADE IN THIS FILE USELESS
//EVERY TIME YOU USE THE CURSOR INSTEAD OF THE ENTER BUTTON IT WILL SAVE ME A CONFLICT TO RESOLVE :)

//Initializing Chai

// FIRST YOU HAVE TO INSTALL MOCHA AS IT'S NOT IN THE package.json ---> npm install -g mocha@2.3.1

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../Backend/app');
var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);






//Amir Zaghloul

describe('Seats', function() { //This should contain all realted Tests
    it('should list the layout and booked seats on /layout/encoding GET',function(done){ //Just a Custom message to know describe what is the expected output
        chai.request("localhost:8000").get("/api/layout/encoding").query({ //This is sending the request along with my Data that i use in the Query. use this if you send your data in req.query
          cinema_name : 'Point 90',
          cinema_location : 'New Cairo',
          hall_number : '1',
          date : '2018-04-01',
          time :'13:00:00',
        })
        .end(function(req,res){
          res.should.have.status(200); //response status should be 200 aka found
          res.should.be.json; //response type should be json
          assert.isArray(res.body.seats,'Booked Seats'); //the array of booked Seats has type of Array
          assert.equal(res.body.layout.encoded,"[{\"margin\":false,\"row\":[\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"A4\"}},{\"seat\":{\"number\":\"A5\"}},{\"seat\":{\"number\":\"A6\"}},{\"seat\":{\"number\":\"A7\"}},{\"seat\":{\"number\":\"A8\"}},{\"seat\":{\"number\":\"A9\"}},\"offset\",\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"B1\"}},{\"seat\":{\"number\":\"B2\"}},{\"seat\":{\"number\":\"B3\"}},{\"seat\":{\"number\":\"B4\"}},{\"seat\":{\"number\":\"B5\"}},{\"seat\":{\"number\":\"B6\"}},{\"seat\":{\"number\":\"B7\"}},{\"seat\":{\"number\":\"B8\"}},{\"seat\":{\"number\":\"B9\"}},{\"seat\":{\"number\":\"B10\"}},{\"seat\":{\"number\":\"B11\"}},{\"seat\":{\"number\":\"B12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"C1\"}},{\"seat\":{\"number\":\"C2\"}},{\"seat\":{\"number\":\"C3\"}},{\"seat\":{\"number\":\"C4\"}},{\"seat\":{\"number\":\"C5\"}},{\"seat\":{\"number\":\"C6\"}},{\"seat\":{\"number\":\"C7\"}},{\"seat\":{\"number\":\"C8\"}},{\"seat\":{\"number\":\"C9\"}},{\"seat\":{\"number\":\"C10\"}},{\"seat\":{\"number\":\"C11\"}},{\"seat\":{\"number\":\"C12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"D1\"}},{\"seat\":{\"number\":\"D2\"}},{\"seat\":{\"number\":\"D3\"}},{\"seat\":{\"number\":\"D4\"}},{\"seat\":{\"number\":\"D5\"}},{\"seat\":{\"number\":\"D6\"}},{\"seat\":{\"number\":\"D7\"}},{\"seat\":{\"number\":\"D8\"}},{\"seat\":{\"number\":\"D9\"}},{\"seat\":{\"number\":\"D10\"}},{\"seat\":{\"number\":\"D11\"}},{\"seat\":{\"number\":\"D12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"E1\"}},{\"seat\":{\"number\":\"E2\"}},{\"seat\":{\"number\":\"E3\"}},{\"seat\":{\"number\":\"E4\"}},{\"seat\":{\"number\":\"E5\"}},{\"seat\":{\"number\":\"E6\"}},{\"seat\":{\"number\":\"E7\"}},{\"seat\":{\"number\":\"E8\"}},{\"seat\":{\"number\":\"E9\"}},{\"seat\":{\"number\":\"E10\"}},{\"seat\":{\"number\":\"E11\"}},{\"seat\":{\"number\":\"E12\"}}]},{\"margin\":true,\"row\":[\"offset\",\"offset\",{\"seat\":{\"number\":\"F3\"}},{\"seat\":{\"number\":\"F4\"}},{\"seat\":{\"number\":\"F5\"}},{\"seat\":{\"number\":\"F6\"}},{\"seat\":{\"number\":\"F7\"}},{\"seat\":{\"number\":\"F8\"}},{\"seat\":{\"number\":\"F9\"}},{\"seat\":{\"number\":\"F10\"}},\"offset\",\"offset\"]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"G1\"}},{\"seat\":{\"number\":\"G2\"}},{\"seat\":{\"number\":\"G3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"G10\"}},{\"seat\":{\"number\":\"G11\"}},{\"seat\":{\"number\":\"G12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"H1\"}},{\"seat\":{\"number\":\"H2\"}},{\"seat\":{\"number\":\"H3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"H10\"}},{\"seat\":{\"number\":\"H11\"}},{\"seat\":{\"number\":\"H12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"I1\"}},{\"seat\":{\"number\":\"I2\"}},{\"seat\":{\"number\":\"I3\"}},\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",\"offset\",{\"seat\":{\"number\":\"I10\"}},{\"seat\":{\"number\":\"I11\"}},{\"seat\":{\"number\":\"I12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"J1\"}},{\"seat\":{\"number\":\"J2\"}},{\"seat\":{\"number\":\"J3\"}},{\"seat\":{\"number\":\"J4\"}},{\"seat\":{\"number\":\"J5\"}},{\"seat\":{\"number\":\"J6\"}},{\"seat\":{\"number\":\"J7\"}},{\"seat\":{\"number\":\"J8\"}},{\"seat\":{\"number\":\"J9\"}},{\"seat\":{\"number\":\"J10\"}},{\"seat\":{\"number\":\"J11\"}},{\"seat\":{\"number\":\"J12\"}}]},{\"margin\":false,\"row\":[{\"seat\":{\"number\":\"K1\"}},{\"seat\":{\"number\":\"K2\"}},{\"seat\":{\"number\":\"K3\"}},{\"seat\":{\"number\":\"K4\"}},{\"seat\":{\"number\":\"K5\"}},{\"seat\":{\"number\":\"K6\"}},{\"seat\":{\"number\":\"K7\"}},{\"seat\":{\"number\":\"K8\"}},{\"seat\":{\"number\":\"K9\"}},{\"seat\":{\"number\":\"K10\"}},{\"seat\":{\"number\":\"K11\"}},{\"seat\":{\"number\":\"K12\"}}]}]","Expected Output matches");
          done();
        });
    });
    it('should return no data as the object is not in the DB on /layout/encoding GET',function(done){
      chai.request("localhost:8000").get("/api/layout/encoding").query({ //This is sending the request along with my Data that i use in the Query. use this if you send your data in req.query
        cinema_name : 'Point 90',
        cinema_location : '6th October',
        hall_number : '2',
        date : '2018-04-01',
        time :'11:00:00',
      })
      .end(function(req,res){
        res.should.have.status(200); //response status should be 200 aka found
        res.should.be.json; //response type should be json
        assert.isArray(res.body.seats,'Booked Seats'); //the array of booked Seats has type of Array
        assert.isUndefined(res.body.layout,'No Layout found');
        done();
      }); 
    }); });



































// //Joe William
// describe('Movie',function(){ //This should contain all the tests related to ViewMovies
//   it('High Rates movies are found' , function(done){//This is the message i will get if the test is succeeded and function is done.
//     chai.request("localhost:8000").get("/api/movies/highrate")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Low Rates movies are found' , function(done){//This is the message i will get if the test is succeeded and function is done.
//     chai.request("localhost:8000").get("/api/movies/lowrate")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Latest  movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//     chai.request("localhost:8000").get("/api/movies/latest")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Oldest movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//     chai.request("localhost:8000").get("/api/movies/oldest")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Action movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//     chai.request("localhost:8000").get("/api/movies/Action")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Adventure movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//     chai.request("localhost:8000").get("/api/movies/Adventure")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Comedy movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//     chai.request("localhost:8000").get("/api/movies/Comedy")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Drama movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//     chai.request("localhost:8000").get("/api/movies/Drama")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Horror movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//     chai.request("localhost:8000").get("/api/movies/Horror")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//   it('Thriller movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//     chai.request("localhost:8000").get("/api/movies/Thriller")//This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);//Check if the response of the request has 200 OK status
//       res.should.be.json; // Check if the response of the request is in JSON
//      done();// Finishing the function
//     });
//  });
//  it('Biography movies are found' , function(done){//This is the message i will get if the test uis succeeded and function is done
//    chai.request("localhost:8000").get("/api/movies/Bio")//This is chai request to the path of the function same as the route.
//    .end(function(req,res){
//     res.should.have.status(200);//Check if the response of the request has 200 OK status
//     res.should.be.json; // Check if the response of the request is in JSON
//     done();// Finishing the function
//     });
//   });
// });






















































// //Youssef Raphail

// describe('View All Movies',function(){
//   it('All movies are viewed' , function(done){
//     chai.request("localhost:8000").get("/api/movies/feature")
//     .end(function(req,res){
//       res.should.have.status(200); //Make sure that it is found.
//       res.should.be.json; //Make sure that it is a jason. 
//      done();
//     });
//     });
// });






















































// //Ahmed Diab






















































// //Omar Abdelaziz

























































// //Michael Khalil & Ibram Medhat

// describe('Search',function(){                                   // This should contain all the tests related to Search
//   it('No data are found when searching with a keyword that does not exist in the DB' , function(done){ // This is the result message if the test succeeds and the function is done.
//     chai.request("localhost:8000").get("/api/search/somethingThatIsNotInTheDB") // This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);                    //  Check if the response of the request has 200 OK status
//       res.should.be.json;                             // Check if the response of the request is in JSON
//       res.body.data.should.have.property('Movies');   // Check that the result data array has property Movies
//       res.body.data.should.have.property('Cinemas');
//       res.body.data.should.have.property('Actors');
//       res.body.data.Movies.length.should.be.eql(0);   // Check that no movie results are found
//       res.body.data.Cinemas.length.should.be.eql(0);
//       res.body.data.Actors.length.should.be.eql(0);
//      done();                        // Finishing the function
//     });
//  });
//   it('Cinema was found by its name' , function(done){ // This is the result message if the test succeeds and the function is done.
//     chai.request("localhost:8000").get("/api/search/Galaxy Cinema") // This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);  //  Check if the response of the request has 200 OK status
//       res.should.be.json;           // Check if the response of the request is in JSON
//       res.body.data.Cinemas[0].should.have.property('name').eql('Galaxy Cinema') ; //Check if the response cinema name property is the same as the request
//      done();
//     });
//   });
//   it('Movie was found by its name' , function(done){ // This is the result message if the test succeeds and the function is done.
//     chai.request("localhost:8000").get("/api/search/I Can Only Imagine") // This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(200);  //  Check if the response of the request has 200 OK status
//       res.should.be.json;           // Check if the response of the request is in JSON
//       res.body.data.Movies[0].should.have.property('title').eql('I Can Only Imagine') ; //Check if the response movie title property is the same as the request
//      done();
//     });
//   });
//   it('No search word entered' , function(done){ // This is the result message if the test succeeds and the function is done.
//     chai.request('localhost:8000').get("/api/search/") // This is chai request to the path of the function same as the route.
//     .end(function(req,res){
//       res.should.have.status(404); // Check if the response of the request has 404 NOT FOUND status
//       done();
//     })
//   })
  
// });


















// //Hazem












































// //Omar El-Sayed













































// //Bas Rizk








































































// //Steven Nassef




























































// //Youssef Hatem





























































// //Omar El-Dahrawy

// describe('Parties', function() { 
//   it('it should return all upcoming parties for selected movie,cinema,and date',function(done){
//       chai.request("localhost:8000").get("/api/userBooking/getParties").query({ 
//         cinemaName: 'Mayo Movies',
//         movieId: 13,
//         date: '2018-04-12',
//       })
//       .end(function(req,res){
//         res.should.have.status(200);
//         res.should.be.json;
        
//         done();
//       });
//   });
// });

















































// //Zeyad Yasser & Nayer Ezzat


































































// //Abdo Hossam


































































// //Mariam Fawzy
// describe('Viewing all cinemas' , function() {
//   it('Should list all cinemas ' , function(done){
//     chai.request("localhost:8000").get("/api/viewCinemas").end(function(req,res){
//       res.should.have.status(200); // check that is found
//       res.should.be.json; // check it is json file
//       assert.isArray(res.body, 'Cinema'); //make sure it is an array of cinemas
//       done();
//     });
//   });
// });













































// //Basma Gamal
















































// //Mostafa Nasr






















































// //Mahmoud Khalaf































































// //Daniel Ashraf

































































// //Karim Abdelkader































































// //George Maged

































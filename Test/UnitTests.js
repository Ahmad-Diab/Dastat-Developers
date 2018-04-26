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

// describe('Seats', function() { //This should contain all realted Tests
//     it('should list the layout and booked seats on /layout/encoded GET',function(done){ //Just a Custom message to know describe what is the expected output
//         chai.request("localhost:8000").get("/api/layout/encoding").query({ //This is sending the request along with my Data that i use in the Query. use this if you send your data in req.query
//           cinema_name: 'Point 90',
//           cinema_location: 'New Cairo',
//           hall_number: '1',
//           datetime: '2018-04-01 13:00:00',
//         })
//         .end(function(req,res){
//           res.should.have.status(200); //response status should be 200 aka found
//           res.should.be.json; //response type should be json
//           assert.isArray(res.body.seats,'Booked Seats'); //the array of booked Seats has type of Array
//           done();
//         });
//     });
//   });




































// //Joe William
// describe('Movie',function(){
//   it('High Rates movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/highrate")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Low Rates movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/lowrate")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Latest  movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/latest")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Oldest movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/oldest")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Action movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/Action")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Adventure movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/Adventure")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Comedy movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/Comedy")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Drama movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/Drama")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Horror movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/Horror")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//   it('Thriller movies are found' , function(done){
//     chai.request("localhost:8000").get("/api/movies/Thriller")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//      done();
//     });
//  });
//  it('Biography movies are found' , function(done){
//    chai.request("localhost:8000").get("/api/movies/Bio")
//    .end(function(req,res){
//      res.should.have.status(200);
//      res.should.be.json;
//      done();
//     });
//   });
// });



// //---------------------A D M I N.. U N I T.. T E S T S--------------------------------  

// describe('View Admin Requests',function(){
//   it('Admin can view all his requests if there was any',function(done){
//     chai.request("localhost:8000").get("/api/requests/Israa_Yasser")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });

// describe('View All Movies Requests',function(){
//   it('App Owner can view all the movies requests sent if there were any',function(done){
//     chai.request("localhost:8000").get('/api/requests/AllSHOW')
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });

// describe('View All Movies Of the Database played in all cinema theaters',function(){
//   it('App Owner can view all the movies in the database',function(done){
//     chai.request("localhost:8000").get('/api/viewMovie/viewAllMovies')
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });


// describe('View the information of a single movie in cinema',function(){
//   it('App Owner can view the information of any movie',function(done){
//     chai.request("localhost:8000").get('/api/viewMovie/:movie_id')
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
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



// //---------------------A D M I N.. U N I T.. T E S T S--------------------------------
// describe('Delete a specific request',function(){
//   it('CO/BM can delete their own requests',function(done){
//     chai.request("localhost:8000").post("/api/requests/delete/31")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });


// describe('Edit a specific request',function(){
//   it('CO/BM can edit their own requests',(done)=> {
//     let requestDetails = {
//         "title": "mai_emad",
//         "duration": 1,
//         "gerne": "New Cairo",
//         "description": "dxdfs",
//         "imagePath": "asdas",
//         "cast": "asda",
//         "year": 25,
//         "feature": 5,
//         "release_date": "2018-04-01",
//         "rating": 26,
//         "status":"ACCEPTED",
//         "admin_requested":"Israa_Yasser",
//     };
//     chai.request("localhost:8000").post("/api/requests/edit/32")
//     .send(requestDetails)
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });

// describe('Delete a specific movie',function(){
//   it('AO can delete a movie',function(done){
//     chai.request("localhost:8000").post("/api/movie/delete/33")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });

// describe('Edit a specific movie',function(){
//   it('Ao can edit a movie',(done)=> {
//     let movieDetails = {
//         "title": "mai_emad",
//         "duration": 1,
//         "gerne": "New Cairo",
//         "description": "dxdfs",
//         "imagePath": "asdas",
//         "cast": "asda",
//         "year": 25,
//         "feature": 5,
//         "release_date": "2018-04-01",
//         "rating": 26,
//         "status":"ACCEPTED",
//         "admin_requested":"Israa_Yasser",
//     };
//     chai.request("localhost:8000").post("/api/requests/edit/34")
//     .send(movieDetails)
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });








































// //Ahmed Diab








// //---------------------A D M I N.. U N I T.. T E S T S--------------------------------


// describe('Add a request',function(){
//   it('CO/BM can add a request',(done)=> {
//     let requestDetails = {
//         "title": "mai_emad",
//         "duration": 1,
//         "gerne": "New Cairo",
//         "description": "dxdfs",
//         "imagePath": "asdas",
//         "cast": "asda",
//         "year": 25,
//         "feature": 5,
//         "release_date": "2018-04-01",
//         "rating": 26,
//         "status":"ACCEPTED",
//         "admin_requested":"Israa_Yasser",
//     };
//     chai.request("localhost:8000").post("/api/addRequests/andrew_shady")
//     .send(requestDetails)
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });

// describe('Add a movie',function(){
//   it('CO/BM can add a movie',(done)=> {
//     let requestDetails = {
//         "title": "mai_emad",
//         "duration": 1,
//         "gerne": "New Cairo",
//         "description": "dxdfs",
//         "imagePath": "asdas",
//         "cast": "asda",
//         "year": 25,
//         "feature": 5,
//         "release_date": "2018-04-01",
//         "rating": 26,
//         "status":"ACCEPTED",
//         "admin_requested":"Israa_Yasser",
//     };
//     chai.request("localhost:8000").post("/api/addMovies")
//     .send(requestDetails)
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       done();
//     });
//   });
// });











































// //Omar Abdelaziz



// //---------------------A D M I N.. U N I T.. T E S T S--------------------------------
// describe('Movie Requests',function(){
//   it('Movie should not be Accepted because it is not pending' , function(done){

//     chai.request("localhost:8000").get("/api/AcceptMovieRequest/2")
//     .end(function(req,res){
//       res.should.have.json.status(404);
//       res.should.be.json;
//      done();
//    });
//  });

//  it('Movie should be Accepted' , function(done){

//   chai.request("localhost:8000").get("/api/AcceptMovieRequest/16")
//   .end(function(req,res){
//     res.should.have.json.status(200);
//     res.should.be.json;
//    done();
//  });
// });

// it('Movie should not be Rejected because it is not pending' , function(done){

//   chai.request("localhost:8000").get("/api/RejectMovieRequest/2")
//   .end(function(req,res){
//     res.should.have.json.status(404);
//     res.should.be.json;
//    done();
//  });
// });

// it('Movie should be Reject' , function(done){

// chai.request("localhost:8000").get("/api/RejectMovieRequest/17")
// .end(function(req,res){
//   res.should.have.json.status(200);
//   res.should.be.json;
//  done();
// });
// });

// it('Movie Request Shown' , function(done){

//   chai.request("localhost:8000").get("/api/ViewMovieRequest/4")
//   .end(function(req,res){
//     res.should.have.json.status(200);
//     res.should.be.json;
//    done();
//   });
//   });

// });


























































// //Michael Khalil & Ibram Medhat






















































// //Hazem












































//Omar El-Sayed
describe('Get Booking details',function(){
  it('User can view his previous booked tickets',function(done){
    chai.request("localhost:8000").get("/api/userBooking/getBookings/nasr")
    .end(function(req,res){
      res.should.have.status(200);
      res.should.be.json;
      assert.equal(req.body,[],"A Ticked has been returned")
      done();
    });
  });
});


describe('Get Booking details',function(){
  it('User can view his previous booked tickets',function(done){
    chai.request("localhost:8000").get("/api/userBooking/getBookings/nasr")
    .end(function(req,res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });
});




describe('Delete a specific promocode',function(){
     it('admin can delete promocodes',function(done){
       chai.request("localhost:8000").post("/api/promocodes/deletePromocode/1H4H1LS0W")
       .end(function(req,res){
         res.should.have.status(200);
         res.should.be.json;
       done();
       });
     });
   });
  

   describe('Delete a specific promocode',function(){
    it('An Admin can delete a promocode',function(done){
      chai.request("localhost:8000").post("/api/promocodes/deletePromocode/dawHadlawd4H1LS0W")
      .end(function(req,res){
        res.should.have.status(404);
        res.should.be.json;
      done();
      });
    });
  });
 











































//Bas Rizk

// describe('Booking Tickets', () => {
//         it('it should make Reservations', (done) => {
//             let bookingDetails = {
//                 "username": "mai_emad",
//                 "cinema_name": "Point 90",
//                 "cinema_location": "New Cairo",
//                 "date": "2018-04-01",
//                 "time": "10:00:00",
//                 "hall": "2",
//                 "payment": true,
//                 "tickets": [3, 31, 32],
//                 "price": 150,
//                 "movie": 26,
//                 //"comment": "abc"
//             };
//             chai.request(server)
//                 .post('/api/userBooking/makeReservation')
//                 .send(bookingDetails)
//                 .end((err, res) => {
//                     console.log(res);
//                     res.should.have.status(200);
//                     done();
//                 });
//         });

//     it('it should fail to reserve given null inputs', (done) => {
//         let bookingDetails = {
//             "username": null,
//             "cinema_name": null,
//             "cinema_location": null,
//             "date": "2018-04-01",
//             "time": "10:00:00",
//             "hall": null,
//             "payment": true,
//             "tickets": [3, 31, 32],
//             "price": 150,
//             "movie": 26,
//             "comment": "abc"
//         };
//         chai.request(server)
//             .post('/api/userBooking/makeReservation')
//             .send(bookingDetails)
//             .end((err, res) => {
//                 res.should.have.status(422);
//                 done();
//             });
//     });
// });






































































//Steven Nassef




























































// //Youssef Hatem
// describe('Using Promocode', () =>{
//         it('It should update the price by deducting the amount in the promocode', (done) => { //testing when the promocode exists in the cinema
//             let promocodeDetails = {
//                  "price": 1500,
//                  "code": "1H4H1LS0W",
//                  "name": "Pharoahs Cinema",
//                  "location": "Al Haram"
//               };
//               chai.request(server)
//                   .post('/api/userBooking/usePromoCode')
//                   .send(promocodeDetails)
//                   .end((err, res) => {
//                       res.should.have.status(200);
//                       done();
//                   });
//         });
//         it('it should not update the price and respond with 404 error since the promocode is not in the specified cinema', (done) => {//testing when the promocode does not exist in the cinema
//             let promocodeDetails = {
//                 "price": 1500,
//                 "code": "1H4H1LS0W",
//                 "name": "Cinema Mawlana",
//                 "location": "Mokattam"
//              };
//              chai.request(server)
//                   .post('/api/userBooking/usePromoCode')
//                   .send(promocodeDetails)
//                   .end((err, res) => {
//                       res.should.have.status(404);
//                       done();
//                   });
//        });
// });





























// //Omar El-Dahrawy
// describe('Parties', function() { 
//   it('it should return all upcoming parties for selected movie,cinema,and date',function(done){
//       chai.request("localhost:8000").get("/api/userBooking/getParties/:cinemaLocation/:cinemaName/:movieName/:date").query({ 
//         cinemaName: 'Mayo Movies',
//         cinemaLocation: "9th of Mayo",
//         movieName: 3,
//         date: '2018-04-01',
//       })
//       .end(function(req,res){
//         res.should.have.status(200);
//         res.should.be.json;w
//         done();
//       });
//   });
// });
// //---------------------A D M I N.. U N I T.. T E S T S--------------------------------
// describe('Movie and Hall data', function() { 
//   it('it should return all data about selected movie and hall in selected cinema',function(done){
//       chai.request("localhost:8000").get("/api/MoviesInHalls/getMovieAndHallData/:movie_id/:movie_id/:cinema_name/:cinema_location").query({ 
//         movie_id: 3,
//         cinema_name: 'Mayo Movies',
//         cinnema_location: "9th of Mayo",
//       })
//       .end(function(req,res){
//         res.should.have.status(200);
//         res.should.be.json;
//         done();
//       });
//   });
// });
// describe('Halls in cinema', function() { 
//   it('it should return all halls in selected cinema',function(done){
//       chai.request("localhost:8000").get("/api/MoviesInHalls/cinemaHalls/:cinema_name/:cinema_location").query({ 
//         cinemaName: 'Mayo Movies',
//         cinnemaLocation: "9th of Mayo",
//       })
//       .end(function(req,res){
//         res.should.have.status(200);
//         res.should.be.json;
//         done();
//       });
//   });
// });
// describe('Movies in cinema', function() { 
//   it('it should return all movies in selected cinema',function(done){
//       chai.request("localhost:8000").get("/api/MoviesInHalls/cinemaMovies/:cinema_location/:cinema_name").query({ 
//         cinemaName: 'Mayo Movies',
//         cinnemaLocation: "9th of Mayo",
//       })
//       .end(function(req,res){
//         res.should.have.status(200);
//         res.should.be.json;
//         done();
//       });
//   });
// });









// //Zeyad Yasser & Nayer Ezzat

// describe('HOMEPAGE', function(){
//   it('Viewing Featured Movies', function(done){
//     chai.request("localhost:8000").get("/api/getTopMovies")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       assert.isArray(res.body, 'Cinema');
//       done();
//     });
//   });
//   it('Viewing Currently Showed Movies', function(done){
//     chai.request("localhost:8000").get("/api/viewMovies3")
//     .end(function(req,res){
//       res.should.have.status(200);
//       res.should.be.json;
//       assert.isArray(res.body, 'Cinema');
//       done();
//     });
//   });
// });












































// //Abdo Hossam


































































// //Mariam Fawzy
































































// //Basma Gamal
















































// //Mostafa Nasr






















































// //Mahmoud Khalaf































































//Daniel Ashraf

































































//Karim Abdelkader































































//George Maged

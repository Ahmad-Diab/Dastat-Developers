import { Component, OnInit } from '@angular/core';
import {AdminTicketService} from "../../@services/admin-ticket.service";
import {CookieService} from "angular2-cookie/core";
import {Auth} from "../../@guards/auth.guard";
import {MoviesInHallsService} from "../../@services/movies-in-halls.service";
import { HallService } from '../../@services/hall.service';
import { Layout } from '../../@objects/layout';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss']
})
export class MakeReservationComponent implements OnInit {

  adminUsername = null;
  reserveData;
  ticketIsLoaded = false;
  //TODO set ticketIsLoaded to true after all information are gathered,
  //TODO so then it can give ability to make the reservation

  moviesList = []; selectedMovie = null; selectedHall = null;
  partiesBigList = [];
  partiesDatesList = []; selectedPartyDate = null;
  partiesTimesList = []; selectedPartyTime = null;

  selectedTickets = []; //TODO set the array of tickets
  totalPrice = null; // TODO set this with tickets

  encoding;
  selected;
  seats = [];
  flag = false;

  error = null;

  constructor(public adminTicketService: AdminTicketService, 
    public MoviesInHallsService: MoviesInHallsService, 
    public hallService: HallService,
    public cookie: CookieService) { }

  ngOnInit() {
    let auth = <Auth>(this.cookie.getObject('auth'));
    this.adminUsername = auth.username;
    this.loadMovies();

    this.reserveData = {
      username: 'mai_emad', // TODO To be changed
      cinema_name: 'Mayo Movies',
      cinema_location: '9th of Mayo', // TODO to be changed (get from cookie)
      date: '2018-04-28',
      time: '10:00:00',
      hall: null,
      hall_number: 1,
      payment: true,
      tickets: null,
      ticketsNum: null,
      price: null,
      eachPrice: null,
      movie: null
    };

    this.loadSeatLayout();

    console.log("ONITTTTT" +this.reserveData.cinema_location);
  }

  letter(index: number) {
    var ascii = 65;
    return String.fromCharCode(index + ascii);
  }

  loadMovies() {
    //TODO get all movies in halls, using steven's function in the backend, coming from another page

    /*

    this.moviesList = [{
      cinema_location : 'Mokattam',
      cinema_name : 'Cinema Mawlana',
      hall_number : 1,
      type: 'VIP',
      layout: 1,
      number_of_seats : 80,
      movie_id : 5,
      title : 'Pacific Rim Uprising',
      imagePath : 'https://image.ibb.co/fYSzx7/Pacific_Rim.jpg'
    },{
      cinema_location : 'New Cairo',
      cinema_name : 'Point 90',
      hall_number : 1,
      type: 'VIP',
      layout: 1,
      number_of_seats : 50,
      movie_id : 3,
      title : 'Tomb Raider',
      imagePath : 'https://image.ibb.co/gq0SH7/Tomb_Raider.jpg'
    }];
  */
   
    this.adminTicketService.getMoviesInHallsForCinemaForAdmin(this.adminUsername , 'Cinema Mawlana',
    'Mokattam').subscribe((response) => {
         this.moviesList = response.data;
         console.log(response.data);
         console.log(this.moviesList);
         this.moviesList.sort();
         this.selectedMovie = this.moviesList[0];
         this.selectedHall = this.moviesList[0].hall_number;
         this.loadParties();
       })     
    
  }

  selectMovie(movie) {
    console.log(movie);
    this.selectedMovie = movie;
    this.selectedHall = this.selectedMovie.hall_number;
    this.loadParties();
  }

  loadParties() {
    this.partiesBigList = [];
    console.log("load parties data");
    this.adminTicketService.viewPartiesOfThatMovie(
      this.adminUsername, this.selectedMovie.cinema_name,
      this.selectedMovie.cinema_location, this.selectedMovie.movie_id
    ).subscribe((response) => {
      this.partiesBigList = response.data;

      if(this.partiesBigList && this.partiesBigList.length) {
        console.log('parties should be loaded');
        this.takeOnlyDatesInPartiesDateList();
      }
      console.log('Parties Big List :' + this.partiesBigList);
    });

  }

  takeOnlyDatesInPartiesDateList() {
    this.partiesDatesList = [];
    for (let partyNum = 0; partyNum < this.partiesBigList.length; partyNum++) {
      let party = this.partiesBigList[partyNum];
      if(party.date && !this.partiesDatesList.includes(party.date))
        this.partiesDatesList.push(party.date);
    }
    this.partiesDatesList.sort();
    this.selectedPartyDate = this.partiesDatesList[0];
    console.log("takeOnlyDates done");
    this.loadPartiesTimes();
  }

  selectPartyDate(date) {
    this.selectedPartyDate = date;
    //this.reserveData.date = this.selectedPartyDate;
    this.loadPartiesTimes();
  }

  loadPartiesTimes() {
    this.partiesTimesList = [];
    for (let partyNum = 0; partyNum < this.partiesBigList.length; partyNum++) {
      let party = this.partiesBigList[partyNum];
      if(this.selectedPartyDate = party.date)
        this.partiesTimesList.push(party.time);
    }

    this.selectedPartyTime = this.partiesTimesList[0];

  }

  selectPartyTime(time) {
    this.selectedPartyTime = time;
    //this.reserveData.time = this.selectedPartyTime;
    this.loadSeatLayout();
  }

  select(i, j, seat) {
    this.selected[i][j] = !this.selected[i][j];

    if (this.seats.includes(seat)) {
      var index = this.seats.indexOf(seat);
      this.seats.splice(index, 1);
    } else{
      this.seats.push(seat);
    }

    console.log(this.seats);
  }

  loadSeatLayout() {
    this.hallService.viewLayout(this.reserveData).subscribe((response) => {
      this.encoding = JSON.parse(response.layout.encoded);
      this.selected = new Array();
      for(var i = 0; i < this.encoding.length; i++)
        this.selected[i] = new Array();
      this.flag = true;
    });
  }

  makeReservation() {
    //ONLY FOR TEST: TODO Delete
    this.reserveData.cinema_name = this.selectedMovie.cinema_name;
    this.reserveData.cinema_location = this.selectedMovie.cinema_location;
    //END TEST PIECE OF CODE

    this.reserveData.date = this.selectedPartyDate;
    this.reserveData.time = this.selectedPartyTime;
    this.reserveData.hall = this.selectedHall;
    // TODO set tickets array of seats to the selected
    this.reserveData.tickets = ['c1', 'b2'];
    // TODO set th price of tickets to the total price
    this.reserveData.price = 100;
    this.reserveData.movie = this.selectedMovie.movie_id;

    this.adminTicketService.makeReservationByAdmin(
      this.reserveData.cinema_name, this.reserveData.cinema_location, this.reserveData.date,
      this.reserveData.time, this.reserveData.hall, this.reserveData.tickets,
      this.reserveData.price, this.reserveData.movie
    ).subscribe((response) => {
      //event.confirm.resolve(response);
      console.log(response);
    });

  }


}

import { Component, OnInit } from '@angular/core';
import {AdminTicketService} from "../../@services/admin-ticket.service";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss']
})
export class MakeReservationComponent implements OnInit {

  adminUsername = null;
  reserveData = null;
  ticketIsLoaded = false;
  //TODO set ticketIsLoaded to true after all information are gathered,
  //TODO so then it can give ability to make the reservation

  moviesList = null; selectedMovie = null; selectedHall = null;
  partiesBigList = null;
  partiesDatesList = null; selectedPartyDate = null;
  partiesTimesList = null; selectedPartyTime = null;

  selectedTickets = []; //TODO set the array of tickets
  totalPrice = null; // TODO set this with tickets

  error = null;

  constructor(public adminTicketService: AdminTicketService, public cookie: CookieService) { }

  ngOnInit() {
    this.adminUsername = 'app'; // TODO this.cookie.get('adminUsername');
    this.loadMovies();

    this.reserveData = {
      username: 'mai_emad', // TODO To be changed
      cinema_name: this.cookie.get('cinema_name'),
      cinema_location: this.cookie.get('cinema_location'),
      date: null,
      time: null,
      hall: null,
      payment: true,
      tickets: null,
      ticketsNum: null,
      price: null,
      eachPrice: null,
      movie: null
    };
  }

  loadMovies() {
    //TODO get all movies in halls, using steven's function in the backend, coming from another page
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
      movie_id : 4,
      title : 'Love, Simon',
      imagePath : 'https://image.ibb.co/fVygc7/Love_Simon.jpg'
    }];
    this.selectedMovie = this.moviesList[0];
    this.selectedHall = this.moviesList[0].hall;
    this.loadParties();
  }

  selectMovie(movie) {
    this.selectedMovie = movie.title;
    this.loadParties();
  }

  loadParties() {
    this.adminTicketService.viewPartiesOfThatMovie(
      this.adminUsername, this.selectedMovie.cinema_name,
      this.selectedMovie.cinema_location, this.selectedMovie.movie_id
    ).subscribe((response) => {
      this.partiesBigList = response.data[0];
      console.log(response);
    });
    if(this.partiesBigList.size) {
      console.log('parties should be loaded');
      this.takeOnlyDatesInPartiesDateList();
    }
    console.log(this.partiesBigList.size);
  }

  takeOnlyDatesInPartiesDateList() {
    console.log(this.partiesBigList.length);
    for (let partyNum = 0; partyNum < this.partiesBigList.length; partyNum++) {
      if(!this.partiesDatesList.contains(this.partiesBigList[partyNum].date))
        this.partiesDatesList.push(this.partiesBigList[partyNum].date);
    }
    console.log(this.partiesDatesList);
    this.selectedPartyDate = this.partiesDatesList[0];
    this.loadPartiesTimes();
  }

  selectPartyDate(date) {
    this.selectedPartyDate = date;
    //this.reserveData.date = this.selectedPartyDate;
    this.loadPartiesTimes();
  }

  loadPartiesTimes() {

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

  loadSeatLayout() {

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
      this.reserveData.price, this.reserveData.movie_id
    ).subscribe((response) => {
      //event.confirm.resolve(response);
      console.log(response);
    });

  }


}

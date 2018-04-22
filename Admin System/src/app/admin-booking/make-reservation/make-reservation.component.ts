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

  moviesList = null; selectedMovie = null;
  partiesDatesList = null; selectedPartyDate = null;
  partiesTimesList = null; selectedPartyTime = null;

  error = null;

  constructor(public adminTicketService: AdminTicketService, public cookie: CookieService) { }

  ngOnInit() {
    this.adminUsername = this.cookie.get('adminUsername');
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
    //TODO get all movies in halls, using steven's function in the backend
  }

  selectMovie(event) {
    this.selectedMovie = event.target.value;
    this.reserveData.movie = this.selectedMovie['movie_id'];
    this.reserveData.hall = this.selectedMovie['hall_number'];
    this.loadPartiesDates();
  }

  loadPartiesDates() {

  }

  selectPartyDate(event) {
    this.selectedPartyDate = event.target.value;
    this.reserveData.date = this.selectedPartyDate;
    this.loadPartiesTimes();
  }

  loadPartiesTimes() {

  }

  selectPartyTime(event) {
    this.selectedPartyTime = event.target.value;
    this.reserveData.time = this.selectedPartyTime;
    this.loadSeatLayout();
  }

  loadSeatLayout() {

  }

  makeReservation() {

  }


}

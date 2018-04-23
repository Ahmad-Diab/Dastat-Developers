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

  moviesList = null; selectedMovie = null; selectedHall = null;
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
    //TODO get all movies in halls, using steven's function in the backend\
    this.moviesList = [{
      title : 'MOVIE_1',
      hall : '12'
    },{
      title : 'MOVIE_2',
      hall : '15'
    }];
    this.selectedMovie = this.moviesList[0].title;
    this.selectedHall = this.moviesList[0].hall;
    this.loadPartiesDates();
  }

  selectMovie(movie) {
    this.selectedMovie = movie.title;
    this.reserveData.movie = this.selectedMovie['movie_id'];
    this.reserveData.hall = this.selectedMovie['hall_number'];
    this.loadPartiesDates();
  }

  loadPartiesDates() {
    this.partiesDatesList = [
      '09-10-2018',
      '04-01-2018',
      '05-11-2018'
    ];
    this.selectedPartyDate = this.partiesDatesList[0];
    this.loadPartiesTimes();
  }

  selectPartyDate(date) {
    this.selectedPartyDate = date;
    this.reserveData.date = this.selectedPartyDate;
    this.loadPartiesTimes();
  }

  loadPartiesTimes() {
    this.partiesTimesList = [
      '10:00am',
      '11:12pm',
      '12:00pm'
    ];
    this.selectedPartyTime = this.partiesTimesList[0];
  }

  selectPartyTime(time) {
    this.selectedPartyTime = time;
    this.reserveData.time = this.selectedPartyTime;
    this.loadSeatLayout();
  }

  loadSeatLayout() {

  }

  makeReservation() {

  }


}

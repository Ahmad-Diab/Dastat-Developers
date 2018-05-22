import {Component, OnInit} from '@angular/core';
import {AdminTicketService} from "../../@services/admin-ticket.service";
import {CookieService} from "angular2-cookie/core";
import {Auth} from "../../@guards/auth.guard";
import {MoviesInHallsService} from "../../@services/movies-in-halls.service";
import {HallService} from '../../@services/hall.service';
import {Layout} from '../../@objects/layout';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss']
})
export class MakeReservationComponent implements OnInit {

  statusOfTicket = 'Make the Reservation';
  adminUsername = null;
  reserveData;
  ticketIsLoaded = false;
  moviesList = [];
  selectedMovie = null;
  selectedHall = null;
  partiesBigList = [];
  partiesDatesList = [];
  selectedPartyDate = null;
  partiesTimesList = [];
  selectedPartyTime = null;
  booked_seats;

  totalPrice = 0;
  singleTicketPrice = 50;
  encoding;
  selected;
  seats = [];
  flag = false;

  error = null;

  constructor(public adminTicketService: AdminTicketService,
              public MoviesInHallsService: MoviesInHallsService,
              public hallService: HallService,
              public cookie: CookieService) {
  }

  ngOnInit() {

    this.statusOfTicket = 'Make the Reservation';
    this.adminUsername = null;
    this.ticketIsLoaded = false;
    this.moviesList = [];
    this.selectedMovie = null;
    this.selectedHall = null;
    this.partiesBigList = [];
    this.partiesDatesList = [];
    this.selectedPartyDate = null;
    this.partiesTimesList = [];
    this.selectedPartyTime = null;

    this.totalPrice = 0;
    this.singleTicketPrice = 50;
    this.seats = [];
    this.flag = false;

    this.error = null;

    let auth = <Auth>(this.cookie.getObject('auth'));
    this.adminUsername = auth.username;
    let cinemaData = this.cookie.getObject('cinema');

    this.reserveData = {
      cinema_name: cinemaData['name'],
      cinema_location: cinemaData['location'],
      date: null,
      time: null,
      hall: null,
      hall_number: 1,
      payment: true,
      tickets: null,
      ticketsNum: null,
      price: null,
      eachPrice: null,
      movie: null
    };
    this.flag = false;
    this.loadMovies();
  }

  loadMovies() {
    this.adminTicketService.getMoviesInHallsForCinemaForAdmin(this.reserveData.cinema_name,
      this.reserveData.cinema_location).subscribe((response) => {
      this.moviesList = response.data;
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
    this.flag = false;
    this.partiesBigList = [];
    this.partiesTimesList = [];
    this.partiesDatesList = [];
    this.selectedPartyDate = null;
    this.selectedPartyTime = null;

    this.adminTicketService.viewPartiesOfThatMovie(
      this.adminUsername, this.selectedMovie.cinema_name,
      this.selectedMovie.cinema_location, this.selectedMovie.movie_id
    ).subscribe((response) => {
      this.partiesBigList = response.data;

      if (this.partiesBigList && this.partiesBigList.length) {
        this.takeOnlyDatesInPartiesDateList();
      }
    });

  }

  takeOnlyDatesInPartiesDateList() {
    this.partiesDatesList = [];
    this.selectedPartyDate = null;
    for (let partyNum = 0; partyNum < this.partiesBigList.length; partyNum++) {
      let party = this.partiesBigList[partyNum];
      if (party.date)
        if(!this.partiesDatesList.includes(party.date.split('T')[0]))
          this.partiesDatesList.push(party.date);
    }
    this.partiesDatesList.sort();
    console.log(this.selectedPartyDate + " - " + this.partiesDatesList + " - " + this.selectedPartyDate);
    this.selectedPartyDate = this.partiesDatesList[0]
    this.loadPartiesTimes();
  }

  selectPartyDate(date, element) {
    this.selectedPartyDate = date;
    this.loadPartiesTimes();
  }

  loadPartiesTimes() {
    this.partiesTimesList = [];
    this.selectedPartyTime = null;
    for (let partyNum = 0; partyNum < this.partiesBigList.length; partyNum++) {
      let party = this.partiesBigList[partyNum];
      if (this.selectedPartyDate == party.date)
        if(!this.partiesTimesList.includes(party.time))
          this.partiesTimesList.push(party.time);
    }

    this.selectedPartyTime = this.partiesTimesList[0];
    console.log(this.partiesTimesList);
    this.loadSeatLayout();

  }

  selectPartyTime(time) {
    this.selectedPartyTime = time;
    this.loadSeatLayout();
  }

  letter(index: number) {
    var ascii = 65;
    return String.fromCharCode(index + ascii);
  }

  select(i, j, seat) {
    this.selected[i][j] = !this.selected[i][j];

    if (this.seats.includes(seat)) {
      var index = this.seats.indexOf(seat);
      this.seats.splice(index, 1);
    } else {
      this.seats.push(seat);
    }
    this.ticketIsLoaded = this.seats.length > 0;
    this.totalPrice = this.seats.length * this.singleTicketPrice;
  }

  loadSeatLayout() {

    this.reserveData.date = this.selectedPartyDate.split('T')[0];
    this.reserveData.time = this.selectedPartyTime;
    this.reserveData.hall_number = this.selectedHall;
    this.reserveData.hall = this.selectedHall;
    this.reserveData.tickets = this.seats;
    this.reserveData.price = this.totalPrice;
    this.reserveData.movie = this.selectedMovie.movie_id;

    this.hallService.viewLayout(this.reserveData).subscribe((response) => {
      this.booked_seats = response.seats;
      console.log(response.seats);
      this.encoding = JSON.parse(response.layout.encoded);
      this.selected = new Array();
      for (var i = 0; i < this.encoding.length; i++)
        this.selected[i] = new Array();
      this.flag = true;
    });
  }

  booked(seat: string) {
    for (var i = 0; i < this.booked_seats.length; i++)
      if (this.booked_seats[i].seat_number == seat)
        return true;
    return false;
  }

  makeReservation() {

    this.reserveData.date = this.selectedPartyDate;
    this.reserveData.time = this.selectedPartyTime;
    this.reserveData.hall = this.selectedHall;
    this.reserveData.tickets = this.seats;
    this.reserveData.price = this.totalPrice;
    this.reserveData.movie = this.selectedMovie.movie_id;

    this.adminTicketService.makeReservationByAdmin(
      this.reserveData.cinema_name, this.reserveData.cinema_location, this.reserveData.date,
      this.reserveData.time, this.reserveData.hall, this.reserveData.tickets,
      this.reserveData.price, this.reserveData.movie
    ).subscribe((response) => {
      //event.confirm.resolve(response);
      console.log(response);
      this.ticketIsLoaded = false;
      this.statusOfTicket = 'Booked Successfully';
      this.ngOnInit();
    });

  }

}

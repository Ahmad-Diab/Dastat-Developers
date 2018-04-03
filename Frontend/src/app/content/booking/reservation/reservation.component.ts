import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../../@services/booking.service";
import {CookieService} from "angular2-cookie/services/cookies.service";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reserveData = {};

  constructor(public bookingService: BookingService, public cookie: CookieService) { }
  ngOnInit() {

    var tickets = this.cookie.get("tickets"),
      ticketsNum = tickets.length,
      price = this.cookie.get("price"),
      eachPrice = parseInt(price)/ticketsNum;

    this.reserveData = {
      username: this.cookie.get("username"),
      cinema_name: this.cookie.get("cinema_name"),
      cinema_location: this.cookie.get("cinema_location"),
      date_time: this.cookie.get("data_time"),
      hall: this.cookie.get("hall"),
      payment: null,                      //TO BE ADDED ONCE SUBMIT, DEPENDS ON WHICH BUTTON
      tickets: tickets,                   //Meaning Reserve (Not Paid), Or Buy (Paid)
      ticketsNum: ticketsNum,
      price: price,
      eachPrice: eachPrice,
      movie: this.cookie.get("movie")
    }

   /* // For test purposes
    var tickets = [1, 5, 9],
      ticketsNum = tickets.length,
      price = "150",
      eachPrice = parseInt(price)/ticketsNum;

    this.reserveData = {
      username: "mai_emad",
      cinema_name: "Point 90",
      cinema_location: "New Cairo",
      date_time: "2018-04-01 10:00:00",
      hall:  "1",
      payment: null,                      //TO BE ADDED ONCE SUBMIT, DEPENDS ON WHICH BUTTON
      tickets: tickets,                   //Meaning Reserve (Not Paid), Or Buy (Paid)
      ticketsNum: ticketsNum,
      price: price,
      eachPrice: eachPrice,
      movie: "10"
    }
    */
  }

  onUnpaidReserve(event): void {
    this.reserveData["payment"] = false;

    this.bookingService.makeReservation(
      this.reserveData['username'],this.reserveData['cinema_name'], this.reserveData['cinema_location'],
      this.reserveData['date_time'],this.reserveData['hall'], this.reserveData['payment'],
      this.reserveData['tickets'],this.reserveData['price'],this.reserveData['movie']
    ).subscribe((response) => {
      event.confirm.resolve(response);
      console.log("onUnpaidReserve order is met");
    });

  }


  onPaidReserve(event): void {
    this.reserveData["payment"] = true;
    this.bookingService.makeReservation(
      this.reserveData['username'],this.reserveData['cinema_name'], this.reserveData['cinema_location'],
      this.reserveData['date_time'],this.reserveData['hall'], this.reserveData['payment'],
      this.reserveData['tickets'],this.reserveData['price'],this.reserveData['movie']
    ).subscribe((response) => {
      event.confirm.resolve(response);
      console.log("onPaidReserve order is met");
    });

  }

}

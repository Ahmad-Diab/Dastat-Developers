import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../../@services/booking.service";
import {CookieService} from "angular2-cookie/core";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reserveData = {};
  reservationType = "";

  constructor(public bookingService: BookingService, public cookie: CookieService) { }
  ngOnInit() {

    this.reservationType = "reserve";

    let bookingDetails = this.cookie.getObject('booking');

    let tickets = bookingDetails['seats'],
      ticketsNum = tickets.length,
      eachPrice = bookingDetails['eachPrice'],
      price = eachPrice*ticketsNum;



    this.reserveData = {
      username: bookingDetails['username'],
      cinema_name: bookingDetails['cinema_name'],
      cinema_location: bookingDetails['cinema_location'],
      date_time: bookingDetails['datatime'],
      hall: bookingDetails['hall_number'],
      payment: null,                      //TO BE ADDED ONCE SUBMIT, DEPENDS ON WHICH BUTTON
      tickets: tickets,                   //Meaning Reserve (Not Paid), Or Buy (Paid)
      ticketsNum: ticketsNum,
      price: price,
      eachPrice: eachPrice,
      movie: bookingDetails['movie']
    };

/*
   // For test purposes
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
    };
*/

  }

  onReserve(event): void {
    this.bookingService.makeReservation(
      this.reserveData['username'],this.reserveData['cinema_name'], this.reserveData['cinema_location'],
      this.reserveData['date_time'],this.reserveData['hall'], this.reserveData['payment'],
      this.reserveData['tickets'],this.reserveData['price'],this.reserveData['movie']
    ).subscribe((response) => {
      event.confirm.resolve(response);
      console.log("onReserve order is met");
    });
  }

  onUnpaid(event): void{
    this.reserveData["payment"] = false;
    this.reservationType = "Reserve";
  }

  onPaid(event): void {
    this.reserveData["payment"] = true;
    this.reservationType = "Purchase";
  }
}

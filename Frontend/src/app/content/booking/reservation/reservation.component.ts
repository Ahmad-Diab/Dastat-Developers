import { Component, OnInit } from '@angular/core';
import {BookingService} from "../../../@services/booking.service";
import {CookieService} from "angular2-cookie/core";


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  err = false; // err, vis, and show, are boolean variables for html elements with the ngIf model
  vis = true;
  show = false;
  reserveData = {};
  reservationType = "";
  btn_purchaseClass;
  btn_reserveClass;
  promo = "";
  searchValue;

  constructor(public bookingService: BookingService, public cookie: CookieService) { }
  ngOnInit() {

    this.reservationType = "reserve";
    this.btn_purchaseClass = "order__control-btn";
    this.btn_reserveClass = "order__control-btn active";


    let bookingDetails = this.cookie.getObject('booking');

    let tickets = bookingDetails['seats'],
      ticketsNum = tickets.length,
      eachPrice = bookingDetails['eachPrice'],
      price = eachPrice*ticketsNum;



    this.reserveData = {
      username: bookingDetails['username'],
      cinema_name: bookingDetails['cinema_name'],
      cinema_location: bookingDetails['cinema_location'],
      date: bookingDetails['date'],
      time: bookingDetails['time'],
      hall: bookingDetails['hall_number'],
      payment: false,                     //TO BE ADDED ONCE SUBMIT, DEPENDS ON WHICH BUTTON
      tickets: tickets,                   //Meaning Reserve (Not Paid), Or Buy (Paid)
      ticketsNum: ticketsNum,
      price: price,
      eachPrice: eachPrice,
      movie: bookingDetails['movie'],
      comment: null
    };


  }

  onReserve(): void {
    console.log("This is a paid payment: " + this.reserveData['payment']);
    this.bookingService.makeReservation(
      this.reserveData['username'],this.reserveData['cinema_name'], this.reserveData['cinema_location'],
      this.reserveData['date'], this.reserveData['time'],this.reserveData['hall'], this.reserveData['payment'],
      this.reserveData['tickets'],this.reserveData['price'],this.reserveData['movie'], this.reserveData['comment']
    ).subscribe((response) => {
      this.cookie.remove('booking');
      this.cookie.remove('cinema');
      this.cookie.remove('party');
      this.cookie.remove('movie');
      //event.confirm.resolve(response);
      console.log(response);
    });
  }

  onUnpaid(): void{
    this.reserveData["payment"] = false;
    this.reservationType = "Reserve";
    this.btn_purchaseClass = "order__control-btn";
    this.btn_reserveClass = "order__control-btn active";
  }

  onPaid(): void {
    this.reserveData["payment"] = true;
    this.reservationType = "Purchase";
    this.btn_purchaseClass = "order__control-btn active";
    this.btn_reserveClass = "order__control-btn";
  }

  usePromo(event): any { //triggered when button to submit promocode is clicked. extracts information required and sentds it in body of request
    this.bookingService.usePromoCode(this.reserveData['price'], this.promo,
      this.reserveData['cinema_name'], this.reserveData['cinema_location'])
      .subscribe((response) => {
        if(response.error != null){ //If error is returned, display error message by setting it's ngIfs boolean variable to true
          this.err = true;
        } else {
        this.reserveData['price'] = response.data.price; //modify price according to promocode effect
        this.reserveData['comment'] = response.data.description;
        this.show = true; //show message confirming promocode success
        this.vis = false; //remove promocode input textarea and button
      }
     });
   }

}

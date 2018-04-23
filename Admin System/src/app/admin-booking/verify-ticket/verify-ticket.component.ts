import { Component, OnInit } from '@angular/core';
import {AdminTicketService} from "../../@services/admin-ticket.service";
import {CookieService} from "angular2-cookie/core";
import {Auth} from "../../@guards/auth.guard";

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.component.html',
  styleUrls: ['./verify-ticket.component.scss']
})
export class VerifyTicketComponent implements OnInit {

  reservation_id = null;
  ticketView = null;
  adminUsername = 'app';
  ticketIsLoaded = false;
  error = null;

  ticketVerified = true;
  ticketCancelled = true;
  btn_verifyTicket = 'Verify Ticket';

  constructor(public adminTicketService: AdminTicketService, public cookie: CookieService) { }

  ngOnInit() {

    let auth = <Auth>(this.cookie.getObject('auth'));
    this.adminUsername = auth.username;
    if(!this.cookie.get("reservation_id")) {
      this.reservation_id = this.cookie.get('reservation_id');
      this.ticketView = this.cookie.get('ticketView');
    }
  }



  getTicket(event) {
    this.reservation_id = event.target.value;
    console.log(this.reservation_id);
    console.log("Admin:" + this.adminUsername);

    if (this.reservation_id) {
      try {
        this.adminTicketService.viewTicketInfo('some admin', this.reservation_id)
          .subscribe((res) => {
            //TODO check response status
            if (!res.err && res.data) {
              this.ticketView = res.data;
              this.ticketIsLoaded = true;
              if (this.ticketView.payment.data[0]) {
                this.ticketVerified = true;
                this.ticketCancelled = false;
                this.btn_verifyTicket = 'Verified';
              } else {
                this.ticketVerified = false;
                this.ticketCancelled = false;
                this.btn_verifyTicket = 'Verify Ticket';
              }
            } else {
              this.ticketIsLoaded = false;
              this.ticketVerified = false;
              this.ticketCancelled = false;
              this.btn_verifyTicket = 'Verify Ticket';
            }
          });
      } finally {
        this.ticketIsLoaded = false;
        this.ticketVerified = true;
        this.ticketCancelled = true;
        this.btn_verifyTicket = 'Verify Ticket';
      }

      console.log('ticket view: ' + this.ticketView);
    } else {
      this.ticketView = null;
    }

    if(!this.ticketView) {
      this.ticketIsLoaded = false;
      this.ticketVerified = true;
      this.ticketCancelled = true;
      this.btn_verifyTicket = 'Verify Ticket';
    }
  }

  verifyTicket() {
    console.log('VERIFY TICKET TO BE DONE');
    console.log(this.reservation_id);
    console.log(this.ticketView.payment.data[0]);
    if (this.ticketView && !this.ticketView.payment.data[0]) {
      this.adminTicketService.verifyUnpaidTicket('some admin', this.ticketView.reservation_id)
        .subscribe((res) => {
          if(res.data) {
            this.ticketVerified = true;
            this.btn_verifyTicket = 'Verified';
          }
        });
    }

  }


  cancelTicket(event) { //trigerred when cancel ticket button is clicked
      this.adminTicketService.cancelReservation(this.reservation_id).subscribe((response) => { //calls cancel reservation and passes res id to it
        if(response.error == null) { //if no error and deletion is successfull
          this.ticketCancelled = true; //cancel ticket button gets disabled
          this.ticketIsLoaded = false; //ticket information is no longer loaded
        }
      });
    }


}

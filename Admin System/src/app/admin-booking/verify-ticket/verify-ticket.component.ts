import { Component, OnInit } from '@angular/core';
import {AdminTicketService} from "../../@services/admin-ticket.service";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.component.html',
  styleUrls: ['./verify-ticket.component.scss']
})
export class VerifyTicketComponent implements OnInit {

  reservation_id = null;
  ticketView = null;
  adminUsername = this.cookie.get("adminUsername");
  ticketIsLoaded = false;
  error = null;

  constructor(public adminTicketService: AdminTicketService, public cookie: CookieService) { }

  ngOnInit() {
    if(!this.cookie.get("reservation_id")) {
      this.reservation_id = this.cookie.get('reservation_id');
      this.ticketView = this.cookie.get('cookie_view');
    }
  }



  getTicket(event) {
    this.reservation_id = event.target.value;
    console.log(this.reservation_id);

    if(this.reservation_id) {
      this.adminTicketService.viewTicketInfo('some admin', this.reservation_id)
        .subscribe((res) => {
          //TODO check response status
          if(!res.err) {
            this.ticketView = res.data;
            this.ticketIsLoaded = true;
          } else {
            this.ticketIsLoaded = false;
          }
        });
      console.log(this.ticketView);
      /*
        .subscribe(
          (data) => {
            this.ticketView = data
          },
          (err) => {
            if(!err) {
              this.ticketIsLoaded = true;
            }
          });
``      */

    }




  }

}

import { Component, OnInit } from '@angular/core';
import {AdminTicketService} from "../../@services/admin-ticket.service";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-verify-ticket',
  templateUrl: './verify-ticket.component.html',
  styleUrls: ['./verify-ticket.component.scss']
})
export class VerifyTicketComponent implements OnInit {

  ticketView = null;
  adminUsername = this.cookie.get("adminUsername");

  constructor(public adminTicketService: AdminTicketService, public cookie: CookieService) { }

  ngOnInit() {
  }

  getTicket(event) {
    const reservation_id = event.target.value;
    this.adminTicketService.viewTicketInfo(this.adminUsername, reservation_id).subscribe( (response) => {
      this.ticketView = response.data;
    });
  }

}

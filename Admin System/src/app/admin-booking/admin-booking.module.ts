import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { VerifyTicketComponent } from './verify-ticket/verify-ticket.component';
import {AdminBookingRoutes} from "./admin-booking.routing";
import {RouterModule} from "@angular/router";
import {AppComponent} from "../app.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    //AdminBookingRoutingModule,
    RouterModule.forChild(AdminBookingRoutes),
    NgbModule
],
  declarations: [MakeReservationComponent, VerifyTicketComponent],
})
export class AdminBookingModule { }

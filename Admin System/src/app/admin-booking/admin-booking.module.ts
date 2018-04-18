import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBookingRoutingModule } from './admin-booking-routing.module';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { VerifyTicketComponent } from './verify-ticket/verify-ticket.component';
import {AdminBookingRoutes} from "./admin-booking.routing";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    //AdminBookingRoutingModule,
    RouterModule.forChild(AdminBookingRoutes)
  ],
  declarations: [MakeReservationComponent, VerifyTicketComponent]
})
export class AdminBookingModule { }

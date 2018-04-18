import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBookingRoutingModule } from './admin-booking-routing.module';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { VerifyTicketComponent } from './verify-ticket/verify-ticket.component';

@NgModule({
  imports: [
    CommonModule,
    AdminBookingRoutingModule
  ],
  declarations: [MakeReservationComponent, VerifyTicketComponent]
})
export class AdminBookingModule { }

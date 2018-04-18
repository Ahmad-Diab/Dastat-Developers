import { Routes } from '@angular/router';

import { MakeReservationComponent} from "../admin-booking/make-reservation/make-reservation.component";
import { VerifyTicketComponent} from "../admin-booking/verify-ticket/verify-ticket.component";

export const AdminBookingRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'makeReservation',
      component: MakeReservationComponent
    }, {
      path: 'verifyTicket',
      component: VerifyTicketComponent
    }]
  }
];

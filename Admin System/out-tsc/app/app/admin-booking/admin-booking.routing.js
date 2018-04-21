import { MakeReservationComponent } from "./make-reservation/make-reservation.component";
import { VerifyTicketComponent } from "./verify-ticket/verify-ticket.component";
export var AdminBookingRoutes = [
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
//# sourceMappingURL=admin-booking.routing.js.map
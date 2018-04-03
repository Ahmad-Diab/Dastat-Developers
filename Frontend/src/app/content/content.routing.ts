import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TimingComponent } from './booking/timing/timing.component';
import { SeatingComponent } from './booking/seating/seating.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import {ReservationComponent} from "./booking/reservation/reservation.component";

export const ContentRoutes: Routes = [{
  path: '',
  component: HomepageComponent
},{
  path: 'booking/timing',
  component: TimingComponent
},{
  path: 'booking/seating',
  component: SeatingComponent
},{
  path: 'booking/payment',
  component: PaymentComponent
},{
  path: 'booking/reservation',
  component: ReservationComponent
},{
  path: 'movies/list',
  component: MoviesListComponent
},{
  path: 'user/bookings',
  component: BookingDetailsComponent
}];

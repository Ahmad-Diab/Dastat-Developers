import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TimingComponent } from './booking/timing/timing.component';
import { SeatingComponent } from './booking/seating/seating.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import {ReservationComponent} from "./booking/reservation/reservation.component";
import { FilterCinemaComponent } from './cinemas/filter-cinema/filter-cinema.component';

import { CinemasListComponent } from './cinemas/cinemas-list/cinemas-list.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MovieInfoComponent } from './movies/movie-info/movie-info.component';

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
},{
  path: 'cinemas/filter-cinema',
  component: FilterCinemaComponent
},{
  path: 'cinemas/list',
  component: CinemasListComponent
},{
  path: 'cinemas/:name/:location',
  component: CinemasListComponent
}
,{
  path : 'aboutus',
  component : AboutusComponent
},
{
  path : 'info',
  component : MovieInfoComponent
}
];

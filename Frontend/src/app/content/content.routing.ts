import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TimingComponent } from './booking/timing/timing.component';
import { SeatingComponent } from './booking/seating/seating.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
<<<<<<< HEAD
import { FilterCinemaComponent } from './cinemas/filter-cinema/filter-cinema.component';

=======
import { CinemasListComponent } from './cinemas/cinemas-list/cinemas-list.component';
>>>>>>> f0e3453dc454979a708e00ea64b652aa21fb3611

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
  path: 'movies/list',
  component: MoviesListComponent
},{
<<<<<<< HEAD
  path: 'cinemas/filter-cinema',
  component: FilterCinemaComponent
=======
  path: 'cinemas/list',
  component: CinemasListComponent
},{
  path: 'cinemas/:name/:location',
  component: CinemasListComponent
>>>>>>> f0e3453dc454979a708e00ea64b652aa21fb3611
}];

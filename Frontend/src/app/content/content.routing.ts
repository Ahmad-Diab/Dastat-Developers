import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TimingComponent } from './booking/timing/timing.component';
import { SeatingComponent } from './booking/seating/seating.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import {ReservationComponent} from "./booking/reservation/reservation.component";
import { SigninComponent } from './users/signin/signin.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { PartiesComponent } from './booking/parties/parties.component';
import { CinemasListComponent } from './cinemas/cinemas-list/cinemas-list.component';
import { SearchComponent } from './search/search.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MovieInfoComponent } from './movies/movie-info/movie-info.component';
import { CinemaInfoComponent } from './cinemas/cinema-info/cinema-info.component';
import { RegisterComponent } from './users/register/register.component';

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
}, {
  path: 'movies/list',
  component: MoviesListComponent
},{
  path: 'user/bookings',
  component: BookingDetailsComponent
},{
  path: 'signin',
  component: SigninComponent
},{
  path: 'user/:username',
  component: UserProfileComponent
},{
  path: 'cinemas/list',
  component: CinemasListComponent
},
{
  path: 'cinemas/list/:sorting_item/:searchValue',
  component: CinemasListComponent
},{
  path: 'cinemas/:name/:location',
  component: CinemaInfoComponent
},{
  path: 'search',
  component: SearchComponent
},{
  path : 'aboutus',
  component : AboutusComponent
}
,
{
  path : 'info/:movie_id',
  component : MovieInfoComponent
},{ 
  path: 'register',
  component: RegisterComponent
},{
  path: 'booking/parties',
  component: PartiesComponent
}];

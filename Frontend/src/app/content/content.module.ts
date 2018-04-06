import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentRoutes } from './content.routing';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared';
import { HomepageComponent } from './homepage/homepage.component';
import { TimingComponent } from './booking/timing/timing.component';
import { SeatingComponent } from './booking/seating/seating.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import { ReservationComponent } from './booking/reservation/reservation.component';
import { SigninComponent } from './users/signin/signin.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { CinemasListComponent } from './cinemas/cinemas-list/cinemas-list.component';

import { SearchComponent } from './search/search.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MovieInfoComponent } from './movies/movie-info/movie-info.component';
import { PartiesComponent } from './booking/parties/parties.component';
import { CinemaInfoComponent } from './cinemas/cinema-info/cinema-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(ContentRoutes)
  ],
  declarations: [HomepageComponent, TimingComponent, SeatingComponent, PaymentComponent, MoviesListComponent, BookingDetailsComponent, ReservationComponent,
    CinemasListComponent,AboutusComponent,MovieInfoComponent, CinemasListComponent,AboutusComponent,
    MovieInfoComponent, SigninComponent, UserProfileComponent, SearchComponent, AboutusComponent, PartiesComponent, CinemaInfoComponent]

})

export class ContentModule { }

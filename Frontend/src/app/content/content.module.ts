import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentRoutes } from './content.routing';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared';
import { DatePipe } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { TimingComponent } from './booking/timing/timing.component';
import { SeatingComponent } from './booking/seating/seating.component';
import { PaymentComponent } from './booking/payment/payment.component';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { BookingDetailsComponent } from './user/booking-details/booking-details.component';
import { ReservationComponent } from './booking/reservation/reservation.component';
import { SigninComponent } from './users/signin/signin.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { CinemasListComponent } from './cinemas/cinemas-list/cinemas-list.component';

import { SearchComponent } from './search/search.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { MovieInfoComponent } from './movies/movie-info/movie-info.component';
import { PartiesComponent } from './booking/parties/parties.component';
import { CinemaInfoComponent } from './cinemas/cinema-info/cinema-info.component';
import { RegisterComponent } from './users/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CinemasListBookingComponent } from './cinemas/cinemas-list-booking/cinemas-list-booking.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { VerifyComponent } from './users/verify/verify.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/';
import {MatInputModule} from '@angular/material';
import { ActorInfoComponent } from './movies/actor-info/actor-info.component';
import { NgxPaginationModule } from 'ngx-pagination';






@NgModule({
  imports: [
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(ContentRoutes),
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  declarations: [HomepageComponent, TimingComponent, SeatingComponent, PaymentComponent, MoviesListComponent, BookingDetailsComponent, ReservationComponent,
   CinemasListComponent,AboutusComponent,MovieInfoComponent,  CinemaInfoComponent,AboutusComponent,
    MovieInfoComponent, SigninComponent, UserProfileComponent, SearchComponent, AboutusComponent, PartiesComponent,RegisterComponent, CinemasListBookingComponent, EditProfileComponent, VerifyComponent,ActorInfoComponent],
    

})

export class ContentModule { }

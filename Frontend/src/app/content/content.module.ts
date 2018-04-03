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
<<<<<<< HEAD
import { FilterCinemaComponent } from './cinemas/filter-cinema/filter-cinema.component';
import { FormsModule } from '@angular/forms';
=======
import { CinemasListComponent } from './cinemas/cinemas-list/cinemas-list.component';
>>>>>>> f0e3453dc454979a708e00ea64b652aa21fb3611

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(ContentRoutes)
  ],
<<<<<<< HEAD
  declarations: [HomepageComponent, TimingComponent, SeatingComponent, PaymentComponent, MoviesListComponent, FilterCinemaComponent]
=======
  declarations: [HomepageComponent, TimingComponent, SeatingComponent, PaymentComponent, MoviesListComponent, CinemasListComponent]
>>>>>>> f0e3453dc454979a708e00ea64b652aa21fb3611
})

export class ContentModule { }

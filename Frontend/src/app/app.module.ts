import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent, FooterComponent } from './shared/layout';
import { SharedModule } from './shared';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { ContentModule } from './content/content.module';
import { TicketComponent } from './content/booking/ticket/ticket.component';
import { SeatingService } from './@services/seating.service';
import { HttpService } from './@services/http.service';
import { MovieslistService } from './@services/movieslist.service';
import { UserService } from './@services/user.service';
import {BookingService} from "./@services/booking.service";
import {CookieService} from "angular2-cookie/core";
import { AuthService } from './@services/auth.service';
import { AuthGuard } from './@guards/auth.guard';
import { User } from './@objects/user';
import { UsersService } from './@services/users.service';
import { CinemaslistService } from './@services/cinemaslist.service';
import { MovieInfoService } from './@services/movie-info.service';
import { SearchService } from './@services/search.service';
import { PartiesService } from './@services/parties.service';
import { CinemaInfoService } from './@services/cinema-info.service';
import {HttpModule} from "@angular/http";
import { ActorInfoService } from './@services/actor-info.service';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TicketComponent,

  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    SharedModule,
    ContentModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [SeatingService, HttpService, MovieslistService, PartiesService,
  CinemaslistService,MovieInfoService, UserService, BookingService, CookieService,
    AuthService, AuthGuard, CookieService, UsersService,
    CinemaslistService,MovieInfoService,SearchService,CinemaInfoService,ActorInfoService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

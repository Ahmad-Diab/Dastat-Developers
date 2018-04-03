import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


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
import { AuthService } from './@services/auth.service';
import { AuthGuard } from './@guards/auth.guard';
import { User } from './@objects/User';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UsersService } from './@services/users.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TicketComponent,
    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ContentModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [SeatingService, HttpService,MovieslistService, AuthService, AuthGuard, CookieService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

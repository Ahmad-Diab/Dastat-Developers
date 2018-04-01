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
  providers: [SeatingService, HttpService, MovieslistService],
  bootstrap: [AppComponent]
})
export class AppModule { }

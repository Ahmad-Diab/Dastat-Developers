import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class MovieslistService extends HttpService{

  constructor(public http: Http) {
    super(http);
   }

   getCurrentMovies(){
     return this.get('userBooking/getCurrentMovies');
   }

   getFeaturedMovies(){
     return this.get('viewMovies3');
   }

   getTopMovies(){
     return this.get('getTopMovies')
   }
}
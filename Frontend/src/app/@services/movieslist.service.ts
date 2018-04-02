import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class MovieslistService extends HttpService{

  constructor(public http: Http) {
    super(http);
   }

/*    getCurrentMovies(){
     return this.get('userBooking/getCurrentMovies');
   } */
    //DO NOT FORGET TO CALL ALL OF THE SERVICES IN THE MOVIES-LIST COMPONENTS
   //---------------------ALL VIEW MOVIES SERVICES-------------------
   geHighRateMovies(){
     return  this.get('movies/highrate');
   }
 
}

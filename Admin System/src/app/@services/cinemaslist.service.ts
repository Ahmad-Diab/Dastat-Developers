import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Injectable()
export class CinemaslistService extends HttpService {

  
    constructor(public cookie: CookieService, 
        public http: Http) {
          super(cookie, http);
        }

   filterByNumberOfHalls(hallNumber){
     return this.get('filterByHall/' + hallNumber);
   }
   filterByLocation(location,is3D,is4D){
    return this.get('filterByLocation/' + location+'/'+ is3D+'/'+is4D);
  }
  getAllCinemas(){
    return this.get('viewCinemas');
  }
  getDistinctLocation(){
    return this.get('viewCinema/DistinctLocations');
  }
  editCinema(cinema) {
    return this.http.patch('Cinemas/editCinema', cinema); 

  }
}

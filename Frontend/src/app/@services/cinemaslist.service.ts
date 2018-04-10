import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class CinemaslistService extends HttpService {

  
  constructor(public http: Http) {
    super(http);
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
  

}

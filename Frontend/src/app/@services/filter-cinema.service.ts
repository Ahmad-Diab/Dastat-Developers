import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()

export class FilterCinemaService extends HttpService{

  constructor(public http: Http) {
    super(http);
   }

   filterByNumberOfHalls(hallNumber){
     return this.get('filterByHall/' + hallNumber);
   }
   filterByLocation(location){
    return this.get('filterByLocation/' + location);
  }


  

}

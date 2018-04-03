import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class PartiesService extends HttpService{

  constructor(public http: Http) {
    super(http);
   }

   getParties(){
     return this.get('/userBooking/getParties/:cinemaName/:movieName/:date');
   }

}
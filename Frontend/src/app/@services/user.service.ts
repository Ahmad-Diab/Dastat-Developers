import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class UserService extends HttpService {

  constructor(public http:Http) {
    super(http);
   }

   getBookingDetails(username:string,start:number,limit:number){
    return this.get('userBooking/getBookings/'+username + '/' + start + '/' + limit);
   }

}

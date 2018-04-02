import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class UserService extends HttpService {

  constructor(public http:Http) {
    super(http);
   }

   getBookingDetails(username:string){
    return this.get('userBooking/getBookings/'+username);
   }

   makeReservation(username:string, cinema_name:string, cinema_location:string, party_datetime:string,
                   hall:string, payment:boolean ,tickets, tickets_price: number, movie_id: number) {
    return this.post("userBooking/makeReservation", {
      'username': username,
      'cinema_name': cinema_name,
      'cinema_location': cinema_location,
      'date_time': party_datetime,
      'hall': hall,
      'payment': payment,
      'tickets': tickets,
      'price': tickets_price,
      'movie': movie_id
    });
   }
}

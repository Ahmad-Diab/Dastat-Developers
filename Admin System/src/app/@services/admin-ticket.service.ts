import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Http} from "@angular/http";
import {CookieService} from "angular2-cookie/core";

@Injectable()
export class AdminTicketService extends HttpService {

  constructor(public cookie: CookieService, public http:Http) {
    super(cookie, http);
  }

  makeReservationByAdmin(cinema_name:string, cinema_location:string, party_date:string,
                  party_time:string, hall:string, payment:boolean ,tickets,
                  tickets_price: number, movie_id: number, comment: string) {
    let cinema_username = cinema_name.toLowerCase().trim() + "_" + cinema_location.toLowerCase().trim();

    return this.post("/tickets/makeReservationAsAdmin", {
      'username': cinema_username,
      'cinema_name': cinema_name,
      'cinema_location': cinema_location,
      'date': party_date,
      'time': party_time,
      'hall': hall,
      'payment': payment,
      'tickets': tickets,
      'price': tickets_price,
      'movie': movie_id,
      'comment': comment
    });
  }

  viewTicketInfo(adminUsername:String, reservation_id:String) {
    return this.get('/tickets/viewTicketInfo',{ headers: {
        'username': adminUsername,
        'reservation_id': reservation_id
    }
    });
  }

  verifyUnpaidTicket(adminUsername:String, reservation_id:String) {
    //TODO this need to be patch method instead
    return this.patch('/tickets/verifyUnpaidTicket',{
      'username': adminUsername,
      'reservation_id': reservation_id
    });
  }

  cancelReservation(reservation_id: number) {
    return this.delete('/tickets/cancelReservation', { headers: { //calls cancel reservation delete method to backend and gives it the tickets reservation id
      'id': reservation_id
    }
    });
  }
}

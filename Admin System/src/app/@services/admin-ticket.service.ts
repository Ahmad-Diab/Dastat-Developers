import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Http} from "@angular/http";

@Injectable()
export class AdminTicketService extends HttpService {

  constructor(public cookie, public http:Http) {
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
        'adminUsername': adminUsername,
        'reservation_id': reservation_id
    }
    });
  }

  verifyUnpaidTicket(adminUsername:String, reservation_id:String) {
    return this.post('/tickets/verifyUnpaidTicket',{
      'adminUsername': adminUsername,
      'reservation_id': reservation_id
    });
  }
}

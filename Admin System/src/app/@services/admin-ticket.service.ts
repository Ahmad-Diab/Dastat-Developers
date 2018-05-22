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
                  party_time:string, hall:string, tickets,
                  tickets_price: number, movie_id: number) {

    return this.post_auth("tickets/makeReservationAsAdmin", {
      'cinema_name': cinema_name,
      'cinema_location': cinema_location,
      'date': party_date,
      'time': party_time,
      'hall': hall,
      'payment': true,
      'tickets': tickets,
      'price': tickets_price,
      'movie': movie_id,
      'comment': "OFFLINE TICKET"
    });
  }

  viewTicketInfo(adminUsername:String, reservation_id:String) {
    return this.get_auth('tickets/viewTicketInfo',{
        'username': adminUsername,
        'reservation_id': reservation_id
    });
  }

  verifyUnpaidTicket(adminUsername:String, reservation_id:String) {
    return this.patch_auth('tickets/verifyUnpaidTicket',{
      'username': adminUsername,
      'reservation_id': reservation_id
    });
  }

  viewPartiesOfThatMovie(admin_username: String, cinema_name:String, cinema_location:String, movie_id: Number) {
    return this.get_auth('tickets/viewPartiesForThatMovie', {
        'username' : admin_username,
        'cinema_name' : cinema_name,
        'cinema_location' : cinema_location,
        'movie_id' : movie_id
      });
  }

  //-----halls---
  getMoviesInHallsForCinemaForAdmin(cinema_name:String, cinema_location:String) {
    return this.get_auth('/tickets/getCurrentMoviesForCinemaForAdmin',{
        'cinema_name': cinema_name,
        'cinema_location': cinema_location
    });
  }

  cancelReservation(reservation_id: number) {
    return this.delete_auth('/tickets/cancelReservation/' + reservation_id);
  }

}




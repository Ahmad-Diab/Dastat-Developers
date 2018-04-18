import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Injectable()
export class PromocodesService extends HttpService {

  constructor(public cookie: CookieService, public http: Http) {
    super(cookie, http);
   }

   /**
    * Sends get request to get the promocodes data:
    * (Promocode, type, value, cinema name that the promocode is used in, cinema location)
    * @returns Array of JSON objects of promocodes
    */
  getPromocodes(){
    return this.get('promocodes');
  }
  getPromocodesAndCinemas(){
    return this.get('promocodes/viewPromocodesAndCinemas')
  }
  assignPromocodeToCinema(promocode : string,cinemaName : string,cinemaLocation : string){
    return this.post('promocodes/assignPromocodes',{
      "promocode":promocode,
      "cinema_location":cinemaLocation,
      "cinema_name":cinemaName
    })
  }

}

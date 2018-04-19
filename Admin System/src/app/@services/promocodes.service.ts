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

  /**
   * Sends post request to update a promocode:
   * (Promocode, promocode type, promocode value)
   * @param promocode 
   * @param type 
   * @param value 
   */
  editPromocode(promocode: string, type: string, value: string){
    return this.post('promocodes/edit',{
      "promocode": promocode,
      "type": type,
      "value": value
    })
  }

  assignPromocodeToCinema(promocode : string,cinemaName : string,cinemaLocation : string){
    return this.post('promocodes/assignPromocodes',{
      "promocode":promocode,
      "cinema_location":cinemaLocation,
      "cinema_name":cinemaName
    })
  }

  AddPromocodes(promocode:string,type:string,value:string){
    return this.post('promocodes/addPromocode',{
      "promocode":promocode,
      "type":type,
      "value":value
    })
  }

  deletePromocode(promocode: string){
    return this.post('/promocodes/deletePromocode/'+promocode)
  }

 
}

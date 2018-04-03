import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class CinemaInfoService extends HttpService {

  constructor(public http: Http) {
    super(http);
   }
   getCinemaInfo(cinemaname,location){
     console.log("bosssssbossss");
     return this.get('viewCinema/'+cinemaname+'/'+location);
   }

}

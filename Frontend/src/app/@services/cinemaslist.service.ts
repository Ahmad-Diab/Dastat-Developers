import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class CinemaslistService extends HttpService {

  constructor(public http: Http) {
    super(http);
   }

  getAllCinemas(){
    return this.get('viewCinemas');
  }

}

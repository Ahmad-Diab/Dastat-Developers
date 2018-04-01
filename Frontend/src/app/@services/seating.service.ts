import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';


@Injectable()
export class SeatingService extends HttpService{

  constructor(public http: Http)  {
    super(http);
  }

  testing() {
    return this.http.get('users');
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Injectable()
export class PromocodesService extends HttpService {

  constructor(public cookie: CookieService, public http: Http) {
    super(cookie, http);
   }

}

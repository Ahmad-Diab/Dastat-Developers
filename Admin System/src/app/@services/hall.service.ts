import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http } from '@angular/http';

@Injectable()
export class HallService extends HttpService{

  constructor(public cookie: CookieService, 
    public http: Http) { 
      super(cookie, http);
    }

    saveLayout(data) {
      return this.post_auth('layout/add', data);
    } 

    users() {
      return this.get_auth('users');
    }
}

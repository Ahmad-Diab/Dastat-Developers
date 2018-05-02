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

    getHalls() {
      return this.get_auth('halls/all'); 
    }

    deleteHall(data) {
      return this.post_auth('halls/deleteHall', data);
    }

    addHall(data) {
      return this.post_auth('halls/add', data);
    }

    getCinemaLocations() {
      return this.get_auth('cinema/location/min');
    } 

    getCinemasInLocation(data) {
      return this.get_auth('cinema/names/min', data);
    }

    getMinifiedLayouts() {
      return this.get_auth('layout/minified');
    } 

    editHall(data) {
      return this.post_auth('halls/update', data);
    }

    deleteLayout(data) {
      return this.post_auth('layout/delete', data);
    }

    getLayout(data) {
      var url = 'layout/' + data
      return this.get_auth(url);
    }

    editLayout(data) {
      return this.post_auth('layout/update', data);
    }

    viewLayout(data) {
      return this.get_auth('layout/encoding', data);
    }
}

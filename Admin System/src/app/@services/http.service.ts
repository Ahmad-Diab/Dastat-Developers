import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";
import { Auth } from '../@guards/auth.guard';

@Injectable()
export class HttpService {

  constructor(public cookie: CookieService, 
    public http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    var auth = <Auth>(this.cookie.getObject('auth'));
    headers.append('authorization', "token " + auth.token);
  }

  get_auth(route, data?) {    
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(environment.api + route, {headers: headers}).pipe(map(res => res.json()));
  }

  post_auth(route, data?) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(environment.api + route, {headers: headers}, data).pipe(map(res => res.json()));
  }

  get(route, data?) {
    return this.http.get(environment.api + route, data).pipe(map(res => res.json()));
  }

  post(route, data?) {
    return this.http.post(environment.api + route, data).pipe(map(res => res.json()));
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService extends HttpService{

  constructor(public cookie: CookieService, 
    public http: Http) {
      super(cookie, http);
    }

   login(data) { 
      return this.post('adminlogin', data);
   }
   getmycinemas(username){
     console.log("sdsds");
     return this.get('getmycinemas/'+username);
   }
   getmytype(username){
    console.log("sdsds");
    return this.get('getmytype/'+username);
  }
   
}

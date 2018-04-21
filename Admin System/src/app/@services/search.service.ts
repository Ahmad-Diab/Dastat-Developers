import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Injectable()
export class SearchService extends HttpService{

    constructor(public cookie: CookieService, 
        public http: Http) {
          super(cookie, http);
        }


   getSearchResult(key: String){
     return this.get('adminsearch/' + key);
   }

}

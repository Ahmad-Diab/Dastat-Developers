import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class MoviesService extends HttpService {

  constructor(public cookie: CookieService, public http: Http) {
    super(cookie, http);
   }
    /**
    * Sends get request to get the data from MyMovies backend:
    *
    * @returns Array of JSON objects of MyMovies data
    */

    viewMyRequests(){
      
    }
}

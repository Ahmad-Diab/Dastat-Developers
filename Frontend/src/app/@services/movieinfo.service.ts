import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class MovieinfoService extends HttpService {

  constructor(public http: Http) {
    super(http);
   }

   getMovieInfo(event){
     return this.get('/movies/:movie_id');
   }
}

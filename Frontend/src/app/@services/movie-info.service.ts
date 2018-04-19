import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class MovieInfoService extends HttpService{

  constructor(public http: Http) {
    super(http);
    }
getMovieInfo(movie_id: string){
  return this.get('movies/id/'+ movie_id);
}

}

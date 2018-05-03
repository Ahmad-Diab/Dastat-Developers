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
getPartiesForCinemaAndMovie(cinemaName : string,cinemaLocation : string,movie_id : string,date : string){
  return this.get('userBooking/getPartiesInSpecificCinema/' + cinemaLocation + '/' + cinemaName + '/' + movie_id + '/' + date);
}

}

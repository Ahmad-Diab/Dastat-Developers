import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class MoviesInHallsService extends HttpService{

  constructor(public cookie: CookieService, 
    public http: Http) { 
      super(cookie, http);
    }

  cinemaHalls(cinema_name,cinema_location){
    return this.get('/MoviesInHalls/cinemaHalls/'+cinema_name+'/'+cinema_location);
  }

  cinemaMovies(cinema_location,cinema_name){
    return this.get('/MoviesInHalls/cinemaMovies/'+cinema_location+'/'+cinema_name);
  }

  getMovieDetails(movie_id,cinema_name,cinema_location){
    return this.get('/MoviesInHalls/getFinalOutput/'+movie_id+'/'+movie_id+'/'+cinema_name+'/'+cinema_location);
  }
}
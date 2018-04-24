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

  //method that calls cinemaHalls method to get all halls in selected cinema
  cinemaHalls(cinema_name,cinema_location){
    return this.get('/MoviesInHalls/cinemaHalls/'+cinema_name+'/'+cinema_location);
  }
  //method that calls cinemaMovies method to get all movies in selected cinema
  cinemaMovies(cinema_location,cinema_name){
    return this.get('/MoviesInHalls/cinemaMovies/'+cinema_location+'/'+cinema_name);
  }
  //method that calls getFinalOutput method to get all data about selected movie and hall
  getMovieDetails(movie_id,cinema_name,cinema_location){
    return this.get('/MoviesInHalls/getFinalOutput/'+movie_id+'/'+movie_id+'/'+cinema_name+'/'+cinema_location);
  }
}
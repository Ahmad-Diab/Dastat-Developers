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

  getHallsForCinema(cinema){
    return this.get('/MoviesInHalls/getHallsForThatCinema/'+cinema.cinema_name+'/'+cinema.cinema_location);
  }

  getCinemasForAdminUser(username){
    return this.get('/MoviesInHalls/viewCinemasForAdminUser/'+username);
  }

  getAlltMoviesInCinemaForAdmin(cinema_name , cinema_location){
    return this.get('/MoviesInHalls/getAlltMoviesInCinemaForAdmin/'+cinema_location+'/'+cinema_name);
  }
}
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class MovieslistService extends HttpService{

  constructor(public http: Http) {
    super(http);
   }

    getCurrentMovies(){
     return this.get('userBooking/getCurrentMovies');
   } 
    //DO NOT FORGET TO CALL ALL OF THE SERVICES IN THE MOVIES-LIST COMPONENTS
   //---------------------ALL VIEW MOVIES SERVICES-------------------
   geHighRateMovies(genre : string){
     return  this.get('movies/highrate/' + genre);
   }

   getMovies(){
    return  this.get('movies/feature/');
  }

  getLowRate(genre : string){
    return this.get('movies/lowrate/' + genre);
  }

  getLatest(genre : string){
    return this.get('movies/latest/' + genre);
  }
  getOldest(genre : string){
    return this.get('movies/oldest/' + genre);
  }
  getAction(sortingFilter : string){
    return this.get('movies/Action/' + sortingFilter);
  }
  getAdventure(sortingFilter : string){
    return this.get('movies/Adventure/' + sortingFilter);
  }
  getComedy(sortingFilter : string){
    return this.get('movies/Comedy/' + sortingFilter);
  }
  getDrama(sortingFilter : string){
    return this.get('movies/Drama/' + sortingFilter);
  }
  getHorror(sortingFilter : string){
    return this.get('movies/Horror/' + sortingFilter);
  }
  getThriller(sortingFilter : string){
    return this.get('movies/Thriller/' + sortingFilter);
  }
  getBio(sortingFilter : string){
    return this.get('movies/Bio/' + sortingFilter);
  }
 

   getFeaturedMovies(){
     return this.get('viewMovies3');
   }

   getTopMovies(){
     return this.get('getTopMovies')
   }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieInfoService } from '../../../@services/movie-info.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { CinemaslistService } from '../../../@services/cinemaslist.service'
import { BookingService } from '../../../@services/booking.service';
import { Booking } from '../../booking/seating/seating.component';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
movie;
date;
cinemaNameAndLocation;
cinemasForMovie = [];
partiesTmp = [];
//dates = [this.currentDate,this.currentDate + 1,];
parties = [];
  constructor(private router: Router ,public MovieInfoService: MovieInfoService, private route : ActivatedRoute, 
  public cookie : CookieService,public CinemaslistService : CinemaslistService,public BookingService : BookingService) { 
  }

ngOnInit(){
  this.route.params.subscribe( params => this.movie = params['movie_id']);
  this.MovieInfoService.getMovieInfo(this.movie).subscribe((response)=>{
    this.movie=response.data[0];
    console.log(response.data[0]);  
  this.BookingService.getMoviesForThisCinema(2).subscribe((response)=>{
    this.cinemasForMovie=response.data;
    console.log(this.cinemasForMovie);   
    console.log(this.cinemaNameAndLocation); 
    this.getPartiesForCinemaAndMovie();
  });
  });
  
  /*
  this.MovieInfoService.getPartiesForCinemaAndMovie(this.movie).subscribe((response)=>{
    this.parties = response.data;
    console.log(response.data);
  });*/
}
getPartiesForCinemaAndMovie(){
  console.log(this.date);
  this.parties = [];
  this.cinemasForMovie.forEach(cinema => {
    this.MovieInfoService.getPartiesForCinemaAndMovie(cinema.name,cinema.location,'2',this.date).subscribe((response)=>{
      this.parties.push(response.data);
      console.log(response.data);
    });  
  });
  
}
submit(cinema,party){
  var booking = {
    cinema_name: cinema.name,
    cinema_location: cinema.location,
    hall_number: party.hall,
    date : party.date,
    time: party.time,
  }
  this.cookie.putObject('booking' ,booking);
  this.router.navigate ( [ 'booking/seating'  ] );
}
putMovieInCookie(){
  this.cookie.putObject('movie' , this.movie);
} 
hey(){
  console.log("done");
} 
}

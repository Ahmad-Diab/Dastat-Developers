import { Component, OnInit } from '@angular/core';
import { CinemaslistService } from '../../../@services/cinemaslist.service'
import { BookingService } from '../../../@services/booking.service'
import { Router } from '@angular/router';
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-cinemas-list',
  templateUrl: './cinemas-list-booking.component.html',
  styleUrls: ['./cinemas-list-booking.component.css']
})
export class CinemasListBookingComponent implements OnInit {
  cinemas;
  cinemas2;
  movie;
  searchValue ;
  locations = [];


  
  constructor(public cinemalistService: CinemaslistService, public bookingService: BookingService,
  public router: Router , public cookie: CookieService) { }

  ngOnInit() {
  
    this.searchValue = "All";
    this.movie = this.cookie.getObject('movie');
    var movieId = this.movie.movie_id;
    this.bookingService.getMoviesForThisCinema(movieId).subscribe((response) => {
      this.cinemas=response.data;
      this.cinemas2 = response.data;
      for(var i = 0;i<this.cinemas.length;i++){
        this.locations[i] = this.cinemas[i].location; 
        console.log(this.cinemas[i].location);
      }
      this.locations = this.remove_duplicates(this.locations);
    });

  }
  remove_duplicates(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    arr = [];
    for (let key in obj) {
        arr.push(key);
    }
    return arr;
}

  AddCinemaToCookie(cinema){
    this.router.navigate(['booking/parties']);
    console.log(cinema);
    this.cookie.putObject("cinema" , cinema);

  }
  filter(){
  
    if(this.searchValue == 'All'){
      this.cinemas = this.cinemas2
    }
    else{
      this.cinemalistService.filterByLocation(this.searchValue,1,1).subscribe((response) => {
        this.cinemas = response; 
        console.log(response);
      });
    }
    
  }

}

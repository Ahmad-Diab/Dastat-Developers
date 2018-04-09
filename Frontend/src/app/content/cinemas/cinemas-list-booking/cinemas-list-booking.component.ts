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
  movie;
  constructor(public cinemalistService: CinemaslistService, public bookingService: BookingService,
  public router: Router , public cookie: CookieService) { }

  ngOnInit() {
    this.movie = this.cookie.getObject('movie');
    var movieId = this.movie.movie_id;
    this.bookingService.getMoviesForThisCinema(movieId).subscribe((response) => {
      this.cinemas=response.data;
      console.log(this.cinemas);
    });
  }

  AddCinemaToCookie(cinema){
    this.router.navigate(['booking/parties']);
    console.log(cinema);
    this.cookie.put("cinema" , cinema);

  }

}
